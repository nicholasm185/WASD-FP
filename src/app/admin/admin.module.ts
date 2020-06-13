import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AdminRoutingModule } from './admin-routing.module';
import { AdminComponent } from './admin.component';
import { AdminViewComponent } from './admin-view/admin-view.component';

import { AuthGuard } from '../guards/auth.guard';
import { TokenInterceptorService } from '../services/token-interceptor.service';
import { HTTP_INTERCEPTORS } from '@angular/common/http';
import { AdminService } from './services/admin.service';


@NgModule({
  declarations: [AdminComponent, AdminViewComponent],
  imports: [
    CommonModule,
    AdminRoutingModule
  ],
  providers: [
    AuthGuard,
    {
      provide: HTTP_INTERCEPTORS,
      useClass: TokenInterceptorService,
      multi: true,
    }, AdminService
  ]
})
export class AdminModule { }
