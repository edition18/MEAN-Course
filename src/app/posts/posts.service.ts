import { Injectable } from '@angular/core';
import { Post } from './post.model';
import { Subject } from 'rxjs';


@Injectable({providedIn: 'root'})
export class PostsService {
  private posts: Post[] = [];
  private postsUpdated = new Subject<Post[]>();
  // Post[] being passed inside as a payload

  getPosts() {
    return [...this.posts];
    // ... copies the this.posts and creates
    // new array
    // the old object stays unaltered
    // immutablility
  }

  getPostUpdateListener() {
    return this.postsUpdated.asObservable();
  } // so that we can listen to the private postUpdated

  addPost(title: string, content: string) {
    const post: Post = { title: title, content: content};
    this.posts.push(post);
    this.postsUpdated.next([...this.posts]); //pushs the Subject (copy of the post after its updated).. rather than emit
  }
}
