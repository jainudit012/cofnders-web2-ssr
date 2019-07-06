import { Component, OnInit, OnDestroy } from '@angular/core';
import { UserService } from '../../services/user.service';
import { AuthService } from '../../services/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'profile-card',
  templateUrl: './profile-card.component.html',
  styleUrls: ['./profile-card.component.scss']
})
export class ProfileCardComponent implements OnInit, OnDestroy {

  appUserRes$:any

  constructor(private userService: UserService, 
    private authService: AuthService,
    private router: Router) {

      // if(this.authService.isAuthenticated()&&this.authService.isUserAuthenticated()){
      //   this.appUserRes$ = this.userService.getUser(this.authService.userToken)
      // }
    }

  ngOnInit() {
    if(this.authService.isAuthenticated()&&this.authService.isUserAuthenticated()){
      this.appUserRes$ = this.userService.getUser(this.authService.userToken)
    }
  }

  ngOnDestroy(){
  }

  login(){
    this.authService.login(this.router.url)
  }

  

}
