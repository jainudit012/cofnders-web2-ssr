import { Component, OnInit, Input } from '@angular/core';
import { AuthService } from '../../../services/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'fund-card',
  templateUrl: './fund-card.component.html',
  styleUrls: ['./fund-card.component.scss']
})
export class FundCardComponent implements OnInit {

  @Input('fund') fundData

  constructor(public authService: AuthService,
    private router: Router) { }

  ngOnInit() {
  }

  apply() {
    if(this.authService.isAuthenticated() && this.authService.isUserAuthenticated()){

    }else {
      this.authService.login(this.router.url)
    }
    console.log('apply tapped')
  }

}
