import { Component, OnInit, Input, Inject } from '@angular/core';
import { AuthService } from '../../../services/auth.service';
import { Router } from '@angular/router';
import { MatDialog } from '@angular/material/dialog';
import { GetInTouchFormComponent } from '../../forms/get-in-touch-form/get-in-touch-form.component';
import { WINDOW } from '@ng-toolkit/universal';
import { ConfirmDeleteComponent } from '../../confirm-delete/confirm-delete.component';

@Component({
  selector: 'opportunity-card',
  templateUrl: './opportunity-card.component.html',
  styleUrls: ['./opportunity-card.component.scss']
})
export class OpportunityCardComponent implements OnInit {

  @Input('opportunity') opportunityData
  isMobile: boolean = false;

  constructor(public authService: AuthService,
    private router: Router,
    public dialog: MatDialog) {
    }

  ngOnInit() {
  }

  touch(){
    if(this.authService.isAuthenticated() && this.authService.isUserAuthenticated()){
        let dialogRef = this.dialog.open(GetInTouchFormComponent, {
          width: '40rem',
          height: 'auto',
          panelClass: "dialog-form-pane",
          data: {id : this.opportunityData._id, type: 'opportunity'}
        })
      }else {
        this.authService.login(this.router.url)
      }
  }

  edit(){
    console.log('edit opportunity')

  }

  delete(){
    let dialogRef = this.dialog.open(ConfirmDeleteComponent, {
      width: '30rem',
      height: 'auto',
      panelClass: 'dialog-form-pane',
      data: {opportunity: this.opportunityData}
    })
  }

}
