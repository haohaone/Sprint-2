import { Component, OnInit } from '@angular/core';
import {ToastrService} from "ngx-toastr";
import {Router} from "@angular/router";
import {ShareDataService} from "../service/share-data.service";
import {SocialAuthService} from "angularx-social-login";
import firebase from "firebase";
import {AppUser} from "../model/app-user";

export const snapshotToArray = (snapshot: any) => {
  const returnArr = [];

  snapshot.forEach((childSnapshot: any) => {
    const item = childSnapshot.val();
    item.key = childSnapshot.key;
    returnArr.push(item);
  });

  return returnArr;
};

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {
  username;
  role;

  constructor(private toastService: ToastrService,
              private router: Router,
              private authService: SocialAuthService,
              private shareDataService: ShareDataService) {
      this.shareDataService.getClickEvent().subscribe(
        ()=> {this.ngOnInit()}
      )
  }

  ngOnInit(): void {
    this.username = sessionStorage.getItem('username')
    this.role = sessionStorage.getItem('roles')
  }

  logout() {
    const username =  sessionStorage.getItem('username')
    firebase.database().ref('users/').orderByChild('username').equalTo(username).on('value', (resp: any) => {
      const user = snapshotToArray(resp);
      if (user !== undefined) {
        const userRef = firebase.database().ref('users/' + user[0].key);
        userRef.update({status: 'offline'});
      }
    },
      a => {});
    sessionStorage.removeItem('username');
    sessionStorage.removeItem('token');
    sessionStorage.removeItem('roles');
    sessionStorage.removeItem('gender');
    localStorage.clear();
    this.shareDataService.sendClickEvent();
    this.router.navigateByUrl('/login');
    this.toastService.success('Đã đăng xuất');
  }
}
