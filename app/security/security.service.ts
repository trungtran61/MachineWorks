import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { of } from 'rxjs/observable/of';
import { AppUserAuth } from './app-user-auth';
import { LOGIN_MOCKS } from './login-mocks';
import { AppUser } from './app-user';

@Injectable()
export class SecurityService {
  securityObject: AppUserAuth = new AppUserAuth();

  constructor() { }

  login(entity: AppUser): Observable<AppUserAuth> {
    // Initialize security object
    this.resetSecurityObject();    
    Object.assign(this.securityObject,
      LOGIN_MOCKS.find(user => user.userName.toLowerCase() ===
                               entity.userName.toLowerCase()));
    
    if (this.securityObject.userName !== "") {
      // Store into local storage
      localStorage.setItem("bearerToken", this.securityObject.bearerToken);
      localStorage.setItem('securityObject', JSON.stringify(this.securityObject));
    }
  
    return of<AppUserAuth>(this.securityObject);
  }
  
  getSecurityObject(){
    return JSON.parse( localStorage.getItem('securityObject'));
  }

  logout(): void {
    this.resetSecurityObject();
  }
  
  resetSecurityObject(): void {
    this.securityObject.userName = "";
    this.securityObject.bearerToken = "";
    this.securityObject.isAuthenticated = false;
  
    this.securityObject.canAccessToolInventory = false;
    this.securityObject.canAccessAdmin = false;    
  
    localStorage.setItem('securityObject',null);
    localStorage.removeItem("bearerToken");   
    localStorage.removeItem("securityObject");        
  }
}