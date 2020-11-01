import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Post } from './post.model';
import { Subject } from 'rxjs';
import { map } from 'rxjs/operators';
import { Router } from '@angular/router';


@Injectable({providedIn: 'root'})
export class PostsService {
  private posts: Post[] = [];
  private postsUpdated = new Subject<{posts: Post[], postCount: number}>();

  constructor(private http: HttpClient, private router: Router) {}

  getPosts(postsPerPage: number, currentPage: number) {
    const queryParams = `?pagesize=${postsPerPage}&page=${currentPage}`;
    // you have named the HttpClient object as http as a privatge property here
    this.http.get<{message: string, posts: any, maxPosts: number }>(
        "http://localhost:3000/api/posts" + queryParams
      )
      .pipe(
        map(postData => {
          return {
            posts: postData.posts.map(post => {
              return {
                title: post.title,
                content: post.content,
                id: post._id,
                imagePath: post.imagePath,
                creator: post.creator
              };
            }), maxPosts: postData.maxPosts};
      }))
      .subscribe((transformedPostData) => {
      this.posts = transformedPostData.posts;
      this.postsUpdated.next({
        posts: [...this.posts],
        postCount: transformedPostData.maxPosts
      }); // pushes a COPY of this posts to subject so its not edited
    });
  }


  getPostUpdateListener() {
    return this.postsUpdated.asObservable();
  } // so that we can listen to the private postUpdated

  getPost(id: string) {
    return this.http.get<{_id: string, title: string, content: string, imagePath: string, creator: string}>("http://localhost:3000/api/posts/" + id);
    // this is now a observable
  }

  addPost(title: string, content: string, image: File) {
    const postData = new FormData(); // allows us to combine text values and files
    postData.append("title", title);
    postData.append("content", content);
    postData.append("image", image, title);
    this.http.post<{ message: string, post: Post }>("http://localhost:3000/api/posts", postData).subscribe(responseData => {
      this.router.navigate(["/"]);
    });
  }

  updatePost(id:string, title: string, content: string, image: File | string){
    let postData: Post | FormData;
    if (typeof(image) === "object"){
      postData = new FormData();
      postData.append("id", id);
      postData.append("title", title);
      postData.append("content", content);
      postData.append("image", image, title);
    }  else {
        postData = {
        id: id,
        title: title,
        content: content,
        imagePath: image,
        creator: null
        // as null as I want to handle on serverside
        //prevent user from manipulating
      };
    }
    this.http.put("http://localhost:3000/api/posts/" + id, postData)
      .subscribe(response => {
        this.router.navigate(["/"]);
      });
  }

  deletePost(postId: string) {
    return this.http.delete("http://localhost:3000/api/posts/" + postId);
  }

}

