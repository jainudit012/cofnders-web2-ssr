import { Component, Inject, OnInit, Optional } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { CloudinaryOptions, CloudinaryUploader } from 'ng2-cloudinary';

import { environment } from '../../../../environments/environment';
import { DataService } from '../../../services/data.service';

@Component({
  selector: 'app-application-form',
  templateUrl: './application-form.component.html',
  styleUrls: ['./application-form.component.scss'],
  providers: [
    // { provide: MAT_DIALOG_DATA, useValue: {user: {name: 'Udit Jain.'}, token: 'dwqoidowdouwoduweoud'} },
  ]
})
export class ApplicationFormComponent implements OnInit {

  fileName : string | null
  approvedProjects: any[]
  uploadProgressPdf:number = 0

  form = new FormGroup({
    projectId : new FormControl('', Validators.required),
    amount: new FormControl('', Validators.required),
    valuation : new FormControl('', Validators.required),
    pdf: new FormControl(''),
    message : new FormControl('', [Validators.required, Validators.minLength(16), Validators.maxLength(300)])
  })

  uploader: CloudinaryUploader = new CloudinaryUploader(
    new CloudinaryOptions({ cloudName: 'cofnderscloud', uploadPreset: 'wtittxoq' })
  )

  constructor(public dialogRef: MatDialogRef<ApplicationFormComponent>,
    @Optional() @Inject(MAT_DIALOG_DATA) private data: any,
    private _snackBar: MatSnackBar,
    public dataService: DataService) { }

  ngOnInit() {
    this.uploadToCloudinary()
    this.approvedProjects = this.data.projects
  }

  uploadPdf(e){
    this.uploader.uploadAll()
  }

  uploadToCloudinary(){
    this.uploader.onAfterAddingFile = (file)=>{
      this.uploadProgressPdf = 1
      this.fileName = null 
    }
    this.uploader.onCompleteItem = (item: any, response: any, status: any, headers: any)=>{
      this.uploadProgressPdf = 100
      const res = JSON.parse(response)
      this.fileName = res.original_filename + '.' + res.format;
      this.form.controls['pdf'].setValue(res.secure_url)
    }

    this.uploader.onCompleteAll = () => {
      
    }

    this.uploader.onWhenAddingFileFailed = (item: any, filter: any, options: any) => {
      if(!environment.production) console.log('upload failed')
      this._snackBar.open('Could not upload the Pdf!', 'X', {duration: 1500})
    }
  }

  onNoClick(): void {
    this.dialogRef.close();
  }

  onClose() {
    this.dialogRef.close()
  }

  get projectId(){
    return this.form.get('projectId')
  }

  get amount(){
    return this.form.get('amount')
  }

  get valuation(){
    return this.form.get('valuation')
  }

  get message(){
    return this.form.get('message')
  }

  createApplication(){
    this.dialogRef.close()
    this.dataService.applyFunds(this.form.value, {id: this.data.id})
  }

}
