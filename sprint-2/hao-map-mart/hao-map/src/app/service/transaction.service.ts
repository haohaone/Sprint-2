import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders} from "@angular/common/http";
import {Observable} from "rxjs";
import {Transaction} from "../model/transaction";
import {environment} from "../../environments/environment";

@Injectable({
  providedIn: 'root'
})
export class TransactionService {
  API_URL = `${environment.API_URL}`;
  header = new HttpHeaders().set('Authorization', sessionStorage.getItem('token'));

  constructor(private http: HttpClient) {
    this.header.append('token', sessionStorage.getItem('token'))
  }

  public saveTransaction(transaction: Transaction): Observable<any> {
    return this.http.post<void>(this.API_URL + 'transaction', transaction, {headers: this.header});
  }

  public addProductToOrder(productList: any): Observable<any> {
    return this.http.post<void>(this.API_URL + 'order', productList, {headers: this.header});
  }

  getTransactionById(page: number, id: number): Observable<Transaction[]> {
    if (id === null) {id = 0; }
    return this.http.get<Transaction[]>(this.API_URL + `get-transaction?page=${page}&id=${id}`,{headers: this.header});
  }
}
