import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpEventType, HttpRequest, HttpErrorResponse } from '@angular/common/http';
import { Observable, throwError, BehaviorSubject, Subject } from 'rxjs';
import { AuthService } from './auth.service';

@Injectable({
  providedIn: 'root'
})

export class BuyService {

  buyUrl = 'https://backend.ticketmaya.me/api/attendee/register';
  cancelUrl = 'https://backend.ticketmaya.me/api/attendee/cancel';

  constructor(public http: HttpClient, public auth: AuthService) { }

  buyTicket(formData: FormData) {
    return this.http.post(this.buyUrl, formData);
  }

  cancelTicket(formData: FormData) {
    return this.http.post(this.cancelUrl, formData);
  }

}
