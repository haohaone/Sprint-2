import {AppRole} from "./app-role";

export interface AppUser {
  username: string;
  appRoles: AppRole;
}
