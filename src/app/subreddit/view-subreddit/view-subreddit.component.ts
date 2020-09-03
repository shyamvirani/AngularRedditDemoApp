import { Component, OnInit } from '@angular/core';
import { SubredditService } from '../subreddit.service';
import { Router, ActivatedRoute } from '@angular/router';
import { SubredditModel } from '../subreddit-response';
import { throwError } from 'rxjs';
import { PostService } from 'src/app/shared/post.service';
import { PostModel } from 'src/app/shared/post-model';
import { faComments } from '@fortawesome/free-solid-svg-icons';



@Component({
  selector: 'app-view-subreddit',
  templateUrl: './view-subreddit.component.html',
  styleUrls: ['./view-subreddit.component.css']
})
export class ViewSubredditComponent implements OnInit {
  subredditId:number;
  subreddit:SubredditModel;
  post:PostModel[];
  faComments = faComments;

  constructor(private postService:PostService,private subredditService:SubredditService,private router:Router ,private activateRoute: ActivatedRoute) { 
    this.subredditId = this.activateRoute.snapshot.params.id;
  }
 
 

  ngOnInit(): void {
    this.getSubreddit();
    this.getPostBySubredddit();
  }
  private getSubreddit() {
    this.subredditService.getSubreddit(this.subredditId).subscribe(data => {
      this.subreddit = data;
      console.log(this.subreddit)
    }, error => {
      throwError(error);
    });
  }
  private getPostBySubredddit(){
    this.postService.getPostBySubreddit(this.subredditId).subscribe(data=>{
      this.post=data;
      console.log(this.post);

    })
  }
  goToPost(id: number): void {
    this.router.navigateByUrl('view-post/' + id);
  }
}
