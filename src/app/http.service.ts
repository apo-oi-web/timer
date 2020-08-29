import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { timeout } from 'rxjs/operators';
import { of, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class HttpService {

  sheetID = '1GARGgvXDlsQxhaU5_pM8zkXiyQaicLRnDuqIn-SC610';

  constructor(private http: HttpClient) { }

  getOfficeAvailability() {
    // const url = `https://spreadsheets.google.com/feeds/worksheets/${this.sheetID}/public/basic?alt=json`;
    // const url = 'https://spreadsheets.google.com/feeds/cells/1GARGgvXDlsQxhaU5_pM8zkXiyQaicLRnDuqIn-SC610/ohokp9e/public/basic?alt=json';
    const url = 'https://spreadsheets.google.com/feeds/cells/1GARGgvXDlsQxhaU5_pM8zkXiyQaicLRnDuqIn-SC610/ohokp9e/public/basic/R1C1?alt=json';

    return this.http.get(url).pipe(timeout(10000));
  }

}

const RESPONSE = {
  "version": "1.0",
  "encoding": "UTF-8",
  "entry": {
    "xmlns": "http://www.w3.org/2005/Atom",
    "xmlns$batch": "http://schemas.google.com/gdata/batch",
    "xmlns$gs": "http://schemas.google.com/spreadsheets/2006",
    "id": {
      "$t": "https://spreadsheets.google.com/feeds/cells/1GARGgvXDlsQxhaU5_pM8zkXiyQaicLRnDuqIn-SC610/ohokp9e/public/basic/R1C1"
    },
    "updated": {
      "$t": "2020-08-29T05:14:00.553Z"
    },
    "category": [
      {
        "scheme": "http://schemas.google.com/spreadsheets/2006",
        "term": "http://schemas.google.com/spreadsheets/2006#cell"
      }
    ],
    "title": {
      "type": "text",
      "$t": "A1"
    },
    "content": {
      "type": "text",
      "$t": "8/28/2020 21:02:00"
    },
    "link": [
      {
        "rel": "self",
        "type": "application/atom+xml",
        "href": "https://spreadsheets.google.com/feeds/cells/1GARGgvXDlsQxhaU5_pM8zkXiyQaicLRnDuqIn-SC610/ohokp9e/public/basic/R1C1"
      }
    ]
  }
};
