import { Component, Inject, OnInit, Optional } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';

import { AuthUser } from '../../../models/auth-user.model';
import { Purpose } from '../../../models/user.model';
import { UserService } from '../../../services/user.service';

@Component({
  selector: 'app-post-sign-up-form',
  templateUrl: './post-sign-up-form.component.html',
  styleUrls: ['./post-sign-up-form.component.scss'],
  providers: [
    // { provide: MAT_DIALOG_DATA, useValue: {user: {name: 'Udit Jain.'}, token: 'dwqoidowdouwoduweoud'} },
  ]
})
export class PostSignUpFormComponent implements OnInit {

  user: AuthUser|any
  //change to this
  // user: AuthUser
  purposeValue: string[]
  token: string

  form = new FormGroup({
    purpose: new FormControl('', Validators.required),
    brief: new FormControl(''),
    phone: new FormControl('', [Validators.required, Validators.pattern(new RegExp('^\\d+$')) , Validators.minLength(10), Validators.maxLength(10)])
  });

  constructor(
    public dialogRef: MatDialogRef<PostSignUpFormComponent>,
    @Optional() @Inject(MAT_DIALOG_DATA) private data: any,
    private userService: UserService,
    ) { 
      this.user = this.data.user
      this.token = this.data.token
    }

  ngOnInit() {
    this.purposeValue = [Purpose.FOUNDER, Purpose.INVESTOR, Purpose.MENTOR]
  }

  onNoClick(): void {
    this.dialogRef.close();
  }

  send(){
    let data:any = {}
    data.purpose = Object.keys(Purpose).find(k=> Purpose[k] === this.form.value.purpose)
    if(this.form.value.brief.length>0) data.brief = this.form.value.brief
    if(this.form.value.phone.length>0) data.phone = this.form.value.phone
    this.userService.editUser(this.token, data)
    this.dialogRef.close()
  }

  get purpose(){
    return this.form.get('purpose')
  }

  get brief(){
    return this.form.get('brief')
  }

  get phoneNumber(){
    return this.form.get('phone')
  }

}
