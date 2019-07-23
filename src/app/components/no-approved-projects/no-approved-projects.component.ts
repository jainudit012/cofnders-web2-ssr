import { Component, Inject, OnInit, Optional } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'app-no-approved-projects',
  templateUrl: './no-approved-projects.component.html',
  styleUrls: ['./no-approved-projects.component.scss']
})
export class NoApprovedProjectsComponent implements OnInit {

  constructor(public dialogRef: MatDialogRef<NoApprovedProjectsComponent>,
    @Optional() @Inject(MAT_DIALOG_DATA) private data: any) { }

  ngOnInit() {
  }

  onNoClick(): void {
    this.dialogRef.close()
  }

  onClose(){
    this.dialogRef.close()
  }

}
