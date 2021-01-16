import { Pipe, PipeTransform } from '@angular/core';
import {DateTimeService} from '@app/core/services/date-time/date-time.service';

@Pipe({
  name: 'dateTime'
})
export class DateTimePipe implements PipeTransform {
  constructor(public dateTimeService: DateTimeService ) {

  }
  transform(date: string | undefined, time: string | undefined ): string | null {
    if (!date) {
      return null;
    }
    const dateString = this.dateTimeService.getDateTime(date);
    return `${dateString}, ${time}`;
  }
}
