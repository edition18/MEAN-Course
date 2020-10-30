import { Component, Input, OnDestroy, OnInit } from '@angular/core';
import { Post } from '../post.model';
import { PostsService } from '../posts.service';
import { Subscription } from 'rxjs';
import { PageEvent } from '@angular/material/paginator';

@Component({
  selector: 'app-post-list',
  templateUrl: './post-list.component.html',
  styleUrls: ['./post-list.component.css']
})

export class PostListComponent implements OnInit, OnDestroy {
  isLoading = false;
  totalPosts = 0;
  postsPerPage = 5;
  currentPage = 1;
  pageSizeOptions = [1,2,5,10];

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
    this.postsService.getPosts(this.postsPerPage,this.currentPage); //trigger getPosts whenever post-list component is loaded
    //populate the post property with the postsService running the getPosts function
    this.postsSub = this.postsService.getPostUpdateListener().subscribe((postData: {posts: Post[], postCount: number}) => {
      this.isLoading = false;
      //subscribe allows us to listen for the subject
      //subsribe has 3 args: what to receive, what to do on error, what happens when the thread ends
      //in this case we only have 1 arg
      this.posts = postData.posts;
      this.totalPosts = postData.postCount;
    });
  }

  onChangedPage(pageData: PageEvent){
    this.isLoading = true;
    //PageEvent is a object that holds data about a page
    this.currentPage = pageData.pageIndex + 1;
    this.postsPerPage = pageData.pageSize;
    this.postsService.getPosts(this.postsPerPage,this.currentPage );
  }

  onDelete(postId: string){
    this.isLoading = true;
    this.postsService.deletePost(postId).subscribe(() => {
      this.postsService.getPosts(this.postsPerPage,this.currentPage);
    });
  }


  ngOnDestroy(){
    this.postsSub.unsubscribe();
  }
}
