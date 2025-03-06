import { Component, OnInit } from '@angular/core';
import { DataService, Post } from '../data.service';
import { ActivatedRoute, Router } from '@angular/router';
import { BehaviorSubject, mergeMap, tap } from 'rxjs';

@Component({
  selector: 'app-post-detail',
  standalone: false,
  templateUrl: './post-detail.component.html',
  styleUrl: './post-detail.component.css'
})
export class PostDetailComponent implements OnInit {
  id: number = 0;
  post: BehaviorSubject<Post | undefined> = new BehaviorSubject<Post | undefined>(undefined);;

  isLoaded: boolean = false;

  constructor(private data: DataService
    , private route: ActivatedRoute
    , private router: Router) {

    this.id = 0;
    this.post = this.data.selectedPost$;
  }

  ngOnInit(): void {
    this.route.paramMap.subscribe(params => {
      this.id = Number(params.get("id"));
      this.isLoaded = true;
      this.data.getPostById(this.id);
    });
  }
}
