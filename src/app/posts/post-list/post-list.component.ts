import { Component, Input, OnDestroy, OnInit } from '@angular/core';
import { Post } from '../post.model';
import { PostsService } from '../posts.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-post-list',
  templateUrl: './post-list.component.html',
  styleUrls: ['./post-list.component.css']
})

export class PostListComponent implements OnInit, OnDestroy {
  isLoading = false;

  posts: Post[] = [
    // { title: "1st post", content: "xxx "},
    // { title: "1nd post", content: "yyy "},
    // { title: "3rd post", content: "zzz "}

  ];
  private postsSub: Subscription;

  constructor(public postsService: PostsService) {

  }

  ngOnInit () {
    this.isLoading = true;
    this.postsService.getPosts(); //trigger getPosts whenever post-list component is loaded
    //populate the post property with the postsService running the getPosts function
    this.postsSub = this.postsService.getPostUpdateListener().subscribe((posts: Post[]) => {
      this.isLoading = false;
      //subscribe allows us to listen for the subject
      //subsribe has 3 args: what to receive, what to do on error, what happens when the thread ends
      //in this case we only have 1 arg
      this.posts = posts;
    });
  }

  onDelete(postId: string){
    this.postsService.deletePost(postId);
  }


  ngOnDestroy(){
    this.postsSub.unsubscribe();
  }
}
