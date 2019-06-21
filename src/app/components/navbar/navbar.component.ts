import { Component, OnInit } from '@angular/core';
import { print } from '../../app.component';
import { AuthService } from '../../services/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss']
})
export class NavbarComponent implements OnInit {

  activeRouteString = ''

  constructor(private authService: AuthService,
    private router: Router) { 
      this.router.events.subscribe(()=>this.activeRouteString = router.url)
    }

  ngOnInit() {
  }

  login() {
    print('login button tap')
    this.authService.login()
  }

  logout(){
    print('logout button tap')
    this.authService.logout()
    // this.store.dispatch( new Logout())
  }

}