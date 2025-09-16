import { Component } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { MotoSubType, VechicleSubType } from 'src/app/global.const';
import { setVehicleType } from 'src/app/store/vehicle.actions';
import { VehicleState } from 'src/app/store/vehicle.reducer';
import { selectVehicleType } from 'src/app/store/vehicle.selectors';
import { plateValidator } from 'src/app/validators/plate.validator';

@Component({
  selector: 'app-info-form',
  templateUrl: './info-form.component.html',
  styleUrls: ['./info-form.component.css']
})
export class InfoFormComponent {

  public vehicleType$: Observable<string | null>;
  public vehicleTypes = ['Auto', 'Motor', 'Scooter'];
 

  public form = new FormGroup({
    vechicleType: new FormControl('', Validators.required),
    vechicleSubType: new FormControl('', Validators.required),
    licencePlate: new FormControl('', [Validators.required, plateValidator()]),
  });
  
  constructor(private store: Store<{ vehicle: VehicleState }>) {
    this.vehicleType$ = this.store.select(selectVehicleType);    
    this.form.get('vechicleType')?.valueChanges.subscribe(value => {
     this.store.dispatch(setVehicleType({ vehicleType: value }));
    });
  }

  public get IsLicencePlateValid(): boolean | undefined {
    return this.form.get('licencePlate')?.valid;
  }
  
  public getSubTypes(type: string | null):string[] {      
    switch (type) {
      case 'Auto':
        return VechicleSubType;
      case 'Motor':
        return MotoSubType;
      default:
        return [];
    }    
  }

  public getImgLink(type: string | null): string {
    switch (type) {
      case 'Auto':
        return './assets/auto.jpg';
      case 'Motor':
        return './assets/motor.jpg';
      case 'Scooter':
        return './assets/scooter.jpg';
      default:
        return './assets/auto.jpg';
    }
  }

  public onSubmit(): void {
    alert(JSON.stringify(this.form.getRawValue(), null, 2));
    this.form.reset(); 
  }
}
