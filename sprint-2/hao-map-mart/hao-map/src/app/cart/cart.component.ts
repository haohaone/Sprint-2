import { Component, OnInit } from '@angular/core';
import {ProductService} from "../service/product.service";
import {Cart} from "../model/cart";
import {log} from "util";
import {Product} from "../model/product";
import {Title} from "@angular/platform-browser";
import {render} from "creditcardpayments/creditCardPayments";
import {ToastrService} from "ngx-toastr";
import {Subject} from "rxjs";
import {ShareDataService} from "../service/share-data.service";
import {Local} from "protractor/built/driverProviders";
import {TransactionService} from "../service/transaction.service";

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.css']
})
export class CartComponent implements OnInit {
  productList: Product[];
  storageList: Cart[] = [];
  subTotal = 0;
  total = 0;
  ship = 20000;
  role;
  checkClickPayment = false;
  checkLoading = true;

  constructor(private productService: ProductService,
              private title: Title,
              private toast: ToastrService,
              private shareDataService: ShareDataService,
              private transactionService: TransactionService) { }

  ngOnInit(): void {
    this.title.setTitle('Giỏ hàng');
    this.role = sessionStorage.getItem('roles');
    console.log(this.role);
    for (let i = 0; i < localStorage.length; i++) {
      let key = localStorage.key(i);
      if (key === '__paypal_storage__'){
        continue;
      }
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
        for (const product of this.productList) {
          this.subTotal += product.price * product.quantityOrder
        }
        this.total = this.subTotal + this.ship;
      }
    )
  }

  pay() {

    if (this.checkClickPayment){
      return;
    }
    document.getElementById("demo").innerHTML = '<div id="myPaypal"></div>'
    this.checkClickPayment = true;
    const value =  String((this.total/23000).toFixed(2));
    render({
      id: '#myPaypal',
      value: value,
      currency: 'VND',
      onApprove: (detail) => {
        const transaction = {
          username: sessionStorage.getItem('username'),
          payment: this.total,
          paymentMethod: 'Pay Pal'
        }
        this.checkLoading = false;
        this.transactionService.saveTransaction(transaction).subscribe(
          value => {},
          error => {},
          () => {
            this.transactionService.addProductToOrder(this.productList).subscribe(
              value => {},
              error => {},
              () => {
                localStorage.clear();
                this.productList = [];
                this.storageList = [];
                this.subTotal = 0;
                this.total = 20000;
                this.checkClickPayment = false;
                this.shareDataService.sendClickEvent();
                this.checkLoading = true;
                this.toast.success('Thanh toán thành công');
              }
            );
          }
        )
      },
    })
  }

  delete(product: Product) {
    localStorage.removeItem(String(product.id));
    const index = this.productList.indexOf(product);
    this.productList.splice(index, 1);
    // this.storageList.splice(index, 1);
    this.subTotal = 0;
    for (const product of this.productList) {
      this.subTotal += product.price * product.quantityOrder
    }
    this.total = this.subTotal + this.ship;
    this.shareDataService.sendClickEvent();
    this.checkClickPayment = false;
    document.getElementById("myPaypal").remove();
  }

  upQuantity(id: number) {
    let value = 0;
    for (let i = 0; i < this.productList.length; i++) {
      if (id === this.productList[i].id){
        this.productList[i].quantityOrder++;
        value = this.productList[i].quantityOrder;
      }
    }
    localStorage.setItem(String(id), String(value));
    this.subTotal = 0;
    for (const product of this.productList) {
      this.subTotal += product.price * product.quantityOrder
    }
    this.total = this.subTotal + this.ship;
    this.checkClickPayment = false;
    document.getElementById("myPaypal").remove();
  }

  downQuantity(id: number) {
    let value = 0;
    for (let i = 0; i < this.productList.length; i++) {
      if (id === this.productList[i].id){
        this.productList[i].quantityOrder--;
        value = this.productList[i].quantityOrder;
      }
    }
    localStorage.setItem(String(id), String(value));
    this.subTotal = 0;
    for (const product of this.productList) {
      this.subTotal += product.price * product.quantityOrder
    }
    this.total = this.subTotal + this.ship;
    this.checkClickPayment = false;
    document.getElementById("myPaypal").remove();
  }
}
