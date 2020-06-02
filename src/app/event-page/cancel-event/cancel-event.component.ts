import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { GetEventService } from '../../services/get-event.service';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import * as AOS from 'aos';

@Component({
  selector: 'app-cancel-event',
  templateUrl: './cancel-event.component.html',
  styleUrls: ['./cancel-event.component.css']
})
export class CancelEventComponent implements OnInit {

  event_id;
  cancelEventForm = new FormGroup({
    event_id: new FormControl(''),
  });

  storedTheme: string = localStorage.getItem('theme');

  setTheme() {
    if (this.storedTheme === 'dark') {
      this.transition();
      localStorage.setItem('theme', 'light');
      this.storedTheme = localStorage.getItem('theme');
    } else {
      this.transition();
      localStorage.setItem('theme', 'dark');
      this.storedTheme = localStorage.getItem('theme');
    }
  }
  transition() {
    document.documentElement.classList.add('transition');
    window.setTimeout(() => {
    document.documentElement.classList.remove('transition');
    }, 1000);
  }

  constructor(private route: ActivatedRoute, private router: Router, private getEvent: GetEventService, ) { }

  ngOnInit(): void {
    AOS.init();
    // this.event_id = this.route.snapshot.paramMap.get('event_id');
    this.cancelEventForm.get('event_id').setValue(this.route.snapshot.paramMap.get('event_id'));
  }

cancelEvent() {
  this.getEvent.cancelEvent(this.event_id);
}

submit() {
  if (confirm('WARNING: You are about to cancel an event. This process cannot be undone. Are you sure?')) {
    console.log('You pressed OK!');
    console.log(this);
    this.cancelEvent();
    alert('Event successfully cancelled!');
    this.router.navigate(['/']);
  } else {
    alert('You cancelled your cancellation request, do not lose hope!');
  }
}

}
