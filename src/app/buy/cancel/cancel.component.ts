import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { FormArray, FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { BuyService } from '../../services/buy.service';
import * as AOS from 'aos';
@Component({
  selector: 'app-cancel',
  templateUrl: './cancel.component.html',
  styleUrls: ['./cancel.component.css']
})
export class CancelComponent implements OnInit {

  public cancelForm: FormGroup;
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

  constructor(private fb: FormBuilder,
              private router: Router,
              private route: ActivatedRoute,
              public buy: BuyService) { }

  ngOnInit(): void {
    this.cancelForm = this.fb.group({
      attendee_id: ['', [Validators.required]],
      event_id: ['', [Validators.required, Validators.minLength(13)]],
      email: ['', [Validators.required]],

    });
    this.cancelForm.get('event_id').setValue(this.route.snapshot.paramMap.get('event_id'));
    AOS.init();
  }

  cancelTicket() {
    const cancelData = new FormData();
    console.log('inserting data');

    cancelData.append('id', this.cancelForm.get('attendee_id').value);
    cancelData.append('event_id', this.cancelForm.get('event_id').value);
    cancelData.append('email', this.cancelForm.get('email').value);

    console.log('inserting done');
    this.buy.cancelTicket(cancelData).subscribe((event: any) => {
      console.log(event);
    });
    if (this.cancelForm.invalid) {
      alert('Cancellation failed');
    } else {
      alert('Ticket succesfully cancelled!');
      this.router.navigate(['/dashboard']);
    }
  }

  get event_id() {
    return this.cancelForm.get('event_id');
  }

  submit() {
    if (confirm('This process cannot be undone. Are you sure?')) {
      console.log('You pressed OK!');
      console.log(this.cancelForm);
      this.cancelTicket();
    } else {
      alert('You cancelled your cancellation request, do not lose hope!');
    }
  }


}
