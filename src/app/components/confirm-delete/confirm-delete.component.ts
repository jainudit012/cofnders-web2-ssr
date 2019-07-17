import { Component, OnInit, Optional, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { DataService } from '../../services/data.service';

@Component({
  selector: 'app-confirm-delete',
  templateUrl: './confirm-delete.component.html',
  styleUrls: ['./confirm-delete.component.scss']
})
export class ConfirmDeleteComponent implements OnInit {

  constructor(public dialogRef: MatDialogRef<ConfirmDeleteComponent>,
    @Optional() @Inject(MAT_DIALOG_DATA) public data: any,
    public dataService: DataService) { }

  ngOnInit() {
  }

  onNoClick(): void {
    this.dialogRef.close()
  }

  onClose(){
    this.dialogRef.close()
  }

  yes(){
    if(this.data.opportunity){
      this.dataService.deleteOpportunity(this.data.opportunity._id)
    }else if(this.data.project){
      this.dataService.deleteProject(this.data.project._id)
    }
    this.dialogRef.close()
  }

  no(){
    this.dialogRef.close()
  }

}
