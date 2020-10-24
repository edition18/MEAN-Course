import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";
import { PostCreateComponent } from './posts/post-create/post-create.component';
import { PostListComponent } from './posts/post-list/post-list.component';

//routes are JS objects that we defined what routes/urls should be presented at one time

const routes: Routes = [
  {path: "", component: PostListComponent}, //default
  {path: "create", component: PostCreateComponent}


];

// this will allow us to export this router config
// to app.module.ts
@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})


export class AppRoutingModule {}
