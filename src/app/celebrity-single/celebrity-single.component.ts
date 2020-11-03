import { Component, OnInit } from '@angular/core';
import { CelebService } from '../celeb.service';
import { ActivatedRoute, Router } from '@angular/router';
import { LoginSignupService } from '../login-signup.service';

@Component({
  selector: 'app-celebrity-single',
  templateUrl: './celebrity-single.component.html',
})
export class CelebritySingleComponent implements OnInit {
  currentTab = 'overviewceb';
  userId = '';
  celeb={_id:'', name:'', age:'', biography:'', country:'', description:'', dob:'', height:'', images:[], keywords:[], mainimage:'', profession:'', videos:[], films:[]};
  celebId = '';
  constructor(private route: ActivatedRoute, private celebservice:CelebService, private loginsignupservice: LoginSignupService, private router:Router) { }

  ngOnInit() {
    this.userId = this.loginsignupservice.getUserId();
    if(this.userId == ""){
      alert("Please Login to continue..");
      this.router.navigate(['/']);
    }
    this.currentTab = this.route.snapshot.paramMap.get("tab");
    this.celebId = this.route.snapshot.paramMap.get("id");
    this.celebservice.sendoneceleb(this.celebId).subscribe((data: any[])=>{
      console.log(data);
      this.celeb = data[0];
    });
    if(this.currentTab=="mediaceb"){
      this.goToMedia();
    }
    else if(this.currentTab=="filmography"){
      this.goToFilmography();
    }
    else if(this.currentTab=="biography"){
      this.goToBiography();
    }
    else{
      this.goToOverview();
    } 
  }

  goToOverview(){
    if(!document.getElementById("overviewceb").classList.contains("active")){
      document.getElementById("overviewceb").classList.add("active");
    }
    if(document.getElementById("biography").classList.contains("active")){
       document.getElementById("biography").classList.remove("active");
    }
    if(document.getElementById("filmography").classList.contains("active")){
      document.getElementById("filmography").classList.remove("active");
    }
    if(document.getElementById("mediaceb").classList.contains("active")){
      document.getElementById("mediaceb").classList.remove("active");
    }
    if(!document.getElementById("overviewLink").classList.contains("active")){
      document.getElementById("overviewLink").classList.add("active");
    }
    if(document.getElementById("biographyLink").classList.contains("active")){
       document.getElementById("biographyLink").classList.remove("active");
    }
    if(document.getElementById("filmographyLink").classList.contains("active")){
      document.getElementById("filmographyLink").classList.remove("active");
    }
    if(document.getElementById("mediaLink").classList.contains("active")){
      document.getElementById("mediaLink").classList.remove("active");
    }
  }

  goToBiography(){
    if(!document.getElementById("biography").classList.contains("active")){
      document.getElementById("biography").classList.add("active");
    }
    if(document.getElementById("overviewceb").classList.contains("active")){
       document.getElementById("overviewceb").classList.remove("active");
    }
    if(document.getElementById("filmography").classList.contains("active")){
      document.getElementById("filmography").classList.remove("active");
    }
    if(document.getElementById("mediaceb").classList.contains("active")){
      document.getElementById("mediaceb").classList.remove("active");
    }
    if(!document.getElementById("biographyLink").classList.contains("active")){
      document.getElementById("biographyLink").classList.add("active");
    }
    if(document.getElementById("overviewLink").classList.contains("active")){
       document.getElementById("overviewLink").classList.remove("active");
    }
    if(document.getElementById("filmographyLink").classList.contains("active")){
      document.getElementById("filmographyLink").classList.remove("active");
    }
    if(document.getElementById("mediaLink").classList.contains("active")){
      document.getElementById("mediaLink").classList.remove("active");
    }
  }

  goToFilmography(){
    if(!document.getElementById("filmography").classList.contains("active")){
      document.getElementById("filmography").classList.add("active");
    }
    if(document.getElementById("biography").classList.contains("active")){
       document.getElementById("biography").classList.remove("active");
    }
    if(document.getElementById("overviewceb").classList.contains("active")){
      document.getElementById("overviewceb").classList.remove("active");
    }
    if(document.getElementById("mediaceb").classList.contains("active")){
      document.getElementById("mediaceb").classList.remove("active");
    }
    if(!document.getElementById("filmographyLink").classList.contains("active")){
      document.getElementById("filmographyLink").classList.add("active");
    }
    if(document.getElementById("biographyLink").classList.contains("active")){
       document.getElementById("biographyLink").classList.remove("active");
    }
    if(document.getElementById("overviewLink").classList.contains("active")){
      document.getElementById("overviewLink").classList.remove("active");
    }
    if(document.getElementById("mediaLink").classList.contains("active")){
      document.getElementById("mediaLink").classList.remove("active");
    }
  }

  goToMedia(){
    if(!document.getElementById("mediaceb").classList.contains("active")){
      document.getElementById("mediaceb").classList.add("active");
    }
    if(document.getElementById("biography").classList.contains("active")){
       document.getElementById("biography").classList.remove("active");
    }
    if(document.getElementById("filmography").classList.contains("active")){
      document.getElementById("filmography").classList.remove("active");
    }
    if(document.getElementById("overviewceb").classList.contains("active")){
      document.getElementById("overviewceb").classList.remove("active");
    }
    if(!document.getElementById("mediaLink").classList.contains("active")){
      document.getElementById("mediaLink").classList.add("active");
    }
    if(document.getElementById("biographyLink").classList.contains("active")){
       document.getElementById("biographyLink").classList.remove("active");
    }
    if(document.getElementById("filmographyLink").classList.contains("active")){
      document.getElementById("filmographyLink").classList.remove("active");
    }
    if(document.getElementById("overviewLink").classList.contains("active")){
      document.getElementById("overviewLink").classList.remove("active");
    }
  }

}
