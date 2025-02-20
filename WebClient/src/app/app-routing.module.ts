import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { PostListComponent } from './post-list/PostListComponent';
import { PostDetailComponent } from './post-detail/post-detail.component';

const routes: Routes = [
  { path: "", component: HomeComponent },
  { path: "post", component: PostListComponent },
  { path: "post/:slug", component: PostDetailComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
