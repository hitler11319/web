// Filter的概念

import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'stateFilter',
  pure : false
})
export class StateFilterPipe implements PipeTransform {
  transform(value: any, state?: any): any {
    // value：接受的回傳值型別 state(args):回傳值 any是型別 最右邊的any是回傳值
    console.log(value);
    // console.log(args);
    if (state === 'active') {
      return value.filter(x => x.isCompleted === false);
    }
    if (state === 'completed') {
      return value.filter(x => x.isCompleted === true);
    }
    return value;
  }
}
