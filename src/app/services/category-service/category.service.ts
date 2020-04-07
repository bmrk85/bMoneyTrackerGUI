import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {Observable} from 'rxjs';
import {Category} from '../../models/category';
import { environment } from '../../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class CategoryService {

  constructor(private http: HttpClient) { }


  getAll(): Observable<Category[]> {
    return this.http.get<Category[]>(`${environment.apiUrl}/categories`, {
      headers: new HttpHeaders({
        'Content-Type': 'application/json'
      })
    });
  }

  editCategory(c: Category): Observable<Category>{
    return this.http.post<Category>(`${environment.apiUrl}/categories`, c);
  }


}
