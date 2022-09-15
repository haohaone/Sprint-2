import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";
import {Login} from "../model/login";

@Injectable({
  providedIn: 'root'
})
export class LoginService {
  URL_API = 'http://localhost:8080/';
  constructor(private httpClient: HttpClient) { }

  requestLogin(login: Login): Observable<any> {
    return this.httpClient.post<Login[]>(this.URL_API + 'login', login);
  }
}
