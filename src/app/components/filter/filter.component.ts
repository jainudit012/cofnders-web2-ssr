import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { StartupStage, Sector } from '../../models/project.model';
import { Requirement } from '../../models/opportunity.model';
import { InvestorType, FundValue } from '../../models/fund.model';

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

  constructor(public router: Router) { 
    this.stages = [ StartupStage.BETA, StartupStage.GROWING, StartupStage.GROWTH, StartupStage.IDEA, StartupStage.MVP ]
    this.sectors = [ Sector.CONSUMER, Sector.EDUCATION, Sector.E_COMMERCE, Sector.FIN_TECH, Sector.FOOD, Sector.HEALTHCARE_FITNESS, Sector.HR ]
    this.lookingFor = [ Requirement.CO_FOUNDER, Requirement.FUNDING, Requirement.IDEA_VALIDATION, Requirement.MENTORS_CONSULTANTS, Requirement.REFERENCE_CONNECTIONS, Requirement.SERVICE_PARTNERS_VENDORS ]
    this.investorTypes = [ InvestorType.ANGEL_NETWORK, InvestorType.FAMILY, InvestorType.INCUBATOR, InvestorType.INDIVIDUAL_INVESTOR ]
    this.fundValues = [ FundValue.ONE_LAKH, FundValue.TEN_THIRTY_LAKH, FundValue.THIRTY_FIFTY_LAKH, FundValue.FIFTY_LAKH_ONE_CRORE, FundValue.ONE_TWENTY_CRORE, FundValue.TWENTY_FIFTY_CRORE, FundValue.FIFTY_HUNDRED_CRORE ]
  }

  ngOnInit() {
  }

  clear(){
    console.log('clicked')
  }

}
