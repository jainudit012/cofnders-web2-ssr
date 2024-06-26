import { Component, Inject, OnInit, Optional } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';

import { InvestorType } from '../../../models/fund.model';
import { StartupStage } from '../../../models/project.model';
import { DataService } from '../../../services/data.service';

@Component({
  selector: 'app-list-fund-form',
  templateUrl: './list-fund-form.component.html',
  styleUrls: ['./list-fund-form.component.scss'],
  providers: [
    // { provide: MAT_DIALOG_DATA, useValue: {user: {name: 'Udit Jain.'}, token: 'dwqoidowdouwoduweoud'} },
  ]
})
export class ListFundFormComponent implements OnInit {
  investorTypes: string[]
  startupStages : string []

  form = new FormGroup({
    investorType: new FormControl('', Validators.required),
    name: new FormControl('', [Validators.required, Validators.minLength(3)]),
    contact: new FormControl('', [Validators.required,Validators.pattern(new RegExp('^\\d+$')) ,Validators.minLength(10), Validators.maxLength(10)]),
    linkedInLink: new FormControl('', [Validators.required, Validators.pattern('^.*(?:linkedin\.com).*$')]),
    startupStage: new FormControl('', Validators.required)
  })

  constructor(public dialogRef: MatDialogRef<ListFundFormComponent>,
    @Optional() @Inject(MAT_DIALOG_DATA) private data: any,
    public dataService: DataService) { }

  ngOnInit() {
    this.investorTypes = [InvestorType.ANGEL_NETWORK, InvestorType.FAMILY, InvestorType.INCUBATOR, InvestorType.INDIVIDUAL_INVESTOR]
    this.startupStages = [StartupStage.BETA, StartupStage.GROWING, StartupStage.GROWTH, StartupStage.IDEA, StartupStage.MVP]
  }

  onNoClick(): void {
    this.dialogRef.close();
  }

  onClose(){
    this.dialogRef.close()
  }

  get investorType(){
    return this.form.get('investorType')
  }

  get name(){
    return this.form.get('name')
  }

  get contact(){
    return this.form.get('contact')
  }

  get linkedInLink(){
    return this.form.get('linkedInLink')
  }

  get startupStage(){
    return this.form.get('startupStage')
  }

  createList(){
    this.dialogRef.close()
    this.dataService.createFundList(this.form.value)
  }

}
