import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpEventType, HttpRequest, HttpErrorResponse } from '@angular/common/http';
import { Observable, throwError, BehaviorSubject, Subject } from 'rxjs';
import { AuthService } from './auth.service';

@Injectable({
  providedIn: 'root'
})

export class BuyService {

  buyUrl = 'http://52.77.254.112/api/attendee/register';

  constructor(public http: HttpClient, public auth: AuthService) { }

  buyTicket(formData: FormData) {
    return this.http.post(this.buyUrl, formData);
  }

}