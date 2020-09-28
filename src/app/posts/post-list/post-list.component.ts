import { Component, Input } from '@angular/core';
import { Post } from '../post.model';
import { PostsService } from '../posts.service';

@Component({
  selector: 'app-post-list',
  templateUrl: './post-list.component.html',
  styleUrls: ['./post-list.component.css']
})

export class PostListComponent {
  @Input() posts: Post[] = [
    // { title: "1st post", content: "xxx "},
    // { title: "1nd post", content: "yyy "},
    // { title: "3rd post", content: "zzz "}

  ];

  constructor(public postsService: PostsService) {

  }

}
