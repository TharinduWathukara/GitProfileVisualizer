import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'search'
})
export class SearchPipe implements PipeTransform {

  transform(arrays: any[], search_name: string): any []{
    if(!arrays) return [];
    if(!search_name) return arrays;
    
    search_name = search_name.toLowerCase();
    return arrays.filter( result => {
          return (result.name).toLowerCase().includes(search_name);
    });
  }

}