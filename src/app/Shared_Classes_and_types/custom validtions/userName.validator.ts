import { AbstractControl } from "@angular/forms";

export function ForviddenNameValidator(control: AbstractControl) {
  const forbidden = /admin|administrator/.test(control.value)
  return forbidden ? { 'forbiddenName': { value: control.value } } : null;
}
