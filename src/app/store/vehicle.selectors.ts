import { createSelector, createFeatureSelector } from '@ngrx/store';
import { VehicleState } from './vehicle.reducer';

export const selectVehicleState = createFeatureSelector<VehicleState>('vehicle');

export const selectVehicleType = createSelector(
  selectVehicleState,
  (state: VehicleState) => state.vehicleType
);