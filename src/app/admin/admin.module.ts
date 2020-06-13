import { NgModule, ErrorHandler } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AppComponent } from '../app.component';
import { AppModule } from '../app.module';

import { AuthGuard } from '../guards/auth.guard';
import { AdminRoutingModule } from './admin-routing.module';
import { AdminComponent } from './admin.component';
import { AdminViewComponent } from './admin-view/admin-view.component';
<<<<<<< HEAD
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { TokenInterceptorService } from '../services/token-interceptor.service';
import { MatTableModule } from '@angular/material/table';
import { MatInputModule } from '@angular/material/input';
import { MatSortModule } from '@angular/material/sort';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
=======

import { AuthGuard } from '../guards/auth.guard';
import { TokenInterceptorService } from '../services/token-interceptor.service';
import { HTTP_INTERCEPTORS } from '@angular/common/http';
import { AdminService } from './services/admin.service';

>>>>>>> 3c7a69c2dbafe5eb2176ac64280f7421513a0f8d

@NgModule({
  declarations: [AdminComponent, AdminViewComponent],
  imports: [
    CommonModule,
<<<<<<< HEAD
    AdminRoutingModule,
    // BrowserModule,
    // BrowserAnimationsModule,
    HttpClientModule,
    MatInputModule,
    MatTableModule,
    MatPaginatorModule,
    MatSortModule,
    MatProgressSpinnerModule
=======
    AdminRoutingModule
>>>>>>> 3c7a69c2dbafe5eb2176ac64280f7421513a0f8d
  ],
  providers: [
    AuthGuard,
    {
      provide: HTTP_INTERCEPTORS,
      useClass: TokenInterceptorService,
      multi: true,
<<<<<<< HEAD
    },
  ],
  bootstrap: [AdminComponent]

=======
    }, AdminService
  ]
>>>>>>> 3c7a69c2dbafe5eb2176ac64280f7421513a0f8d
})
export class AdminModule { }
