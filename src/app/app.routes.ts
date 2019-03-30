import { Routes } from '@angular/router';
import { Login } from './login/login';
import { Logout } from './logout/logout';

import { AuthGuard } from './common/auth.guard';

import { VehicleListComponent } from './vehicle-list/vehicle-list.component';
import { MileageFormComponent } from './mileage-form/mileage-form.component';

export const routes: Routes = [
  { path: '',       component: Login },
  { path: 'login',  component: Login },
  { path: 'mileages', component: VehicleListComponent, canActivate: [AuthGuard] },
  { path: 'mileages/:id', component: VehicleListComponent, canActivate: [AuthGuard] },
  { path: 'addMileage/:id', component: MileageFormComponent, canActivate: [AuthGuard] },
  { path: 'logout', component: Logout },
  { path: '**',     component: Login },
];
