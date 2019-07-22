import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class FilterService {

  private generalDataSource = new Subject<any>();
  generalData = this.generalDataSource.asObservable();


  constructor() { }


  setData(data: any) {
    this.generalDataSource.next(data)
  }
}