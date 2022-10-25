import { Component, OnInit } from '@angular/core';
import {LoginService} from "../service/login.service";
import {FormControl, FormGroup} from "@angular/forms";
import {Router} from "@angular/router";
import {ToastrService} from "ngx-toastr";
import {ShareDataService} from "../service/share-data.service";
import {Title} from "@angular/platform-browser";
import {GoogleLoginProvider, SocialAuthService} from 'angularx-social-login';
import { FacebookLoginProvider } from 'angularx-social-login';
import {Customer} from "../model/customer";
import firebase from "firebase";
import {AppUser} from "../model/app-user";
import {snapshotToArray} from "../header/header.component";

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  loginForm: FormGroup;
  ref = firebase.database().ref('users/');

  constructor(private loginService: LoginService,
              private router: Router,
              private toastService: ToastrService,
              private shareDataService: ShareDataService,
              private authService: SocialAuthService,
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
        sessionStorage.setItem('username', login.username);
        const tokenStr = 'Bearer ' + value.token;
        sessionStorage.setItem('token', tokenStr);
        sessionStorage.setItem('roles', value.roles[0].authority);
        sessionStorage.setItem('gender', value.customer.gender);
        this.ref.orderByChild('username').equalTo(login.username).on('value', snapshot => {
          // ref = firebase.database().ref('users/');
          if (!snapshot.exists()) {
            const newUser = firebase.database().ref('users/').push();
            const userApp: AppUser = {
              username: login.username,
              appRoles: {
                name: value.roles[0].authority
              },
              status: 'online',
              gender: value.customer.gender
            }
            newUser.set(userApp);
          }else {
            const user = snapshotToArray(snapshot);
            if (user !== undefined) {
              const userRef = firebase.database().ref('users/' + user[0].key);
              userRef.update({status: 'online'});
            }
          }
        });
        history.back();
        this.shareDataService.sendClickEvent();
        this.toastService.success('Đăng nhập thành công')
      },
      error => {
        this.toastService.error('Đăng nhập thất bại')
      }
    )
  }

  signInWithGg(): void {
    this.authService.signIn(GoogleLoginProvider.PROVIDER_ID)
  }


  signInWithFB(): void {
    this.authService.signIn(FacebookLoginProvider.PROVIDER_ID);
    this.authService.authState.subscribe(
      user => {
        console.log(user)
        const customer: Customer = {
          name: user.name,
          appUser: {
            username: user.email,
            password: user.id
          }
        };
        this.loginService.loginWithFb(customer).subscribe(
          (value: any) => {
            sessionStorage.setItem('username', user.email);
            const tokenStr = 'Bearer ' + value.token;
            sessionStorage.setItem('token', tokenStr);
            sessionStorage.setItem('roles', value.roles[0].authority);
            sessionStorage.setItem('gender', value.customer.gender);
            this.ref.orderByChild('username').equalTo(user.email).once('value', snapshot => {
              if (!snapshot.exists()) {
                const newUser = firebase.database().ref('users/').push();
                const userApp: AppUser = {
                  username: user.email,
                  appRoles: {
                    name: value.roles[0].authority
                  },
                  status: 'online',
                  gender: value.customer.gender
                }
                newUser.set(userApp);
              }else {
                const user = snapshotToArray(snapshot);
                if (user !== undefined) {
                  const userRef = firebase.database().ref('users/' + user[0].key);
                  userRef.update({status: 'online'});
                }
              }
            });
            history.back();
            this.shareDataService.sendClickEvent();
            this.toastService.success('Đăng nhập thành công')
          },
          error => {
            this.toastService.error('Đăng nhập thất bại')
          }
        )
      }
    )
  }
}
