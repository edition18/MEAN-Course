import { Component } from '@angular/core';
import { NgForm } from '@angular/forms';
import { AuthService } from '../auth.service';

@Component({
  templateUrl: "./login.component.html",
  styleUrls: ["./login.component.css"]
  //since this will be loaded via routing
  //we need not add a selector: to it
  // like our previous components
})


export class LogInComponent {
  isLoading: false;

  constructor(public authService: AuthService) {}

  onLogin(form: NgForm) {
    if (form.invalid) {
      return;
    }
    this.authService.login(form.value.email, form.value.password);
  }
}
