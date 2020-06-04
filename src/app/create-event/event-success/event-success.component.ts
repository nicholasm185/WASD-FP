import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../services/auth.service';
import { ActivatedRoute, Router } from '@angular/router';
import * as AOS from 'aos';
import { GetEventService } from 'src/app/services/get-event.service';

@Component({
  selector: 'app-event-success',
  templateUrl: './event-success.component.html',
  styleUrls: ['./event-success.component.css']
})

export class EventSuccessComponent implements OnInit {

  constructor(public auth: AuthService, public router: Router, public get: GetEventService) { }

  event_id;

  ngOnInit(): void {
    AOS.init();

  }

}
