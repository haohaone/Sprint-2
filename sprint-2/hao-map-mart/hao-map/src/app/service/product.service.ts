import {Injectable} from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {Observable} from "rxjs";
import {Product} from "../model/product";
import {Category} from "../model/category";
import {environment} from "../../environments/environment";

@Injectable({
  providedIn: 'root'
})

export class ProductService {
  API_URL = `${environment.API_URL}`;
  header = new HttpHeaders().set('Authorization', sessionStorage.getItem('token'));


  constructor(private http: HttpClient) {
  }

  public getAllWatchList(limit: number, name: string, price: string): Observable<Product[]> {
    return this.http.get<Product[]>(this.API_URL +
                                        'product/1/' +
                                        limit +
                                        '?name=' + name +
                                        '&price=' + price)
  }

  public getAllHeadPhoneList(limit: number, name: string, price: string): Observable<Product[]> {
    return this.http.get<Product[]>(this.API_URL +
                                        'product/2/' +
                                        limit +
                                        '?name=' + name +
                                        '&price=' + price)
  }

  public getAllSpeakerList(limit: number, name: string, price: string): Observable<Product[]> {
    return this.http.get<Product[]>(this.API_URL +
                                        'product/3/' +
                                        limit +
                                        '?name=' + name +
                                        '&price=' + price)
  }

  public findByID(id: number): Observable<Product> {
    return this.http.get<Product>(this.API_URL + "findById/" + id, {headers: this.header})
  }

  public getCart(storageList: any): Observable<Product[]> {
    return this.http.post<Product[]>(this.API_URL + 'cart', storageList, {headers: this.header})
  }

  public delete(id: number): Observable<void> {
    return this.http.delete<void>(this.API_URL + "delete/" + id, {headers: this.header});
  }

  public update(product: Product): Observable<void> {
    return this.http.patch<void>(this.API_URL + "update", product, {headers: this.header});
  }

  public addNew(product: Product): Observable<void> {
    return this.http.post<void>(this.API_URL + "addNew", product, {headers: this.header});
  }

  public getAllCategory(): Observable<any> {
    return this.http.get<Category[]>(this.API_URL + 'categoryList');
  }
}
