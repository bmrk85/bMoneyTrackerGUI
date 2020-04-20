import {Injectable} from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {Observable} from 'rxjs';
import {CashFlow} from '../../models/cash-flow';
import {stringify} from 'querystring';
import { environment } from '../../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class CashFlowService {

  constructor(private http: HttpClient) {
  }

  getBetweenDates(dateFrom: Date, dateTo: Date): Observable<CashFlow[]> {

    return this.http.get<CashFlow[]>(`${environment.apiUrl}/cashflow`, {
      params: {
        dateFrom: new Date(dateFrom.getTime() - dateFrom.getTimezoneOffset() * 60000).toISOString(),
        dateTo: new Date(dateTo.getTime() - dateTo.getTimezoneOffset() * 60000).toISOString()
      },
      headers: new HttpHeaders({
        'Content-Type': 'application/json'
      })
    });
  }

  sendDatasourceData(data: CashFlow[]): Observable<Blob> {
    return this.http.post<Blob>(`${environment.apiUrl}/cashflow`, data, {
      responseType:'blob' as 'json'
    });
  }

}
