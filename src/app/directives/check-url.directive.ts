import { HttpClient } from '@angular/common/http';
import { Directive } from '@angular/core';
import { AbstractControl, AsyncValidator, NG_ASYNC_VALIDATORS, ValidationErrors } from '@angular/forms';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

@Directive({
  selector: '[appCheckUrl]',
  providers: [{provide: NG_ASYNC_VALIDATORS, useExisting: CheckUrlDirective, multi: true}]
})
export class CheckUrlDirective implements AsyncValidator {

  constructor(private http: HttpClient) {}

  validate(control: AbstractControl): Observable<ValidationErrors|null> {
    let url = control.value
    console.log(control.value.indexOf('https://'))
    console.log(control.value.indexOf('http://'))
    if(control.value.indexOf('https://') === -1 && control.value.indexOf('http://') === -1){
      url = 'https://' + control.value  
    }else url = control.value  
    console.log(url)
    console.log(control.value)

    return this.http.get(`https://helloacm.com/api/can-visit/?url=${url}`).pipe(
      map((res:any)=> {
        console.log(res)
        if(res.code===200) return null
        return ({'appCheckUrl': {value: control.value}})
      })
    )
  }
}
