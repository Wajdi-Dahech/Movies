import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-redirect-blogsingle',
  templateUrl: './redirect-blogsingle.component.html',
  styleUrls: ['./redirect-blogsingle.component.css']
})
export class RedirectBlogsingleComponent implements OnInit {
  blogId;
  constructor(private router: Router, private route: ActivatedRoute) { }

  ngOnInit(): void {
    this.blogId = this.route.snapshot.paramMap.get('id');
    this.router.navigate(['blog/'+this.blogId]);
  }

}
