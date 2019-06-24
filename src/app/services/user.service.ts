import { Injectable, Inject } from '@angular/core';
import { JwtHelperService } from '@auth0/angular-jwt'
import { HttpClient } from '@angular/common/http';
import { environment } from '../../environments/environment';
import Axios from 'axios';
import { MatSnackBar } from '@angular/material/snack-bar';
import { AuthUser } from '../models/auth-user.model';
import { LOCAL_STORAGE } from '@ng-toolkit/universal';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  helper:JwtHelperService
  authUser: AuthUser = null;

  constructor(private http: HttpClient,
    private _snackBar: MatSnackBar,
    @Inject(LOCAL_STORAGE) private localStorage: any,) { 
    this.helper = new JwtHelperService()
  }

  public async getToken(token:string){
    const data = {
      token: token
    }
    return Axios.post(`${environment.apiUrl}/users`, data).then((res:any)=>{
      return res
    }).catch((err:any)=> {
      this._snackBar.open('Could Not Load Personal Settings', 'X', {duration: 3000})
      if(!environment.production) console.log(err.response.data)
    })
    // return this.http.post(`${environment.apiUrl}/users`, data).subscribe()
  }

  public decodeToken(token:string){
    // const helper = new JwtHelperService()
    // return helper.decodeToken(token)
    return this.helper.decodeToken(token)
  }

  public editUser(token:string){
  }

  public setUser(token:string){
    this.authUser = this.helper.decodeToken(token)
  }
  public setUserLocal(){
    let idToken = this.localStorage.getItem('id_token')
    if(idToken) {
      let localUser = this.helper.decodeToken(idToken)
      if(localUser) this.authUser = localUser
    }
  }
}