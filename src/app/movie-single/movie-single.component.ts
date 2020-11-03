import { Component, OnInit } from '@angular/core';
import { MovieService } from '../movie.service';
import { ActivatedRoute, Router } from '@angular/router';
import { LoginSignupService } from '../login-signup.service';

@Component({
  selector: 'app-movie-single',
  templateUrl: './movie-single.component.html'
})
export class MovieSingleComponent implements OnInit {
  movieId = '';
  userId = '';
  currentTab = 'overview'
  movie = {mainimage:'', name:'', average_rating:'', reviews:[], overview:'', images:[], cast:[], director:'',writers:[], genres:'', release_date:'', runtime:'', keywords:[], producers:[], videos:[]}
  userRating = 10;
  userShortReview = '';
  userReviewDetails = '';
  
  constructor(private movieService:MovieService, private route: ActivatedRoute, private loginsignupservice: LoginSignupService, private router: Router) { }

  ngOnInit() {
    this.userId = this.loginsignupservice.getUserId();
    if(this.userId == ""){
      alert("Please Login to continue..");
      this.router.navigate(['/']);
    }
    this.currentTab = this.route.snapshot.paramMap.get("tab");
    this.movieId = this.route.snapshot.paramMap.get("id");
    this.movieService.sendonemovie(this.movieId).subscribe((data: any[])=>{
      console.log(data);
      this.movie = data[0];
    });
    if(this.currentTab=="media"){
      this.goToMedia();
    }
    else if(this.currentTab=="reviews"){
      this.goToReviews();
    }
    else if(this.currentTab=="cast"){
      this.goToCast();
    }
    else{
      this.goToOverview();
    }
  }

  onReviewSubmit(){
    if(this.userRating <0 || this.userRating >10){
      alert('Rating should be between 0 & 10..');
    }
    else{
      var review = {userId: this.userId, movieId: this.movieId, rating: this.userRating, short_rev: this.userShortReview, review: this.userReviewDetails}
      this.movieService.addReview(review).subscribe(
        response => {alert("Review Added Successfully.."), this.router.navigate(['/redirectmovie/'+this.movieId])},
        error => console.log("Error", error)
      );
    }
  }

  goToOverview(){
    if(!document.getElementById("overview").classList.contains("active")){
      document.getElementById("overview").classList.add("active");
    }
    if(document.getElementById("reviews").classList.contains("active")){
       document.getElementById("reviews").classList.remove("active");
    }
    if(document.getElementById("cast").classList.contains("active")){
      document.getElementById("cast").classList.remove("active");
    }
    if(document.getElementById("media").classList.contains("active")){
      document.getElementById("media").classList.remove("active");
    }
    if(!document.getElementById("overviewLink").classList.contains("active")){
      document.getElementById("overviewLink").classList.add("active");
    }
    if(document.getElementById("reviewsLink").classList.contains("active")){
       document.getElementById("reviewsLink").classList.remove("active");
    }
    if(document.getElementById("castLink").classList.contains("active")){
      document.getElementById("castLink").classList.remove("active");
    }
    if(document.getElementById("mediaLink").classList.contains("active")){
      document.getElementById("mediaLink").classList.remove("active");
    }
  }

  goToReviews(){
    if(!document.getElementById("reviews").classList.contains("active")){
      document.getElementById("reviews").classList.add("active");
    }
    if(document.getElementById("overview").classList.contains("active")){
       document.getElementById("overview").classList.remove("active");
    }
    if(document.getElementById("cast").classList.contains("active")){
      document.getElementById("cast").classList.remove("active");
    }
    if(document.getElementById("media").classList.contains("active")){
      document.getElementById("media").classList.remove("active");
    }
    if(!document.getElementById("reviewsLink").classList.contains("active")){
      document.getElementById("reviewsLink").classList.add("active");
    }
    if(document.getElementById("overviewLink").classList.contains("active")){
       document.getElementById("overviewLink").classList.remove("active");
    }
    if(document.getElementById("castLink").classList.contains("active")){
      document.getElementById("castLink").classList.remove("active");
    }
    if(document.getElementById("mediaLink").classList.contains("active")){
      document.getElementById("mediaLink").classList.remove("active");
    }
  }

  goToCast(){
    if(!document.getElementById("cast").classList.contains("active")){
      document.getElementById("cast").classList.add("active");
    }
    if(document.getElementById("reviews").classList.contains("active")){
       document.getElementById("reviews").classList.remove("active");
    }
    if(document.getElementById("overview").classList.contains("active")){
      document.getElementById("overview").classList.remove("active");
    }
    if(document.getElementById("media").classList.contains("active")){
      document.getElementById("media").classList.remove("active");
    }
    if(!document.getElementById("castLink").classList.contains("active")){
      document.getElementById("castLink").classList.add("active");
    }
    if(document.getElementById("reviewsLink").classList.contains("active")){
       document.getElementById("reviewsLink").classList.remove("active");
    }
    if(document.getElementById("overviewLink").classList.contains("active")){
      document.getElementById("overviewLink").classList.remove("active");
    }
    if(document.getElementById("mediaLink").classList.contains("active")){
      document.getElementById("mediaLink").classList.remove("active");
    }
  }

  goToMedia(){
    if(!document.getElementById("media").classList.contains("active")){
      document.getElementById("media").classList.add("active");
    }
    if(document.getElementById("reviews").classList.contains("active")){
       document.getElementById("reviews").classList.remove("active");
    }
    if(document.getElementById("cast").classList.contains("active")){
      document.getElementById("cast").classList.remove("active");
    }
    if(document.getElementById("overview").classList.contains("active")){
      document.getElementById("overview").classList.remove("active");
    }
    if(!document.getElementById("mediaLink").classList.contains("active")){
      document.getElementById("mediaLink").classList.add("active");
    }
    if(document.getElementById("reviewsLink").classList.contains("active")){
       document.getElementById("reviewsLink").classList.remove("active");
    }
    if(document.getElementById("castLink").classList.contains("active")){
      document.getElementById("castLink").classList.remove("active");
    }
    if(document.getElementById("overviewLink").classList.contains("active")){
      document.getElementById("overviewLink").classList.remove("active");
    }
  }
  
}