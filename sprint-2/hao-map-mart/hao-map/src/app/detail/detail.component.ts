import { Component, OnInit } from '@angular/core';
import {ProductService} from "../service/product.service";
import {Product} from "../model/product";
import {ActivatedRoute, Router} from "@angular/router";
import {ToastrService} from "ngx-toastr";
import {ShareDataService} from "../service/share-data.service";

@Component({
  selector: 'app-detail',
  templateUrl: './detail.component.html',
  styleUrls: ['./detail.component.css']
})
export class DetailComponent implements OnInit {
  product: Product;
  role;
  constructor(private productService: ProductService,
              private activatedRoute: ActivatedRoute,
              private toast: ToastrService,
              private shareDataService: ShareDataService,
              private router: Router) { }

  ngOnInit(): void {
    this.role = sessionStorage.getItem('roles');
    const id = Number(this.activatedRoute.snapshot.params.id);
    this.productService.findByID(id).subscribe(
      value => {
        this.product = value;
        console.log(this.product)
      }
    )
  }

  addCart(product: Product) {
    const value = localStorage.getItem(String(product.id));
    console.log(product);
    console.log(value);
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
        switch (this.product.category.id) {
          case 1:
            this.router.navigateByUrl('/watch');
            break;
          case 2:
            this.router.navigateByUrl('/headPhone');
            break;
          case 3:
            this.router.navigateByUrl('/speaker');
            break;
        }
      },
      error => {
        this.toast.error('Không tìm thấy sản phẩm tương ứng')
      }
    )
  }
}
