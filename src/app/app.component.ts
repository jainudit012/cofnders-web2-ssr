import { Component } from '@angular/core';

import { environment } from '../environments/environment';
import { AuthService } from './services/auth.service';
import { UserService } from './services/user.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'cofnders-web2-ssr';
  url: string

  constructor(private authService: AuthService,
    private userService: UserService,
    private router: Router){ 
      this.router.events.subscribe(()=> {
        this.url = this.router.url 
      });
  }

  ngOnInit(){
    if(this.authService.isAuthenticated()) {
      this.authService.renewTokens()
      this.userService.setUserLocal()
    }
  }
}

export function print(str:any){
  if(!environment.production) console.log(str)
}