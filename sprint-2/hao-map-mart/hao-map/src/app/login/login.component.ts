import { Component, OnInit } from '@angular/core';
import {LoginService} from "../service/login.service";
import {FormControl, FormGroup} from "@angular/forms";
import {Router} from "@angular/router";
import {ToastrService} from "ngx-toastr";
import {ShareDataService} from "../service/share-data.service";
import {Title} from "@angular/platform-browser";

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  loginForm: FormGroup;

  constructor(private loginService: LoginService,
              private router: Router,
              private toastService: ToastrService,
              private shareDataService: ShareDataService,
              private title: Title) { }

  ngOnInit(): void {
    this.title.setTitle('Đăng nhập')
    this.loginForm = new FormGroup({
      username: new FormControl(''),
      password: new FormControl('')
    })
  }

  submit(){
    const login = this.loginForm.value;
    this.loginService.requestLogin(login).subscribe(
      value => {
        console.log(value)
        sessionStorage.setItem('username', login.username);
        const tokenStr = 'Bearer ' + value.token;
        sessionStorage.setItem('token', tokenStr);
        sessionStorage.setItem('roles', value.roles[0].authority);
        history.back();
        this.shareDataService.sendClickEvent();
        this.toastService.success('Đăng nhập thành công')
      },
      error => {
        this.toastService.error('Đăng nhập thất bại')
      }
    )
  }
}
