import { Component, OnInit } from '@angular/core';
import {FormArray, FormBuilder, FormControl, FormGroup, Validators} from '@angular/forms';
import {DatePipe, formatDate} from '@angular/common';
import {min} from 'rxjs/operators';
import { AuthService } from '../services/auth.service';
import { Router } from '@angular/router';
import { FileUploadService } from '../services/file-upload.service';

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
  eventPoster: File = null;
  previewUrl: any = null;

  constructor(private fb: FormBuilder,
              private datePipe: DatePipe,
              private router: Router,
              public upload: FileUploadService) {
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
      ]),
    });
    this.eventForm.controls.startDate.valueChanges.subscribe(data => {
      document.getElementById('endDate').setAttribute('min', data);
    });
  }

  get contactEmails() {
    return this.eventForm.get('contactEmails') as FormArray;
  }

  getContactEmails() {
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
  getContactPhones() {
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

  createEvent() {
    const eventData = new FormData();
    console.log('inserting data');

    eventData.append('eventName', this.eventForm.get('name').value);
    eventData.append('startDate', this.eventForm.get('startDate').value);
    eventData.append('endDate', this.eventForm.get('endDate').value);
    eventData.append('venue', this.eventForm.get('venue').value);
    eventData.append('city', this.eventForm.get('city').value);
    eventData.append('eventDescription', this.eventForm.get('eventDescription').value);
    eventData.append('email1', this.getContactEmails().value);
    eventData.append('phone1', this.getContactPhones().value);
    eventData.append('picture',  this.eventPoster);
    console.log('inserting done');

    this.upload.uploadEvent(eventData).subscribe((event: any) => {
      console.log(event);
    });
    alert('Event succesfully created!');
    this.router.navigate(['/']);
  }

  onFileChanged(event) {
    if (event.target.files && event.target.files[0]) {

      const maxSize = 20971520;
      const allowedTypes = ['.png', '.jpeg', '.jpg'];
      const maxHeight = 15200;
      const maxWidth = 25600;

      if (event.target.files[0].size > maxSize) {
        alert('Please ensure that the maximum size allowed is ' + maxSize / 1000 + 'Mb');
        return false;
      }
      /*if (!someTool.includes(allowedTypes, event.target.files[0].type)) {
        alert('Please make sure that only images are allowed ( JPG | PNG )');
        return false;
      }*/
    }
    this.eventPoster = event.target.files[0];
    this.preview();
    console.log(event);
  }

  preview() {
    const preview = this.eventPoster.type;
    if (preview.match(/image\/*/) == null) {
      return;
    }
    const reader = new FileReader();
    reader.readAsDataURL(this.eventPoster);
    reader.onload = (event) => {
      this.previewUrl = reader.result;
    };
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
