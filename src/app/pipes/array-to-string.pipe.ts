import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'arrayToString'
})
export class ArrayToStringPipe implements PipeTransform {

  transform(input: Array<string>, sep = ">"): string {
    return input.toString();
  }

}
