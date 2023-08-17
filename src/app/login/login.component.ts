import { Component } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { FormControl } from '@angular/forms';
import { Router } from '@angular/router';
import { SocialAuthService } from "@abacritt/angularx-social-login";


@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {
  email = new FormControl('');
  password = new FormControl('');
  user: any;
  loggedIn: any;

  constructor(
    private formBuilder: FormBuilder,
    private router: Router,
    private authService: SocialAuthService
  ) { }

  ngOnInit() {
    this.authService.authState.subscribe((user: any) => {
      this.user = user;
      this.loggedIn = (user != null);
      this.router.navigate(['/machines']);
    });
  }

  checkoutForm = this.formBuilder.group({
    email: '',
    password: ''
  });

  onSubmit(): void {
    // Process checkout data here
    let email = this.email.getRawValue();
    let password = this.password.getRawValue();
    if (email == 'testuser@aerzen.com' && password == "1234") {
      this.router.navigate(['/machines']);
    } else {
      alert('Please enter valid email and/or password');
    }

  }
}
