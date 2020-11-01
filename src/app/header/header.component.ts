import { Component, OnInit } from "@angular/core"
import { Subscription } from 'rxjs';
import { AuthService } from '../auth/auth.service';
@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit{
  private authListenerSubs: Subscription;
  userIsAuthenticated = false;
  constructor(private authService: AuthService) {}



  ngOnInit() {
    this.authListenerSubs = this.authService.getAuthStatusListener().subscribe(
      isAuthenticated => {
        this.userIsAuthenticated = isAuthenticated
      });

  }


  ngOnDestroy() {
    this.authListenerSubs.unsubscribe();
  }
}
