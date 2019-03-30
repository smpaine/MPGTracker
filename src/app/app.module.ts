import { BrowserModule } from '@angular/platform-browser';
import { RouterModule } from '@angular/router';
import { HttpModule } from '@angular/http';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { NgModule } from '@angular/core';

import { AuthGuard } from './common/auth.guard';
import { Login } from './login/login';
import { Logout } from './logout/logout';
import { AppComponent } from './app.component';

import { routes } from './app.routes';

import { SessionService } from './shared/session.service';

import { VehicleListComponent } from './vehicle-list/vehicle-list.component';
import { VehicleFormComponent } from './vehicle-form/vehicle-form.component';
import { VehicleService } from './shared/vehicle.service';
import { VehicleMileageComponent } from './vehicle-mileage/vehicle-mileage.component';
import { MileageService } from './shared/mileage.service';
import { MileageFormComponent } from './mileage-form/mileage-form.component';
import { AddVehicleComponent } from './add-vehicle/add-vehicle.component';

@NgModule({
    declarations: [Login, Logout, VehicleListComponent, VehicleFormComponent, VehicleMileageComponent, MileageFormComponent, AddVehicleComponent, AppComponent],
    imports: [BrowserModule, HttpModule, CommonModule, FormsModule, RouterModule.forRoot(routes, {useHash: true})],
    providers: [AuthGuard, SessionService, VehicleService, MileageService],
    bootstrap: [AppComponent]
})

export class AppModule {

}
