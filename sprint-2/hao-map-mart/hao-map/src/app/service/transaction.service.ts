import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";
import {Transaction} from "../model/transaction";

@Injectable({
  providedIn: 'root'
})
export class TransactionService {
  API_URL = 'http://localhost:8080/'

  constructor(private http: HttpClient) { }

  public saveTransaction(transaction: Transaction): Observable<any> {
    return this.http.post<void>(this.API_URL + 'transaction', transaction);
  }

  public addProductToOrder(productList: any): Observable<any> {
    return this.http.post<void>(this.API_URL + 'order', productList);
  }
}
