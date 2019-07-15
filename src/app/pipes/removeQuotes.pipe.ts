import { Pipe, PipeTransform } from '@angular/core';


@Pipe({name: 'removeQuotes'}) 
export class RemoveQuotesPipe implements PipeTransform {
    transform(value: string, args?:any){
        if(value.indexOf('"')==0){
            return value.slice(1, -1)
        }else return value
    }
}