import { Injectable } from '@angular/core';
import {Observable, Subject} from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class ShareDataService {
  private subject = new Subject<any>()

  constructor() { }

  sendClickEvent(){
    this.subject.next()
  }

  getClickEvent(): Observable<any>{
    return this.subject.asObservable();
  }
}
