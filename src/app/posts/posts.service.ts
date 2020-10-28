import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Post } from './post.model';
import { Subject } from 'rxjs';
import { map } from 'rxjs/operators';
import { Router } from '@angular/router';


@Injectable({providedIn: 'root'})
export class PostsService {
  private posts: Post[] = [];
  private postsUpdated = new Subject<Post[]>();
  // Post[] being passed inside as a payload

  constructor(private http: HttpClient, private router: Router) {}

  getPosts() {
    // you have named the HttpClient object as http as a privatge property here
    this.http.get<{message: string, posts: any }>(
        "http://localhost:3000/api/posts"
      )
      .pipe(map((postData) => {
        return postData.posts.map(post => {
          return {
            title: post.title,
            content: post.content,
            id: post._id
          };
        });
      }))
      .subscribe((transformedPosts) => {
      this.posts = transformedPosts;
      this.postsUpdated.next([...this.posts]); // pushes a COPY of this posts to subject so its not edited
    });
  }


  getPostUpdateListener() {
    return this.postsUpdated.asObservable();
  } // so that we can listen to the private postUpdated

  getPost(id: string) {
    return this.http.get<{_id: string, title: string, content: string }>("http://localhost:3000/api/posts/" + id);
    // this is now a observable
  }

  addPost(title: string, content: string, image: File) {
    const postData = new FormData(); // allows us to combine text values and files
    postData.append("title", title);
    postData.append("content", content);
    postData.append("image", image, title);
    this.http.post<{ message: string, postId: string }>("http://localhost:3000/api/posts", postData).subscribe(responseData => {

      const post: Post = { id: responseData.postId, title: title , content: content }
      const id = responseData.postId;
      post.id = id; //access the object property id, and rewrite to id
      console.log(responseData.message);
      this.posts.push(post);
      this.postsUpdated.next([...this.posts]);
      this.router.navigate(["/"]);
    });


  }

  updatePost(id:string, title: string, content: string){
    const post: Post = {id: id, title: title, content: content}
    this.http.put("http://localhost:3000/api/posts/" + id, post)
      .subscribe(response => {
        const updatedPosts = [...this.posts];
        const oldPostIndex = updatedPosts.findIndex(p => p.id == post.id);
        updatedPosts[oldPostIndex] = post;
        this.posts = updatedPosts;
        this.postsUpdated.next([...this.posts]);
        this.router.navigate(["/"]);
      });
  }

  deletePost(postId: string) {
    this.http.delete("http://localhost:3000/api/posts/" + postId)
      .subscribe(() => {
        const updatedPost = this.posts.filter(post => post.id !== postId);
        this.posts = updatedPost;
        this.postsUpdated.next([...this.posts]);
      });
  }

}

