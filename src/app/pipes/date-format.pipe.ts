import {Pipe, PipeTransform} from '@angular/core';

@Pipe({
  name: 'dateFormat'
})
export class DateFormatPipe implements PipeTransform {
  transform(epoch: number): string {

    const date = new Date(epoch * 1000);
    const options: Intl.DateTimeFormatOptions = {
      weekday: 'long',
      month: 'short',
      day: 'numeric'
    };
    return date.toLocaleDateString('en-US', options);
  }
}

@Pipe({
  name: 'timeFormat'
})
export class TimeFormatPipe implements PipeTransform {
  transform(value: number): string {
    if (!value) return '';
    const date = new Date(value * 1000);
    return date.toLocaleTimeString([], {hour: '2-digit', minute: '2-digit'});
  }
}