import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders} from "@angular/common/http";
import {Observable} from "rxjs";
import {Product} from "../model/product";
import {Customer} from "../model/customer";
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class CustomerService {
  API_URL = `${environment.API_URL}`
  header = new HttpHeaders().set('Authorization', sessionStorage.getItem('token'));

  constructor(private http: HttpClient) {
  }

  public getInformation(username: string): Observable<Customer> {
    return this.http.get<Customer>(this.API_URL + 'user-information/' + username, {headers: this.header})
  }

  checkUserName(userName: string): Observable<string> {
    return this.http.get<string>(this.API_URL + 'checkUserName/' + userName);
  }

  save(customer: Customer): Observable<any>{
    return this.http.post<any>(this.API_URL + 'customer', customer);
  }
}
