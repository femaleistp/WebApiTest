import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, delay, map, Observable, tap } from 'rxjs';

export interface Post {
  contentId: number;
  title: string;
  body: string;
  createdAt: Date;
  updatedAt: Date;
  visibility: number;
  categoryId: number;
  category: Category;
}

export interface Category {
  categoryId: number;
  categoryName: string;
  postedContent: Post[];
}

@Injectable({
  providedIn: 'root'
})
export class DataService {

  posts$: BehaviorSubject<Post[]> = new BehaviorSubject<Post[]>([]);

  selectedPost$: BehaviorSubject<Post | undefined> = new BehaviorSubject<Post | undefined>(undefined);

  constructor(private _http: HttpClient) {
  }

  selectPost(id: number): void {
    // find the post by id
    // check if post exists
    // if exists trigger selectedPost$.nex(the post)
    // else trigger selectedPost$.next(undefined)
  } 

  getAllPosts(): void {
    this._http.get<Post[]>('/api/contents').pipe(
      tap(x => {
        console.log('Fired getAllPosts with the following object');
      }),
      delay(5000)
    ).subscribe(data => {
      this.posts$.next(data)
    })
  }

  //getAllPosts(): Observable<Post[]> {
  //  return this._http.get<Post[]>('/api/contents').pipe(
  //    map(arr => {
  //      return arr.map(e => {
  //        e.title = e.title + "Toast!";
  //        return e;
  //      })
  //    })
  //  );
  //}

  // 3/6/25: make page display doesn't exist when undefined.  ex https://localhost:64041/post/999:
  getPostById(id: number): void {
    this._http.get<Post>('/api/contents/' + id).pipe(
      tap(x => {
        console.log('Fired getPostById with the following object', x);
      }),
      delay(5000)
    ).subscribe((data: Post) => { // next
      this.selectedPost$.next(undefined);
    }, (err) => {
      console.log("getPostById returned an error", err);
    }, () => {
      console.log("getPostById Complete")
    });
  }


  createPost(post: Post): void {
    this._http.post<Post>('/api/contents', post).subscribe(data => {
      this.getAllPosts()
    });
  }

  updatePost(id: number, post: Post): void {
    this._http.put<Post>('/api/contents/' + id, post).subscribe(data => {
      this.getAllPosts();
    });
  }

  deletePostById(id: number): void {
    this._http.delete<any>('/api/contents/' + id).pipe(
      tap(x => {
        console.log("deleting post by id");
      })
    ).subscribe(result => {
      this.getAllPosts();
    });
  }

  deletePost(post: Post): void {
    this.deletePostById(post.contentId);
  }
}
