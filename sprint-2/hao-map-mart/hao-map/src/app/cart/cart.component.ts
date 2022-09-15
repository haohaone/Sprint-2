import { Component, OnInit } from '@angular/core';
import {ProductService} from "../service/product.service";
import {Cart} from "../model/cart";
import {log} from "util";
import {Product} from "../model/product";
import {Title} from "@angular/platform-browser";

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.css']
})
export class CartComponent implements OnInit {
  productList: Product[];
  storageList: Cart[] = [];

  constructor(private productService: ProductService,
              private title: Title) { }

  ngOnInit(): void {
    this.title.setTitle('Giỏ hàng');
    for (let i = 0; i < localStorage.length; i++) {
      let key = localStorage.key(i);
      let cart = {
        key: Number(localStorage.key(i)),
        value: Number(localStorage.getItem(key))
      }
      this.storageList.push(cart)
    }
    this.productService.getCart(this.storageList).subscribe(
      value =>
      {
        this.productList = value;
        console.log(value)
      }
    )
  }

}
