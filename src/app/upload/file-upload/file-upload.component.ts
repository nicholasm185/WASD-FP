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

  onFileChanged(event){
    this.fileToUpload = event.target.files[0];
  }

  proofing() {
    const uploadData = new FormData();
    uploadData.append('id', this.proofForm.get('id').value);
    uploadData.append('email', this.proofForm.get('email').value);
    uploadData.append('event_id', this.proofForm.get('event_id').value);
    uploadData.append('paymentProof', this.fileToUpload, this.fileToUpload.name);
    this.upload.uploadFile(uploadData).subscribe(event =>{
      console.log(event);
    })

  }

}