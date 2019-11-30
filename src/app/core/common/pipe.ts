import { Pipe, PipeTransform } from '@angular/core';
import { toDoubleInteger } from './utils';

@Pipe({
  name: 'indexFormat'
})
export class IndexFormatPipe implements PipeTransform {
  transform(value: number): string {
    const result = value + 1;
    return toDoubleInteger(result);
  }
}
