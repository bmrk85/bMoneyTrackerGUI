import {Injectable} from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {map} from "rxjs/operators";

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(
    private httpClient: HttpClient
  ) {
  }


  authenticate(username, password) {
    return this.httpClient.post<any>('http://localhost:8080/auth', {username, password}).pipe(
      map(
        userData => {
          sessionStorage.setItem('username', username);
          sessionStorage.setItem('jwtToken', `${'Bearer ' + userData.jwtToken}`);
          return userData;
        }
      )
    );
  }

  register(username, password){
    return this.httpClient.post<any>('http://localhost:8080/register', {username, password});
  }

  isUserLoggedIn() {
    return sessionStorage.getItem('username') !== null;
  }

  logout(){
    sessionStorage.removeItem('username');
  }


}
