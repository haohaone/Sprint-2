import {AppUser} from "./app-user";
import {Transaction} from "./transaction";

export interface Customer {
  id?: number;
  name?: string;
  phoneNumber?: string;
  address?: string;
  gender?: number;
  email?: string;
  username?: string;
  password?: string;
  appUser?: AppUser;
  transactionList?: Transaction[];
}
