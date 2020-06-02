import { Component, OnInit } from '@angular/core';
import {FormArray, FormBuilder, FormControl, FormGroup, Validators} from '@angular/forms';
import {DatePipe, formatDate} from '@angular/common';
import {min} from 'rxjs/operators';
import { Router } from '@angular/router';
import { FileUploadService } from '../services/file-upload.service';
import * as AOS from 'aos';
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
    AOS.init();
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
    console.log(this.minDate);
    if (this.contactEmails.length < 3) {
      this.contactEmails.push(this.fb.control(''));
    } else {
      alert('You can only put a maximum of three emails');
    }
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
    if (this.contactPhones.length < 3) {
      this.contactPhones.push(this.fb.control(''));
   } else {
     alert('You can only put a maximum of three contacts');
   }
  }

  removePhone(i: number) {
    this.contactPhones.removeAt(i);
  }

  onSubmit() {
    if (confirm('Are you all set?')) {
      console.log('You pressed OK!');
      console.log(this.eventForm);
      this.createEvent();
    } else {
      alert('Do not worry, there is plenty of time.');
    }
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

    eventData.append('email1', this.eventForm.get('contactEmails.0').value);
    if(this.eventForm.get('contactEmails.1') != null){
      eventData.append('email2', this.eventForm.get('contactEmails.1').value);
      if(this.eventForm.get('contactEmails.1') != null)
      eventData.append('email3', this.eventForm.get('contactEmails.2').value);
    }
    eventData.append('phone1', this.eventForm.get('contactPhones.0').value);
    if(this.eventForm.get('contactPhones.1') != null){
      eventData.append('phone2', this.eventForm.get('contactPhones.1').value);
      if(this.eventForm.get('contactPhones.2') != null)
      eventData.append('phone3', this.eventForm.get('contactPhones.2').value);
    }

    eventData.append('picture',  this.eventPoster);
    console.log('inserting done');

    this.upload.uploadEvent(eventData).subscribe((event: any) => {
      console.log(event);
    });
    if (this.eventForm.invalid) {
      alert('Please fill in the required information');
    } else {
      alert('Event succesfully created!');
      this.router.navigate(['/']);
    }
  }

  onFileChanged(event) {
    if (event.target.files && event.target.files[0]) {

      const maxSize = 20971520;
      const allowedTypes = ['.png', '.jpeg', '.jpg', '.pdf', '.tiff', '.eps'];
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
