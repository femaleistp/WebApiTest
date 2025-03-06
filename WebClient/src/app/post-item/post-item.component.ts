import { Component, EventEmitter, Input, Output } from '@angular/core';
import { DataService, Post } from '../data.service';

// this is a dumb component

@Component({
  selector: 'app-post-item',
  standalone: false,
  templateUrl: './post-item.component.html',
  styleUrl: './post-item.component.css'
})
export class PostItemComponent {
  @Input() post!: Post;

  constructor(private data: DataService) { }

  onDelete() {
    this.data.deletePostById(this.post.contentId);
  }
}
