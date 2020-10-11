import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Post } from './post.model';
import { Subject } from 'rxjs';


@Injectable({providedIn: 'root'})
export class PostsService {
  private posts: Post[] = [];
  private postsUpdated = new Subject<Post[]>();
  // Post[] being passed inside as a payload

  constructor(private http: HttpClient) {}

  getPosts() {
    // you have named the HttpClient object as http as a privatge property here
    this.http.get<{message: string, posts: Post[]}>("http://localhost:3000/api/posts").subscribe((postsData) => {
      // the get has been formatted to know what formate the data will have
      //postsData in this case refers to get GET json that we subscribed to
      // so it has 2 properties, posts (array of posts) and message (for successful JSON process)
      // the GET method already changes the JSON file to javascript formate for us
      this.posts = postsData.posts;
      this.postsUpdated.next([...this.posts]); // pushes a COPY of this posts to subject so its not edited
    });
  }


  getPostUpdateListener() {
    return this.postsUpdated.asObservable();
  } // so that we can listen to the private postUpdated

  addPost(title: string, content: string) {
    const post: Post = { id: null, title: title, content: content};
    this.posts.push(post);
    this.postsUpdated.next([...this.posts]); //pushs the Subject (copy of the post after its updated).. rather than emit
  }
}
