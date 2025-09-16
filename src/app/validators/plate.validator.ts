import { AbstractControl, ValidationErrors, ValidatorFn } from '@angular/forms';
import { KentekenCheck } from 'rdw-kenteken-check';

export function plateValidator(): ValidatorFn {
  return (control: AbstractControl): ValidationErrors | null => {
    if (!control.value) return null;

    const normalizedValue = control.value.replace(/-/g, '').toUpperCase();
    const plate = new KentekenCheck(normalizedValue);
    plate.formatLicense();
    const isValid = plate.valid;

    return isValid ? null : { invalid: true };
  };
}