import { Injectable } from '@angular/core';

import Axios from 'axios';

import { environment } from '../../environments/environment';
import { MatSnackBar } from '@angular/material/snack-bar';
import { AuthService } from './auth.service';

@Injectable({
  providedIn: 'root'
})
export class DataService {

  constructor(private _snackBar: MatSnackBar,
    private authService: AuthService) { }

  public getRecent(){
    return Axios.get(`${environment.apiUrl}/ideas`).then(res=>{
      return res.data
    }).catch(err=>{
      if(!environment.production) console.log(err)
      this._snackBar.open('Could not Load Recent Ideas!', 'X', {duration: 2000})
    })
  }

  public getFeed(){
    if(this.authService.isAuthenticated() && this.authService.isUserAuthenticated()){
      const token = this.authService.userToken
      return Axios.get(`${environment.apiUrl}/feed?limit=10`, {headers: {'Authorization': token}}).then(res=>{
        return res.data
      }).catch(err=>{
        if(!environment.production) console.log(err)
        this._snackBar.open('Could not Load Your Feed!', 'X', {duration: 2000})
      })
    }else {
      return Axios.get(`${environment.apiUrl}/feed?limit=10`).then(res=>{
        return res.data
      }).catch(err=>{
        if(!environment.production) console.log(err)
        this._snackBar.open('Could not Load Your Feed!', 'X', {duration: 2000})
      })
    }
  }

  public getFunds(){
    if(this.authService.isAuthenticated() && this.authService.isUserAuthenticated()){
      const token = this.authService.userToken
      return Axios.get(`${environment.apiUrl}/funds`, {headers: {'Authorization': token}}).then(res=>{
        return res.data
      }).catch(err=>{
        if(!environment.production) console.log(err)
        this._snackBar.open('Could not Load Funds!', 'X', {duration: 2000})
      })
    }else{
      return Axios.get(`${environment.apiUrl}/funds`).then(res=>{
        return res.data
      }).catch(err=>{
        if(!environment.production) console.log(err)
        this._snackBar.open('Could not Load Funds!', 'X', {duration: 2000})
      })
    }
  }
}
