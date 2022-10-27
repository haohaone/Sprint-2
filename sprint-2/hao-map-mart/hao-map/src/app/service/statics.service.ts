import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders} from "@angular/common/http";
import { Observable } from 'rxjs';
import {Statistics} from "../model/statistics";
import {environment} from "../../environments/environment";

@Injectable({
  providedIn: 'root'
})
export class StaticsService {
  API_URL = `${environment.API_URL}`;
  header = new HttpHeaders().set('Authorization', sessionStorage.getItem('token'));

  constructor(private http: HttpClient) { }

  getStatisticsWeek(): Observable<Statistics[]> {
    return this.http.get<Statistics[]>(this.API_URL + 'statistics/week', {headers: this.header});
  }
  getStatisticsMonth(): Observable<Statistics[]> {
    return this.http.get<Statistics[]>(this.API_URL + 'statistics/month', {headers: this.header});
  }
  getStatisticsYear(): Observable<Statistics[]> {
    return this.http.get<Statistics[]>(this.API_URL + 'statistics/year', {headers: this.header});
  }
}
