import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpEventType, HttpRequest, HttpErrorResponse } from '@angular/common/http';
import { Observable, throwError, BehaviorSubject, Subject } from 'rxjs';
import { AuthService } from './auth.service';

@Injectable({
  providedIn: 'root'
})

export class FileUploadService {

  constructor(public http: HttpClient, public auth: AuthService) { }
  fileToUpload = null;
  url = 'http://52.77.254.112/api/attendee/upload';

  handleFileInput(files: FileList) {
    console.log('Opening files..');
    this.fileToUpload = files.item(0);
  }

  uploadPic() {
    const formData: FormData = new FormData();
    formData.append('paymentProof', this.fileToUpload, this.fileToUpload.name);
    return this.http.post(this.url, { formData }).subscribe(data => {
      console.log('uploading');
      console.log(data);
    });
  }


  uploadFile(id: string, email: string, event_id: string) {
    const formData: FormData = new FormData();
    formData.append('paymentProof', this.fileToUpload, this.fileToUpload.name);
    return this.http.post(this.url, {
      id: id,
      email: email,
      event_id: event_id,
      // formData,
      }).subscribe(data => {
        console.log(data);
      });
      // { headers: yourHeadersConfig })
      // .map(() => { return true; })
      // .catch((e) => this.handleError(e));
  }

  uploadFileNew(id: string, email: string, event_id: string) {
    const formData: FormData = new FormData();
    formData.append('paymentProof', this.fileToUpload, this.fileToUpload.name);
    return this.http.post(this.url, {
      id: id,
      email: email,
      event_id: event_id,
      formData,
      }, {
        headers: new HttpHeaders({
          'Content-Type': 'application/json'
        })
      });
  }

  uploadInfoOnly(id: string, email: string, event_id: string) {
    const formData: FormData = new FormData();
    formData.append('paymentProof', this.fileToUpload, this.fileToUpload.name);
    return this.http.post(this.url, {
      id: id,
      email: email,
      event_id: event_id,
      formData,
      }, {
        headers: new HttpHeaders({
          'Content-Type': 'application/json'
        })
      });
    }

    /*getAttendeeId() {
      this.auth.getProofing.subscribe(params => {
        this.id = params.get("id")
      })
    }*/

}
