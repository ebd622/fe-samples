import {ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree} from '@angular/router';
import {Injectable} from '@angular/core';
import {Observable} from 'rxjs';
import {AuthService} from './auth.service';
import {map, take} from 'rxjs/internal/operators';

@Injectable({providedIn: 'root'})
export class AuthGuard implements CanActivate {

  constructor(private authService: AuthService, private router: Router){}

  canActivate(route: ActivatedRouteSnapshot,
              state: RouterStateSnapshot
  ): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {

    return this.authService.user.pipe(
      take(1), // we don't need a lister for the subject "user". We want to subscribe just once and then unsubscribe
      map(user => {
        // return !!user; // convert Valid object to 'true' and invalid object to 'false'
        const isAuth = !!user;
        if(isAuth){
          return true; // user is authenticated
        }
        return this.router.createUrlTree((['/auth'])); // user is NOT authenticated, redirect it to /auth
      })
    );
  }
}
