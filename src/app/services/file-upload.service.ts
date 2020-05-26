import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpEventType, HttpRequest, HttpErrorResponse } from '@angular/common/http';
import { Observable, throwError, BehaviorSubject, Subject } from 'rxjs';
import { AuthService } from './auth.service';

@Injectable({
  providedIn: 'root'
})

export class FileUploadService {

  proofUrl = 'http://52.77.254.112/api/attendee/upload';
  eventUrl = 'http://52.77.254.112/api/events/create';

  constructor(public http: HttpClient, public auth: AuthService) { }


  uploadFile(formData: FormData) {
    return this.http.post(this.proofUrl, formData);
  }

  uploadEvent(formData: FormData) {
      return this.http.post(this.eventUrl, formData);
  }

}
