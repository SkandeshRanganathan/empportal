import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, Router } from '@angular/router';
import { AuthService } from '../services/auth.service';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {
  constructor(private authService: AuthService, private router: Router) {}

  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean {
    const currentUser = this.authService.currentUserValue;
    if (currentUser) {
      // Check role if specified
      if (route.data['roles'] && route.data['roles'].indexOf(currentUser.role) === -1) {
        // Role not authorised so redirect to home page
        this.router.navigate(['/dashboard']);
        return false;
      }
      return true;
    }

    // Not logged in so redirect to login page
    this.router.navigate(['/login']);
    return false;
  }
}
