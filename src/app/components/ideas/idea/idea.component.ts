import { Component, OnInit } from '@angular/core';

import { DataService } from '../../../services/data.service';

@Component({
  selector: 'app-idea',
  templateUrl: './idea.component.html',
  styleUrls: ['./idea.component.scss']
})
export class IdeaComponent implements OnInit {

  feedData:any[]
  offset: number = 0
  doNextCallback: boolean = true;

  constructor(private dataService: DataService) { }

  ngOnInit() {
    this.dataService.getFeed().then(data=>{
      this.feedData = data.feed
    })
  }

  onScrollDown() {
  
    if(this.feedData.length < 10) this.doNextCallback = false;
    if(this.doNextCallback){
      this.offset += 5
      this.dataService.getFeed(this.offset).then(data=>{
        if(data.length < 10) this.doNextCallback = false
        let i
        for(i=0;i<data.feed.length;i++){
          this.feedData.push(data.feed[i])
        }
      })
    }
  }
}
