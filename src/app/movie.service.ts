import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class MovieService {

  url = 'http://localhost:3000/';

  constructor(private httpclient: HttpClient) { }

  getMoviesList(){
    return this.httpclient.get<any>(this.url+"movies");
  }

  sendonemovie(n){
    return this.httpclient.get(this.url+"movie/"+n);
  }

  addReview(review){
    return this.httpclient.put(this.url+"review", review);
  }
}
