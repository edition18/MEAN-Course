import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, ParamMap } from '@angular/router';
import { Post } from '../post.model';
import { PostsService } from '../posts.service';
import { mimeType } from './mime-type.validator';


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
  post: Post;
  isLoading = false;
  form: FormGroup;
  imagePreview: string;

  constructor(public postsService: PostsService, public route: ActivatedRoute) {}

  ngOnInit() {
    this.form = new FormGroup({
      title: new FormControl(null, {validators: [Validators.required, Validators.minLength(3)]}),
      content: new FormControl(null, {validators: [Validators.required]}),
      image: new FormControl(null, {
        validators: [Validators.required],
        asyncValidators: [mimeType]
      })
    });
    this.route.paramMap.subscribe((paramMap: ParamMap) => {
      if (paramMap.has('postId')) { //check if postId exists, the identifier we made in routing file
        this.mode = 'edit';
        this.postId = paramMap.get('postId');
        this.isLoading = true;
        this.postsService.getPost(this.postId).subscribe(postData => {
            this.isLoading = false;
            this.post = {
              id: postData._id,
              title: postData.title,
              content: postData.content
            };
              this.form.setValue({
                title: this.post.title,
                content: this.post.content
              });
            });
      } else {
        this.mode = 'create';
        this.postId = null;
      }
    });
    //paramMap is an observable, we never need to unsub as it is a built in observable
    //this allows us to only re-render certain parts relevant
  }


  onImagePicked(event: Event) { // takes in a event param
    const file = (event.target as HTMLInputElement).files[0]
    this.form.patchValue({image: file}); // change the value of a single formControl
    this.form.get("image").updateValueAndValidity();
    //updates angular that we've changed value
    //angular needs to store that value internally and validate if what I did valid
    const reader = new FileReader();
    reader.onload = () => { //this is ASYNC
      this.imagePreview = reader.result as string
    };
    reader.readAsDataURL(file);
  }

  onSavePost () {
    if (this.form.invalid) {
      return;
    }
    this.isLoading = true;
    if (this.mode === 'create') {
      this.postsService.addPost(this.form.value.title, this.form.value.content, this.form.value.image);
    } else {
      this.postsService.updatePost(this.postId,this.form.value.title, this.form.value.content)
    }
    this.form.reset();
  }
}
