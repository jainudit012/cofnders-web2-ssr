import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'cta',
  templateUrl: './cta.component.html',
  styleUrls: ['./cta.component.scss']
})
export class CtaComponent implements OnInit {

  constructor(public router: Router,
    private authService: AuthService) { }

  ngOnInit() {
  }

  createProject(){
    if(this.authService.isAuthenticated()&&this.authService.isUserAuthenticated()){
      console.log('create project tap')
    }else{
      this.authService.login(this.router.url)
    }    
  }

  createOpportunity(){
    if(this.authService.isAuthenticated()&&this.authService.isUserAuthenticated()){
      console.log('create opportunity tap')
    }else{
      this.authService.login(this.router.url)
    }
  }

  listFund(){
    if(this.authService.isAuthenticated()&&this.authService.isUserAuthenticated()){
      console.log('list fund tap')
    }else{
      this.authService.login(this.router.url)
    }
  }

  routeIdeas(){
    this.router.navigate(['/ideas'])
  }

}
