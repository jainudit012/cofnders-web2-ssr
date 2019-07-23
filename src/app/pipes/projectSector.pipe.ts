import { Pipe, PipeTransform } from '@angular/core';

import { Sector } from '../models/project.model';


@Pipe({name: 'sector'}) 
export class ProjectSectorPipe implements PipeTransform {
    transform(value: string|number, args?:any){
        if(value in Sector){
            return Sector[value]
        }else return value
    }
}