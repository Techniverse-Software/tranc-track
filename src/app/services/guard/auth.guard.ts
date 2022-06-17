import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, UrlTree, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { AuthService } from '../auth.service';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {
  constructor(private router: Router, private authService: AuthService) { }
  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
    const currentUser = this.authService.currentUserValue;
    if (currentUser) {
      const tokendata = this.authService.decodeToken();
      const currentUserRole = tokendata.user?.role;
      if (route.data.roles && route.data.roles.indexOf(currentUserRole) === -1) {
        this.router.navigate(['/']);
        return false;
      }
      // authorised so return true
      return true;
    } else {
      // not logged in so redirect to login page with the return url
      this.router.navigate(['auth/login']);
      return false;
      // throw new Error("Method not implemented.");
    }
  }

}

@Injectable({
  providedIn: 'root'
})

export class LoginGuard implements CanActivate {
  constructor(private router: Router, public authService: AuthService) { }
  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean | UrlTree | Observable<boolean | UrlTree> | Promise<boolean | UrlTree> {
    // throw new Error("Method not implemented.");
    const currentUser = this.authService.currentUserValue;
    if (currentUser) {
      // authorised so return true
      this.router.navigate(['dashboard']);
      return false;
    } else {
      // not logged in so redirect to login page with the return url
      // this.router.navigate(['login']);
      return true;
      // throw new Error("Method not implemented.");
    }

  }
}
