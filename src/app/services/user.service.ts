import { HttpClient } from '@angular/common/http';
import { Inject, Injectable } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { JwtHelperService } from '@auth0/angular-jwt';
import { LOCAL_STORAGE } from '@ng-toolkit/universal';
import Axios from 'axios';

import { environment } from '../../environments/environment';
import { AuthUser } from '../models/auth-user.model';
import { Observable } from 'rxjs';
import { map, catchError } from 'rxjs/operators'
import { User } from '../models/user.model';

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
    return this.helper.decodeToken(token)
  }

  public editUser(token:string, data:any){
    Axios.put(`${environment.apiUrl}/users`, data, {headers: {'Authorization': token}})
    .then(res=>{
      if(!environment.production) console.log(res)
    })
    .catch(err=>{
      if(!environment.production) console.log(err.response.data)
      this._snackBar.open('Could Not Update the Information!', 'X', {duration: 2000})
    })
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

  public getUser(token: string){
    return Axios.get(`${environment.apiUrl}/users/me`, {headers: {'Authorization': token}}).then(
      res=>{
        return res.data
      }
    ).catch(err=>{
      this._snackBar.open('Could not load the Profile!', 'X', {duration: 2000})
    })
  }
}