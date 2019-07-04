import { Pipe, PipeTransform } from '@angular/core';
import { ProjectNature } from '../models/project.model';


@Pipe({name: 'category'}) 
export class ProjectCategoryPipe implements PipeTransform {
    transform(value: string|number, args?:any){
        if(value in ProjectNature){
            return ProjectNature[value]
        }else return value
    }
}