import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-redirect-profile',
  templateUrl: './redirect-profile.component.html',
  styleUrls: ['./redirect-profile.component.css']
})
export class RedirectProfileComponent implements OnInit {

  constructor(private router: Router) { }

  ngOnInit(): void {
    this.router.navigate(['profile']);
  }

}
