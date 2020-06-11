import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpEventType, HttpRequest, HttpErrorResponse } from '@angular/common/http';
import { Http, ResponseContentType } from '@angular/http';
import { Observable } from 'rxjs';
@Injectable({
  providedIn: 'root'
})
export class GetEventService {

  private url = 'https://backend.ticketmaya.me/api/events/show/';
  private showEventsUrl = 'https://backend.ticketmaya.me/api/events/showAll';
  private cancelUrl = 'https://backend.ticketmaya.me/api/events/delete/';
  private downloadCSV = 'https://backend.ticketmaya.me/api/attendee/downloadCSV';
  private downloadProof = 'https://backend.ticketmaya.me/api/attendee/dproof/';

  constructor(public http: HttpClient) { }

  getEvent(event_id: string){
    return this.http.get(this.url + event_id);
  }

  showEvents() {
    return this.http.get(this.showEventsUrl);
  }

  cancelEvent(event_id: string) {
    return this.http.get(this.cancelUrl + event_id);
  }

  downloadPaymentProof(event_id: string): Observable<any> {
    return this.http.get(this.downloadProof + {event_id, responseType: ResponseContentType.ArrayBuffer});
  }

  downloadFile(event_id: string): Observable<any> {
    return this.http.post(this.downloadCSV, {event_id, responseType: ResponseContentType.Blob});
  }

}
