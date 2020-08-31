import { Component, OnInit, OnDestroy } from '@angular/core';
import { HttpService } from 'src/app/http.service';
import { Observable, interval } from 'rxjs';
import { Countdown } from 'src/app/model/Countdown.model';

@Component({
  selector: 'apo-office',
  templateUrl: './office.component.html',
  styleUrls: ['./office.component.scss']
})
export class OfficeComponent implements OnInit, OnDestroy {

  available = false;
  lastAccessDate: Date = null;
  countdown: Countdown = new Countdown();
  timerIntervalID: number;
  refreshIntervalID: number;
  status: string = "loading";

  constructor(private http: HttpService) { }

  ngOnInit(): void {
    this.available = false;
    this.updateTime();
    // Periodically refresh the timestamp to count down from
    this.refreshIntervalID = setInterval(() => this.updateTime(), 30000);
  }

  ngOnDestroy(): void {
    clearInterval(this.refreshIntervalID);
  }

  isClear(): boolean {
    if (!this.lastAccessDate) {
      return false;
    }
    let now = new Date();
    // console.log(`Current time: ${now.toString()} or in ms: ${now.getTime()}`);
    // console.log(
    //   `Milliseconds elapsed: ${
    //     now.getTime() - this.lastAccessDate.getTime()
    //   }\nWhich is ${
    //     Math.floor((now.getTime() - this.lastAccessDate.getTime()) / (60 * 60 * 1000))
    //   } hours, ${
    //     Math.floor((now.getTime() - this.lastAccessDate.getTime()) / (60 * 1000) % 60)
    //   } minutes, and ${
    //     Math.floor((now.getTime() - this.lastAccessDate.getTime()) / (1000) % 60)
    //   } seconds`);
    return now.getTime() - this.lastAccessDate.getTime() > 15 * 60 * 1000;
  }

  getRemainingTime(): Countdown {
    if (!this.lastAccessDate) {
      return new Countdown();
    }
    let now = new Date();
    let min = 15 - Math.floor((now.getTime() - this.lastAccessDate.getTime()) / (60 * 1000) % 60);
    let sec = 60 - Math.floor((now.getTime() - this.lastAccessDate.getTime()) / (1000) % 60);
    return new Countdown (
      sec === 60 ? 0 : sec,  // Seconds
      sec === 60 ? min : min - 1,  // Minutes
    );
  }


  updateTime(): void {
    this.status = 'loading';
    this.http.getOfficeAvailability().subscribe({
      next: ( response: {entry: {content: {$t: String} } } ) => {
        // console.log(`Time: ${response.entry.content.$t}`);
        const time = response.entry.content.$t.split('-');
        // console.log(`Split time: ${JSON.stringify(time)}`);
        const date = new Date(`${
          parseInt(time[0], 10)}-${  // Year
          parseInt(time[1], 10) - 1}-${  // Month
          parseInt(time[2], 10)} ${  // Day
          parseInt(time[3], 10)}:${  // Hour
          parseInt(time[4], 10)}:${  // Minute
          parseInt(time[5], 10)} GMT-04:00`  // Second
          // Eastern Time
        );
        console.log(`Date string: ${date.toString()}`);
        this.lastAccessDate = date;
        this.status = 'success';

        // If the office is newly unavailable
        if (!this.timerIntervalID && !this.isClear()) {
          this.timerIntervalID = setInterval(() => this.countdown = this.getRemainingTime(), 1000);
        }

        // If the office is newly available
        if (this.timerIntervalID && this.isClear() && this.timerIntervalID) {
          clearInterval(this.timerIntervalID);
          this.timerIntervalID = null;
        }
      },
      error: err => {
        console.error(`Error: ${err.message}`);
        this.status = 'fail';
      }
    });
  }

}
