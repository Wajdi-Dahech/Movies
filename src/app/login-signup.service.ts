import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class LoginSignupService {
  url = "http://localhost:3000/";
  userId = "";
  
  constructor(private httpclient: HttpClient) { }
  
  login(credentials){
    return this.httpclient.post<any>(this.url+"login", credentials);
  }

  signup(new_profile_details){
    return this.httpclient.post<any>(this.url+"sign_up", new_profile_details);
  }

  getUserId(){
    return this.userId;
  }

  setUserId(id:string){
    this.userId = id;
  }

  getProfileDetails(id:string){
    return this.httpclient.get<any>(this.url+"profile/"+id);
  }

  updateProfile(updated_profile){
    return this.httpclient.put<any>(this.url+"profile", updated_profile);
  }

  changePassword(new_credentials){
    return this.httpclient.put<any>(this.url+"profile/password", new_credentials);
  }
}
