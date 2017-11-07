import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'filter'
})
export class FilterPipe implements PipeTransform {

  transform(items: any[], filterText: string): any {

    if (!items || !filterText) {
      return items;
    }

    let filteredList = items.filter(item => {

      return Object.keys(item).find(property => {

        if (property === '_id')
          return false;
        let data = item[property];
        let dataType = typeof data;
        if (dataType != "string" && dataType != "number")
          return false;
        if (dataType == "number")
          data = data.toString();

        return data.includes(filterText);

      })

    })

    return filteredList;
  }

}
