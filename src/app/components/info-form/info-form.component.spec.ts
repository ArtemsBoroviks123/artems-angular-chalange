import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ReactiveFormsModule } from '@angular/forms';
import { provideMockStore, MockStore } from '@ngrx/store/testing';
import { InfoFormComponent } from './info-form.component';
import { VehicleState } from 'src/app/store/vehicle.reducer';
import { setVehicleType } from 'src/app/store/vehicle.actions';
import { VechicleSubType, MotoSubType } from 'src/app/global.const';

describe('InfoFormComponent', () => {
  let component: InfoFormComponent;
  let fixture: ComponentFixture<InfoFormComponent>;
  let store: MockStore<{ vehicle: VehicleState }>;
  const initialState = { vehicle: { type: null } };

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ReactiveFormsModule],
      declarations: [InfoFormComponent],
      providers: [provideMockStore({ initialState })]
    }).compileComponents();

    fixture = TestBed.createComponent(InfoFormComponent);
    component = fixture.componentInstance;
    store = TestBed.inject(MockStore);
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  describe('getSubTypes', () => {
    it('should return VechicleSubType for Auto', () => {
      expect(component.getSubTypes('Auto')).toEqual(VechicleSubType);
    });

    it('should return MotoSubType for Motor', () => {
      expect(component.getSubTypes('Motor')).toEqual(MotoSubType);
    });

    it('should return empty array for Scooter', () => {
      expect(component.getSubTypes('Scooter')).toEqual([]);
      expect(component.getSubTypes(null)).toEqual([]);
    });
  });

  describe('getImgLink', () => {
    it('should return correct image path for Auto', () => {
      expect(component.getImgLink('Auto')).toBe('./assets/auto.jpg');
    });

    it('should return correct image path for Motor', () => {
      expect(component.getImgLink('Motor')).toBe('./assets/motor.jpg');
    });

    it('should return correct image path for Scooter', () => {
      expect(component.getImgLink('Scooter')).toBe('./assets/scooter.jpg');
    });

    it('should return default image', () => {
      expect(component.getImgLink(null)).toBe('./assets/auto.jpg');
    });
  });

  describe('IsLicencePlateValid', () => {
    it('should be invalid when empty', () => {
      component.form.get('licencePlate')?.setValue('');
      expect(component.IsLicencePlateValid).toBeFalse();
    });

    it('should be valid for a correct value', () => {
      component.form.get('licencePlate')?.setValue('12BB34');
      expect(component.IsLicencePlateValid).toBeTrue();
    });
  });

  describe('valueChanges subscription', () => {
    it('should dispatch setVehicleType when vechicleType changes', () => {
      const dispatchSpy = spyOn(store, 'dispatch');
      component.form.get('vechicleType')?.setValue('Motor');
      expect(dispatchSpy).toHaveBeenCalledWith(setVehicleType({ vehicleType: 'Motor' }));
    });
  });
});