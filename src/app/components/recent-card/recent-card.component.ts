import { Component, OnInit } from '@angular/core';
import { DataService } from '../../services/data.service';

@Component({
  selector: 'recent-card',
  templateUrl: './recent-card.component.html',
  styleUrls: ['./recent-card.component.scss']
})
export class RecentCardComponent implements OnInit {
  res$:any

  constructor(private dataService: DataService) { }

  ngOnInit() {
    this.res$ = this.dataService.getRecent()
  }

}
