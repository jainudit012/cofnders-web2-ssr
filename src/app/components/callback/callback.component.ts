import { Component, OnInit, Inject } from '@angular/core';
import { LOCAL_STORAGE } from '@ng-toolkit/universal';
import { AuthService } from '../../services/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-callback',
  templateUrl: './callback.component.html',
  styleUrls: ['./callback.component.scss']
})
export class CallbackComponent implements OnInit {

  constructor(private authService: AuthService, 
    private router: Router,
    @Inject(LOCAL_STORAGE) private localStorage: any) {

    this.authService.handleAuthentication()
    
   }

  ngOnInit() {
    
  }

}
