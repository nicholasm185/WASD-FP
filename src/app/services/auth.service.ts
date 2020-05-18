import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError, retry } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

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
}
