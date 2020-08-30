export class Countdown {
  hours?: number;
  minutes: number;
  seconds: number;

  constructor(seconds: number=null, minutes: number=null, hours: number=null) {
    this.seconds = seconds;
    this.minutes = minutes;
    if (hours) {
      this.hours = hours;
    }
  }

  toString(): string {
    return `${this.hours ? this.hours + ':' : ''}${("00" + this.minutes).slice(-2)}:${("00" + this.seconds).slice(-2)}`;
  }

  asText(): string {
    if (this.hours) {
      return `${
        this.hours} hour${this.hours === 1 ? '' : 's'
      }, ${
        this.minutes} minute${this.minutes === 1? '' : 's'
      }, and ${
        this.seconds} second${this.seconds === 1? '' : 's'
      }`;
    }
    return `${
      this.minutes} minute${this.minutes === 1? '' : 's'
    } and ${
      this.seconds} second${this.seconds === 1? '' : 's'
    }`;
  }

  isNull(): boolean {
    return this.seconds !== null;
  }
}
