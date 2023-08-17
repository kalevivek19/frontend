import { Component } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { Router } from '@angular/router';
import { SocialAuthService } from "@abacritt/angularx-social-login";


@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent {

  user: any;
  loggedIn: any;

  constructor(
    private formBuilder: FormBuilder,
    private router: Router,
    private authService: SocialAuthService,
  ) {
    //this.ngOnInit();
  }

  ngOnInit() {
      this.authService.authState.subscribe((user: any) => {
        this.user = user;
        this.loggedIn = (user != null);
      });

    if(this.user == undefined){
      //this.router.navigate(['/']); 
      //Todo: Remove this line after developing login user manually and set this.user value
    }

  }

}
