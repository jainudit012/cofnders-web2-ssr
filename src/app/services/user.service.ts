import { Injectable } from '@angular/core';
import { JwtHelperService } from '@auth0/angular-jwt'
import { HttpClient } from '@angular/common/http';
import { environment } from '../../environments/environment';
import Axios from 'axios';
import { MatSnackBar } from '@angular/material/snack-bar';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  helper:JwtHelperService

  constructor(private http: HttpClient,
    private _snackBar: MatSnackBar) { 
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
      console.log(err.response.data)
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
}