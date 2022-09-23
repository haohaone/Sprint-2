import {Product} from "./product";

export interface OrderDetail {
  id: number;
  quantity: number;
  productOrder: Product;
}
