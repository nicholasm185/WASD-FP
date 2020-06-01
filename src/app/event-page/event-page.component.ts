import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import {GetEventService} from '../services/get-event.service';

@Component({
  selector: 'app-event-page',
  templateUrl: './event-page.component.html',
  styleUrls: ['./event-page.component.css']
})
export class EventPageComponent implements OnInit {

  event_id;
  data;
  picturesrc: String;

  constructor(private route: ActivatedRoute, private getEvent: GetEventService) { }

  ngOnInit(): void {
    this.event_id = this.route.snapshot.paramMap.get('event_id');
    this.getEvent.getEvent(this.event_id).subscribe((data) => {
      // all data of the event is stored in this.data
      this.data = data['data'][0];
      // for ease of use, storing picture url on this.picturesrc, already encoded
      this.picturesrc = decodeURIComponent(this.data['picture']);
      console.log(this.data);
    });
    
  }

}
