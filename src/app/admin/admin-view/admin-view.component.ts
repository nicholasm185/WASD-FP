import {Component, OnDestroy, OnInit, ViewChild} from '@angular/core';
import {Observable, Subject} from 'rxjs';
import {debounceTime, distinctUntilChanged, switchMap, takeUntil} from 'rxjs/operators';
import {MatTableDataSource} from '@angular/material/table';
import { MatSort, MatSortModule} from '@angular/material/sort';
import {MatPaginator} from '@angular/material/paginator';
import {ActivatedRoute, Router} from '@angular/router';
import { AdminService } from '../services/admin.service';
import {User} from '../../interfaces/user';
@Component({
  selector: 'app-admin-view',
  templateUrl: './admin-view.component.html',
  styleUrls: ['./admin-view.component.css']
})
export class AdminViewComponent implements OnInit, OnDestroy {

  constructor(private admin: AdminService , private route: ActivatedRoute, private router: Router) { }
  displayedColumns: string[] = ['id', 'name', 'email', 'verified_at', 'banned', 'action'];
  dataUnformated: User[];
  dataSource ;
  loaded = false;
  storedTheme: string = localStorage.getItem('theme');
  private ngUnsubscribe = new Subject();

  @ViewChild(MatSort) sort: MatSort;
  @ViewChild(MatPaginator) paginator: MatPaginator;

  ngOnInit(): void {
    this.admin.getUsers().pipe(takeUntil(this.ngUnsubscribe)).subscribe(
      (res: User[]) => {if (res) {this.dataUnformated = res;
                                  this.dataSource = new MatTableDataSource(this.dataUnformated);
                                  this.loaded = true; this.dataSource.sort = this.sort; this.dataSource.paginator = this.paginator;
                                 } }, error => {this.router.navigate(['/'])}
    );
  }

  ngOnDestroy(): void {
    this.ngUnsubscribe.next();
    this.ngUnsubscribe.complete();
  }

  applyFilter($event) {
    this.dataSource.filter = $event.target.value.toLowerCase();
  }

  banUser(id: number, email: string){
    if (confirm('Are you sure of this action?')) {
      const data = {
        id: id,
        email: email
      }
      this.admin.banUser(data).subscribe(data => {
        console.log(data);
        this.ngOnInit();
      });
    } else {
      alert('Action cancelled');
    }
  }

  unbanUser(id: number, email:string){
    if (confirm('Are you sure of this action?')) {
      const data = {
        id: id,
        email: email
      }
      this.admin.unbanUser(data).subscribe(data => {
        console.log(data);
        this.ngOnInit();
      });
    } else {
      alert('Action cancelled');
    }
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

    goBack() {
      this.router.navigate(['dashboard']);
    }
}
