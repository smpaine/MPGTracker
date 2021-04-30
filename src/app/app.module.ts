import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NgModule } from '@angular/core';

import { AuthGuard } from '@/_guards/auth.guard';
import { JwtInterceptor, ErrorInterceptor } from '@/_helpers';

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
import { ChangePasswordComponent } from './change-password/change-password.component';
import { ManageUsersComponent } from './manage-users/manage-users.component';
import { UserService } from './services/user.service';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';
import { MatSliderModule } from '@angular/material/slider';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatMenuModule } from '@angular/material/menu';
import { MatIconModule } from '@angular/material/icon';
import { MatTableModule } from '@angular/material/table';
import { MatInputModule } from '@angular/material/input';

@NgModule({
    imports: [
        BrowserModule,
        ReactiveFormsModule,
        HttpClientModule,
        CommonModule,
        FormsModule,
        routing,
        NoopAnimationsModule,
        MatSliderModule,
        MatToolbarModule,
        MatMenuModule,
        MatIconModule,
        MatTableModule,
        MatInputModule
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
        ChangePasswordComponent,
        ManageUsersComponent,
        AppComponent
    ],
    providers: [
        { provide: HTTP_INTERCEPTORS, useClass: JwtInterceptor, multi: true },
        { provide: HTTP_INTERCEPTORS, useClass: ErrorInterceptor, multi: true },
        AuthGuard,
        VehicleService,
        MileageService,
        UserService
    ],
    bootstrap: [AppComponent]
})

export class AppModule {

}
