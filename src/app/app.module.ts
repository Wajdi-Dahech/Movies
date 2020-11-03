import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule } from '@angular/forms';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HomeComponent } from './home/home.component';
import { ProfileComponent } from './profile/profile.component';
import { LoginSignupService } from './login-signup.service';
import { MoviesComponent } from './movies/movies.component';
import { MovieService } from './movie.service';
import { ArrayToStringPipe } from './array-to-string.pipe';
import { CelebrityListComponent } from './celebrity-list/celebrity-list.component';
import { CelebritySingleComponent } from './celebrity-single/celebrity-single.component';
import { BlogListComponent } from './blog-list/blog-list.component';
import { BlogSingleComponent } from './blog-single/blog-single.component';
import { CelebService } from './celeb.service';
import { RedirectBlogsingleComponent } from './redirect-blogsingle/redirect-blogsingle.component';
import { MovieSingleComponent } from './movie-single/movie-single.component';
import { RedirectMoviereviewComponent } from './redirect-moviereview/redirect-moviereview.component';
import { RedirectProfileComponent } from './redirect-profile/redirect-profile.component';

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    ProfileComponent,
    MoviesComponent,
    ArrayToStringPipe,
    CelebrityListComponent,
    CelebritySingleComponent,
    BlogListComponent,
    BlogSingleComponent,
    RedirectBlogsingleComponent,
    MovieSingleComponent,
    RedirectMoviereviewComponent,
    RedirectProfileComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule
  ],
  providers: [LoginSignupService, MovieService, CelebService],
  bootstrap: [AppComponent]
})
export class AppModule { }
