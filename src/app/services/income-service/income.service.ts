import {Injectable} from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {Observable} from 'rxjs';
import {Category} from '../../models/category';
import {Income} from '../../models/income';
import { environment } from '../../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class IncomeService {

  constructor(private http: HttpClient) {
  }


  getAll(): Observable<Income[]> {

    return this.http.get<Income[]>(`${environment.apiUrl}/incomes`, {
      headers: new HttpHeaders({
        'Content-Type': 'application/json'
      })
    });
  }

  getBetweenDates(dateFrom: Date, dateTo: Date): Observable<Income[]> {

    dateTo.setDate(dateTo.getDate() + 1);

    return this.http.get<Income[]>(`${environment.apiUrl}/incomes/date`, {
      params: {
        dateFrom: dateFrom.toISOString(),
        dateTo: dateTo.toISOString()
      },
      headers: new HttpHeaders({
        'Content-Type': 'application/json'
      })
    });
  }

  saveIncome(income): Observable<Income> {
    return this.http.post<Income>(`${environment.apiUrl}/incomes`,
      {
        id: income.id ? income.id : null,
        category: {
          id: income.categoryId,
          title: income.categoryTitle,
          enabled: income.categoryEnabled,
          color: income.categoryColor
        } as Category,
        name: income.name,
        amount: income.amount,
        date: income.date
      }, {
        headers: new HttpHeaders({
          'Content-Type': 'application/json'
        })
      });
  }

  deleteIncome(id): Observable<void> {
    return this.http.post<void>(`${environment.apiUrl}/incomes/delete/${id}`, {});
  }

}
