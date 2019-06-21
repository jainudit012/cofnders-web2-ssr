import { Component } from '@angular/core';
import { environment } from '../environments/environment';
import { AuthService } from './services/auth.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'cofnders-web2-ssr';

  constructor(private authService: AuthService){ 
  }

  ngOnInit(){
    if(this.authService.isAuthenticated()) this.authService.renewTokens()
  }
}

export function print(str:any){
  if(!environment.production) console.log(str)
}