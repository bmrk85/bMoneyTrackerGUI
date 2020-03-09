import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {Observable} from 'rxjs';
import {Category} from '../../models/category';

@Injectable({
  providedIn: 'root'
})
export class CategoryService {

  constructor(private http: HttpClient) { }


  getAll(): Observable<Category[]> {
    return this.http.get<Category[]>(`http://localhost:8080/categories`, {
      headers: new HttpHeaders({
        'Content-Type': 'application/json'
      })
    });
  }


}
