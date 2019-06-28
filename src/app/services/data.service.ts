import { Injectable } from '@angular/core';

import Axios from 'axios';

import { environment } from '../../environments/environment';
import { MatSnackBar } from '@angular/material/snack-bar';

@Injectable({
  providedIn: 'root'
})
export class DataService {

  constructor(private _snackBar: MatSnackBar) { }

  public getRecent(){
    return Axios.get(`${environment.apiUrl}/ideas`).then(res=>{
      return res.data
    }).catch(err=>{
      if(!environment.production) console.log(err.response.data)
      this._snackBar.open('Could not Load Recent Ideas!', 'X', {duration: 2000})
    })
  }
}
