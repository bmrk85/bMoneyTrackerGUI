import {Injectable} from '@angular/core';
import {HttpClient, HttpHeaders, HttpParams} from '@angular/common/http';
import {Observable} from 'rxjs';
import {Spending} from '../../models/spending';

@Injectable({
  providedIn: 'root'
})
export class SpendingService {

  constructor(private http: HttpClient) {
  }


  getAll(): Observable<Spending[]> {

    return this.http.get<Spending[]>(`http://localhost:8080/spendings`, {
      headers: new HttpHeaders({
        'Content-Type': 'application/json'
      })
    });
  }

  getBetweenDates(dateFrom: Date, dateTo: Date): Observable<Spending[]> {

    return this.http.get<Spending[]>(`http://localhost:8080/spendings/date`, {
      params: {
        dateFrom: dateFrom.toISOString(),
        dateTo: dateTo.toISOString()
      },
      headers: new HttpHeaders({
        'Content-Type': 'application/json'
      })
    });
  }

}
