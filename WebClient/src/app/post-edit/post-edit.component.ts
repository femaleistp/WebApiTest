import { Component, OnInit } from '@angular/core';
import { DataService, Post } from '../data.service';
import { ActivatedRoute, Router } from '@angular/router';
import { switchMap } from 'rxjs';

@Component({
  selector: 'app-post-edit',
  standalone: false,
  templateUrl: './post-edit.component.html',
  styleUrl: './post-edit.component.css'
})
export class PostEditComponent implements OnInit{
  id: number = 0;
  post: Post = {
      contentId: 0,
      title: 'Taco',
      body: '',
      createdAt: new Date(),
      updatedAt: new Date(),
      visibility: 0,
      categoryId: 0,
      category: {
        categoryId: 0,
        categoryName: '',
        postedContent: []
    }
  }
  isLoaded: boolean = false;

  constructor(private data: DataService
    , private route: ActivatedRoute
    , private router: Router) {

  }

  ngOnInit(): void {
    // get our id
    
    this.route.paramMap.pipe(
      switchMap(params => {
        this.id = Number(params.get("id"));
        return this.data.getPostById(this.id);
      })
    ).subscribe(result => {
      console.log(result);
      this.isLoaded = true;
        this.post = result;
    })
  }
}
