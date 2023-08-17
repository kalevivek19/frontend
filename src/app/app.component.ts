import { Component } from '@angular/core';
import { Router, NavigationStart } from '@angular/router';
import { SocialAuthService } from "@abacritt/angularx-social-login";


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'frontend';
  users: any;
  id: any;
  showHead: boolean = false;
  user: any;
  loggedIn: any;

  ngOnInit() {
    this.authService.authState.subscribe((user) => {
      this.user = user;
      this.loggedIn = (user != null);
    });
  }

  signOut(): void {
    this.authService.signOut();
  }

  constructor(
    private router: Router,
    private authService: SocialAuthService
  ) {
    router.events.forEach((event) => {
      if (event instanceof NavigationStart) {
        if (event['url'] == '/') {
          this.showHead = false;
        } else {
          this.showHead = true;
        }
      }
    });
  }
}
