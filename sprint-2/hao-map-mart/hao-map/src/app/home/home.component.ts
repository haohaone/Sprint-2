import {Component, OnInit} from '@angular/core';
import {Product} from "../model/product";
import {ProductService} from "../service/product.service";
import {ToastrService} from "ngx-toastr";
import {ShareDataService} from "../service/share-data.service";
import {Title} from "@angular/platform-browser";

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  limit = 1;
  watchList: Product[];
  headPhoneList: Product[];
  speakerList: Product[];
  role;

  constructor(private productService: ProductService,
              private toast: ToastrService,
              private shareDataService: ShareDataService,
              private title: Title) {
  }

  ngOnInit(): void {
    this.title.setTitle('Trang chủ')
    this.productService.getAllWatchList(this.limit, '', '').subscribe(
      (value: any) => {
        if (value != null) {
          this.watchList = value;
        }
      }
    )

    this.productService.getAllHeadPhoneList(this.limit, '', '').subscribe(
      (value: any) => {
        if (value != null) {
          this.headPhoneList = value;
        }
      }
    )

    this.productService.getAllSpeakerList(this.limit, '', '').subscribe(
      (value: any) => {
        if (value != null) {
          this.speakerList = value;
        }
      }
    )
  }

  addCart(product: Product) {
    const value = localStorage.getItem(String(product.id));
    console.log(product);
    console.log(value);
    if (value === null){
      localStorage.setItem(String(product.id), '1');
      this.shareDataService.sendClickEvent();
      this.toast.success('Thêm vào giỏ hàng thành công')
    } else if (Number(value) >= product.quantity) {
      this.toast.error('Số lượng trong giỏ hàng đã vượt quá số lượng sản phẩm')
    }else {
      localStorage.setItem(String(product.id), String(Number(value) + 1));
      this.shareDataService.sendClickEvent();
      this.toast.success('Thêm vào giỏ hàng thành công')
    }
  }
}
