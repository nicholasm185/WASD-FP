import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { SearchComponent } from './search/search.component';
import { HomeComponent } from './home/home.component';
import { LoginComponent } from './login/login.component';
import { SignupComponent } from './signup/signup.component';
import { ImLostComponent } from './im-lost/im-lost.component';
import { CreateEventComponent } from './create-event/create-event.component';
import { BuyComponent } from './buy/buy.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { AuthGuard } from './guards/auth.guard';
import { FileUploadComponent } from './upload/file-upload/file-upload.component';

const routes: Routes = [
  {path: '' , component: HomeComponent},
  {path: 'search', component: SearchComponent},
  {path: 'login', component: LoginComponent},
  {path: 'signup', component: SignupComponent},
  {path: 'create', component: CreateEventComponent, canActivate: [AuthGuard]},
  {path: 'buy', component: BuyComponent},
  {path: 'dashboard', component: DashboardComponent, canActivate: [AuthGuard]},

  {path: 'proofing', component: FileUploadComponent},
  {path: '**', component: ImLostComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
