import { Component, OnInit } from '@angular/core';
import {ProductService} from "../../service/product.service";
import {Product} from "../../model/product";
import {ToastrService} from "ngx-toastr";
import {ShareDataService} from "../../service/share-data.service";
import {Title} from "@angular/platform-browser";

@Component({
  selector: 'app-watch',
  templateUrl: './watch.component.html',
  styleUrls: ['./watch.component.css']
})
export class WatchComponent implements OnInit {
  limit = 2;
  role;
  name = '';
  price = '';
  watchList: Product[];
  constructor(private productService: ProductService,
              private toast: ToastrService,
              private shareDataService: ShareDataService,
              private title: Title) { }

  ngOnInit(): void {
    this.title.setTitle('Đồng hồ thông minh');
    this.getAll()
    this.role = sessionStorage.getItem('roles');
  }

  getAll(){
    this.productService.getAllWatchList(this.limit, this.name, this.price).subscribe(
      (value: any) => {
        if (value != null) {
          this.watchList = value;
        }
      }
    )
  }

  delete(id: number){
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

  loadMore(){
    this.limit++;
    this.getAll();
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

  searchName($event: any){
    this.name = $event;
    this.getAll();
  }

  searchPrice($event: any){
    this.price = $event;
    this.getAll();
  }
}
