import {OrderDetail} from "./order";

export interface Transaction {
  id?: number;
  startDate?: string;
  username?: string;
  payment?: number;
  paymentMethod?: string;
  orderList?: OrderDetail[];
}
