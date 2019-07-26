import { Component, Inject, OnInit, Optional } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';

import { Requirement } from '../../../models/opportunity.model';
import { DataService } from '../../../services/data.service';

@Component({
  selector: 'app-opportunity-form',
  templateUrl: './opportunity-form.component.html',
  styleUrls: ['./opportunity-form.component.scss'],
  providers: [
    // { provide: MAT_DIALOG_DATA, useValue: {user: {name: 'Udit Jain.'}, token: 'dwqoidowdouwoduweoud'} },
  ]
})
export class OpportunityFormComponent implements OnInit {

  requirementData: string[]
  approvedProjects: any[]
  isEdit:boolean = false

  form = new FormGroup({
    projectId: new FormControl('', Validators.required),
    requirement: new FormControl('', Validators.required),
    details: new FormControl('', [Validators.required, Validators.minLength(16) ,Validators.maxLength(300)])
  })

  constructor(public dialogRef: MatDialogRef<OpportunityFormComponent>,
    @Optional() @Inject(MAT_DIALOG_DATA) private data: any,
    public dataService: DataService) { }

  async ngOnInit() {
    this.requirementData = [Requirement.CO_FOUNDER, Requirement.FUNDING, Requirement.IDEA_VALIDATION, Requirement.MENTORS_CONSULTANTS, Requirement.REFERENCE_CONNECTIONS, Requirement.SERVICE_PARTNERS_VENDORS]
    this.approvedProjects = this.data.projects

    if(this.data.opportunity){
      let userProjectResponse = await this.dataService.getMyProjects()
      let userProjects = [...userProjectResponse.projects]
      let userApprovedProjects = userProjects.filter(p=>{
        return p.isApproved
      })
      this.approvedProjects = userApprovedProjects
      this.isEdit = true
      this.setFormValue()
    }
  }

  setFormValue() {
    Object.keys(this.form.controls).forEach(field => {
      const temp = {};
      temp[field] = this.assignDefaultValue(this.form, field);
      this.form.patchValue(temp)
    });
  }

  assignDefaultValue(formGroup: FormGroup, field) {
    let responseData = '';
    switch (field) {
      case 'projectId':
        break;
      case 'requirement':
        responseData = Requirement[this.data.opportunity.requirement];
        break;
      case 'details':
        responseData = this.data.opportunity.details;
        break;
      default:
        responseData = ''
    }
    return responseData;
  }
  
  onNoClick(): void {
    this.dialogRef.close()
  }

  onClose(){
    this.dialogRef.close()
  }

  get projectId(){
    return this.form.get('projectId')
  }

  get requirement(){
    return this.form.get('requirement')
  }

  get details(){
    return this.form.get('details')
  }

  createOpportunity(){
    if(this.data.opportunity){
      this.dataService.editOpportunity(this.form.value, this.data.opportunity._id)
    }else {
      this.dataService.createOpportunity(this.form.value)
    }
    this.dialogRef.close()
  }
  
  

}
