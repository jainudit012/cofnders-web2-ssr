import { Component, OnInit, Input } from '@angular/core';
import { AuthService } from '../../../services/auth.service';

@Component({
  selector: 'opportunity-card',
  templateUrl: './opportunity-card.component.html',
  styleUrls: ['./opportunity-card.component.scss']
})
export class OpportunityCardComponent implements OnInit {

  @Input('opportunity') opportunityData

  constructor(public authService: AuthService) { }

  ngOnInit() {
  }

  getInTouch() {
    if(this.authService.isAuthenticated() && this.authService.isUserAuthenticated()){

    }else {
      this.authService.login()
    }
    console.log('get in touch tapped')
  }

}
