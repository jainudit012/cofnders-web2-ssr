import { Injectable, Output, EventEmitter } from '@angular/core';

import Axios from 'axios';

import { environment } from '../../environments/environment';
import { MatSnackBar } from '@angular/material/snack-bar';
import { AuthService } from './auth.service';

import { ProjectNature, Sector, StartupStage, TeamSizes } from '../models/project.model';
import { HttpClient } from '@angular/common/http';
import { map } from 'rxjs/operators'
import { Requirement } from '../models/opportunity.model';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class DataService {

  constructor(private _snackBar: MatSnackBar,
    private authService: AuthService,
    private http: HttpClient,
    public router: Router) { }

  private redirectTo(uri:string) {
    this.router.navigateByUrl('/', {skipLocationChange: true}).then(() =>
    this.router.navigate([uri]));
  }

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

  public getFeed2(){
    if(this.authService.isAuthenticated() && this.authService.isUserAuthenticated()){
      const token = this.authService.userToken
      return this.http.get(`${environment.apiUrl}/feed`, {headers: {'Authorization': token}})
    }else {
      return this.http.get(`${environment.apiUrl}/feed`)
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
        this.redirectTo('ideas')
        if(!environment.production) console.log(res.data)
      }).catch(err=>{
        this._snackBar.open('Could not create the Project', 'X', {duration: 2000})
        if(!environment.production) console.log('Error response data',err.response.data)
      })
    }else {
      this._snackBar.open('Not Logged In!', 'X',{duration: 2000})
    }
  }

  public getMyProjects(){
    if(this.authService.isAuthenticated() && this.authService.isUserAuthenticated()){
      const token = this.authService.userToken
      const decodedToken = this.authService.decodedToken
      return Axios.get(`${environment.apiUrl}/projects/${decodedToken.id}`, {headers: {'Authorization': token}}).then(res=>{
        return res.data
      }).catch(err=>{
        if(!environment.production) console.log(err.response.data)
      })
    }else {
      this._snackBar.open('Not Logged In!', 'X',{duration: 2000})
    }
  }

  public createOpportunity(data:any){
    if(this.authService.isAuthenticated() && this.authService.isUserAuthenticated()){
      const token = this.authService.userToken
      let opportunityData = {
        details: data.details
      }
      opportunityData['requirement'] = Object.keys(Requirement).find(k=> Requirement[k] === data.requirement)
      if(!environment.production) console.log(opportunityData)

      Axios.post(`${environment.apiUrl}/opportunities/${data.projectId}`, opportunityData, {headers: {'Authorization': token}}).then(res=>{
        this._snackBar.open('Successfully Created the Opportunity', 'X', {duration: 2000})
        this.redirectTo('ideas')
        if(!environment.production) console.log(res.data)
      }).catch(err=>{
        this._snackBar.open('Could not create the Opportunity', 'X', {duration: 2000})
        if(!environment.production) console.log('Error response data',err.response.data)
      })
    }else {
      this._snackBar.open('Not Logged In!', 'X',{duration: 2000})
    }
  }
}
