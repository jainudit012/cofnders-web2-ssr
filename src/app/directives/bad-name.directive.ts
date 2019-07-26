import { Directive, Input } from '@angular/core';
import { NG_VALIDATORS, AbstractControl, ValidatorFn } from '@angular/forms';

export function forbiddenNameValidator(): ValidatorFn {
  return (control: AbstractControl): {[key: string]: any} | null => {
    let nameRe = new RegExp("^[a-zA-Z]'?([a-zA-Z]|\.| |-)+$")
    let allowed 
    allowed = nameRe.test(control.value)
    return !allowed ? {'appBadName': {value: control.value}} : null
  }
}

@Directive({
  selector: '[appBadName]',
  providers: [{provide: NG_VALIDATORS, useExisting: BadNameDirective, multi: true}]
})
export class BadNameDirective {
  validate(control: AbstractControl): {[key: string]: any} | null {
    return control.value ? forbiddenNameValidator()(control): null
  }
}