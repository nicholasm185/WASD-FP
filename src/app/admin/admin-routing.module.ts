import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AdminViewComponent } from './admin-view/admin-view.component';
import { AdminComponent } from './admin.component';
import { AuthGuard } from '../guards/auth.guard';

const routes: Routes = [
  { path: '', component: AdminComponent, canActivate: [AuthGuard], children:
  [
    { path: '', redirectTo: 'users', pathMatch: 'full'},
    { path: 'users', component: AdminViewComponent}] }

];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AdminRoutingModule { }
