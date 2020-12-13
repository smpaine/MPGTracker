import { BrowserModule } from '@angular/platform-browser';
import { RouterModule } from '@angular/router';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NgModule } from '@angular/core';

import { AuthGuard } from '@/_guards/auth.guard';
import { JwtInterceptor, ErrorInterceptor } from '@/_helpers';
import { AuthenticationService } from '@/_services';

import { LoginComponent } from '@/login';
import { LogoutComponent } from '@/logout';

import { AppComponent } from './app.component';

import { routing } from './app.routes';

import { VehicleListComponent } from './vehicle-list/vehicle-list.component';
import { VehicleFormComponent } from './vehicle-form/vehicle-form.component';
import { VehicleService } from './services/vehicle.service';
import { VehicleMileageComponent } from './vehicle-mileage/vehicle-mileage.component';
import { MileageService } from './services/mileage.service';
import { MileageFormComponent } from './mileage-form/mileage-form.component';
import { AddVehicleComponent } from './add-vehicle/add-vehicle.component';

import { OnlyNumber } from './directives/onlynumber.directive';

@NgModule({
    imports: [
        BrowserModule,
        ReactiveFormsModule,
        HttpClientModule,
        CommonModule,
        FormsModule,
        routing
    ],
    declarations: [
        LoginComponent,
        LogoutComponent,
        OnlyNumber,
        VehicleListComponent,
        VehicleFormComponent,
        VehicleMileageComponent,
        MileageFormComponent,
        AddVehicleComponent,
        AppComponent
    ],
    providers: [
        { provide: HTTP_INTERCEPTORS, useClass: JwtInterceptor, multi: true },
        { provide: HTTP_INTERCEPTORS, useClass: ErrorInterceptor, multi: true },
        AuthGuard,
        VehicleService,
        MileageService
    ],
    bootstrap: [AppComponent]
})

export class AppModule {

}
