import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { of } from 'rxjs/observable/of';
import { environment } from '../../environments/environment';

import { SecurityUserAuth } from './security-user-auth';
import { LOGIN_MOCKS } from './login-mocks';
import { SecurityUser } from './security-user';
import { GetListRequest, User } from './security';
import { HttpParams, HttpClient, HttpHeaders } from '@angular/common/http';

@Injectable()
export class SecurityService {
  securityObject: SecurityUserAuth = new SecurityUserAuth();
  
  apiUrl: string = environment.secApiUrl;

  constructor(private http : HttpClient) { }

  login(entity: SecurityUser): Observable<SecurityUserAuth> {
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
  
    return of<SecurityUserAuth>(this.securityObject);
  }
  
  getSecurityObject(){
    return JSON.parse( localStorage.getItem('securityObject'));
  }

  getUsers(getListRequest:GetListRequest) : Observable<User[]>
  {         
      //return USER_MOCKS;    

      let params = new HttpParams().set("SearchParm",getListRequest.SearchParm);      
    
      return this.http.get<User[]>(this.apiUrl + 'GetUsers', {
        headers: new HttpHeaders({
          'Accept':'application/json',
          'Authorization': 'my-auth-token'
      }),
      params : params                  
      });      
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