import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";
import {Login} from "../model/login";
import {Customer} from "../model/customer";

@Injectable({
  providedIn: 'root'
})
export class LoginService {
  URL_API = 'http://localhost:8080/';
  constructor(private httpClient: HttpClient) { }

  requestLogin(login: Login): Observable<any> {
    return this.httpClient.post<any>(this.URL_API + 'login', login);
  }

  loginWithFb(customer: Customer){
    return this.httpClient.post<any>(this.URL_API + 'loginWithFb', customer);
  }
}
