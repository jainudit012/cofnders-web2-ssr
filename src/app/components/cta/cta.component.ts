import { Component, OnInit, Inject } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../../services/auth.service';
import { MatDialog } from '@angular/material/dialog';
import { ProjectFormComponent } from '../ideas/project-form/project-form.component';
import { OpportunityFormComponent } from '../ideas/opportunity-form/opportunity-form.component';
import { ListFundFormComponent } from '../funds/list-fund-form/list-fund-form.component';

@Component({
  selector: 'cta',
  templateUrl: './cta.component.html',
  styleUrls: ['./cta.component.scss']
})
export class CtaComponent implements OnInit {

  constructor(public router: Router,
    private authService: AuthService,
    public dialog: MatDialog
    ) { 
    }

  ngOnInit() {
  }

  createProject(){
    if(this.authService.isAuthenticated()&&this.authService.isUserAuthenticated()){
      console.log('create project tap')
      let dialogRef = this.dialog.open(ProjectFormComponent, {
        panelClass: "dialog-form-pane",
        data: {}
      })
    }else{
      this.authService.login(this.router.url)
    }    
  }

  createOpportunity(){
    if(this.authService.isAuthenticated()&&this.authService.isUserAuthenticated()){
      console.log('create opportunity tap')
      let dialogRef = this.dialog.open(OpportunityFormComponent, {
        panelClass: "dialog-form-pane",
        data: {}
      })
    }else{
      this.authService.login(this.router.url)
    }
  }

  listFund(){
    if(this.authService.isAuthenticated()&&this.authService.isUserAuthenticated()){
      console.log('list fund tap')
      let dialogRef = this.dialog.open(ListFundFormComponent, {
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
