import { Routes, RouterModule } from '@angular/router';
import { Login } from './login/login';
import { Logout } from './logout/logout';

import { AuthGuard } from './_guards/auth.guard';

import { VehicleListComponent } from './vehicle-list/vehicle-list.component';
import { MileageFormComponent } from './mileage-form/mileage-form.component';
import { AddVehicleComponent } from './add-vehicle/add-vehicle.component';

const appRoutes: Routes = [
  { path: '',       component: Login },
  { path: 'login',  component: Login },
  { path: 'mileages', component: VehicleListComponent, canActivate: [AuthGuard] },
  { path: 'mileages/:id', component: VehicleListComponent, canActivate: [AuthGuard] },
  { path: 'addMileage/:id', component: MileageFormComponent, canActivate: [AuthGuard] },
  { path: 'addVehicle', component: AddVehicleComponent, canActivate: [AuthGuard] },
  { path: 'logout', component: Logout },
  { path: '**',     component: Login },
];

export const routing = RouterModule.forRoot(appRoutes);
