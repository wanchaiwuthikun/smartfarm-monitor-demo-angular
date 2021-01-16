import {Injectable} from '@angular/core';
import {DateObject, DateTime} from 'luxon';
import {NgbDate, NgbDateStruct} from '@ng-bootstrap/ng-bootstrap';

@Injectable({
  providedIn: 'root'
})
export class DateTimeService {
  private locale = 'en';

  constructor() {

  }

  getDateTime(date: string): string {
    return DateTime.fromISO(date, {locale: this.locale}).toLocaleString(DateTime.DATE_FULL);
  }

  getDateObject(date?: Date): NgbDateStruct {
    date = date ? date : new Date();
    return DateTime.fromJSDate(date).toObject() as NgbDateStruct;
  }

  newISODateWithDateStruct(date: NgbDate): string {
    return DateTime.fromObject(date).toISODate();
  }


}
