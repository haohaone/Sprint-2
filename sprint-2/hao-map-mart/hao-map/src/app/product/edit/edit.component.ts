import { Component, OnInit } from '@angular/core';
import {ActivatedRoute, Router} from "@angular/router";
import {ProductService} from "../../service/product.service";
import {ToastrService} from "ngx-toastr";
import {Product} from "../../model/product";
import {FormControl, FormControlName, FormGroup, Validators} from "@angular/forms";
import {Category} from "../../model/category";
import {Title} from "@angular/platform-browser";
import {formatDate} from "@angular/common";
import {finalize} from "rxjs/operators";
import {AngularFireStorage} from "@angular/fire/storage";

@Component({
  selector: 'app-edit',
  templateUrl: './edit.component.html',
  styleUrls: ['./edit.component.css']
})
export class EditComponent implements OnInit {
  product: Product;
  categoryList: Category[];
  productForm: FormGroup;
  checkImgSize = false;
  regexImg = false;
  isExits = false;

  url: any = '';
  msg = '';
  selectedFile: File = null;

  constructor(private activatedRoute: ActivatedRoute,
              private productService: ProductService,
              private router: Router,
              private toast: ToastrService,
              private title: Title,
              private storage: AngularFireStorage) { }

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
      price: new FormControl('', [Validators.min(0), Validators.required]),
      url: new FormControl('', Validators.required),
      quantity: new FormControl('', [Validators.min(0), Validators.required]),
      category: new FormControl('', Validators.required),
      isDelete: new FormControl(0)
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

  compareObjects(o1: any, o2: any) {
    if(o1.name == o2.name && o1.id == o2.id )
      return true;
    else return false
  }

  onFileSelected(event) {
    this.selectedFile = event.target.files[0];

    if (this.selectedFile.size > 9000000) {
      this.checkImgSize = true;
      this.regexImg = false;
      this.isExits = false;
      return;
    }

    if (!this.selectedFile.name.match('^.*\\.(jpg|JPG|png|PNG)$')) {
      this.checkImgSize = false;
      this.regexImg = true;
      this.isExits = false;
      return;
    }
    // this.productForm.patchValue({url: this.selectedFile.name});
    const reader = new FileReader();
    reader.readAsDataURL(this.selectedFile);

    // tslint:disable-next-line:variable-name
    reader.onload = (_event) => {
      this.msg = '';
      this.url = reader.result;
    };
  }

  getCurrentDateTime(): string {
    return formatDate(new Date(), 'yyyy-MM-dd hh:mm:ss', 'en-US');
  }

  submit() {
    if (this.productForm.invalid){
      this.productForm.markAllAsTouched()
    }else {
      if (this.selectedFile == null){
        const prodcut = this.productForm.value;
        this.productService.update(prodcut).subscribe(
          value => {
            this.toast.success('Chỉnh sửa mới thành công');
            history.back();
          },
          error => {
            this.toast.error('Chỉnh sửa thất bại')
          }
        )
      }else {
        const nameImg = this.getCurrentDateTime() + this.selectedFile.name;
        const filePath = `hao-map-mart/${nameImg}`;
        const fileRef = this.storage.ref(filePath);
        this.storage.upload(`hao-map-mart/${nameImg}`, this.selectedFile).snapshotChanges().pipe(
          finalize(() => {
            fileRef.getDownloadURL().subscribe((url) => {
              this.productForm.patchValue({url: url});
              // console.log(url);
              // console.log(this.formNews.value);
              const prodcut = this.productForm.value;
              this.productService.update(prodcut).subscribe(
                value => {
                  this.toast.success('Chỉnh sửa mới thành công');
                  history.back();
                },
                error => {
                  this.toast.error('Chỉnh sửa thất bại')
                }
              )
            });
          })
        ).subscribe();
      }
    }
  }
}
