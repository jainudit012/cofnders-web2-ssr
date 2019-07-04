import { Pipe, PipeTransform } from '@angular/core';
import { TeamSizes } from '../models/project.model';


@Pipe({name: 'teamSize'}) 
export class TeamSizePipe implements PipeTransform {
    transform(value: string|number, args?:any){
        if(value in TeamSizes){
            return TeamSizes[value]
        }
        else return value
    }
}

