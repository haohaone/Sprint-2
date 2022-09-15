import { Component, OnInit } from '@angular/core';
import {ShareDataService} from "./service/share-data.service";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  title = 'hao-map-mart';
  quantityProduct = 0;

  constructor(private shareDataService: ShareDataService) {
    this.shareDataService.getClickEvent().subscribe(
      ()=> {this.ngOnInit()}
    )
  }

  ngOnInit(): void {
    this.quantityProduct = localStorage.length;
  }

}
