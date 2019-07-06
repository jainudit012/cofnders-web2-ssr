import { Component, OnInit } from '@angular/core';
import { DataService } from '../../../services/data.service';

@Component({
  selector: 'app-fund',
  templateUrl: './fund.component.html',
  styleUrls: ['./fund.component.scss']
})
export class FundComponent implements OnInit {

  fundData:any

  constructor(private dataService: DataService) { }

  ngOnInit() {
    this.dataService.getFunds().then(data=>{
      this.fundData = data.funds
    })
  }

}
