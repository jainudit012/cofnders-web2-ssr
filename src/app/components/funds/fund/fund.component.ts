import { Component, Inject, OnDestroy, OnInit } from '@angular/core';
import { WINDOW } from '@ng-toolkit/universal';
import { Subscription } from 'rxjs';

import { FundValue, InvestorType } from '../../../models/fund.model';
import { StartupStage } from '../../../models/project.model';
import { AuthService } from '../../../services/auth.service';
import { DataService } from '../../../services/data.service';
import { FilterService } from '../../../services/filter.service';


@Component({
  selector: 'app-fund',
  templateUrl: './fund.component.html',
  styleUrls: ['./fund.component.scss']
})
export class FundComponent implements OnInit {

  userProjectResponse: any;
  userProjects: any[];
  userApprovedProjects:any[];
  fundData:any [];
  fundBackup: any[];
  offset: number = 0;
  doNextCallback: boolean = true;
  filterSubscription: Subscription;
  investorType: InvestorType | string
  stage: StartupStage | string
  fundValue: FundValue | string
  type: string
  hideArrow:boolean = true

  constructor(private dataService: DataService,
    private authService: AuthService,
    @Inject(WINDOW) private window: Window,
    private filterService: FilterService) {
    }

  async ngOnInit() {
    this.initData()
    this.listenToValueChange()

    if(this.authService.isAuthenticated()&&this.authService.isUserAuthenticated()){
      this.userProjectResponse = await this.dataService.getMyProjects()
      this.userProjects = [...this.userProjectResponse.projects]
      this.userApprovedProjects = this.userProjects.filter(p=>{
        return p.isApproved
      })
    }
  }

  initData(){
    this.dataService.getFunds(this.investorType, this.stage, this.fundValue, this.type).then(data=>{
      this.fundData = data.funds
    })
  }

  onScrollDown(){
    this.hideArrow = false

    if(this.fundData.length < 10) this.doNextCallback = false;
    if(this.doNextCallback){
      this.offset += 10
      this.dataService.getFunds(this.investorType, this.stage, this.fundValue, this.type, this.offset).then(data=>{
        if(data.length < 10) this.doNextCallback = false
        let i
        for(i=0;i<data.feed.length;i++){
          this.fundData.push(data.feed[i])
        }
      })
    }
  }

  scrollToTop(){
    this.hideArrow = true
    this.window.scrollTo({
      top: 0,
      left: 0,
      behavior: 'smooth'
    })
  }

  listenToValueChange(){
    this.filterSubscription = this.filterService.generalData.subscribe(async(data)=>{
      
      if(data[0]&&data[0].length>0){
        if(this.authService.isAuthenticated()&&this.authService.isUserAuthenticated()){
          if(data[0]==='appliedFunds') this.type = 'applied'
          this.initData()
        }
      }

      if(data[1]&&data[1].length>1){
        this.investorType = Object.keys(InvestorType).find(k=> InvestorType[k]===data[1])
        this.initData()
      }

      if(data[2]&&data[2].length>0){
        this.stage = Object.keys(StartupStage).find(k=> StartupStage[k]===data[2])
        this.initData()
      }

      if(data[3]&&data[3].length>0){
        this.fundValue = Object.keys(FundValue).find(k=> FundValue[k]===data[3])
        this.initData()
      }

      if(!data[0]&&!data[1]&&!data[2]&&!data[3]){
        this.investorType = ''
        this.stage = ''
        this.fundValue = ''
        this.type = ''
        this.initData()
      }
    })
  }

  // ngOnDestroy(){
  //   this.filterSubscription.unsubscribe()
  // }

}
