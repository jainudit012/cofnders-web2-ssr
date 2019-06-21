import { Injectable, Inject } from '@angular/core';
import { LOCAL_STORAGE, WINDOW } from '@ng-toolkit/universal';
import { PostSignUpFormComponent } from '../components/forms/post-sign-up-form/post-sign-up-form.component';
import { UserService } from './user.service';
import { Router } from '@angular/router';
import * as auth0 from "auth0-js";
import { environment } from '../../environments/environment';
import { MatDialog } from '@angular/material/dialog';


@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private _idToken: string
  private _accessToken: string
  private _expiresAt: number

  webAuth = new auth0.WebAuth({
    clientID: environment.CLIENT_ID,
    domain: environment.AUTH_DOMAIN,
    responseType: 'token id_token',
    redirectUri: `${environment.siteUrl}/callback`,
    scope: 'email profile openid update:users update:users_app_metadata read:current_user update:current_user_metadata',
    leeway: 60
  })

  constructor(public router: Router, 
    @Inject(WINDOW) private window: Window,
    @Inject(LOCAL_STORAGE) private localStorage: any,
    private userService: UserService,
    public dialog: MatDialog
    ) { 
    this._idToken = ''
    this._accessToken = ''
    this._expiresAt = 0
  }

  get accessToken(): string {
    return this._accessToken
  }

  get idToken(): string {
    return this._idToken
  }

  get userToken(): string {
    if(this.localStorage.getItem('user_token')) return this.localStorage.getItem('user_token')
    else return null;
  }

  public login(){
    this.webAuth.authorize()
  }

  public handleAuthentication(): void {
    this.webAuth.parseHash(async(err, authResult) => {
      if (authResult && authResult.accessToken && authResult.idToken) {
        this.window.location.hash = ''
        const token = authResult.idToken
        const res = await this.userService.getToken(token)
        authResult['user_token'] = res.data.token
        const decoded = this.userService.decodeToken(res.data.token)
        this.localLogin(authResult)
        
        // correct this line
        if(decoded.isFormFilled){
          let dialogRef = this.dialog.open(PostSignUpFormComponent, {
            width: '100vw',
            height: '100%',
            maxWidth: '100vw',
            panelClass: 'dialog-form-pane',
            disableClose: true
          })
        }
        // this.router.navigate(['/'])
      } else if (err) {
        this.router.navigate(['/'])
        console.log(err)
      }
    });
  }

  private localLogin(authResult): void {
    // Set the time that the Access Token will expire at
    const expiresAt = (authResult.expiresIn * 1000) + Date.now()
    this._accessToken = authResult.accessToken
    this._idToken = authResult.idToken
    this._expiresAt = expiresAt
    this.localStorage.setItem('user_token', authResult.user_token)
    this.localStorage.setItem('expiresAt', this._expiresAt)
    this.localStorage.setItem('isLoggedIn', true)
    this.localStorage.setItem('id_token', this._idToken)
    this.localStorage.setItem('access_token', this._accessToken)
  }

  public renewTokens(): void {
    this.webAuth.checkSession({}, (err, authResult) => {
      if (authResult && authResult.accessToken && authResult.idToken) {
        this.localLogin(authResult);
      } else if (err) {
        alert(`Could not get a new token (${err.error}: ${err.error_description}).`);
        // print(`Could not get a new token (${err.error}: ${err.error_description}).`)
        this.logout()
      }
    })
  }

  public logout(){
    // Remove tokens and expiry time
    this._accessToken = ''
    this._idToken = ''
    this._expiresAt = 0
    this.localStorage.removeItem('expiresAt')
    this.localStorage.removeItem('isLoggedIn')
    this.localStorage.removeItem('id_token')
    this.localStorage.removeItem('access_token')
    this.localStorage.removeItem('user_token')

    this.webAuth.logout({
      returnTo: this.window.location.origin
      // returnTo: window.location.origin
    })
  }

  public isAuthenticated(): boolean {
    // Check whether the current time is past the
    // access token's expiry time
    const expiresAt = this.localStorage.getItem('expiresAt')
    const accessToken = this.localStorage.getItem('access_token')
    return accessToken && Date.now() < expiresAt
  }
}
