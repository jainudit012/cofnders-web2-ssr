import { Component, OnInit, OnDestroy } from '@angular/core';
import { UserService } from 'src/app/services/user.service';
import { AuthService } from 'src/app/services/auth.service';
import { Observable } from 'rxjs';

@Component({
  selector: 'profile-card',
  templateUrl: './profile-card.component.html',
  styleUrls: ['./profile-card.component.scss']
})
export class ProfileCardComponent implements OnInit, OnDestroy {

  appUserRes$:any

  constructor(private userService: UserService, 
    private authService: AuthService) {

      if(this.authService.isAuthenticated()&&this.authService.isUserAuthenticated()){
        this.appUserRes$ = this.userService.getUser(this.authService.userToken)
      }
    }

  ngOnInit() {

  }

  ngOnDestroy(){
  }

  login(){
    this.authService.login()
  }

  

}
