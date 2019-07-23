import { Pipe, PipeTransform } from '@angular/core';
import * as moment from 'moment';


@Pipe({name: 'dateFromNow'}) 
export class CustomDatePipe implements PipeTransform {
    transform(value: Date, args?:any){
        let newDate: string = moment(value).fromNow()
        return newDate;
      }
}