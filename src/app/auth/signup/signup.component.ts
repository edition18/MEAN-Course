import { Component } from '@angular/core';
import { NgForm } from '@angular/forms';
import { AuthService } from '../auth.service';

@Component({
  templateUrl: "./signup.component.html",
  styleUrls: ["./signup.component.css"]
  //since this will be loaded via routing
  //we need not add a selector: to it
  // like our previous components
})


export class SignupComponent {
  isLoading: false;
  constructor(public authService: AuthService) {}

  onSignup(form: NgForm) {
    if (form.invalid) {
      return;
    }
    this.authService.createUser(form.value.email, form.value.password);
  }
}
