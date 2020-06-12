import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpEventType, HttpRequest, HttpErrorResponse } from '@angular/common/http';
import { Observable, throwError, BehaviorSubject, Subject } from 'rxjs';
import { AuthService } from './auth.service';

@Injectable({
  providedIn: 'root'
})

export class FileUploadService {

  proofUrl = 'https://backend.ticketmaya.me/api/attendee/upload';
  eventUrl = 'https://backend.ticketmaya.me/api/events/create';
  updateUrl = 'https://backend.ticketmaya.me/api/events/update/';

  constructor(public http: HttpClient, public auth: AuthService) { }


  uploadFile(formData: FormData) {
    return this.http.post(this.proofUrl, formData);
  }

  createEvent(formData: FormData) {
      return this.http.post(this.eventUrl, formData);
  }

  updateEvent(event_id: string, formData: FormData) {
    return this.http.post(this.updateUrl + event_id, formData);
  }

}
