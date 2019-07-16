import { Component, OnInit, Input } from '@angular/core';
import { DataService } from '../../../services/data.service';
import { AuthService } from '../../../services/auth.service';

@Component({
  selector: 'app-fund',
  templateUrl: './fund.component.html',
  styleUrls: ['./fund.component.scss']
})
export class FundComponent implements OnInit {

  userProjectResponse: any
  userProjects: any[]
  userApprovedProjects:any[]
  fundData:any

  constructor(private dataService: DataService,
    private authService: AuthService) { }

  async ngOnInit() {
    this.dataService.getFunds().then(data=>{
      this.fundData = data.funds
    })

    if(this.authService.isAuthenticated()&&this.authService.isUserAuthenticated()){
      this.userProjectResponse = await this.dataService.getMyProjects()
      this.userProjects = [...this.userProjectResponse.projects]
      this.userApprovedProjects = this.userProjects.filter(p=>{
        return p.isApproved
      })
    }
  }

}
