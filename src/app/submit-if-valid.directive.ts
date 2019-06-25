import { Directive, EventEmitter, HostListener, Input, Output } from '@angular/core';
import { FormGroup } from '@angular/forms';

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

  private emitIfValid(){
    if(this.formRef.valid) this.valid.emit()
  }

}
