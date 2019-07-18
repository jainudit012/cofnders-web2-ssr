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
  offset: number = 0
  doNextCallback: boolean = true;

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

  onScrollDown(){
    if(this.fundData.length < 10) this.doNextCallback = false;
    if(this.doNextCallback){
      this.offset += 10
      this.dataService.getFunds(this.offset).then(data=>{
        if(data.length < 10) this.doNextCallback = false
        let i
        for(i=0;i<data.feed.length;i++){
          this.fundData.push(data.feed[i])
        }
      })
    }
  }

}
