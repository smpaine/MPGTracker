import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpModule }           from '@angular/http';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { VehicleListComponent } from './vehicle-list/vehicle-list.component';
import { VehicleCardComponent } from './vehicle-card/vehicle-card.component';
import { VehicleFormComponent } from './vehicle-form/vehicle-form.component';
import { VehicleDetailComponent } from './vehicle-detail/vehicle-detail.component';
import { VehicleService } from './shared/vehicle.service';

@NgModule({
    declarations: [VehicleListComponent, VehicleCardComponent, VehicleFormComponent, VehicleDetailComponent],
    imports: [BrowserModule, HttpModule, CommonModule, FormsModule],
    providers: [VehicleService],
    bootstrap: [VehicleListComponent]
})

export class VehiclesModule {

}
