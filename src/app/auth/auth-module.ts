import { CommonModule } from '@angular/common';
import {NgModule} from "@angular/core";
import { AngularMaterialModule } from '../angular.module';
import { LogInComponent } from './login/login.component';
import { SignupComponent } from './signup/signup.component';
import { FormsModule } from '@angular/forms';
import { AuthRoutingModule } from './auth-routing';

@NgModule({
  declarations: [
    LogInComponent,
    SignupComponent
  ],
  imports: [
    AngularMaterialModule,
    CommonModule,
    FormsModule,
    AuthRoutingModule
  ]
})


export class AuthModule{}
