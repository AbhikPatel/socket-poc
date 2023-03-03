import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'search'
})
export class SearchPipe implements PipeTransform {

  transform(value: any[], searchTerm: any): any {
    return value.filter((data:any) => data.first_name.toLowerCase().indexOf(searchTerm.toLowerCase()) > -1)
  }

}
