import { Component, OnInit } from '@angular/core';
import { CelebService } from '../celeb.service';
import { LoginSignupService } from '../login-signup.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-blog-list',
  templateUrl: './blog-list.component.html',
})
export class BlogListComponent implements OnInit {
  userId = '';
  constructor(private celebservice:CelebService, private loginsignupservice: LoginSignupService, private router: Router) { }

  blogs=[]
  ngOnInit() {
    this.userId = this.loginsignupservice.getUserId();
    if(this.userId == ""){
      alert("Please Login to continue..");
      this.router.navigate(['/']);
    }
    this.celebservice.sendallblogrequest().subscribe((data: any[])=>{
      console.log(data);
      this.blogs = data;
    })  
  }

}
