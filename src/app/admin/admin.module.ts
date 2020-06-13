import { NgModule, ErrorHandler } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AuthGuard } from '../guards/auth.guard';
import { AdminRoutingModule } from './admin-routing.module';
import { AdminComponent } from './admin.component';
import { AdminViewComponent } from './admin-view/admin-view.component';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { TokenInterceptorService } from '../services/token-interceptor.service';

import { MatTableModule } from '@angular/material/table';
import { MatInputModule } from '@angular/material/input';
import { MatSortModule } from '@angular/material/sort';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import {MatFormFieldModule} from '@angular/material/form-field';
import { AdminService } from './services/admin.service';

@NgModule({
  declarations: [AdminComponent, AdminViewComponent],
  imports: [
    CommonModule,
    AdminRoutingModule,
    // BrowserModule,
    // BrowserAnimationsModule,
    HttpClientModule,
    MatInputModule,
    MatTableModule,
    MatPaginatorModule,
    MatSortModule,
    MatFormFieldModule,
    MatProgressSpinnerModule,
    AdminRoutingModule
  ],
  providers: [
    AuthGuard,
    {
      provide: HTTP_INTERCEPTORS,
      useClass: TokenInterceptorService,
      multi: true,
    },
    AdminService
  ],
  bootstrap: [AdminComponent]
  },
)

export class AdminModule { }
