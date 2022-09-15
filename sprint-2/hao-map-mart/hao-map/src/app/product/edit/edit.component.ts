import { Component, OnInit } from '@angular/core';
import {ActivatedRoute, Router} from "@angular/router";
import {ProductService} from "../../service/product.service";
import {ToastrService} from "ngx-toastr";
import {Product} from "../../model/product";
import {FormControl, FormControlName, FormGroup, Validators} from "@angular/forms";
import {Category} from "../../model/category";
import {Title} from "@angular/platform-browser";

@Component({
  selector: 'app-edit',
  templateUrl: './edit.component.html',
  styleUrls: ['./edit.component.css']
})
export class EditComponent implements OnInit {
  product: Product;
  categoryList: Category[];
  productForm: FormGroup;
  url = '';
  constructor(private activatedRoute: ActivatedRoute,
              private productService: ProductService,
              private router: Router,
              private toast: ToastrService,
              private title: Title) { }

  ngOnInit(): void {
    this.title.setTitle('Chỉnh sửa sản phẩm')
    this.productForm = new FormGroup({
      id: new FormControl(''),
      name: new FormControl('', Validators.required),
      battery: new FormControl('', Validators.required),
      bluetooth: new FormControl('', Validators.required),
      callable: new FormControl('', Validators.required),
      countryOfOrigin: new FormControl('', Validators.required),
      color: new FormControl('', Validators.required),
      price: new FormControl('', Validators.required),
      url: new FormControl('', Validators.required),
      quantityOrder: new FormControl('', Validators.required),
      quantity: new FormControl('', Validators.required),
      category: new FormControl('', Validators.required),
    })
    const id = Number(this.activatedRoute.snapshot.params.id)
    this.productService.findByID(id).subscribe(
      value => {
        this.productForm.patchValue(value);
        this.url = value.url
      }
    )
    this.productService.getAllCategory().subscribe(
      value => this.categoryList = value
    )
  }

  submit() {

  }
}
