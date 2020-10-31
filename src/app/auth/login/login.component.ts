import { Component } from '@angular/core';
import { NgForm } from '@angular/forms';

@Component({
  templateUrl: "./login.component.html",
  styleUrls: ["./login.component.css"]
  //since this will be loaded via routing
  //we need not add a selector: to it
  // like our previous components
})


export class LogInComponent {
  isLoading: false;


  onLogin(form: NgForm) {
    console.log(form.value);
    //shows all properties of forms
    //being email AND password
  }
}
