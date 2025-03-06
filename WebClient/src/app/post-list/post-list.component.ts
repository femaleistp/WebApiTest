import { Component } from "@angular/core";
import { DataService, Post } from "../data.service";
import { BehaviorSubject } from "rxjs";


@Component({
  selector: 'app-post-list',
  standalone: false,
  templateUrl: './post-list.component.html',
  styleUrl: './post-list.component.css'
})
export class PostListComponent {
  posts: BehaviorSubject<Post[]> = new BehaviorSubject<Post[]>([]);;

  constructor(private data: DataService) {
    this.data.getAllPosts();
    this.posts = this.data.posts$;
  }
}
