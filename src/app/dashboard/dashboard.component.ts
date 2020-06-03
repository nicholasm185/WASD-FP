import { Component, OnInit } from '@angular/core';
import { AuthService } from '../services/auth.service';
import { HttpClientModule, HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { User } from '../interfaces/user';
import { Pipe, PipeTransform } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import * as AOS from 'aos';
import { GetEventService } from '../services/get-event.service';
import { Event } from '../interfaces/event';
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

  events;
  picturesrc: string;

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
    public http: HttpClient,
    public get: GetEventService,
    public router: Router,
    public route: ActivatedRoute) { }

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
    AOS.init();
    this.indexEvents();
    this.auth.getUserInfo()
      .subscribe(data => {
        this.User = data;
        console.log(this.User)},
        error => this.errorMsg = error);
  }

indexEvents() {
  this.get.showEvents().subscribe((data) => {
    // all data of the event is stored in this.data
    this.events = data['data'];
    // for ease of use, storing picture url on this.picturesrc, already encoded
    this.picturesrc = this.decode(this.events['picture']);
    console.log(this.events);
  });
  }

  decode(data: string){
    return decodeURIComponent(data).replace(/\+/g, ' ');
  }

  requestVerify(){
    // console.log(localStorage.getItem('accessToken'));
    // this.http.get('http://13.250.248.175/api/email/resend', {headers:new HttpHeaders({
    //   'Authorization': 'Bearer ' + localStorage.getItem('accessToken'),
    //   'Accept': 'application/json'
    // })
    // }).subscribe(data => {
    //   console.log(data);
    // })
    this.auth.requestVerification().subscribe(data =>{
      console.log(data);
    })
  }


}
