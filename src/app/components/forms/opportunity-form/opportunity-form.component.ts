import { Component, OnInit, Inject, Optional } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Requirement } from '../../../models/opportunity.model';
import { DataService } from '../../../services/data.service';
import { HostBinding } from '@angular/core';
import {
  trigger,
  state,
  style,
  animate,
  transition,
} from '@angular/animations';

@Component({
  selector: 'app-opportunity-form',
  templateUrl: './opportunity-form.component.html',
  styleUrls: ['./opportunity-form.component.scss'],
  providers: [
    // { provide: MAT_DIALOG_DATA, useValue: {user: {name: 'Udit Jain.'}, token: 'dwqoidowdouwoduweoud'} },
  ],
  animations:[
    trigger('myInsertRemoveTrigger', [
      transition(':enter', [
        style({ opacity: 0 }),
        animate('300ms', style({ opacity: 1 })),
      ]),
      transition(':leave', [
        animate('300ms', style({ opacity: 0 }))
      ])
    ])
  ]
})
export class OpportunityFormComponent implements OnInit {

  requirementData: string[]
  myProjectResponse: any
  allUserProjects: any[] = []
  approvedProjects: any[]

  form = new FormGroup({
    projectId: new FormControl('', Validators.required),
    requirement: new FormControl('', Validators.required),
    details: new FormControl('', Validators.maxLength(300))
  })

  constructor(public dialogRef: MatDialogRef<OpportunityFormComponent>,
    @Optional() @Inject(MAT_DIALOG_DATA) private data: any,
    public dataService: DataService) { }

  async ngOnInit() {
    this.requirementData = [Requirement.CO_FOUNDER, Requirement.FUNDING, Requirement.IDEA_VALIDATION, Requirement.MENTORS_CONSULTANTS, Requirement.REFERENCE_CONNECTIONS, Requirement.SERVICE_PARTNERS_VENDORS]
    this.myProjectResponse = await this.dataService.getMyProjects()
    this.allUserProjects = [...this.myProjectResponse.projects]
    this.approvedProjects = this.allUserProjects.filter(p=>{
      return p.isApproved
    })
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
    this.dialogRef.close()
    this.dataService.createOpportunity(this.form.value)
  }
  
  

}
