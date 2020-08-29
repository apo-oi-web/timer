import { Component, OnInit } from '@angular/core';
import { HttpService } from 'src/app/http.service';
import { Observable, interval } from 'rxjs';

@Component({
  selector: 'apo-office',
  templateUrl: './office.component.html',
  styleUrls: ['./office.component.scss']
})
export class OfficeComponent implements OnInit {

  available = false;
  lastAccessDate: Date = null;
  displayString = '';
  intervalID;

  constructor(private http: HttpService) { }

  isClear(): boolean {
    if (!this.lastAccessDate) {
      return false;
    }
    let now = new Date();
    console.log(`Current time: ${now.toString()} or in ms: ${now.getTime()}`);
    console.log(
      `Milliseconds elapsed: ${
        now.getTime() - this.lastAccessDate.getTime()
      }\nWhich is ${
        Math.floor((now.getTime() - this.lastAccessDate.getTime()) / (60 * 60 * 1000))
      } hours, ${
        Math.floor((now.getTime() - this.lastAccessDate.getTime()) / (60 * 1000) % 60)
      } minutes, and ${
        Math.floor((now.getTime() - this.lastAccessDate.getTime()) / (1000) % 60)
      } seconds`);
    return now.getTime() - this.lastAccessDate.getTime() > 15 * 60 * 1000;
  }

  remainingTime(): string {
    if (!this.lastAccessDate) {
      return '';
    }
    let now = new Date();
    let min = 15 - Math.floor((now.getTime() - this.lastAccessDate.getTime()) / (60 * 1000) % 60);
    let sec = 60 - Math.floor((now.getTime() - this.lastAccessDate.getTime()) / (1000) % 60);
    return `${sec === 60 ? min : min - 1} minute${min === 1 ? '' : 's'} and ${sec === 60 ? '0' : sec} seconds`;
  }

  ngOnInit(): void {
    this.available = false;
    this.updateTime();
    this.intervalID = setInterval(() => this.displayString = this.remainingTime(), 1000);
  }

  updateTime(): void {
    this.http.getOfficeAvailability().subscribe({
      next: ( response: {entry: {content: {$t: String} } } ) => {
        console.log(`Time: ${response.entry.content.$t}`);
        let time = response.entry.content.$t.split('-');
        console.log(`Split time: ${JSON.stringify(time)}`);
        let date = new Date(
          parseInt(time[0], 10),  // Year
          parseInt(time[1], 10) - 1,  // Month
          parseInt(time[2], 10),  // Day
          parseInt(time[3], 10),  // Hour
          parseInt(time[4], 10),  // Minute
          parseInt(time[5], 10),  // Second
        );
        console.log(`Date string: ${date.toString()}`);
        this.lastAccessDate = date;
      },
      error: err => {
        console.error(`Error: ${err.message}`);
      }
    });
  }

}
