import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../services/auth.service';
import { HttpClientModule, HttpClient, HttpHeaders } from '@angular/common/http';
import {FormArray, FormBuilder, FormControl, FormGroup, Validators} from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import * as AOS from 'aos';
import { FileUploadService } from 'src/app/services/file-upload.service';
import { DatePipe, formatDate } from '@angular/common';
import { GetEventService } from 'src/app/services/get-event.service';

@Component({
  selector: 'app-update-event',
  templateUrl: './update-event.component.html',
  styleUrls: ['./update-event.component.css'],
  providers: [DatePipe]
})
export class UpdateEventComponent implements OnInit {
  public eventUpdateForm: FormGroup;
  storedTheme: string = localStorage.getItem('theme');
  minDate;
  event_id;
  data;
  picturesrc: string;
  eventPoster: File = null;
  previewUrl: any = null;
  emailPattern = '^[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,4}$';

  constructor(
    private fb: FormBuilder,
    public auth: AuthService,
    private datePipe: DatePipe,
    public http: HttpClient,
    public router: Router,
    public route: ActivatedRoute,
    public upload: FileUploadService,
    public get: GetEventService) {
    this.minDate = this.datePipe.transform(new Date(), 'yyyy-MM-ddThh:mm');
   }

  ngOnInit(): void {
    AOS.init();
    this.getEvent();

    this.eventUpdateForm = this.fb.group({
      event_id: [''],
      name: ['', [Validators.required]],
      eventDescription: ['', [Validators.required, Validators.minLength(12)]],
      startDate: ['', [Validators.required]],
      endDate: ['', [Validators.required]],
      venue: ['', [Validators.required, Validators.minLength(12)]],
      city: ['', [Validators.required]],
      contactEmails: this.fb.array([
        this.fb.control('', [Validators.required, Validators.pattern(this.emailPattern)]),
      ]),
      contactPhones: this.fb.array([
        this.fb.control('', [Validators.required, Validators.minLength(5), Validators.maxLength(12)])
      ]),
    });
    this.eventUpdateForm.controls.startDate.valueChanges.subscribe(data => {
      document.getElementById('endDate').setAttribute('min', data);
    });

    this.eventUpdateForm.get('event_id').setValue(this.route.snapshot.paramMap.get('event_id'));
  }

  getEvent() {
    this.event_id = this.route.snapshot.paramMap.get('event_id');
    this.get.getEvent(this.event_id).subscribe((data) => {
      // all data of the event is stored in this.data
      this.data = data['data'][0];
      this.eventUpdateForm.get('name').setValue(this.data['eventName']);
      this.eventUpdateForm.get('startDate').setValue(this.data['startDate']);
      this.eventUpdateForm.get('endDate').setValue(this.data['endDate']);
      this.eventUpdateForm.get('eventDescription').setValue(this.data['eventDescription']);
      this.eventUpdateForm.get('venue').setValue(this.data['venue']);
      this.eventUpdateForm.get('city').setValue(this.data['city']);

      (this.eventUpdateForm.controls['contactEmails'] as FormArray).get(this.data['email1']);
      (this.eventUpdateForm.controls['contactPhones'] as FormArray).get(this.data['phone1']);
      // for ease of use, storing picture url on this.picturesrc, already encoded
      this.picturesrc = decodeURIComponent(this.data['picture']).replace(/\+/g, ' ');
      console.log(this.data);
    });
  }

  get contactEmails() {
    return this.eventUpdateForm.get('contactEmails') as FormArray;
  }

  getContactEmails() {
    return this.eventUpdateForm.get('contactEmails') as FormArray;
  }

  get contactPhones() {
    return this.eventUpdateForm.get('contactPhones') as FormArray;
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


  insertUpdateInfo() {
    const modifyData = new FormData();
    console.log('inserting data');

    modifyData.append('eventName', this.eventUpdateForm.get('name').value);
    modifyData.append('startDate', this.eventUpdateForm.get('startDate').value);
    modifyData.append('endDate', this.eventUpdateForm.get('endDate').value);
    modifyData.append('venue', this.eventUpdateForm.get('venue').value);
    modifyData.append('city', this.eventUpdateForm.get('city').value);
    modifyData.append('eventDescription', this.eventUpdateForm.get('eventDescription').value);

    modifyData.append('email1', this.eventUpdateForm.get('contactEmails.0').value);
    if (this.eventUpdateForm.get('contactEmails.1') != null) {
      modifyData.append('email2', this.eventUpdateForm.get('contactEmails.1').value);
      if (this.eventUpdateForm.get('contactEmails.2') != null) {
        modifyData.append('email3', this.eventUpdateForm.get('contactEmails.2').value);
      } else{
        modifyData.append('email3', '')
      }
    } else if(this.eventUpdateForm.get('contactEmails.1') == null){
      modifyData.append('email2', '');
      modifyData.append('email3', '');
    }

    modifyData.append('phone1', this.eventUpdateForm.get('contactPhones.0').value);
    if (this.eventUpdateForm.get('contactPhones.1') != null) {
      modifyData.append('phone2', this.eventUpdateForm.get('contactPhones.1').value);
      if (this.eventUpdateForm.get('contactPhones.2') != null) {
        modifyData.append('phone3', this.eventUpdateForm.get('contactPhones.2').value);
      } else{
        modifyData.append('phone3', '')
      }
    } else{
      modifyData.append('phone2', '');
      modifyData.append('phone3', '');
    }

    modifyData.append('picture',  this.eventPoster);
    console.log('inserting done');

    if (this.eventUpdateForm.invalid) {
      alert('Please fill in the required information');
    } else {
      console.log(modifyData);
      this.updateEvent(modifyData);
    }
  }

  updateEvent(eventData) {
    this.upload.updateEvent(this.event_id, eventData).subscribe((event: any) => {
      console.log(event);
      alert('Event succesfully updated!');
      this.router.navigate(['/dashboard']);
    },
    error => {
      console.log(error);
      alert('Failed to update event');
    });
  }

  onSubmit() {
    if (confirm('Are you all set?')) {
      console.log('You pressed OK!');
      console.log(this.eventUpdateForm);
      this.insertUpdateInfo();
    } else {
      alert('Do not worry, there is plenty of time.');
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
