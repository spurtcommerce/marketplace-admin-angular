import { Pipe, PipeTransform, OnDestroy } from '@angular/core';
import { formatDate } from '@angular/common';
import { DatePipe } from '@angular/common';
import * as moment from 'moment-timezone'; // Import moment-timezone
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';

@Pipe({
  name: 'dynamicDate'
})
export class DynamicDatePipe implements PipeTransform {
  time: string;
  dateFormat: string;
  timeZone: string;
  
  // Private properties for managing subscription cleanup (not used in this scenario)
  private onDestroy$: Subject<void> = new Subject<void>(); 

  constructor(private datePipe: DatePipe) {
    this.time = localStorage.getItem('timeFormat');
    this.dateFormat = localStorage.getItem('dateFormat');
    this.timeZone = localStorage.getItem('timeZone');
  }

  transform(value: string): string {
    // Convert the input value to a moment object
    const date = moment(value); 

    // If timeZone is set, use moment-timezone to convert the date to the desired time zone
    const momentInTimeZone = this.timeZone ? date.tz(this.timeZone) : date;

    // Get time portion (hours and minutes) from the moment object
    const timePortion = value?.split('T')[1]?.split('.')[0];

    // Format the date only if the time is '00:00:00'
    if (timePortion === '00:00:00') {
      const formattedDate = momentInTimeZone.format(this.dateFormat); // Format the date using moment
      return formattedDate;
    }

    // Extract hours and minutes
    let hours = momentInTimeZone.hours();
    const minutes = momentInTimeZone.minutes();
    
    let formattedTime;
    if (this.time === '12 hrs') {
      const ampm = hours >= 12 ? 'PM' : 'AM';
      hours = hours % 12;
      hours = hours ? hours : 12;
      formattedTime = `${this.padZero(hours)}:${this.padZero(minutes)} ${ampm}`;
    } else {
      formattedTime = `${this.padZero(hours)}:${this.padZero(minutes)}`;
    }

    const formattedDate = momentInTimeZone.format(this.dateFormat); // Format the date using moment
    return `${formattedDate}, ${formattedTime}`;
  }

  padZero(num: number): string {
    return num < 10 ? '0' + num : num.toString();
  }

  ngOnDestroy(): void {
    this.onDestroy$.next();
    this.onDestroy$.complete();
  }
}
