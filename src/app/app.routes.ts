import { Routes, RouterModule } from '@angular/router';
import { LoginComponent } from '@/login';
import { LogoutComponent } from '@/logout';

import { AuthGuard } from './_guards/auth.guard';

import { VehicleListComponent } from './vehicle-list/vehicle-list.component';
import { VehicleStatsComponent } from './vehicle-stats/vehicle-stats.component';
import { MileageFormComponent } from './mileage-form/mileage-form.component';
import { AddVehicleComponent } from './add-vehicle/add-vehicle.component';
import { ManageUsersComponent } from './manage-users/manage-users.component';
import { EditUserComponent } from './edit-user/edit-user.component';
import { AddUserComponent } from './add-user/add-user.component';
import { VehicleSortingComponent } from './vehicle-sorting/vehicle-sorting.component';

const appRoutes: Routes = [
  { path: '',       component: LoginComponent },
  { path: 'login',  component: LoginComponent },
  { path: 'mileages', component: VehicleListComponent, canActivate: [AuthGuard] },
  { path: 'mileages/:id', component: VehicleListComponent, canActivate: [AuthGuard] },
  { path: 'vehicleStats/:id', component: VehicleStatsComponent, canActivate: [AuthGuard] },
  { path: 'vehicleSorting', component: VehicleSortingComponent, canActivate: [AuthGuard] },
  { path: 'addMileage/:vid', component: MileageFormComponent, canActivate: [AuthGuard] },
  { path: 'editMileage/:vid/:mid', component: MileageFormComponent, canActivate: [AuthGuard] },
  { path: 'addVehicle', component: AddVehicleComponent, canActivate: [AuthGuard] },
  { path: 'manageUsers', component: ManageUsersComponent, canActivate: [AuthGuard] },
  { path: 'addUser', component: AddUserComponent, canActivate: [AuthGuard] },
  { path: 'editUser/:id', component: EditUserComponent, canActivate: [AuthGuard] },
  { path: 'logout', component: LogoutComponent },
  { path: '**',     component: LoginComponent },
];

export const routing = RouterModule.forRoot(appRoutes, {});
