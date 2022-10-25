import { Component, OnInit } from '@angular/core';
import {ShareDataService} from "./service/share-data.service";
import { environment } from 'src/environments/environment';
import firebase from "firebase";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  title = 'hao-map-mart';
  quantityProduct = 0;

  constructor(private shareDataService: ShareDataService) {
    firebase.initializeApp(environment.firebaseConfig);
    this.shareDataService.getClickEvent().subscribe(
      ()=> {this.ngOnInit()}
    )
  }

  ngOnInit(): void {
    this.quantityProduct = localStorage.length;
    if (localStorage.getItem('__paypal_storage__') !== null){
      this.quantityProduct--;
    }
  }

}
