import { Component, Input, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Router } from '@angular/router';

import { AuthService } from '../../../services/auth.service';
import { ConfirmDeleteComponent } from '../../confirm-delete/confirm-delete.component';
import { GetInTouchFormComponent } from '../../forms/get-in-touch-form/get-in-touch-form.component';
import { ProjectFormComponent } from '../../forms/project-form/project-form.component';

@Component({
  selector: 'project-card',
  templateUrl: './project-card.component.html',
  styleUrls: ['./project-card.component.scss']
})
export class ProjectCardComponent implements OnInit {

  @Input('project') projectData

  constructor(public authService: AuthService,
    private router: Router,
    public dialog: MatDialog) { 
      
  }

  ngOnInit() {
  }

  touch() {
    if(this.authService.isAuthenticated() && this.authService.isUserAuthenticated()){
      let dialogRef = this.dialog.open(GetInTouchFormComponent, {
        width: '40rem',
        height: 'auto',
        panelClass: "dialog-form-pane",
        data: {id: this.projectData._id, type: 'project'}
      })
    }else {
      this.authService.login(this.router.url)
    }
  }

  edit(){
    let dialogRef = this.dialog.open(ProjectFormComponent, {
      width: '45rem',
      height: 'auto',
      panelClass: "dialog-form-pane",
      data: {project: this.projectData}
    })
  }

  delete(){
    let dialogRef = this.dialog.open(ConfirmDeleteComponent, {
      width: '30rem',
      height: 'auto',
      panelClass: 'dialog-form-pane',
      data: {project: this.projectData}
    })
  }

}
