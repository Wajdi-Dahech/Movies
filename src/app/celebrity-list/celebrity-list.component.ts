import { Component, OnInit } from '@angular/core';
import { CelebService } from '../celeb.service';
import { LoginSignupService } from '../login-signup.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-celebrity-list',
  templateUrl: './celebrity-list.component.html',
})
export class CelebrityListComponent implements OnInit {
  userId = '';
  celebs = [];
  constructor(private celebservice:CelebService, private loginsignupservice: LoginSignupService, private router: Router) {
  
   }

   randomlist=[1,2,3,4,5]
   ngOnInit() {
    this.userId = this.loginsignupservice.getUserId();
    if(this.userId == ""){
      alert("Please Login to continue..");
      this.router.navigate(['/']);
    }
    this.celebservice.sendallcelebrequest().subscribe((data: any[])=>{
      console.log(data);
      this.celebs = data;
    })  
  }

}
interface cb{
  name:String
}