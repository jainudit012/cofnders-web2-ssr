import { Component, Inject, OnInit, Optional } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';

import { UserType } from '../../../models/user.model';
import { DataService } from '../../../services/data.service';

@Component({
  selector: 'app-get-in-touch-form',
  templateUrl: './get-in-touch-form.component.html',
  styleUrls: ['./get-in-touch-form.component.scss'],
  providers: [
    // { provide: MAT_DIALOG_DATA, useValue: {user: {name: 'Udit Jain.'}, token: 'dwqoidowdouwoduweoud'} },
  ]
})
export class GetInTouchFormComponent implements OnInit {

  userTypes: string[]

  form = new FormGroup({
    userType: new FormControl('', Validators.required),
    linkedInLink: new FormControl('', [Validators.required, Validators.pattern('^.*(?:linkedin\.com).*$')]),
    message : new FormControl('', [Validators.required, Validators.minLength(16), Validators.maxLength(300)])
  })

  constructor(public dialogRef: MatDialogRef<GetInTouchFormComponent>,
    @Optional() @Inject(MAT_DIALOG_DATA) private data: any,
    public dataService: DataService) { }

  ngOnInit() {
    this.userTypes = [UserType.Consulting_Firm, UserType.IT_Services, UserType.Investment_Advisor, UserType.Investor, UserType.Mentor, UserType.Startup_Founder]
  }

  onNoClick(): void {
    this.dialogRef.close()
  }

  onClose(){
    this.dialogRef.close()
  }

  get userType(){
    return this.form.get('userType')
  }

  get linkedInLink(){
    return this.form.get('linkedInLink')
  }

  get message(){
    return this.form.get('message')
  }

  createGetInTouch() {
    this.dialogRef.close()
    this.dataService.createGetInTouch(this.form.value, this.data)
  }

}
