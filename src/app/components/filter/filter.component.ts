import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { StartupStage, Sector } from '../../models/project.model';
import { Requirement } from '../../models/opportunity.model';
import { InvestorType, FundValue } from '../../models/fund.model';
import { FilterService } from '../../services/filter.service';

@Component({
  selector: 'app-filter',
  templateUrl: './filter.component.html',
  styleUrls: ['./filter.component.scss']
})
export class FilterComponent implements OnInit {

  stages: string[]
  sectors: string[]
  lookingFor: string[]
  investorTypes: string[]
  fundValues : string[]
  filterArray: any[] = []
  filterCount: number = 0
  menu_type: number = null
  investor_type: string = null
  project_sector: string = null
  fund_value: string = null
  project_stage: string = null
  looking_for: string = null

  constructor(public router: Router,
    private filterService: FilterService) { 
    this.stages = [ StartupStage.BETA, StartupStage.GROWING, StartupStage.GROWTH, StartupStage.IDEA, StartupStage.MVP ]
    this.sectors = [ Sector.CONSUMER, Sector.EDUCATION, Sector.E_COMMERCE, Sector.FIN_TECH, Sector.FOOD, Sector.HEALTHCARE_FITNESS, Sector.HR ]
    this.lookingFor = [ Requirement.CO_FOUNDER, Requirement.FUNDING, Requirement.IDEA_VALIDATION, Requirement.MENTORS_CONSULTANTS, Requirement.REFERENCE_CONNECTIONS, Requirement.SERVICE_PARTNERS_VENDORS ]
    this.investorTypes = [ InvestorType.ANGEL_NETWORK, InvestorType.FAMILY, InvestorType.INCUBATOR, InvestorType.INDIVIDUAL_INVESTOR ]
    this.fundValues = [ FundValue.ONE_LAKH, FundValue.TEN_THIRTY_LAKH, FundValue.THIRTY_FIFTY_LAKH, FundValue.FIFTY_LAKH_ONE_CRORE, FundValue.ONE_TWENTY_CRORE, FundValue.TWENTY_FIFTY_CRORE, FundValue.FIFTY_HUNDRED_CRORE ]
  }

  ngOnInit() {
  }

  clear(){
    this.menu_type = null
    this.investor_type = null
    this.project_sector = null
    this.fund_value = null
    this.project_stage = null
    this.looking_for = null
    this.filterArray = []
    this.filterService.setData(this.filterArray)
    this.calculateFilterCount()
  }

  calculateFilterCount(){
    this.filterCount = this.filterArray.reduce((res, arr)=>{
      if (typeof arr !== 'undefined') {
        return ++res;
      }
    }, 0)
  }

  updateValuesInFilterService(arr:any[]){
    this.filterService.setData(arr)
    this.calculateFilterCount()
  }

  filterByFundType(){
    if(this.menu_type===2){
      this.filterArray[0]='appliedFunds'
    }else this.filterArray[0] = ''
    this.updateValuesInFilterService(this.filterArray)
  }

  filterByInvestorType(){
    this.filterArray[1] = this.investor_type
    this.updateValuesInFilterService(this.filterArray)
  }

  filterByProjectSector(){
    this.filterArray[2] = this.project_sector
    this.updateValuesInFilterService(this.filterArray)
  }

  filterByFundValue(){
    this.filterArray[3] = this.fund_value
    this.updateValuesInFilterService(this.filterArray)
  }

  filterByIdeasType(){
    if(this.menu_type===1) this.filterArray[0] = 'myProjects'
    else if(this.menu_type===2) this.filterArray[0] = 'myOpportunities'
    this.updateValuesInFilterService(this.filterArray)
  }

  filterByProjectStage(){
    this.filterArray[1] = this.project_stage
    this.updateValuesInFilterService(this.filterArray)
  }

  filterByLookingFor(){
    this.filterArray[3] = this.looking_for
    this.updateValuesInFilterService(this.filterArray)
  }
}
