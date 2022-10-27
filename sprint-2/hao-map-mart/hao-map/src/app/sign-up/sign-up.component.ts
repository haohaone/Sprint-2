import {Component, OnInit} from '@angular/core';
import {FormControl, FormGroup, Validators, AbstractControl} from "@angular/forms";
import {CustomerService} from "../service/customer.service";
import {ToastrService} from "ngx-toastr";
import {Router} from "@angular/router";
import {Customer} from "../model/customer";

@Component({
  selector: 'app-sign-up',
  templateUrl: './sign-up.component.html',
  styleUrls: ['./sign-up.component.css']
})
export class SignUpComponent implements OnInit {
  customerForm: FormGroup;
  isExitsUser: boolean;

  constructor(private customerService: CustomerService,
              private toast: ToastrService,
              private router: Router) {
  }

  ngOnInit(): void {
    this.customerForm = new FormGroup({
      id: new FormControl(),
      gender: new FormControl('', Validators.required),
      address: new FormControl('', Validators.required),
      name: new FormControl('', [Validators.required,
        Validators.pattern('^[a-zA-Z_ÀÁÂÃÈÉÊÌÍÒÓÔÕÙÚĂĐĨŨƠàáâãèéêìíòóôõùúăđĩũơƯĂẠẢẤẦẨẪẬẮẰẲẴẶẸẺẼỀỀỂưăạảấầẩẫậắằẳẵặẹẻẽềềểỄỆỈỊỌỎỐỒỔỖỘỚỜỞỠỢỤỦỨỪễệỉịọỏốồổỗộớờởỡợụủứừỬỮỰỲỴÝỶỸửữựỳỵỷỹ\\s?]+$')]),
      email: new FormControl('', [Validators.required,Validators.pattern('^[A-Za-z0-9]+@[A-Za-z0-9]+(\\.[A-Za-z0-9]+){1,2}$')]),
      phoneNumber: new FormControl('', [Validators.required,Validators.pattern('^(0|84\\+)[0-9]{9,11}$')]),
      username: new FormControl('', [Validators.required,Validators.pattern('^[a-zA-z0-9]{5,50}$')]),
      password: new FormControl('', [Validators.required,Validators.pattern('^(?=.*[A-Za-z])(?=.*\\d)(?=.*[@$!%*#?&])[A-Za-z\\d@$!%*#?&]{8,50}$')]),
      confirmPassword: new FormControl('', Validators.required)
    }, this.checkConfirmPassword)
  }

  private checkConfirmPassword(abstractControl: AbstractControl): any {
    const password = abstractControl.value.password;
    const confirmPassword = abstractControl.value.confirmPassword;
    if (confirmPassword === '') {
      return null;
    }
    return (password === confirmPassword) ? null : {notSame: true};
  }

  submit() {
    console.log(this.customerForm.value)
    if (this.customerForm.invalid || this.isExitsUser == true){
      this.customerForm.markAllAsTouched();
    }else {
      const customer: Customer = this.customerForm.value;
      this.customerService.save(customer).subscribe(
        value => {
          this.toast.success('Đăng kí thành công');
          this.router.navigateByUrl('/login')
        },error => {
          this.toast.error('Đăng kí thất bại');
        }
      )
    }
  }

  checkUserName($event: Event) {
    this.customerService.checkUserName(String($event)).subscribe(
      value => {
        this.isExitsUser = !!value;
      }
    );
    if (String($event) === '') {
      this.isExitsUser = false;
    }
  }
}
