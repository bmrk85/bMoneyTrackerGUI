import {Injectable} from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {Observable} from 'rxjs';
import {CashFlow} from '../../models/cash-flow';
import {stringify} from 'querystring';

@Injectable({
  providedIn: 'root'
})
export class CashFlowService {

  constructor(private http: HttpClient) {
  }

  getBetweenDates(dateFrom: Date, dateTo: Date): Observable<CashFlow[]> {

    dateTo.setDate(dateTo.getDate() + 1);

    return this.http.get<CashFlow[]>(`http://localhost:8080/cashflow`, {
      params: {
        dateFrom: dateFrom.toISOString(),
        dateTo: dateTo.toISOString()
      },
      headers: new HttpHeaders({
        'Content-Type': 'application/json'
      })
    });
  }

  sendDatasourceData(data: CashFlow[]): Observable<Blob> {
    return this.http.post<Blob>(`http://localhost:8080/cashflow`, data, {
      responseType:'blob' as 'json'
    });
  }

}
