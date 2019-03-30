import { Routes } from '@angular/router';
import { Login } from './login/login';
import { Logout } from './logout/logout';
import { VehicleListComponent } from './vehicle-list/vehicle-list.component';
import { AuthGuard } from './common/auth.guard';

export const routes: Routes = [
  { path: '',       component: Login },
  { path: 'login',  component: Login },
  { path: 'mileages', component: VehicleListComponent, canActivate: [AuthGuard] },
  { path: 'logout', component: Logout },
  { path: '**',     component: Login },
];
