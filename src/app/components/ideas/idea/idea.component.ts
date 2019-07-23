import { Component, Inject, OnDestroy, OnInit } from '@angular/core';
import { WINDOW } from '@ng-toolkit/universal';
import { Subscription } from 'rxjs';

import { Requirement } from '../../../models/opportunity.model';
import { Sector, StartupStage } from '../../../models/project.model';
import { AuthService } from '../../../services/auth.service';
import { DataService } from '../../../services/data.service';
import { FilterService } from '../../../services/filter.service';


@Component({
  selector: 'app-idea',
  templateUrl: './idea.component.html',
  styleUrls: ['./idea.component.scss']
})
export class IdeaComponent implements OnInit, OnDestroy{

  feedData:any[]
  feedBackup: any[]
  offset: number = 0
  doNextCallback: boolean;
  filterSubscription: Subscription
  sector: Sector | string
  stage: StartupStage | string
  requirement: Requirement | string
  type: string

  constructor(private dataService: DataService,
    @Inject(WINDOW) private window: Window,
    private filterService: FilterService,
    private authService: AuthService
   ) { 
   }

  ngOnInit() {
    this.initData()
    this.listenToValueChange()
  }

  initData(){
    this.dataService.getFeed(this.type, this.stage, this.sector, this.requirement).then(data=>{
      this.feedData = data.feed
      if(this.type && this.type.length > 0 && this.feedData.length<5) this.doNextCallback = false
      else if((!this.type ||this.type.length===0) && this.feedData.length < 10) this.doNextCallback = false
      else this.doNextCallback = true
    })
  }

  onScrollDown() {
  
    if(this.doNextCallback){
      this.offset += 5
      this.dataService.getFeed(this.type, this.stage, this.sector, this.requirement, this.offset).then(data=>{
        if(data.length < 10) this.doNextCallback = false
        
        let i
        for(i=0;i<data.feed.length;i++){
          this.feedData.push(data.feed[i])
        }
      })
    }
  }

  scrollToTop(){
    this.window.scroll(0,0)
  }

  listenToValueChange(){
    this.filterSubscription = this.filterService.generalData.subscribe(async(data)=>{
      if(data[0]&&data[0].length>0){
        if(this.authService.isAuthenticated()&&this.authService.isUserAuthenticated()){
          if(data[0]==='myProjects') {
            this.type = 'project'
            this.initData()
          }else if (data[0]==='myOpportunities'){
            this.type = 'opportunity'
            this.initData()
          }
        }
      }

      if(data[1]&&data[1].length>1){
        this.stage = Object.keys(StartupStage).find(k=> StartupStage[k]===data[1])
        this.initData()
      }

      if(data[2]&&data[2].length>0){
        this.sector = Object.keys(Sector).find(k=> Sector[k]===data[2])
        this.initData()
      }

      if(data[3]&&data[3].length>0){
        this.requirement = Object.keys(Requirement).find(k=> Requirement[k]===data[3])
        this.initData()
      }

      if(!data[0]&&!data[1]&&!data[2]&&!data[3]){
        this.sector = ''
        this.stage = ''
        this.requirement = ''
        this.type = ''
        this.initData()
      }
    })
  }

  ngOnDestroy(){
    this.filterSubscription.unsubscribe()
  }
}
