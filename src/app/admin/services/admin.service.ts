import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class AdminService {

  verifyAdminURL = 'https://backend.ticketmaya.me/api/admin/amIAdmin'
  getUsersURL = 'https://backend.ticketmaya.me/api/admin/getUsers'
  banUserURL = 'https://backend.ticketmaya.me/api/admin/banUser'
  unbanUserURL = 'https://backend.ticketmaya.me/api/admin/unbanUser'

  constructor(private http: HttpClient) { }

  public isAdmin(){
    return this.http.get(this.verifyAdminURL)
  }

  public getUsers(){
    return this.http.get(this.getUsersURL)
  }
}
