import { Component, OnInit } from '@angular/core';
import { AuthService } from '../services/auth.service';
import { HttpClientModule, HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { User } from '../interfaces/user';
import { Router, ActivatedRoute } from '@angular/router';
import * as AOS from 'aos';
import * as fileSaver from 'file-saver';
import { GetEventService } from '../services/get-event.service';
import { Event } from '../interfaces/event';
import { Http, ResponseContentType } from '@angular/http';
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
    public route: ActivatedRoute) { }

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


  downloadCSV3(event_id): Observable<any> {
    console.log('hello?');
    event_id = this.setEventId();
    return this.http.post('https://backend.ticketmaya.me/api/attendee/downloadCSV',
    {
      event_id: event_id,
      responseType: ResponseContentType.Blob
    });

  }

  downloadCSV2(event_id: string) {
    this.get.downloadFile(event_id).subscribe(response => {
      window.location.href = response.url;
    }),
      error => console.log('Error downloading the file'),
        () => console.info('File downloaded successfully');
  }

  downloadCSV(event_id) {
    this.get.downloadFile(event_id).subscribe(response => {
      // let blob: any = new Blob([response.blob()], { type: 'text/json; charset=utf-8' });
      // const url = window.URL.createObjectURL(blob);
      // window.open(url);
      // window.location.href = response.url;
      this.downloadFile(response);
      // fileSaver.saveAs(blob, 'employees.json');
    }),
    error => console.log('Error downloading the file'),
    () => console.info('File downloaded successfully');
  }

  downloadFile(data: Response) {
    const blob = new Blob([data], { type: 'application/octet-stream' });
    const url = window.URL.createObjectURL(blob);
    window.open(url);
  }

  /*downloadProof() {
    this.get.downloadPaymentProof(this.event_id).subscribe((data: any) => {
      this.event_id = data['event_id'];
    },
    error => {
      console.log(error);
      alert('Failed to download');
    });
  }*/

  setEventId() {
    this.event_id = this.events['event_id'];
  }

  getEventId() {
    return this.events['event_id'];
  }

  dwZip(event_id) {
    this.get.downloadPaymentProof(event_id).subscribe(data => {
      //this.event_id = this.getEventId();
      console.log('hi', data);
    });
  }

  downloadZip(event_id: string) {
    return this.http.get('https://backend.ticketmaya.me/api/attendee/dproof/' + {event_id, responseType: ResponseContentType.ArrayBuffer})
      .subscribe(res => res);
  }

}
