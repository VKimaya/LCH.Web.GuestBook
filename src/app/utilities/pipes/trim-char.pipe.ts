import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'trimChar'
})
export class TrimCharPipe implements PipeTransform {

  transform(value: string, ...args: string[]): string {
    let charToReplace = '/';
    if(args !== null && args[0] !== null) {
      charToReplace = args[0];
    }
    if(value !== '')
    {
      if (value.endsWith(charToReplace)) {
        value = this.trim(value, charToReplace);
      }
    }
    return value;
  }

  private trim(str: string, ch: string) {
    var start = 0, 
        end = str.length;

    while(start < end && str[start] === ch)
        ++start;

    while(end > start && str[end - 1] === ch)
        --end;

    return (start > 0 || end < str.length) ? str.substring(start, end) : str;
  }

}
