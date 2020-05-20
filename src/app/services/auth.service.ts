import { Injectable, Output } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, throwError, BehaviorSubject, Subject } from 'rxjs';
import { catchError, retry } from 'rxjs/operators';
import { EventEmitter } from 'protractor';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  // tslint:disable-next-line: ban-types
  accessToken: String;
  private loggedIn = new BehaviorSubject<boolean>(false);
  // public getUserName = new Subject();

  constructor(private http: HttpClient) { }

  login(email: String, password: String){
    this.loggedIn.next(true);
    return this.http.post('http://52.77.254.112/api/login',
    {
      email: email,
      password: password,
    }, {headers: new HttpHeaders({
      'Content-Type': 'application/json'
    })});
  }

  signup(name: String, email: String, password: String, c_password: String) {
    this.loggedIn.next(true);
    return this.http.post('http://52.77.254.112/api/register',
    {
      name: name,
      email: email,
      password: password,
      c_password: c_password
    }, {
      headers: new HttpHeaders({
        'Content-Type': 'application/json'
      })
    });
  }

  amILoggedIn() {
    return !!localStorage.getItem('accessToken');
  }

  get isLoggedIn() {
    return this.loggedIn.asObservable();
  }

  logout() {
    this.loggedIn.next(false);
  }

}