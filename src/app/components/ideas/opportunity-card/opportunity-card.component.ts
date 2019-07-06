import { Component, OnInit, Input } from '@angular/core';
import { AuthService } from '../../../services/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'opportunity-card',
  templateUrl: './opportunity-card.component.html',
  styleUrls: ['./opportunity-card.component.scss']
})
export class OpportunityCardComponent implements OnInit {

  @Input('opportunity') opportunityData

  constructor(public authService: AuthService,
    private router: Router) { }

  ngOnInit() {
  }

  getInTouch() {
    if(this.authService.isAuthenticated() && this.authService.isUserAuthenticated()){

    }else {
      this.authService.login(this.router.url)
    }
    console.log('get in touch tapped')
  }

}
