import { NgModule } from '@angular/core';
import { Routes, RouterModule, ExtraOptions } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { ProfileComponent } from './profile/profile.component';
import { MoviesComponent } from './movies/movies.component';
import { BlogListComponent } from './blog-list/blog-list.component';
import { CelebrityListComponent } from './celebrity-list/celebrity-list.component';
import { BlogSingleComponent } from './blog-single/blog-single.component';
import { CelebritySingleComponent } from './celebrity-single/celebrity-single.component';
import { RedirectBlogsingleComponent } from './redirect-blogsingle/redirect-blogsingle.component';
import { MovieSingleComponent } from './movie-single/movie-single.component';
import { RedirectMoviereviewComponent } from './redirect-moviereview/redirect-moviereview.component';
import { RedirectProfileComponent } from './redirect-profile/redirect-profile.component';

const routes: Routes = [
  {path:'', component: HomeComponent},
  {path:'profile', component: ProfileComponent},
  {path:'movies', component: MoviesComponent},
  {path:'blogs', component: BlogListComponent},
  {path:'celebs', component: CelebrityListComponent},
  {path:'blog/:id', component: BlogSingleComponent},
  {path:'celeb/:id/:tab', component: CelebritySingleComponent},
  {path:'redirectblog/:id', component: RedirectBlogsingleComponent},
  {path:'movie/:id/:tab', component: MovieSingleComponent},
  {path:'redirectmovie/:id', component: RedirectMoviereviewComponent},
  {path:'redirectprofile', component: RedirectProfileComponent}
];

const routerOptions: ExtraOptions = {
  useHash: false,
  anchorScrolling: 'enabled',
  // ...any other options you'd like to use
};

@NgModule({
  imports: [RouterModule.forRoot(routes, routerOptions)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
