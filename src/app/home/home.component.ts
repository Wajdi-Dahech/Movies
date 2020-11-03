import { Component, OnInit } from '@angular/core';
import { LoginSignupService } from './../login-signup.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  loginusername:string;
  loginpassword:string;
  signupusername:string;
  signupemail:string;
  signuppassword:string;

  constructor(private loginsignupservice: LoginSignupService, private router: Router) { }

  ngOnInit(): void {
  }

  onLoginSubmit(){
    console.log("login called");
    var credentials = {username: this.loginusername, password: this.loginpassword}
    this.loginsignupservice.login(credentials).subscribe(
      response => {console.log(response); this.loginsignupservice.setUserId(response.profile_details._id); alert("Logged In Sucessfully.."); this.router.navigate(['/profile']);},
      error => console.error("Error", error)
    );
  }

  onSignUpSubmit(){
    console.log("signup called");
    var new_profile_details = {username: this.signupusername, email: this.signupemail, password: this.signuppassword}
    this.loginsignupservice.signup(new_profile_details).subscribe(
      response => {console.log(response); alert("Account Created Successfully...")},
      error => console.error("Error", error)
    );
  }

}
