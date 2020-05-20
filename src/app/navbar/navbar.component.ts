import { Component, OnInit } from '@angular/core';
import { transcode } from 'buffer';
import { Observable } from 'rxjs';
import { AuthService } from '../services/auth.service';
import { AuthGuard } from '../guards/auth.guard';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {

  isLoggedIn$: Observable<boolean>;
  // userName: string;
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
    public auth: AuthService,
  ) {
    // auth.getUserName.subscribe(name => this.changeName(name));
  }

  ngOnInit() {
    // this.isLoggedIn$ = this.auth.isLoggedIn;
    // this.auth.getUserName.subscribe(name => this.userName = name);
  }

  /*onLogOut() {
    this.auth.logout();
  }*/
}
