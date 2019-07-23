import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Router } from '@angular/router';

import { AuthService } from '../../services/auth.service';
import { DataService } from '../../services/data.service';
import { ListFundFormComponent } from '../forms/list-fund-form/list-fund-form.component';
import { OpportunityFormComponent } from '../forms/opportunity-form/opportunity-form.component';
import { ProjectFormComponent } from '../forms/project-form/project-form.component';
import { NoApprovedProjectsComponent } from '../no-approved-projects/no-approved-projects.component';

@Component({
  selector: 'cta',
  templateUrl: './cta.component.html',
  styleUrls: ['./cta.component.scss']
})
export class CtaComponent implements OnInit {

  userProjectResponse: any
  userProjects: any[]
  userApprovedProjects:any[]
  
  
  constructor(public router: Router,
    private authService: AuthService,
    public dialog: MatDialog,
    public dataService: DataService) { 
      
    }

  async ngOnInit() {
    if(this.authService.isAuthenticated()&&this.authService.isUserAuthenticated()){
      this.userProjectResponse = await this.dataService.getMyProjects()
      this.userProjects = [...this.userProjectResponse.projects]
      this.userApprovedProjects = this.userProjects.filter(p=>{
        return p.isApproved
      })
    }
  }

  createProject(){
    if(this.authService.isAuthenticated()&&this.authService.isUserAuthenticated()){
      let dialogRef = this.dialog.open(ProjectFormComponent, {
        width: '45rem',
        height: 'auto',
        panelClass: "dialog-form-pane",
        data: {}
      })
    }else{
      this.authService.login(this.router.url)
    }    
  }

  createOpportunity(){
    if(this.authService.isAuthenticated()&&this.authService.isUserAuthenticated()){
      if(this.userApprovedProjects.length===0){
        let dialogRef = this.dialog.open(NoApprovedProjectsComponent, {
          width: '40rem',
          height: 'auto',
          panelClass: "dialog-form-pane",
          data: {}
        })
      }else{
        let dialogRef = this.dialog.open(OpportunityFormComponent, {
          width: '40rem',
          height: 'auto',
          panelClass: "dialog-form-pane",
          data: {projects: this.userApprovedProjects}
        })
      }
    }else{
      this.authService.login(this.router.url)
    }
  }

  listFund(){
    if(this.authService.isAuthenticated()&&this.authService.isUserAuthenticated()){
      let dialogRef = this.dialog.open(ListFundFormComponent, {
        width: '40rem',
        height: 'auto',
        panelClass: "dialog-form-pane",
        data: {}
      })
    }else{
      this.authService.login(this.router.url)
    }
  }

  routeIdeas(){
    this.router.navigate(['/ideas'])
  }

}
