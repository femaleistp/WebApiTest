import { Component, OnInit } from '@angular/core';
import { DataService, Post } from '../data.service';
import { ActivatedRoute, Router } from '@angular/router';
import { switchMap } from 'rxjs';
import { FormBuilder, FormGroup } from '@angular/forms';

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

  postForm: FormGroup = new FormGroup({});

  constructor(private data: DataService
    , private route: ActivatedRoute
    , private router: Router
    , private fb: FormBuilder
  ) {
    this.initForm();
  }
  // 3/4/25 this works as a new form, tomorrow work on existing data tomorrow
  // 3/4/25 how do we make it so we can select individual categories
  initForm() {
    this.postForm = this.fb.group({
      contentId: [0],
      title: ['Taco'],
      body: ['lorem ipsum'],
      createdAt: [new Date()],
      updatedAt: [new Date()],
      visibility: [0],
      categoryId: [0],
      category: this.fb.group({
        categoryId: [0],
        categoryName: [''],
        postedContent: this.fb.array([])
      })
    })
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

  onSave() {
    // take the formgroup, read values, and then submit them to the data service.
    console.log(this.postForm.value);
    let savedPost: Post = {
        contentId: this.postForm.value.contentId,
        title: this.postForm.value.title,
        body: this.postForm.value.body,
        createdAt: this.postForm.value.createdAt,
        updatedAt: this.postForm.value.updatedAt,
        visibility: Number(this.postForm.value.visibility),
        categoryId: this.postForm.value.categoryId,
        category: this.postForm.value.category
    }
    this.data.createPost(savedPost).subscribe(result => {
      // success adding a new post
      console.log("Added new post", result);
    });

  }

  onClear() {
    // reset the form group
  }
}
