import { Pipe, PipeTransform } from '@angular/core';
import { StartupStage } from '../models/project.model';


@Pipe({name: 'stage'}) 
export class ProjectStagePipe implements PipeTransform {
    transform(value: string|number, args?:any){
        if(value in StartupStage){
            return StartupStage[value]
        }else return value
    }
}