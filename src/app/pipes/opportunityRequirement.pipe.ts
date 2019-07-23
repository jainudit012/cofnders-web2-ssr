import { Pipe, PipeTransform } from '@angular/core';

import { Requirement } from '../models/opportunity.model';


@Pipe({name: 'requirement'}) 
export class OpportunityRequirementPipe implements PipeTransform {
    transform(value: string|number, args?:any){
        if(value in Requirement){
            return Requirement[value]
        }else return value
    }
}