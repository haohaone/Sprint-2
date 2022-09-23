import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";
import {Product} from "../model/product";
import {Customer} from "../model/customer";

@Injectable({
  providedIn: 'root'
})
export class CustomerService {
  API_URL = 'http://localhost:8080/'

  constructor(private http: HttpClient) { }

  public getInformation(username: string): Observable<Customer> {
    return this.http.get<Customer>(this.API_URL + 'user-information/' + username)
  }
}