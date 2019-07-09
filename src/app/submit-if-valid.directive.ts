import { Directive, EventEmitter, HostListener, Input, Output } from '@angular/core';
import { FormGroup, FormControl } from '@angular/forms';

@Directive({
  selector: '[tsSubmitIfValid]',
})
export class SubmitIfValidDirective {

  @Output() valid  = new EventEmitter<void>();
  @Input('tsSubmitIfValid') formRef: FormGroup

  constructor() { }

  @HostListener('click')
  handleClick(){
    this.markFieldsAsDirtyAndTouched()
    this.markFieldsAsDirtyAndTouched2()
    this.emitIfValid()
  }

  private markFieldsAsDirtyAndTouched(){
    Object.keys(this.formRef.controls).forEach(
      fieldName=>{
        this.formRef.controls[fieldName].markAsDirty()
        this.formRef.controls[fieldName].markAsTouched()
      }
    )
  }

  private markFieldsAsDirtyAndTouched2() {
    Object.keys(this.formRef.controls).forEach(
      c=>{
        if((<any>this.formRef.controls[c]).controls){
          Object.keys((<any>this.formRef.controls[c]).controls).forEach(a=>{
            (<FormControl>(<FormGroup>this.formRef.controls[c]).controls[a]).markAsDirty();
            (<FormControl>(<FormGroup>this.formRef.controls[c]).controls[a]).markAsTouched();
           })
        }
      } 
    )
  }

  private emitIfValid(){
    if(this.formRef.valid) this.valid.emit()
  }

}
