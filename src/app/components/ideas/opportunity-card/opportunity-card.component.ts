import { Component, OnInit, Input } from '@angular/core';
import { AuthService } from '../../../services/auth.service';
import { Router } from '@angular/router';
import { MatDialog } from '@angular/material/dialog';
import { GetInTouchFormComponent } from '../../forms/get-in-touch-form/get-in-touch-form.component';

@Component({
  selector: 'opportunity-card',
  templateUrl: './opportunity-card.component.html',
  styleUrls: ['./opportunity-card.component.scss']
})
export class OpportunityCardComponent implements OnInit {

  @Input('opportunity') opportunityData

  constructor(public authService: AuthService,
    private router: Router,
    public dialog: MatDialog) { }

  ngOnInit() {
  }

  touch(){
    if(this.authService.isAuthenticated() && this.authService.isUserAuthenticated()){
        let dialogRef = this.dialog.open(GetInTouchFormComponent, {
          panelClass: "dialog-form-pane",
          data: {}
        })
      }else {
        this.authService.login(this.router.url)
      }
  }

}
