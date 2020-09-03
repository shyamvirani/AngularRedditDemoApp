import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class CaptchaService {

  url: string = 'http://localhost:8080/verify/captcha';

  constructor(private http: HttpClient) { }

  post(captcha) {
    return this.http.post(this.url, {captcha: captcha});
  }
}
