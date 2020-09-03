import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { SignupRequestPayload } from './singup-request.payload';
import { AuthService } from '../shared/auth.service';
import { ToastrService } from 'ngx-toastr';
import { Router } from '@angular/router';
import { CaptchaService } from 'src/app/shared/captcha.service';



@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css']
})
export class SignupComponent implements OnInit {

  signupRequestPayload: SignupRequestPayload;
  signupForm: FormGroup;
  
  isError: boolean;
  invalidLogin: boolean = false;
  token: String = '';

  constructor(private authService: AuthService, private router: Router,
    private toastr: ToastrService,private captchaService: CaptchaService) {
    this.signupRequestPayload = {
      username: '',
      email: '',
      password: ''
    };
  }

  ngOnInit() {
    this.signupForm = new FormGroup({
      username: new FormControl('', Validators.required),
      email: new FormControl('', [Validators.required, Validators.email]),
      password: new FormControl('', Validators.required),
    });
  }
  resolved(captchaResponse: string) {
    this.token = captchaResponse;
    console.log(`Resolved captcha with response ${captchaResponse}:`);
  }
  signup() {
  
    this.signupRequestPayload.email = this.signupForm.get('email').value;
    this.signupRequestPayload.username = this.signupForm.get('username').value;
    this.signupRequestPayload.password = this.signupForm.get('password').value;
    this.captchaService.post(this.token)
    .subscribe(
      () => { this.toastr.success('captcha correct'); },
      (error) => {
        this.toastr.error('please validate captcha');
        console.log("captcha bypass")
      }
    );

    this.authService.signup(this.signupRequestPayload)
      .subscribe(data => {
        this.router.navigate(['/login'],
          { queryParams: { registered: 'true' } });
      }, error => {
        console.log(error);
        this.toastr.error('Registration Failed! Please try again');
      });
  }
}
