import { createReducer, on } from '@ngrx/store';
import { setVehicleType } from './vehicle.actions';

export interface VehicleState {
  vehicleType: string | null;
}

export const initialState: VehicleState = {
  vehicleType: null
};

export const vehicleReducer = createReducer(
  initialState,
  on(setVehicleType, (state, { vehicleType }) => ({ ...state, vehicleType }))
);