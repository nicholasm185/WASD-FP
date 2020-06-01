import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatDialogModule, MAT_DIALOG_DEFAULT_OPTIONS } from '@angular/material/dialog';
import { MatButtonModule } from '@angular/material/button';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { NavbarComponent } from './navbar/navbar.component';
import { SearchComponent } from './search/search.component';
import { CreateEventComponent } from './create-event/create-event.component';
import { BuyComponent } from './buy/buy.component';
import { HomeComponent } from './home/home.component';
import { LoginComponent } from './login/login.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { SignupComponent } from './signup/signup.component';
import { FooterComponent } from './footer/footer.component';
import { ImLostComponent } from './im-lost/im-lost.component';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { AuthService } from './services/auth.service';
import { AuthGuard } from './guards/auth.guard';
import { DashboardComponent } from './dashboard/dashboard.component';
import { TokenInterceptorService } from './services/token-interceptor.service';
import { FileUploadComponent } from './upload/file-upload/file-upload.component';
import { FileUploadService } from './services/file-upload.service';
import { ConfirmationComponent } from './upload/confirmation/confirmation.component';
import { SuccessComponent } from './buy/success/success.component';
import { CancelComponent } from './buy/cancel/cancel.component';
import { EventPageComponent } from './event-page/event-page.component';


@NgModule({
  declarations:
  [
    AppComponent,
    NavbarComponent,
    SearchComponent,
    CreateEventComponent,
    BuyComponent,
    HomeComponent,
    LoginComponent,
    SignupComponent,
    FooterComponent,
    ImLostComponent,
    DashboardComponent,
    FileUploadComponent,
    ConfirmationComponent,
    SuccessComponent,
    CancelComponent,
    EventPageComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    ReactiveFormsModule,
    HttpClientModule,
    MatDialogModule,
    MatButtonModule
  ],
  providers: [
    AuthService,
    AuthGuard,
    {
      provide: HTTP_INTERCEPTORS,
      useClass: TokenInterceptorService,
      multi: true,
    },
    FileUploadService,
    {
      provide: MAT_DIALOG_DEFAULT_OPTIONS,
      useValue: {hasBackdrop: false, direction: 'ltr'}
    },
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
