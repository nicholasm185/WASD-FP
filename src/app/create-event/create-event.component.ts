import { Component, OnInit } from '@angular/core';
import {FormArray, FormBuilder, FormControl, FormGroup, Validators} from '@angular/forms';

@Component({
  selector: 'app-create-event',
  templateUrl: './create-event.component.html',
  styleUrls: ['./create-event.component.css']
})
export class CreateEventComponent implements OnInit {
  public eventForm: FormGroup;
  storedTheme: string = localStorage.getItem('theme');
  constructor(private  fb: FormBuilder) { }

  ngOnInit(): void {
    this.eventForm = this.fb.group({
      name: ['', [Validators.required]],
      // startDate: ['', [Validators.required]],
      // endDate: ['', [Validators.required]],
      contactEmails: this.fb.array([
        this.fb.control('')
      ])
    });
  }

  get contactEmails() {
    return this.eventForm.get('contactEmails') as FormArray;
  }

  addEmail() {
    this.contactEmails.push(this.fb.control(''));
  }

  removeEmail(i: number) {
    this.contactEmails.removeAt(i);
  }

  // initPhone() {
  //   return this.fb.group({
  //     phone: ['', [Validators.required]]
  //   });
  // }
  //
  // addPhone() {
  //   const control = this.eventForm.controls.contactPhones as FormArray;
  //   control.push(this.initEmail());
  // }
  //
  // removePhone(i: number) {
  //   const control = this.eventForm.controls.contactPhones as FormArray;
  //   control.removeAt(i);
  // }

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
