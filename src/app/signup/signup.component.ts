import { Component, OnInit } from '@angular/core';
import {FormControl, FormGroup} from '@angular/forms';
import { AuthService } from '../services/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css']
})
export class SignupComponent implements OnInit {

  signupForm = new FormGroup({
    name: new FormControl(''),
    email: new FormControl(''),
    password: new FormControl(''),
    confPassword: new FormControl('')
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
  }

  signup() {
    // tslint:disable-next-line: max-line-length
    this.auth.signup(this.signupForm.get('name').value, this.signupForm.get('email').value, this.signupForm.get('password').value, this.signupForm.get('confPassword').value).subscribe(
      (data: any) => {
        console.log(data);
        localStorage.setItem('accessToken', data.data.token);
        alert('Registered successfully');
        this.router.navigate(['/dashboard']);
      },
      err => console.log(err)
    )
  }

}
