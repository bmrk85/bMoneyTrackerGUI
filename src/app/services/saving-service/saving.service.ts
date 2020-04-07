import {Injectable} from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {Observable} from 'rxjs';
import {Saving} from '../../models/saving';
import { Category } from '../../models/category';
import { environment } from '../../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class SavingService {

  constructor(private http: HttpClient) {
  }

  saveSaving(saving): Observable<Saving> {
    return this.http.post<Saving>(`${environment.apiUrl}/savings`, {
      id: saving.id ? saving.id : null,
      done: saving.done ? saving.done : false,
      name: saving.name,
      description: saving.description,
      dateFrom: saving.dateFrom,
      dateTo: saving.dateTo,
      category: {
        id: saving.categoryId? saving.categoryId : null,
        title: saving.categoryTitle,
        enabled: saving.categoryEnabled,
        color: saving.categoryColor
      } as Category,
      amount: saving.amount
    }, {
      headers: new HttpHeaders({
        'Content-Type': 'application/json'
      })
    });
  }

  changeSavingStatus(saving): Observable<Saving> {
    return this.http.post<Saving>(`${environment.apiUrl}/savings`, {
      id: saving.id,
      done: !saving.done,
      name: saving.name,
      description: saving.description,
      dateFrom: saving.dateFrom,
      dateTo: saving.dateTo,
      category: {
        id: saving.categoryId,
        title: saving.categoryTitle,
        enabled: saving.categoryEnabled,
        color: saving.categoryColor
      } as Category,
      amount: saving.amount
    },{headers: new HttpHeaders({
        'Content-Type': 'application/json'
      })
    });
  }

  getAll(): Observable<Saving[]> {
    return this.http.get<Saving[]>(`${environment.apiUrl}/savings`, {
      headers: new HttpHeaders({
        'Content-Type': 'application/json'
      })
    });
  }

  deleteSaving(id): Observable<Saving> {
    return this.http.post<Saving>(`${environment.apiUrl}/savings/delete/${id}`, {});
  }

}
