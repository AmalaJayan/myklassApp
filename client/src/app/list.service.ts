import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { List } from './list';
import { Test } from './test';
import { Observable } from 'rxjs';
import * as moment from 'moment';

@Injectable({
  providedIn: 'root'
})
export class ListService {
  constructor(private http: HttpClient) { }

  getLists() {
    return this.http.get<List[]>('/api/lists');
  }

  addList(name, description, date, time, status):Observable<Test> {
    let timeVal = time.hour+':'+time.minute;
    let convertVal = date +'-'+timeVal;
    let timeInUTC = moment(date+" - "+timeVal, "YYYY-MM-DD - HH:SS").toDate().getTime();
    const issue = {
      user_id: "user_"+name,
      name: name,
      description: description,
      date: timeInUTC,
      status: status
    };
    return this.http.post<Test>('/api/lists/add', issue);
  } 
}
