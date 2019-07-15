import { Component, OnInit, Input, Inject } from '@angular/core';
import { AuthService } from '../../../services/auth.service';
import { Router } from '@angular/router';
import { MatDialog } from '@angular/material/dialog';
import { ApplicationFormComponent } from '../../forms/application-form/application-form.component';
import { WINDOW } from '@ng-toolkit/universal';

@Component({
  selector: 'fund-card',
  templateUrl: './fund-card.component.html',
  styleUrls: ['./fund-card.component.scss']
})
export class FundCardComponent implements OnInit {

  @Input('fund') fundData

  constructor(public authService: AuthService,
    private router: Router,
    public dialog: MatDialog) { 
      
    }

  ngOnInit() {
  }

  apply() {
    if(this.authService.isAuthenticated() && this.authService.isUserAuthenticated()){
      let dialogRef = this.dialog.open(ApplicationFormComponent, {
        width: '40rem',
        height: 'auto',
        panelClass: "dialog-form-pane",
        data: {id: this.fundData._id}
      })
    }else {
      this.authService.login(this.router.url)
    }
  }

}
