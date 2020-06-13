<<<<<<< HEAD
import {AfterViewInit, Component, ElementRef, OnInit, ViewChild} from '@angular/core';
import { AdminComponent } from '../admin.component';
import { ActivatedRoute, Router } from '@angular/router';
import {merge, fromEvent, VirtualTimeScheduler, Observable, Subject} from 'rxjs';
import {debounceTime, distinctUntilChanged, startWith, tap, delay, takeUntil} from 'rxjs/operators';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { User } from '../../interfaces/user';
import { MatTableDataSource } from '@angular/material/table';
=======
import { Component, OnInit } from '@angular/core';
import { AdminService } from '../services/admin.service';
import { Observable } from 'rxjs';
import { Router, ActivatedRoute, ParamMap } from '@angular/router';
>>>>>>> 3c7a69c2dbafe5eb2176ac64280f7421513a0f8d

@Component({
  selector: 'app-admin-view',
  templateUrl: './admin-view.component.html',
  styleUrls: ['./admin-view.component.css']
})
export class AdminViewComponent implements OnInit, AfterViewInit  {

<<<<<<< HEAD
  data;
  dataSource;
  loaded = false;
  userObs: Observable<string[]>;
  dataUnformatted: User[];
  storedTheme: string = localStorage.getItem('theme');

  constructor(public admin: AdminComponent, public route: ActivatedRoute,  private router: Router) { }

  displayedColumns = ['id', 'name', 'email', 'verified_at', 'banned'];

  private ngUnsubscribe = new Subject();

  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;
  @ViewChild('input') input: ElementRef;

  ngOnInit(): void {
    this.admin.showUsers().pipe(takeUntil(this.ngUnsubscribe)).subscribe(
      (res: User[]) => {if (res) {this.dataUnformatted = res;
                                  this.dataSource = new MatTableDataSource(this.dataUnformatted);
                                  this.loaded = true; this.dataSource.sort = this.sort; this.dataSource.paginator = this.paginator; }}
    );

    // this.data = this.route.snapshot.data['users'];
    // this.usersData = new usersData(this.admin);
    // this.usersData.loadUsers(this.data.id, '', 'asc', 0, 5);
  }

  ngAfterViewInit() {

    // server-side search
    fromEvent(this.input.nativeElement, 'keyup')
        .pipe(
            debounceTime(150),
            distinctUntilChanged(),
            tap(() => {
                this.paginator.pageIndex = 0;
                this.loadUsersPage();
            })
        )
        .subscribe();

    // reset the paginator after sorting
    this.sort.sortChange.subscribe(() => this.paginator.pageIndex = 0);

    // on sort or paginate events, load a new page
    merge(this.sort.sortChange, this.paginator.page)
    .pipe(
        tap(() => this.loadUsersPage())
    )
    .subscribe();
}

ngOnDestroy(): void {
  this.ngUnsubscribe.next();
  this.ngUnsubscribe.complete();
}

applyFilter($event) {
  this.dataSource.filter = $event.target.value.toLowerCase();
}

indexUsers() {
  this.admin.showUsers().subscribe((data) => {
    // all data of the event is stored in this.data
    this.data = data['users'];
    console.log(this.data);

  });
  }

loadUsersPage() {
  this.dataSource.loadUsers(
      this.data.id,
      this.input.nativeElement.value,
      this.sort.direction,
      this.paginator.pageIndex,
      this.paginator.pageSize);
}

  onRowClicked(row) {
    console.log('Row clicked: ', row);
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


=======
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
>>>>>>> 3c7a69c2dbafe5eb2176ac64280f7421513a0f8d
}
