import { Routes, RouterModule } from '@angular/router';
import { LoginComponent } from '@/login';
import { LogoutComponent } from '@/logout';

import { AuthGuard } from './_guards/auth.guard';

import { VehicleListComponent } from './vehicle-list/vehicle-list.component';
import { MileageFormComponent } from './mileage-form/mileage-form.component';
import { AddVehicleComponent } from './add-vehicle/add-vehicle.component';
import { ChangePasswordComponent } from './change-password/change-password.component';
import { ManageUsersComponent } from './manage-users/manage-users.component';
import { EditUserComponent } from './edit-user/edit-user.component';

const appRoutes: Routes = [
  { path: '',       component: LoginComponent },
  { path: 'login',  component: LoginComponent },
  { path: 'mileages', component: VehicleListComponent, canActivate: [AuthGuard] },
  { path: 'mileages/:id', component: VehicleListComponent, canActivate: [AuthGuard] },
  { path: 'addMileage/:vid', component: MileageFormComponent, canActivate: [AuthGuard] },
  { path: 'editMileage/:vid/:mid', component: MileageFormComponent, canActivate: [AuthGuard] },
  { path: 'addVehicle', component: AddVehicleComponent, canActivate: [AuthGuard] },
  { path: 'changePassword', component: ChangePasswordComponent, canActivate: [AuthGuard] },
  { path: 'manageUsers', component: ManageUsersComponent, canActivate: [AuthGuard] },
  { path: 'editUser/:id', component: EditUserComponent, canActivate: [AuthGuard] },
  { path: 'logout', component: LogoutComponent },
  { path: '**',     component: LoginComponent },
];

export const routing = RouterModule.forRoot(appRoutes, { relativeLinkResolution: 'legacy' });
