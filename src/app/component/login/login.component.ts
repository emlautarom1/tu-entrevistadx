import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { SessionService } from 'src/app/service/session.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  logInForm = this.fb.nonNullable.group({
    email: ['', [Validators.required, Validators.email]],
    password: ['', [Validators.required, Validators.minLength(8)]],
  });
  logInFailed = false;

  constructor(
    private session: SessionService,
    private router: Router,
    private fb: FormBuilder,
  ) { }

  ngOnInit(): void {
  }

  onLogIn() {
    if (!this.logInForm.valid) {
      return;
    }

    let { email, password } = this.logInForm.getRawValue();
    let profile = this.session.logIn(email, password);
    if (profile) {
      this.router.navigate(["/"]);
    }
    else {
      this.logInFailed = true;
    }
  }
}
