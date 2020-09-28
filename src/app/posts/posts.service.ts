import { Injectable } from '@angular/core';
import { Post } from './post.model';



@Injectable({providedIn: 'root'})
export class PostsService {
  private posts: Post[] = [];

  getPosts() {
    return [...this.posts];
    // ... copies the this.posts and creates
    // new array
    // the old object stays unaltered
    // immutablility
  }

  addPost(title: string, content: string) {
    const post: Post = { title: title, content: content};
    this.posts.push(post)
  }
}
