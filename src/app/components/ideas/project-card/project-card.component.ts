import { Component, OnInit, Input } from '@angular/core';
import { AuthService } from '../../../services/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'project-card',
  templateUrl: './project-card.component.html',
  styleUrls: ['./project-card.component.scss']
})
export class ProjectCardComponent implements OnInit {

  @Input('project') projectData

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
