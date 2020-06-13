import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AdminViewComponent } from './admin-view/admin-view.component';
import { AdminComponent } from './admin.component';
import { AuthGuard } from '../guards/auth.guard';

<<<<<<< HEAD
const routes: Routes = [

  { path: '', component: AdminComponent, children: [
    { path: '', redirectTo: 'users', pathMatch: 'full'},
    { path: 'users', component: AdminViewComponent}] }

];
=======
const routes: Routes = [{ path: '', component: AdminComponent, canActivate: [AuthGuard] }];
>>>>>>> 3c7a69c2dbafe5eb2176ac64280f7421513a0f8d

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AdminRoutingModule { }
