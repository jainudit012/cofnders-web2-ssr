import { Pipe, PipeTransform } from '@angular/core';

import { InvestorType } from '../models/fund.model';


@Pipe({name: 'investorType'}) 
export class InvestorTypePipe implements PipeTransform {
    transform(value: string|number, args?:any){
        if(value in InvestorType){
            return InvestorType[value]
        }else return value
    }
}