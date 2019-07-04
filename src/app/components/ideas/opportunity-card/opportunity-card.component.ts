import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'opportunity-card',
  templateUrl: './opportunity-card.component.html',
  styleUrls: ['./opportunity-card.component.scss']
})
export class OpportunityCardComponent implements OnInit {

  @Input('opportunity') opportunityData

  constructor() { }

  ngOnInit() {
  }

}
