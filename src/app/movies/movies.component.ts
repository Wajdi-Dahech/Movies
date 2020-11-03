import { Component, OnInit } from '@angular/core';
import { MovieService } from '../movie.service';
import { LoginSignupService } from '../login-signup.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-movies',
  templateUrl: './movies.component.html',
  styleUrls: ['./movies.component.css']
})
export class MoviesComponent implements OnInit {
  movies = [];
  userId = '';

  constructor(private movieservice: MovieService, private loginsignupservice: LoginSignupService, private router: Router) { }

  ngOnInit(): void {
    this.userId = this.loginsignupservice.getUserId();
    if(this.userId == ""){
      alert("Please Login to continue..");
      this.router.navigate(['/']);
    }
    this.movieservice.getMoviesList().subscribe(
      response => {console.log(response);this.movies = response.movie_list},
      error => console.log("Error", error)
    );
  }

}
