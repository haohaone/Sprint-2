import {Component, OnInit} from '@angular/core';
import {Product} from "../../model/product";
import {Category} from "../../model/category";
import {FormControl, FormGroup, Validators} from "@angular/forms";
import {ActivatedRoute, Router} from "@angular/router";
import {ProductService} from "../../service/product.service";
import {ToastrService} from "ngx-toastr";
import {Title} from "@angular/platform-browser";
import {AngularFireStorage} from '@angular/fire/storage';
import {formatDate} from "@angular/common";
import {finalize} from "rxjs/operators";

@Component({
  selector: 'app-add-new',
  templateUrl: './add-new.component.html',
  styleUrls: ['./add-new.component.css']
})
export class AddNewComponent implements OnInit {
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
              private storage: AngularFireStorage) {
  }

  ngOnInit(): void {
    this.title.setTitle('Thêm mới sản phẩm')
    this.productForm = new FormGroup({
      name: new FormControl('', Validators.required),
      battery: new FormControl('', Validators.required),
      bluetooth: new FormControl('', Validators.required),
      callable: new FormControl('', Validators.required),
      countryOfOrigin: new FormControl('', Validators.required),
      color: new FormControl('', Validators.required),
      price: new FormControl('', [Validators.min(0), Validators.required]),
      url: new FormControl(''),
      quantity: new FormControl('', [Validators.min(0), Validators.required]),
      category: new FormControl('', Validators.required),
      isDelete: new FormControl('')
    })

    this.productService.getAllCategory().subscribe(
      value => this.categoryList = value
    )
  }

  submit() {
    if (this.productForm.invalid){
      this.productForm.markAllAsTouched()
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
            console.log(prodcut);
            this.productService.addNew(prodcut).subscribe(
              value => {
                this.toast.success('Thêm mới thành công');
                history.back();
              },
              error => {
                this.toast.error('Thêm mới thất bại')
              }
            )
          });
        })
      ).subscribe();
    }
  }

  getCurrentDateTime(): string {
    return formatDate(new Date(), 'yyyy-MM-dd hh:mm:ss', 'en-US');
  }

  onFileSelected(event) {
    this.selectedFile = event.target.files[0];

    if (this.selectedFile.size > 9000000) {
      this.checkImgSize = true;
      this.regexImg = false;
      this.regexImg = false;
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
      console.log(reader.result);
      this.msg = '';
      this.url = reader.result;
    };
  }
}
