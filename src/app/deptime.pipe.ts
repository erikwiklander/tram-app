import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'deptime'
})
export class DeptimePipe implements PipeTransform {

  transform(date: Date): string {

    let result = 'kl. ';
    result += this.padZero(date.getHours());
    result += '.';
    result += this.padZero(date.getMinutes());

    return result;

  }

  private padZero(n: number): string {
    if (n < 10) {
      return '0' + n;
    } else {
      return '' + n;
    }
  }

}
