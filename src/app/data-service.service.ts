import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root',
})
export class DataServiceService {
  constructor(private http: HttpClient) {}
  private _url = 'https://raw.githubusercontent.com/sampee100/API/main/interviewApp.json';

  myData() {
    return this.http.get(this._url);
  }
}
