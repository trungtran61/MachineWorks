import { Injectable } from '@angular/core';
import { CanActivate, Router, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import { SecurityService } from './security.service';
import { SecurityUserAuth } from './security-user-auth';

@Injectable()
export class AuthGuardService implements CanActivate {
  
  constructor(private securityService: SecurityService, private router: Router) {
    if (localStorage.getItem('securityObject'))
    {
      this.securityService.securityObject = JSON.parse(localStorage.getItem('securityObject'));    
    } 
  }    
  
  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {            
    if (this.securityService.securityObject.isAuthenticated) {      
      return true;
    } else {
      this.router.navigate(['/login'], {
        queryParams: {
          returnUrl: state.url
        }
      });
      return false;
    }
  }
}