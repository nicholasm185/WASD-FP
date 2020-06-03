import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import {GetEventService} from '../services/get-event.service';
import * as AOS from 'aos';
// import { CountdownTimerModule } from 'ngx-countdown-timer-date/dist';
@Component({
  selector: 'app-event-page',
  templateUrl: './event-page.component.html',
  styleUrls: ['./event-page.component.css']
})
export class EventPageComponent implements OnInit {

  event_id;
  eventExpire = false;
  data;
  picturesrc: string;

  constructor(private route: ActivatedRoute, private getEvent: GetEventService) { }

  ngOnInit(): void {
    AOS.init();
    this.event_id = this.route.snapshot.paramMap.get('event_id');
    this.getEvent.getEvent(this.event_id).subscribe((data) => {
      // all data of the event is stored in this.data
      this.data = data['data'][0];
      // for ease of use, storing picture url on this.picturesrc, already encoded
      this.picturesrc = decodeURIComponent(this.data['picture']).replace(/\+/g, ' ');
      console.log(this.data);
    });

  }

  timesUp() {
    this.eventExpire = true;
    console.log('countdown done');
    alert('This event has been held.');
  }

}
