import { Component, OnInit } from '@angular/core';
import { AuthService } from '../services/auth.service';
import { HttpClientModule, HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { User } from '../interfaces/user';
import { Router, ActivatedRoute } from '@angular/router';
import * as AOS from 'aos';
import { saveAs } from 'file-saver';
import { GetEventService } from '../services/get-event.service';
@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {
  storedTheme: string = localStorage.getItem('theme');
  user$: Observable<User>;

  events;
  event_id;
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
    public route: ActivatedRoute,) { }

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

  decode(data: string) {
    return decodeURIComponent(data).replace(/\+/g, ' ');
  }

  requestVerify() {
    this.auth.requestVerification().subscribe(data => {
      console.log(data);
    });
    alert('Please check your Email!');
  }


  downloadCSV(event_id){
    console.log(event_id);
    return this.get.downloadExcel(event_id);
  }

  setEventId() {
    this.event_id = this.events['event_id'];
  }

  getEventId() {
    return this.events['event_id'];
  }

  dwZip(event_id) {
    console.log(event_id);
    this.get.downloadZIP(event_id);
  }

}
