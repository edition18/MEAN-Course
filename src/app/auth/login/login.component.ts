import { Component } from '@angular/core';

@Component({
  templateUrl: "./login.component.html",
  styleUrls: ["./login.component.css"]
  //since this will be loaded via routing
  //we need not add a selector: to it
  // like our previous components
})


export class LogInComponent {
  isLoading: false;
}
