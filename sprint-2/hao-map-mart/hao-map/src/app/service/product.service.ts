import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable} from "rxjs";
import {Product} from "../model/product";
import {Category} from "../model/category";

@Injectable({
  providedIn: 'root'
})

export class ProductService {
  API_URL = 'http://localhost:8080/'

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
    return this.http.get<Product>(this.API_URL + id)
  }

  public getCart(storageList: any): Observable<Product[]> {
    return this.http.post<Product[]>(this.API_URL + 'cart', storageList)
  }

  public delete(id: number): Observable<void> {
    return this.http.delete<void>(this.API_URL + id);
  }

  public update(product: Product): Observable<void> {
    return this.http.patch<void>(this.API_URL, product);
  }

  public addNew(product: Product): Observable<void> {
    return this.http.post<void>(this.API_URL, product);
  }

  public getAllCategory(): Observable<any> {
    return this.http.get<Category[]>(this.API_URL + 'categoryList');
  }
}
