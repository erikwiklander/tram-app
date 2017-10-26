import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'countdown'
})
export class CountdownPipe implements PipeTransform {

  transform(value: number): string {
    if (value) {

      if (value < 0) {
        return 'Nu';
      }

      let t = value;
      const hours = Math.floor(t / 1000 / 60 / 60);
      t = t % (1000 * 60 * 60);
      const minutes = Math.floor(t / 1000 / 60);
      t = t % (1000 * 60);
      const seconds = Math.floor(t / 1000);

      if (hours > 0) {
        return hours + ':' + (minutes < 10 ? '0' : '') + minutes + ':' + (seconds < 10 ? '0' : '') + seconds;
      } else {
        return minutes + ':' + (seconds < 10 ? '0' : '') + seconds;
      }
    }
  }

}
