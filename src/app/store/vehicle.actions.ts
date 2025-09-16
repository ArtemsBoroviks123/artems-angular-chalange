import { createAction, props } from '@ngrx/store';

export const setVehicleType = createAction(
  '[Vehicle] Set Vehicle Type',
  props<{ vehicleType: string | null }>()
);