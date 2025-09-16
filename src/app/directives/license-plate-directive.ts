import { Directive, ElementRef, HostListener } from '@angular/core';

@Directive({
  selector: '[licensePlateFormat]'
})
export class LicensePlateFormatDirective {
  constructor(private el: ElementRef<HTMLInputElement>) {}
  @HostListener('blur')
  @HostListener('input')
  onEvent() {
    const input = this.el.nativeElement;
    const oldValue = input.value;
    const newValue = this.formatLicensePlate(oldValue);
    if (newValue !== oldValue) {
      input.value = newValue;
      input.dispatchEvent(new Event('input', { bubbles: true }));
    }
  }

  private formatLicensePlate(raw: string): string {
    if (!raw) return '';
    const cleaned = raw.replace(/[^a-zA-Z0-9]/g, '').toUpperCase();
    const match = cleaned.match(/^(\d+)([A-Z]{4})$/);
    if (match) {
      const [, digits, letters] = match;
      return `${digits}-${letters.slice(0, 2)}-${letters.slice(2)}`;
    }
    const runs = cleaned.match(/[A-Z]+|\d+/g) || [];
    return runs.join('-');
  }
}