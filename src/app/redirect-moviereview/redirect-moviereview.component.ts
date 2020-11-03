import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-redirect-moviereview',
  templateUrl: './redirect-moviereview.component.html',
  styleUrls: ['./redirect-moviereview.component.css']
})
export class RedirectMoviereviewComponent implements OnInit {
  movieId = ''
  constructor(private router: Router, private route: ActivatedRoute) { }

  ngOnInit(): void {
    this.movieId = this.route.snapshot.paramMap.get('id');
    this.router.navigate(['movie/'+this.movieId+'/reviews']);
  }

}
