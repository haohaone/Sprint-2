import {Component, OnInit} from '@angular/core';
import {CustomerService} from "../service/customer.service";
import {Customer} from '../model/customer';
import {TransactionService} from "../service/transaction.service";
import {Transaction} from "../model/transaction";
import {OrderDetail} from "../model/order";

@Component({
  selector: 'app-user-information',
  templateUrl: './user-information.component.html',
  styleUrls: ['./user-information.component.css']
})
export class UserInformationComponent implements OnInit {
  customer: Customer;
  transactionList: Transaction[] = [];
  page = 0;
  totalItems: any;
  orderList: OrderDetail[] = [];

  constructor(private customerService: CustomerService,
              private transactionService: TransactionService) {
  }

  ngOnInit(): void {
    this.customerService.getInformation(sessionStorage.getItem('username')).subscribe(
      value => {
        this.customer = value;
      },
      error => {
      },
      () => this.getTransactionById(this.page, this.customer.id)
    )
  }

  getTransactionById(page: number, id: number) {
    this.transactionService.getTransactionById(this.page, this.customer.id).subscribe(
      (value: any) => {
        this.transactionList = value.content;
        console.log(this.transactionList)
        this.totalItems = value.totalElements;
      }
    )
  }

  getPage(event: number) {
    this.page = event - 1;
    this.getTransactionById(this.page, this.customer.id);
  }

  showDetail(transaction: Transaction) {
    this.orderList = transaction.orderList;
    console.log(transaction);
  }
}
