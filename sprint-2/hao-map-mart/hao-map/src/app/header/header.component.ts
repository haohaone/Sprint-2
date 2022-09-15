import { Component, OnInit } from '@angular/core';
import {ToastrService} from "ngx-toastr";
import {Router} from "@angular/router";
import {ShareDataService} from "../service/share-data.service";

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {
  username;

  constructor(private toastService: ToastrService,
              private router: Router,
              private shareDataService: ShareDataService) {
      this.shareDataService.getClickEvent().subscribe(
        ()=> {this.ngOnInit()}
      )
  }

  ngOnInit(): void {
    this.username = sessionStorage.getItem('username')
  }

  logout() {
    sessionStorage.removeItem('username');
    sessionStorage.removeItem('token');
    sessionStorage.removeItem('roles');
    localStorage.clear();
    this.ngOnInit();
    this.shareDataService.sendClickEvent();
    this.router.navigateByUrl('/login')
    this.toastService.success('Đã đăng xuất');
  }
}