import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpEventType, HttpRequest, HttpErrorResponse } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class GetEventService {

  private url = "http://52.77.254.112/api/events/show/";

  constructor(public http: HttpClient) { }

  getEvent(event_id: String){
    return this.http.get(this.url+event_id)
  }

}
