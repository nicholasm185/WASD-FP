import { Component, OnInit } from '@angular/core';
import {FormControl, FormGroup, Validators} from '@angular/forms';
import { AuthService } from '../services/auth.service';
import { Router } from '@angular/router';
import * as AOS from 'aos';
@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css']
})
export class SignupComponent implements OnInit {
  emailPattern = "^[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,4}$";

  signupForm = new FormGroup({
    name: new FormControl('', Validators.minLength(2)),
    email: new FormControl('', Validators.pattern(this.emailPattern)),
    password: new FormControl('', Validators.minLength(6)),
    confPassword: new FormControl('', Validators.minLength(6))
  });

  storedTheme: string = localStorage.getItem('theme');
  setTheme() {
    if (this.storedTheme === 'dark') {
      this.transition();
      localStorage.setItem('theme', 'light');
      this.storedTheme = localStorage.getItem('theme');
    } else {
      this.transition();
      localStorage.setItem('theme', 'dark');
      this.storedTheme = localStorage.getItem('theme');
    }
  }
  transition() {
    document.documentElement.classList.add('transition');
    window.setTimeout(() => {
    document.documentElement.classList.remove('transition');
    }, 1000);
  }

  constructor(
    private auth: AuthService,
    private router: Router
    ) {}

  ngOnInit(): void {
    AOS.init();
  }

  signup() {
    // tslint:disable-next-line: max-line-length
    this.auth.signup(this.signupForm.get('name').value, this.signupForm.get('email').value, this.signupForm.get('password').value, this.signupForm.get('confPassword').value).subscribe(
      (data: any) => {
        console.log(data);
        localStorage.setItem('accessToken', data.data.token);
        localStorage.setItem('userName', data.data.name);
        localStorage.setItem('id', data.data.id);
        localStorage.setItem('email', data.data.email);
        alert('Registered successfully');
        this.router.navigate(['/dashboard']);
      },
      err => {
        console.log(err);
        alert('Failed to Sign Up, Please check your credentials');
      });
  }

}
