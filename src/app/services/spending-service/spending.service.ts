import {Injectable} from '@angular/core';
import {HttpClient, HttpHeaders, HttpParams} from '@angular/common/http';
import {Observable} from 'rxjs';
import {Spending} from '../../models/spending';
import {Category} from '../../models/category';
import { environment } from '../../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class SpendingService {

  constructor(private http: HttpClient) {
  }


  getAll(): Observable<Spending[]> {

    return this.http.get<Spending[]>(`${environment.apiUrl}/spendings`, {
      headers: new HttpHeaders({
        'Content-Type': 'application/json'
      })
    });
  }

  getBetweenDates(dateFrom: Date, dateTo: Date): Observable<Spending[]> {

    dateTo.setDate(dateTo.getDate() + 1);

    return this.http.get<Spending[]>(`${environment.apiUrl}/spendings/date`, {
      params: {
        dateFrom: dateFrom.toISOString(),
        dateTo: dateTo.toISOString()
      },
      headers: new HttpHeaders({
        'Content-Type': 'application/json'
      })
    });
  }

  saveSpending(spending): Observable<Spending> {
    return this.http.post<Spending>(`${environment.apiUrl}/spendings`,
      {
        id: spending.id ? spending.id : null,
        category: {
          id: spending.categoryId,
          title: spending.categoryTitle,
          enabled: spending.categoryEnabled,
          color: spending.categoryColor
        } as Category,
        name: spending.name,
        amount: spending.amount < 0 ? spending.amount : -spending.amount,
        date: spending.date
      }, {
        headers: new HttpHeaders({
          'Content-Type': 'application/json'
        })
      });
  }

  deleteSpending(id): Observable<void> {
    return this.http.post<void>(`${environment.apiUrl}/spendings/delete/${id}`, {});
  }

}
