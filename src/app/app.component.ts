import { Component, Inject, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { SwUpdate } from '@angular/service-worker';
import { WINDOW } from '@ng-toolkit/universal';

import { environment } from '../environments/environment';
import { AuthService } from './services/auth.service';
import { UserService } from './services/user.service';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  title = 'cofnders-web2-ssr';
  url: string

  constructor(private authService: AuthService,
    private userService: UserService,
    public router: Router,
    private swUpdate: SwUpdate,
    @Inject(WINDOW) private window: Window,
    private _snackbar: MatSnackBar){ 
  }

  ngOnInit(){
    if(this.swUpdate.isEnabled){
      this.swUpdate.available.subscribe(()=>{
        // if(confirm('New Version Available, RELOAD?')){
        //   this.window.location.reload()
        // }
        const snackBarRef = this._snackbar.open('New version available', 'Load New Version')
        snackBarRef.onAction().subscribe(()=>{
          this.window.location.reload()
        })
      })
    }

    if(this.authService.isAuthenticated()) {
      this.authService.renewTokens()
      this.userService.setUserLocal()
    }
  }
}

export function print(str:any){
  if(!environment.production) console.log(str)
}