import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";
import { AuthGuard } from './auth/auth.guard';
import { LogInComponent } from './auth/login/login.component';
import { SignupComponent } from './auth/signup/signup.component';
import { PostCreateComponent } from './posts/post-create/post-create.component';
import { PostListComponent } from './posts/post-list/post-list.component';

//routes are JS objects that we defined what routes/urls should be presented at one time

const routes: Routes = [
  {path: "", component: PostListComponent}, //default
  {path: "create", component: PostCreateComponent, canActivate: [AuthGuard]},
  {path: "edit/:postId", component: PostCreateComponent, canActivate: [AuthGuard]},
  {path: "auth", loadChildren: "./auth/auth.module#AuthModule"},
];

// this will allow us to export this router config
// to app.module.ts
@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
  providers: [AuthGuard]
})


export class AppRoutingModule {}
