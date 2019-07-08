import { Component, OnInit, Inject, Optional } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'app-opportunity-form',
  templateUrl: './opportunity-form.component.html',
  styleUrls: ['./opportunity-form.component.scss'],
  providers: [
    // { provide: MAT_DIALOG_DATA, useValue: {user: {name: 'Udit Jain.'}, token: 'dwqoidowdouwoduweoud'} },
  ]
})
export class OpportunityFormComponent implements OnInit {

  constructor(public dialogRef: MatDialogRef<OpportunityFormComponent>,
    @Optional() @Inject(MAT_DIALOG_DATA) private data: any) { }

  ngOnInit() {
  }
  
  onNoClick(): void {
    this.dialogRef.close();
  }

}
