import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { of } from 'rxjs/observable/of';
import 'rxjs/add/observable/of';
import { environment } from '../../environments/environment';

import { SecurityUserAuth } from './security-user-auth';
import { LOGIN_MOCKS } from './login-mocks';
import { SecurityUser } from './security-user';
import { GetListRequest, User, Role, GetRolesResponse, GetPermissionsResponse, GetUsersResponse } from './security';
import { HttpParams, HttpClient, HttpHeaders } from '@angular/common/http';
import { Headers, RequestOptions } from '@angular/http';
import { Subscription } from 'rxjs/Subscription';

const httpOptions = {
  headers: new HttpHeaders({ 'Content-Type': 'application/json' })
};

@Injectable()
export class SecurityService {
  securityObject: SecurityUserAuth = new SecurityUserAuth();
  apiUrl: string = environment.secApiUrl;  

  constructor(private http: HttpClient) { }

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

  getToken(): string {
    return localStorage.getItem('bearerToken');
  }

  getSecurityObject() {
    return JSON.parse(localStorage.getItem('securityObject'));
  }

  getUsers(getListRequest: GetListRequest): Observable<GetUsersResponse> {
    let params = new HttpParams().append("SearchParm", getListRequest.SearchParm)
    .append("PageSize", environment.pageSize.toString())
    .append("PageNumber", getListRequest.PageNumber.toString());

    return this.http.get<GetUsersResponse>(this.apiUrl + 'GetUsers', {
      headers: new HttpHeaders({
        'Accept': 'application/json',
        'Authorization': 'my-auth-token'
      }),
      params: params
    });
  }

  getUser(id: number): Observable<User> {
   /*
    if (id === 0) {
      return Observable.of(this.initializeUser());
    };
    */
    let params = new HttpParams().set("id", id.toString());

    return this.http.get<User>(this.apiUrl + 'GetUser', {
      headers: new HttpHeaders({
        'Accept': 'application/json',
        'Authorization': 'my-auth-token'
      }),
      params: params
    });
  }

  updateUserRoles(id: number, roles) {
    return (this.http.post(this.apiUrl + 'UpdateUserRoles', { id: id, roles: JSON.stringify(roles) }));          
  }

  updateUserStatus(id: number, active: boolean) {
    return (this.http.post(this.apiUrl + 'UpdateUserStatus', { id: id, active: active }));          
  }

  updateUserProfile(user: User) {
    //console.log(user);
    return (this.http.post(this.apiUrl + 'UpdateUserProfile', JSON.stringify(user), httpOptions));          
  }

  getRoles(getListRequest: GetListRequest): Observable<GetRolesResponse> {
    let params = new HttpParams().append("SearchParm", getListRequest.SearchParm)
    .append("PageSize", environment.pageSize.toString())
    .append("PageNumber", getListRequest.PageNumber.toString());

    return this.http.get<GetRolesResponse>(this.apiUrl + 'GetRoles', {
      headers: new HttpHeaders({
        'Accept': 'application/json',
        'Authorization': 'my-auth-token'
      }),
      params: params
    });
  }

  getPermissions(getListRequest: GetListRequest): Observable<GetPermissionsResponse> {
    let params = new HttpParams().append("SearchParm", getListRequest.SearchParm)
    .append("PageSize", environment.pageSize.toString())
    .append("PageNumber", getListRequest.PageNumber.toString());

    return this.http.get<GetPermissionsResponse>(this.apiUrl + 'GetPermissions', {
      headers: new HttpHeaders({
        'Accept': 'application/json',
        'Authorization': 'my-auth-token'
      }),
      params: params
    });
  }

  private extractData(response: Response) {
    let body = response.json();
    return body || {};
  }  

  initializeUser(): User {
    // Return an initialized object
    return {
      Id: 0,
      UserName: null,
      Password: null,
      FirstName: null,
      LastName: null,
      Email: null,
      Active: false,
      Roles: null,
      Permissions: ''
    };
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

    localStorage.setItem('securityObject', null);
    localStorage.removeItem("bearerToken");
    localStorage.removeItem("securityObject");
  }
}