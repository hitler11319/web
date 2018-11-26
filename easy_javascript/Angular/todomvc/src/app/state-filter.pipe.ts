// Filter的概念

/*
pipe就是轉換格式的概念，詳見https://angular.io/guide/pipes

例如：最常見的就是{{birthday | date}}  把字串轉成日期格式
{{ birthday | date:"MM/dd/yy" }}

*/

import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'stateFilter',   // namespace
  pure : false  // 是否即時更新
})
export class StateFilterPipe implements PipeTransform {
  transform(value: any, state?: any): any {
    // value：接受的值 state(args):參數值，可以在後面繼繼,來加入參數值  any是型別 最右邊的any是回傳值
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
