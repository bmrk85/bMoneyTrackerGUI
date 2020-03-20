import {Injectable} from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {Observable} from 'rxjs';
import {Saving} from '../../models/saving';

@Injectable({
  providedIn: 'root'
})
export class SavingService {

  constructor(private http: HttpClient) {
  }

  saveSaving(saving): Observable<Saving> {
    return this.http.post<Saving>(`http://localhost:8080/savings`, {
      id: saving.id ? saving.id : null,
      name: saving.name,
      description: saving.description,
      dateFrom: saving.dateFrom,
      dateTo: saving.dateTo,
      category: {
        title: saving.category
      },
      amount: saving.amount
    });
  }

  getAll(): Observable<Saving[]> {
    return this.http.get<Saving[]>(`http://localhost:8080/savings`, {
      headers: new HttpHeaders({
        'Content-Type': 'application/json'
      })
    });
  }

  deleteSaving(id): Observable<Saving>{
    return this.http.post<Saving>(`http://localhost:8080/savings/delete/${id}`,{});
  }

}
