import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { PostDetailComponent } from './post-detail/post-detail.component';
import { PostListComponent } from './post-list/post-list.component';
import { PostEditComponent } from './post-edit/post-edit.component';

const routes: Routes = [
  { path: "", component: HomeComponent },
  { path: "post", component: PostListComponent },
  { path: "post/:id", component: PostDetailComponent },
  { path: "post/:id/edit", component: PostEditComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
