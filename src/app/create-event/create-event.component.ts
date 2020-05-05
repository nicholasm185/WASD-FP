import { Component, OnInit } from '@angular/core';
import {FormArray, FormBuilder, FormControl, FormGroup, Validators} from '@angular/forms';
import {DatePipe, formatDate} from '@angular/common';
import {min} from 'rxjs/operators';


@Component({
  selector: 'app-create-event',
  templateUrl: './create-event.component.html',
  styleUrls: ['./create-event.component.css'],
  providers: [DatePipe]
})

export class CreateEventComponent implements OnInit {
  public eventForm: FormGroup;
  storedTheme: string = localStorage.getItem('theme');
  minDate;
  constructor(private fb: FormBuilder, private datePipe: DatePipe) {
    this.minDate = this.datePipe.transform(new Date(), 'yyyy-MM-ddThh:mm');
  }

  ngOnInit(): void {
    this.eventForm = this.fb.group({
      name: ['', [Validators.required]],
      eventDescription: ['', [Validators.required, Validators.minLength(12)]],
      startDate: ['', [Validators.required]],
      endDate: ['', [Validators.required]],
      venue: ['', [Validators.required, Validators.minLength(12)]],
      city: ['', [Validators.required]],
      contactEmails: this.fb.array([
        this.fb.control('')
      ]),
      contactPhones: this.fb.array([
        this.fb.control('')
      ])
    });
    this.eventForm.controls.startDate.valueChanges.subscribe(data => {
      document.getElementById('endDate').setAttribute('min', data);
    });
  }

  get contactEmails() {
    return this.eventForm.get('contactEmails') as FormArray;
  }

  addEmail() {
    this.contactEmails.push(this.fb.control(''));
    console.log(this.minDate);
  }

  removeEmail(i: number) {
    this.contactEmails.removeAt(i);
  }

  get contactPhones() {
    return this.eventForm.get('contactPhones') as FormArray;
  }

  addPhone() {
    this.contactPhones.push(this.fb.control(''));
  }

  removePhone(i: number) {
    this.contactPhones.removeAt(i);
  }

  submit() {
    console.log('submitted');
    console.log(this.eventForm);
  }

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


}
