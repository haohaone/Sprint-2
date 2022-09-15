import { Injectable } from '@angular/core';
import {ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree} from "@angular/router";
import {Observable} from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class AdminRoleService implements CanActivate{

  constructor(private router: Router) { }

  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean {
    const roles = sessionStorage.getItem('roles');
    if (roles === 'ADMIN') {
      return true;
    } else if(roles === 'MEMBER') {
      this.router.navigateByUrl('/error/403');
    }else {
      this.router.navigateByUrl('/error/401');
    }
  }
}
