import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AdminService {

  verifyAdminURL = 'https://backend.ticketmaya.me/api/admin/amIAdmin';
  getUsersURL = 'https://backend.ticketmaya.me/api/admin/getUsers';
  banUserURL = 'https://backend.ticketmaya.me/api/admin/banUser';
  unbanUserURL = 'https://backend.ticketmaya.me/api/admin/unbanUser';

  constructor(private http: HttpClient) { }

  public isAdmin() {
    return this.http.get(this.verifyAdminURL);
  }

  public getUsers(): Observable<any> {
    return this.http.get(this.getUsersURL);
  }

  public banUser(data){
    return this.http.post(this.banUserURL, data);
  }

  public unbanUser(data){
    return this.http.post(this.unbanUserURL, data);
  }
}
