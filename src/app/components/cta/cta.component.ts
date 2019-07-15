import { Component, OnInit, Inject } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../../services/auth.service';
import { MatDialog } from '@angular/material/dialog';
import { ProjectFormComponent } from '../forms/project-form/project-form.component';
import { OpportunityFormComponent } from '../forms/opportunity-form/opportunity-form.component';
import { ListFundFormComponent } from '../forms/list-fund-form/list-fund-form.component';
import { WINDOW } from '@ng-toolkit/universal';

@Component({
  selector: 'cta',
  templateUrl: './cta.component.html',
  styleUrls: ['./cta.component.scss']
})
export class CtaComponent implements OnInit {
  
  isMobile: boolean = false;

  constructor(public router: Router,
    private authService: AuthService,
    public dialog: MatDialog,
    @Inject(WINDOW) private window: Window
    ) { 
      if (this.window.screen.width < 450 && this.window.screen.width < this.window.screen.height) { // 768px portrait
        this.isMobile = true;
      }
    }

  ngOnInit() {
  }

  createProject(){
    if(this.authService.isAuthenticated()&&this.authService.isUserAuthenticated()){
      let dialogRef = this.dialog.open(ProjectFormComponent, {
        width: this.isMobile ? '100vw' : '45rem',
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
      let dialogRef = this.dialog.open(OpportunityFormComponent, {
        width: this.isMobile ? '100vw' : '40rem',
        height: 'auto',
        panelClass: "dialog-form-pane",
        data: {}
      })
    }else{
      this.authService.login(this.router.url)
    }
  }

  listFund(){
    if(this.authService.isAuthenticated()&&this.authService.isUserAuthenticated()){
      let dialogRef = this.dialog.open(ListFundFormComponent, {
        width: this.isMobile ? '100vw' : '40rem',
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
