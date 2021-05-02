import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'filter',
  pure: false // Be careful with this prop, it can cause a performance issue! It means a pipe will be always recalculated when data is changed (see L248).
})
export class FilterPipe implements PipeTransform {

  transform(value: any, filterString: string, propName: string): any {
    if(value.length === 0 || filterString === ''){
      return value;
    }
    const resultArray = [];
    for(const item of value){
      if(item[propName] === filterString){
        resultArray.push(item);
      }
    }
    return resultArray;
  }
}
