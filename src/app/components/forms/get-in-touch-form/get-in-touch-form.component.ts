import { Component, OnInit, Optional, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';

@Component({
  selector: 'app-get-in-touch-form',
  templateUrl: './get-in-touch-form.component.html',
  styleUrls: ['./get-in-touch-form.component.scss'],
  providers: [
    // { provide: MAT_DIALOG_DATA, useValue: {user: {name: 'Udit Jain.'}, token: 'dwqoidowdouwoduweoud'} },
  ]
})
export class GetInTouchFormComponent implements OnInit {

  constructor(public dialogRef: MatDialogRef<GetInTouchFormComponent>,
    @Optional() @Inject(MAT_DIALOG_DATA) private data: any) { }

  ngOnInit() {
  }

  onNoClick(): void {
    this.dialogRef.close();
  }

}
