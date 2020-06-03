import { Component, OnInit, ErrorHandler, } from '@angular/core';
import { FileUploadService } from '../../services/file-upload.service';
import { AuthService } from 'src/app/services/auth.service';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import * as someTool from 'lodash';
import { MatDialog } from '@angular/material/dialog';
import { ConfirmationComponent } from '../../upload/confirmation/confirmation.component';
import * as AOS from 'aos';
@Component({
  selector: 'app-file-upload',
  templateUrl: './file-upload.component.html',
  styleUrls: ['./file-upload.component.css']
})

export class FileUploadComponent implements OnInit {

  proofForm = new FormGroup({
    id: new FormControl(''),
    email: new FormControl(''),
    event_id: new FormControl(''),
  });

  fileToUpload: File = null;
  previewUrl: any = null;
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

  constructor(public upload: FileUploadService,
              public auth: AuthService,
              public router: Router,
              private route: ActivatedRoute,
              public dialog: MatDialog) { }

  ngOnInit(): void {
    AOS.init();
    this.proofForm.get('id').setValue(this.route.snapshot.paramMap.get('id'));
    this.proofForm.get('email').setValue(this.route.snapshot.paramMap.get('email'));
    this.proofForm.get('event_id').setValue(this.route.snapshot.paramMap.get('event_id'));
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
    this.fileToUpload = event.target.files[0];
    this.preview();
  }

  proofing() {
    const uploadData = new FormData();
    uploadData.append('id', this.proofForm.get('id').value);
    uploadData.append('email', this.proofForm.get('email').value);
    uploadData.append('event_id', this.proofForm.get('event_id').value);
    uploadData.append('paymentProof', this.fileToUpload, this.fileToUpload.name);

    if (this.proofForm.getError) {
      console.log('what?');
      alert('Your verification process failed');
      return false;
    }

    if (this.proofForm.invalid) {
      alert('Please fill in the required information');
    } else {
      this.sendProof(uploadData);
    }
  }

  sendProof(uploadData) {
    this.upload.uploadFile(uploadData).subscribe((event: any) => {
      console.log(event);
      alert('Proofing complete!');
      this.router.navigate(['/']);
    },
    error => {
      console.log(error);
      alert('Failed to send your proof');
    });
  }


  preview() {
    const preview = this.fileToUpload.type;
    if (preview.match(/image\/*/) == null) {
      console.log('here');
      return;
    }
    const reader = new FileReader();
    reader.readAsDataURL(this.fileToUpload);
    reader.onload = (event) => {
      this.previewUrl = reader.result;
    };
  }

  public openDialog() {
    const dialogRef = this.dialog.open(ConfirmationComponent, {
      width: '350px',
      height: '100px',
      hasBackdrop: false,
      data: 'Do you confirm the contents of this data?'
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        console.log('Clicked!');
        this.proofing();
        alert('Data verified!');
      }
    });
  }

  submit() {
    if (confirm('Do you confirm the contents of this data?')) {
      console.log('You pressed OK!');
      console.log(this.proofForm);
      this.proofing();
    } else {
      alert('Please recheck your credentials.');
    }
  }

  handleError(error: Error) {
    alert('Something happened...');
    console.error('Oh no: ', error);
 }
}
