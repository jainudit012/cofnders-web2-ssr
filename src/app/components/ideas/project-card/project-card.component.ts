import { Component, OnInit, Input, Inject } from '@angular/core';
import { AuthService } from '../../../services/auth.service';
import { Router } from '@angular/router';
import { MatDialog } from '@angular/material/dialog';
import { GetInTouchFormComponent } from '../../forms/get-in-touch-form/get-in-touch-form.component';
import { WINDOW } from '@ng-toolkit/universal';

@Component({
  selector: 'project-card',
  templateUrl: './project-card.component.html',
  styleUrls: ['./project-card.component.scss']
})
export class ProjectCardComponent implements OnInit {

  @Input('project') projectData
  isMobile: boolean = false;

  constructor(public authService: AuthService,
    private router: Router,
    public dialog: MatDialog,
    @Inject(WINDOW) private window: Window) { 
      if (this.window.screen.width < 450 && this.window.screen.width < this.window.screen.height) { // 768px portrait
        this.isMobile = true;
      }
    }

  ngOnInit() {
  }

  touch() {
    if(this.authService.isAuthenticated() && this.authService.isUserAuthenticated()){
      let dialogRef = this.dialog.open(GetInTouchFormComponent, {
        width: this.isMobile ? '100vw' : '40rem',
        height: 'auto',
        panelClass: "dialog-form-pane",
        data: {id: this.projectData._id, type: 'project'}
      })
    }else {
      this.authService.login(this.router.url)
    }
  }

}
