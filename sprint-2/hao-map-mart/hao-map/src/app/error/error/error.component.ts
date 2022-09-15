import { Component, OnInit } from '@angular/core';
import {ActivatedRoute} from "@angular/router";
import {Title} from "@angular/platform-browser";

@Component({
  selector: 'app-error',
  templateUrl: './error.component.html',
  styleUrls: ['./error.component.css']
})
export class ErrorComponent implements OnInit {
  error = '';
  msg = '';
  constructor(private activatedRoute: ActivatedRoute,
              private title: Title) { }

  ngOnInit(): void {
    this.error = this.activatedRoute.snapshot.params.error;
    if (this.error == '401'){
      this.msg = 'Bạn cần phải đăng nhập để thực hiện tác vụ này.'
    }else if (this.error == '403'){
      this.msg = 'Bạn không có quyền hạn để thực hiện tác vụ này'
    }
  }

}
