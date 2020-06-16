import { Injectable, Output } from '@angular/core';
import { HttpClient, HttpHeaders, HttpErrorResponse } from '@angular/common/http';
import { Observable, throwError, BehaviorSubject, Subject } from 'rxjs';
import { catchError, retry } from 'rxjs/operators';
import { EventEmitter } from 'protractor';
import { Router } from '@angular/router';
import { User } from 'src/app/interfaces/user';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  // tslint:disable-next-line: ban-types
  accessToken: String;
  userName: string;
  private loggedIn = new BehaviorSubject<boolean>(false);
  private userUrl = 'https://backend.ticketmaya.me/api/user';
  private verifyUrl = 'https://backend.ticketmaya.me/api/email/resend';
  private proofUrl: string;

  public name: [string];
  public email: [string];

  user$: Observable<User>;

  constructor(private http: HttpClient, private router: Router) { }

  logoutURL = 'https://backend.ticketmaya.me/api/logout';

  login(email: string, password: string) {
    this.loggedIn.next(true);
    return this.http.post('https://backend.ticketmaya.me/api/login',
    {
      email: email,
      password: password,
    }, {headers: new HttpHeaders({
      'Content-Type': 'application/json'
    })});
  }

  signup(name: string, email: string, password: string, c_password: string) {
    this.loggedIn.next(true);
    return this.http.post('https://backend.ticketmaya.me/api/register',
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

  getToken() {
    return localStorage.getItem('accessToken');
  }

  get isLoggedIn() {
    return this.loggedIn.asObservable();
  }

  getUserName() {
    return this.userName = localStorage.getItem('userName');
  }

  getId() {
    return localStorage.getItem('id');
  }

  getEmail() {
    return localStorage.getItem('email');
  }

  getUserInfo(): Observable<User[]> {
    return this.http.get<User[]>(this.userUrl);
  }

  getProofing() {
    return this.http.get(this.proofUrl);
  }

  logout() {
    // this.loggedIn.next(false);
    // localStorage.removeItem('accessToken');
    localStorage.removeItem('userName');
    localStorage.removeItem('email');
    localStorage.removeItem('id');
    localStorage.removeItem('verified');

    this.requestlogOut();
    localStorage.removeItem('accessToken');

    this.router.navigate(['/']);
    alert('Logged out successfully');
  }

  requestlogOut() {
    return this.http.post(this.logoutURL, this.accessToken);
  }

  requestVerification(){
    return this.http.get(this.verifyUrl);
  }

}
