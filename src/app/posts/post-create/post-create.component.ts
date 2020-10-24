import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { ActivatedRoute, ParamMap } from '@angular/router';
import { Post } from '../post.model';
import { PostsService } from '../posts.service';


@Component({
  selector: 'app-post-create', // the html tag
  templateUrl: './post-create.component.html', //the template
  styleUrls: ['./post-create.component.css']
})
export class PostCreateComponent implements OnInit {

  enteredContent = '';
  enteredTitle = '';
  private mode = 'create';
  private postId: string;
  private post: Post;

  constructor(public postsService: PostsService, public route: ActivatedRoute) {}

  ngOnInit() {
    this.route.paramMap.subscribe((paramMap: ParamMap) => {
      if (paramMap.has('postId')) { //check if postId exists, the identifier we made in routing file
        this.mode = 'edit';
        this.postId = paramMap.get('postId');
        this.post = this.postsService.getPost(this.postId);
      } else {
        this.mode = 'create';
        this.postId = null;
      }



    });
    //paramMap is an observable, we never need to unsub as it is a built in observable
    //this allows us to only re-render certain parts relevant
  }


  onAddPost (form: NgForm) {
    if (form.invalid) {
      return;
    }

    this.postsService.addPost(form.value.title, form.value.content);
    form.reset();
  }
}
