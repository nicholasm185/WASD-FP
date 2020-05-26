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
  private userUrl = 'http://52.77.254.112/api/user';
  private proofUrl: string;

  public name: [string];
  public email: [string];

  user$: Observable<User>;

  constructor(private http: HttpClient, private router: Router) { }

  login(email: String, password: String) {
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
    localStorage.removeItem('accessToken');
    localStorage.removeItem('userName');

    this.router.navigate(['/']);
    alert('Logged out successfully');
  }

}