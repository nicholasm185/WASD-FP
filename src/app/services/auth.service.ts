import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError, retry } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  accessToken: String;

  constructor(private http: HttpClient) { }

  login(email: String, password: String){
    return this.http.post('http://52.77.254.112/api/login', 
    {
      email: email,
      password: password,
    }, {headers: new HttpHeaders({
      'Content-Type': 'application/json'
    })})
  }

  signup(name: String, email: String, password: String, c_password: String){
    return this.http.post('http://52.77.254.112/api/register',
    {
      name: name,
      email: email,
      password: password,
      c_password: c_password
    },{
      headers: new HttpHeaders({
        'Content-Type': 'application/json'
      })
    })
  }
}
