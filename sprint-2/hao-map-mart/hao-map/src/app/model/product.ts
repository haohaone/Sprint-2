import {Category} from "./category";

export interface Product {
  id?: number;
  name?: string;
  battery?: string;
  bluetooth?: number;
  callable?: number;
  countryOfOrigin?: number;
  color?: string;
  price?: number;
  url?: string;
  quantityOrder?: number;
  quantity?: number;
  category?: Category;
  isDelete?: number;
}
