import { Component, OnInit } from '@angular/core';
import { AdminService } from '../services/admin.service';
import { Observable } from 'rxjs';
import { Router, ActivatedRoute, ParamMap } from '@angular/router';

@Component({
  selector: 'app-admin-view',
  templateUrl: './admin-view.component.html',
  styleUrls: ['./admin-view.component.css']
})
export class AdminViewComponent implements OnInit {

  verified = false;
  userData;

  constructor(
    private admin: AdminService, 
    private route: Router) { }

  ngOnInit(): void {
    this.admin.isAdmin().subscribe(
      data => {
        console.log('success', data); 
        this.verified=true;
        this.getUserData();
      },
      error => {this.route.navigate(['/'])}
    );
    console.log(this.verified);
    
  }

  getUserData(){
    if(this.verified){
      this.admin.getUsers().subscribe(data => {
        this.userData = data;
        console.log(this.userData);
      })
    }
  }
}
