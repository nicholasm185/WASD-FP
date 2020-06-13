import { Component, OnInit } from '@angular/core';
import {Injectable} from "@angular/core";
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-admin',
  templateUrl: './admin.component.html',
  styleUrls: ['./admin.component.css']
})

@Injectable()
export class AdminComponent implements OnInit {

  getUsersUrl = 'https://backend.ticketmaya.me/api/admin/getUsers';

  constructor(
    private http: HttpClient
  ) { }

  ngOnInit(): void {
    console.log('entering admin');
  }

  showUsers(): Observable<any> {
    return this.http.get(this.getUsersUrl);
  }

  /*getUsers() {
    return this.http.get(this.getUsersUrl, {
      params: new HttpParams()
      .set('id', id.toString())
      .set('name', name.toString())
      .set('email', email.toString())
      .set('verified_at', verified_at.toString())
      .set('banned', banned.toString())

    }).pipe(map(res => ['payload']));
  }*/

}
