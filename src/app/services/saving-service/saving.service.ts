import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";

@Injectable({
  providedIn: 'root'
})
export class SavingService {

  constructor(private http: HttpClient) { }

  addSaving(){
    this.http.post(`localhost:8080`,{test: 'asd'});
  }

}
