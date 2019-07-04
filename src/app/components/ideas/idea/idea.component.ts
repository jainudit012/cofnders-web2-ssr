import { Component, OnInit } from '@angular/core';

import { DataService } from '../../../services/data.service';

@Component({
  selector: 'app-idea',
  templateUrl: './idea.component.html',
  styleUrls: ['./idea.component.scss']
})
export class IdeaComponent implements OnInit {

  feedData:any[]

  constructor(private dataService: DataService) { }

  ngOnInit() {
    this.dataService.getFeed().then(data=>{
      this.feedData = data.feed
    })
  }



}
