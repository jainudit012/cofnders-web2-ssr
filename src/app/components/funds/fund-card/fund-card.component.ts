import { Component, Input, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Router } from '@angular/router';

import { AuthService } from '../../../services/auth.service';
import { ApplicationFormComponent } from '../../forms/application-form/application-form.component';
import { NoApprovedProjectsComponent } from '../../no-approved-projects/no-approved-projects.component';

@Component({
  selector: 'fund-card',
  templateUrl: './fund-card.component.html',
  styleUrls: ['./fund-card.component.scss']
})
export class FundCardComponent implements OnInit {

  @Input('fund') fundData
  @Input('projectData') approvedProjects:any[]

  constructor(public authService: AuthService,
    private router: Router,
    public dialog: MatDialog) { 
      
    }

  ngOnInit() {
  }

  apply() {
    if(this.authService.isAuthenticated() && this.authService.isUserAuthenticated()){
      if(this.approvedProjects.length===0){
        let dialogRef = this.dialog.open(NoApprovedProjectsComponent, {
          width: '40rem',
          height: 'auto',
          panelClass: "dialog-form-pane",
          data: {}
        })
      }else{
        let dialogRef = this.dialog.open(ApplicationFormComponent, {
          width: '40rem',
          height: 'auto',
          panelClass: "dialog-form-pane",
          data: {id: this.fundData._id, projects: this.approvedProjects}
        })
      }
    }else {
      this.authService.login(this.router.url)
    }
  }

}
