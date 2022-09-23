import { Component, OnInit } from '@angular/core';
import {Product} from "../../model/product";
import {ProductService} from "../../service/product.service";
import {ToastrService} from "ngx-toastr";
import {ShareDataService} from "../../service/share-data.service";
import {Title} from "@angular/platform-browser";

@Component({
  selector: 'app-speaker',
  templateUrl: './speaker.component.html',
  styleUrls: ['./speaker.component.css']
})
export class SpeakerComponent implements OnInit {
  limit = 2;
  role;
  name = '';
  price = '';
  speakerList: Product[];
  constructor(private productService: ProductService,
              private toast: ToastrService,
              private shareDataService: ShareDataService,
              private title: Title) { }

  ngOnInit(): void {
    this.title.setTitle('Loa Bluetooth');
    this.getAll();
    this.role = sessionStorage.getItem('roles');
  }

  getAll(){
    this.productService.getAllSpeakerList(this.limit, this.name, this.price).subscribe(
      (value: any) => {
        if (value != null) {
          this.speakerList = value;
        }
      }
    )
  }

  loadMore(){
    this.limit++;
    this.getAll();
  }

  addCart(product: Product) {
    if (product.quantity == 0){
      this.toast.error('Sản phẩm đã hết hàng');
      return;
    }
    const value = localStorage.getItem(String(product.id));
    if (value === null){
      localStorage.setItem(String(product.id), '1');
      this.toast.success('Thêm vào giỏ hàng thành công')
      this.shareDataService.sendClickEvent();
    } else if (Number(value) >= product.quantity) {
      this.toast.error('Số lượng trong giỏ hàng đã vượt quá số lượng sản phẩm')
    }else {
      localStorage.setItem(String(product.id), String(Number(value) + 1));
      this.shareDataService.sendClickEvent();
      this.toast.success('Thêm vào giỏ hàng thành công')
    }
  }

  delete(id: number) {
    this.productService.delete(id).subscribe(
      value => {
        this.toast.success('Xóa thành công');
      },
      error => {
        this.toast.error('Không tìm thấy sản phẩm tương ứng')
      },
      () => {
        this.getAll();
      }
    )
  }

  searchName($event: any){
    this.name = $event;
    this.getAll();
  }

  searchPrice($event: any){
    this.price = $event;
    this.getAll();
  }
}
