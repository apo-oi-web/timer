import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { timeout } from 'rxjs/operators';
import { of, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class HttpService {

  sheetID = '1GARGgvXDlsQxhaU5_pM8zkXiyQaicLRnDuqIn-SC610';
  sheetSubID = 'ohokp9e';

  constructor(private http: HttpClient) { }

  getOfficeAvailability() {
    // const url = `https://spreadsheets.google.com/feeds/worksheets/${this.sheetID}/public/basic?alt=json`;
    // const url = 'https://spreadsheets.google.com/feeds/cells/{this.sheetID}/${this.sheetSubID}/public/basic?alt=json';
    const url = `https://spreadsheets.google.com/feeds/cells/${this.sheetID}/${this.sheetSubID}/public/basic/R1C1?alt=json`;

    return this.http.get(url).pipe(timeout(10000));
  }

}
