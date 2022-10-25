import {AppRole} from "./app-role";

export interface AppUser {
  username?: string;
  appRoles?: AppRole;
  password?: string;
  status?: string;
  gender?: number;
}
