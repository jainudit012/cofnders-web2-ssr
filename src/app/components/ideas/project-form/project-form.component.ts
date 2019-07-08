import { Component, OnInit, Optional, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'app-project-form',
  templateUrl: './project-form.component.html',
  styleUrls: ['./project-form.component.scss'],
  providers: [
    { provide: MAT_DIALOG_DATA, useValue: {}}
  ]
})
export class ProjectFormComponent implements OnInit {

  constructor(public dialogRef: MatDialogRef<ProjectFormComponent>,
    @Optional() @Inject(MAT_DIALOG_DATA) private data: any) { }

  ngOnInit() {
  }

  onNoClick(): void {
    this.dialogRef.close();
  }

}
