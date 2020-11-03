import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class CelebService {// Name is celebservice but it has both celeb and blog Apis
  private REST_API_SERVER = "http://localhost:3000";
  constructor(private httpClient:HttpClient) { }

  public sendallcelebrequest(){
    return this.httpClient.get(this.REST_API_SERVER+"/allcelebs");
  }

  public sendoneceleb(n){
    return this.httpClient.get(this.REST_API_SERVER+"/celeb",{
      params: {
        celebid: n,
      }
    });
  }

  public sendallblogrequest(){
    return this.httpClient.get(this.REST_API_SERVER+"/allblogs");
  }

  public sendoneblog(n){
    return this.httpClient.get(this.REST_API_SERVER+"/blog",{
      params: {
        blogid: n,
      }
    });
  }

  public addcomment(new_comment){
    return this.httpClient.put<any>(this.REST_API_SERVER+"/comment",new_comment);
  }
}
