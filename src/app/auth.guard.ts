import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, UrlTree, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { AuthService } from './services/auth/auth.service';
import { take, map, tap } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
/**********************************************************
 * @author Collin Larson
 * @version 1.0
 * @description Auth Guard is the security guard / bouncer
 * for pages that require a logged in user.
 *********************************************************/
export class AuthGuard implements CanActivate {
  /*********************************************************
   * Creates an instance of auth guard.
   * @param auth AuthService
   * @param router Angular Router module
   * @description Constructs the AuthGuard with its needed
   * dependicies
   ********************************************************/
  constructor(private auth: AuthService, private router: Router) { }

  /***************************************************************************
   * Determines whether a user can access a page
   * @param next ActivatedRouteSnapshot (angular routing, next component)
   * @param state ActivatedRouteSnapshot (angular routing, current component)
   * @returns activate
   **************************************************************************/
  canActivate(next: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<boolean | UrlTree> |
  Promise<boolean | UrlTree> | boolean | UrlTree {
    return this.auth.user$.pipe(
      take(1),
      map(user => !!user),
      tap(loggedIn => {
        if (!loggedIn) {
          console.log('Acess denied');
          this.router.navigate(['/about']);
        }
      })
    );
  }

  /*********************************************
   * Determines whether a user is logged in.
   * Used for spec testing
   * @returns true
   ********************************************/
  isLoggedIn() {
    return true;
  }
}
