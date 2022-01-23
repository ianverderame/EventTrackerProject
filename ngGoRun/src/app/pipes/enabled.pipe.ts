import { Pipe, PipeTransform } from '@angular/core';
import { Route } from '../models/route';

@Pipe({
  name: 'enabled',
})
export class EnabledPipe implements PipeTransform {

  transform(routes: Route[]): Route[] {
    let result: Route[] = [];
    for (const r of routes) {
      if (r.enabled) {
        result.push(r);
      }
    }
    return result;
  }
}
