import { Injectable } from '@angular/core';
import { CanActivate, Router, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import { SecurityService } from './security.service';

@Injectable()
export class AuthGuardService implements CanActivate {
  
  constructor(private securityService: SecurityService, private router: Router) {
    if (localStorage.getItem('securityObject'))
    {     
      this.securityService.securityObject = JSON.parse(localStorage.getItem('securityObject'));         
    } 
  }    
  
  canActivate(
    route: ActivatedRouteSnapshot, 
    state: RouterStateSnapshot) {                

    let claimType: string = route.data["claimType"];

    // everyone can see the dashboard
    if (this.securityService.securityObject.isAuthenticated && state.url == '/dashboard') {           
      return true;
    }

    console.log(claimType);

    if (this.securityService.securityObject.isAuthenticated) { //} && this.securityService.hasClaim(claimType)) {           
      return true;
    } else {
      this.router.navigate(['/login'], {
        queryParams: {
          returnUrl: state.url
        }
      });
      return  false;
    }
  }
}