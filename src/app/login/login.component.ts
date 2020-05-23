import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { AuthService } from '../services/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  loginForm = new FormGroup({
    username: new FormControl('', Validators.required),
    password: new FormControl('', Validators.required)
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

  login() {
    console.log('login pressed');
    this.auth.login(this.loginForm.get('username').value, this.loginForm.get('password').value).subscribe(
      (data: any) => {
        console.log(data);
        localStorage.setItem('accessToken', data.success.token);
        localStorage.setItem('userName', data.success.name);
        alert('Welcome back, ' + this.auth.getUserName());
        this.router.navigate(['/dashboard']);
      },
      err => console.log(err)
    );
  }

  ngOnInit(): void {
  }

}