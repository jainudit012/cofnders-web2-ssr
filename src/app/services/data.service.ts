import { Injectable } from '@angular/core';

import Axios from 'axios';

import { environment } from '../../environments/environment';
import { MatSnackBar } from '@angular/material/snack-bar';
import { AuthService } from './auth.service';

import { ProjectNature, Sector, StartupStage, TeamSizes } from '../models/project.model';

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

  public createProject(data:any){
    if(this.authService.isAuthenticated() && this.authService.isUserAuthenticated()){
      const token = this.authService.userToken
      const projectData = {
        ...data.projectBasic,
        ...data.projectDetails,
        ...data.projectFinishing
      }
      projectData.category = Object.keys(ProjectNature).find(k=> ProjectNature[k]=== data.projectBasic.category)
      projectData.sector = Object.keys(Sector).find(k=> Sector[k]=== data.projectBasic.sector)
      projectData.stage = Object.keys(StartupStage).find(k=> StartupStage[k]=== data.projectBasic.stage)
      projectData.teamSize = Object.keys(TeamSizes).find(k=> TeamSizes[k]=== data.projectBasic.teamSize)
      if(!environment.production) console.log(projectData)

      Axios.post(`${environment.apiUrl}/projects`, projectData ,{headers: {'Authorization':token}}).then(res=>{
        this._snackBar.open('Successfully Created the Project', 'X', {duration: 2000})
        if(!environment.production) console.log(res.data)
      }).catch(err=>{
        this._snackBar.open('Could not create the Project', 'X', {duration: 2000})
        if(!environment.production) console.log('Error response data',err.response.data)
      })
    }
  }
}
