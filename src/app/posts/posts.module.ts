import { CommonModule } from '@angular/common';
import { NgModule } from "@angular/core";
import { ReactiveFormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { AngularMaterialModule } from '../angular.module';
import { PostCreateComponent } from './post-create/post-create.component';
import { PostListComponent } from './post-list/post-list.component';

@NgModule({
  declarations: [
  PostCreateComponent,
  PostListComponent,
  ],
  imports: [
    ReactiveFormsModule, // we only use this in posts module
    AngularMaterialModule,
    // we need to impor tthis as the posts module is dependent on angular material module
    // at compile time it is unable to use it unless we do this
    CommonModule, //similiar to aboveadds common features like ngIf
    RouterModule
  ]
})

export class PostsModule {}
