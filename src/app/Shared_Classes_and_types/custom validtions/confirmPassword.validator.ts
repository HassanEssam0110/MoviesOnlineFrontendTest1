import { AbstractControl } from "@angular/forms";


export function confirmPasswordValidator(control: AbstractControl) {
  const password = control.get('password');
  const confitmPassword = control.get('confirmPassword');

  if (password?.pristine || confitmPassword?.pristine) {
    return null
  }
  return password && confitmPassword && password.value != confitmPassword.value ?
    { 'misMatch': true } : null;

}
