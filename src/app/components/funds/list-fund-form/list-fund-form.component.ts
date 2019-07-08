import { Component, OnInit, Optional, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';

@Component({
  selector: 'app-list-fund-form',
  templateUrl: './list-fund-form.component.html',
  styleUrls: ['./list-fund-form.component.scss'],
  providers: [
    // { provide: MAT_DIALOG_DATA, useValue: {user: {name: 'Udit Jain.'}, token: 'dwqoidowdouwoduweoud'} },
  ]
})
export class ListFundFormComponent implements OnInit {

  constructor(public dialogRef: MatDialogRef<ListFundFormComponent>,
    @Optional() @Inject(MAT_DIALOG_DATA) private data: any) { }

  ngOnInit() {
  }

  onNoClick(): void {
    this.dialogRef.close();
  }

}
