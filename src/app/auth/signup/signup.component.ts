import { Component } from '@angular/core';
import { NgForm } from '@angular/forms';

@Component({
  templateUrl: "./signup.component.html",
  styleUrls: ["./signup.component.css"]
  //since this will be loaded via routing
  //we need not add a selector: to it
  // like our previous components
})


export class SignupComponent {
  isLoading: false;


  onSignup(form: NgForm) {
    console.log(form.value);
    //shows all properties of forms
    //being email AND password
  }
}
