import { Component, OnInit } from '@angular/core';
import {CelebService} from '../celeb.service';
import { ActivatedRoute, Router } from '@angular/router';
import { LoginSignupService } from '../login-signup.service';

@Component({
  selector: 'app-blog-single',
  templateUrl: './blog-single.component.html',
})
export class BlogSingleComponent implements OnInit {

  constructor(private celebservice:CelebService, private route: ActivatedRoute, private loginsignupservice:LoginSignupService, private router: Router) { }
  blog;
  blogId = '';
  userId = '';
  newcomment = '';
  comment:{
    username:"",
    time:"",
    msg:""
  }
  ngOnInit() {
    this.userId = this.loginsignupservice.getUserId();
    if(this.userId == ""){
      alert("Please Login to continue..");
      this.router.navigate(['/']);
    }
    this.blogId = this.route.snapshot.paramMap.get('id');
    this.celebservice.sendoneblog(this.blogId).subscribe((data: any[])=>{
      console.log(data);
      this.blog = data[0];
    })  
  }

  onAddCommentSubmit(){
    var new_comment = {userId: this.userId, blogId:this.blogId, comment: this.newcomment};
    this.celebservice.addcomment(new_comment).subscribe(
      response => {alert("Comment Posted Successfully.."); this.router.navigate(['redirectblog/'+this.blogId])},
      error => console.log("Error",error)
    );

  }
  
}
