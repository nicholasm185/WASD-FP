import { Component, OnInit } from '@angular/core';
import { FileUploadService } from '../../services/file-upload.service';
import { AuthService } from 'src/app/services/auth.service';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';


@Component({
  selector: 'app-file-upload',
  templateUrl: './file-upload.component.html',
  styleUrls: ['./file-upload.component.css']
})
export class FileUploadComponent implements OnInit {
  public id: string;

  proofForm = new FormGroup({
    id: new FormControl(''),
    email: new FormControl(''),
    event_id: new FormControl(''),
  });

  fileToUpload: File = null;
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

  constructor(public upload: FileUploadService, public auth: AuthService, public router: Router, private route: ActivatedRoute) { }

  ngOnInit(): void {
    this.id = this.route.snapshot.paramMap.get('id');
  }

  proofing() {
    console.log('proofing commencing');
    // tslint:disable-next-line: max-line-length
    this.upload.uploadFileNew(this.proofForm.get('id').value, this.proofForm.get('email').value, this.proofForm.get('event_id').value).subscribe(
      (data: any) => {
        console.log(data);

        alert('Proofing complete, ' + this.auth.getUserName());
        // this.router.navigate(['/dashboard']);
      },
      err => console.log(err)
    );
  }

  /*getAttendeeId() {
    this.auth.getProofing.subscribe(params => {
      this.id = params.get('id')
    })
  }*/

  /*uploadFileToActivity() {
    this.upload.uploadFile(this.fileToUpload).subscribe(data => {
      // do something, if upload success
      }, error => {
        console.log(error);
      });
  }*/
}
