import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppComponent } from './app.component';
import { StoreModule } from '@ngrx/store';
import { ReactiveFormsModule } from '@angular/forms';
import { vehicleReducer } from './store/vehicle.reducer';
import { LicensePlateFormatDirective } from './directives/license-plate-directive';
import { InfoFormComponent } from './components/info-form/info-form.component';

@NgModule({
  declarations: [
    AppComponent,
    LicensePlateFormatDirective,
    InfoFormComponent
  ],
  imports: [
    BrowserModule,
    ReactiveFormsModule,
    StoreModule.forRoot({ vehicle: vehicleReducer })
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
