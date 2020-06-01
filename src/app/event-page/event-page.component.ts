import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import {GetEventService} from '../services/get-event.service';

@Component({
  selector: 'app-event-page',
  templateUrl: './event-page.component.html',
  styleUrls: ['./event-page.component.css']
})
export class EventPageComponent implements OnInit {

  event_id: String;
  photourl: String;

  constructor(private route: ActivatedRoute, private getEvent: GetEventService) { }

  ngOnInit(): void {
    this.event_id = this.route.snapshot.paramMap.get('event_id');
    this.getEvent.getEvent(this.event_id).subscribe((data) => {
      console.log(data);
    });
  }

}
