import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'location'
})
export class LocationPipe implements PipeTransform {

  transform(value: any, ...args: unknown[]): any {
    if (value) {
      const location = value.split(',');
      const obj = {
        lat: Number(location[0]),
        lng: Number(location[1])
      };
      return obj;
    }
  }

}
