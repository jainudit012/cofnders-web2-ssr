import { Directive, Input } from '@angular/core';
import { NG_VALIDATORS, AbstractControl, ValidatorFn } from '@angular/forms';

export function forbiddenInputValidator(): ValidatorFn {
  return (control: AbstractControl): {[key: string]: any} | null => {
    let nameRe = new RegExp('^[a-zA-Z].*')
    let allowed 
    allowed = nameRe.test(control.value)

    if(control.value.indexOf(' ')> 0){
      let str = (<string>control.value).split(' ')[0]
      allowed = nameRe.test(str)
    }
    else { allowed = nameRe.test(control.value) }
    return !allowed ? {'appBadInput': {value: control.value}} : null
  }
}

@Directive({
  selector: '[appBadInput]',
  providers: [{provide: NG_VALIDATORS, useExisting: BadInputDirective, multi: true}]
})
export class BadInputDirective {

  validate(control: AbstractControl): {[key: string]: any} | null {
    return control.value ? forbiddenInputValidator()(control): null
  }

}
