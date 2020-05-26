import { Component, OnInit } from '@angular/core';
import { AuthService } from '../services/auth.service';
import { HttpClientModule, HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { User } from '../interfaces/user';
import { Pipe, PipeTransform } from '@angular/core';

@Pipe({ name: 'values',  pure: false })
export class ValuesPipe implements PipeTransform {
  transform(value: any, args: any[] = null): any {
    return Object.keys(value).map(key => value[key]);
  }
}
@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {
  storedTheme: string = localStorage.getItem('theme');
  user$: Observable<User>;
  url = 'http://52.77.254.112/api/user';

  public User = [];
  public errorMsg = [];

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
    public http: HttpClient) { }

  /*ngOnInit(): void {
    this.auth.getUserInfo().subscribe(
      (data) => this.User = data);
    console.log(data);
  }*/

  /*ngOnInit(): void {
    this.http.get(this.url).toPromise().then(data => {
      console.log(data);
      });
  }*/

  ngOnInit() {
    this.auth.getUserInfo()
      .subscribe(data => this.User = data,
                error => this.errorMsg = error);
  }

}
