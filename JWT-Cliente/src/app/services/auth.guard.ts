import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, UrlTree, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { SecurityService } from './security.service';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {

  constructor(
    private service: SecurityService,
    private router: Router) { }

  canActivate(
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
      let claimType: string = next.data['claimType'];

      if (this.service.securityObject.isAuthenticated && this.service.hasClaim(claimType)) {
        return true;
      } else {
        this.router.navigate(['login'], {queryParams: {returnUrl: state.url}});
        return false;
      }
  }
  
}
