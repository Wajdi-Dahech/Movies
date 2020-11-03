import { Component, OnInit } from '@angular/core';
import { LoginSignupService } from '../login-signup.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit {

  userId = '';
  username = '';
  email = '';
  fname = '';
  lname = '';
  dob = '';
  oldpassword = '';
  newpassword = '';

  constructor(private loginsignupservice: LoginSignupService, private router: Router) { }

  ngOnInit(): void {
	  console.log(this.loginsignupservice.getUserId());
    this.userId = this.loginsignupservice.getUserId();
    if(this.userId == ""){
      alert("Please Login to continue to Profile..")
      this.router.navigate(['/']);
    }
    else{
      this.loginsignupservice.getProfileDetails(this.userId).subscribe(
        response => {this.username=response.profile_details.username; this.email=response.profile_details.email; this.fname=response.profile_details.fname; this.lname=response.profile_details.lname; this.dob = response.profile_details.dob;},
        error => console.log("Error", error)
      );
    }
  }

  onUpdateProfileSubmit(){
    var updated_profile = {userId: this.userId, username: this.username, email: this.email, fname: this.fname, lname: this.lname, dob: this.dob }
    this.loginsignupservice.updateProfile(updated_profile).subscribe(
      response => {console.log(response); alert("Profile Updated Successfully..");this.router.navigate(['redirectprofile'])},
      error => console.log("Error", error)      
    );
  }

  onChangePasswordSubmit(){
    var new_credentials = { userId: this.userId, oldpassword: this.oldpassword, newpassword: this.newpassword};
    this.loginsignupservice.changePassword(new_credentials).subscribe(
      response => {
        console.log(response); 
        if(response.msg=="Incorrect password"){
          alert("Incorrect Password...");
        }else{
          alert("Password Changed Successfully..");
          this.router.navigate(['redirectprofile']);
        } 
      },
      error => console.log("Error", error)
    );
  }

  goToHome(){
    this.router.navigate(['']);
  }

  goToMovies(){
    this.router.navigate(['movies']);
  }

  goToCelebrities(){
    this.router.navigate(['celebrities']);
  }

  goToBlogs(){
    this.router.navigate(['blogs']);
  }

  logOut(){
    this.loginsignupservice.setUserId('');
    alert('Logged Out Successfully..');
    this.router.navigate(['']);
  }

}
