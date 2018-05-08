import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { of } from 'rxjs/observable/of';
import 'rxjs/add/observable/of';
import { environment } from '../../environments/environment';
import { tap } from 'rxjs/operators/tap';

//import { LOGIN_MOCKS } from './login-mocks';
import { SecurityUser } from './security-user';
import { GetListRequest, User, Role, GetRolesResponse, GetPermissionsResponse, GetUsersResponse, Permission, SecurityUserAuth, UserAuthRequest } from './security';
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

  login(user: SecurityUser): Observable<SecurityUserAuth> {
    // Initialize security object
    this.resetSecurityObject();
    //return (this.http.post<SecurityUserAuth>(this.apiUrl + 'ValidateUser', user));
    return this.http.post<SecurityUserAuth>(environment.apiUrl + 'ValidateUser',
      user, httpOptions).pipe(
      tap(resp => {
        // Use object assign to update the current object
        // NOTE: Don't create a new AppUserAuth object
        //       because that destroys all references to object
        Object.assign(this.securityObject, resp);
        // Store into local storage
        localStorage.setItem('securityObject', JSON.stringify(this.securityObject));
        localStorage.setItem("bearerToken",
          this.securityObject.bearerToken);
      }));
  }

  getToken(): string {
    return localStorage.getItem('bearerToken');
  }

  getSecurityObject() {
    return JSON.parse(localStorage.getItem('securityObject'));
  }

  getUsers(getListRequest: GetListRequest): Observable<GetUsersResponse> {
    let params = new HttpParams().append("searchParm", getListRequest.searchParm)
      .append("PageSize", environment.pageSize.toString())
      .append("PageNumber", getListRequest.pageNumber.toString());

    return this.http.get<GetUsersResponse>(this.apiUrl + 'GetUsers', {     
      params: params
    });
  }

  getUser(id: number): Observable<User> {
    let params = new HttpParams().set("id", id.toString());

    return this.http.get<User>(this.apiUrl + 'GetUser', {
      headers: new HttpHeaders({
        'Accept': 'application/json',
        'Authorization': 'my-auth-token'
      }),
      params: params
    });
  }

  getRole(id: number): Observable<Role> {
    let params = new HttpParams().set("id", id.toString());

    return this.http.get<Role>(this.apiUrl + 'GetRole', {
      headers: new HttpHeaders({
        'Accept': 'application/json',
        'Authorization': 'my-auth-token'
      }),
      params: params
    });
  }

  getPermission(id: number): Observable<Permission> {

    let params = new HttpParams().set("id", id.toString());

    return this.http.get<Permission>(this.apiUrl + 'GetPermission', {     
      params: params
    });
  }

  updateUserRoles(id: number, roles) {
    return (this.http.post(this.apiUrl + 'UpdateUserRoles', { id: id, roles: JSON.stringify(roles) }));
  }

  updateUserStatus(id: number, active: boolean) {
    return (this.http.post(this.apiUrl + 'UpdateUserStatus', { id: id, active: active }));
  }

  updateRoleStatus(role: Role) {
    return (this.http.post(this.apiUrl + 'UpdateRoleStatus', { id: role.id, active: role.active }));
  }

  updatePermissionStatus(permission: Permission) {
    return (this.http.post(this.apiUrl + 'UpdatePermissionStatus', { id: permission.id, active: permission.active }));
  }

  updateUserProfile(user: User) {
    //console.log(user);
    return (this.http.post(this.apiUrl + 'UpdateUserProfile', user));
  }

  updateRole(role: Role) {
    return (this.http.post(this.apiUrl + 'UpdateRole', role));
  }

  updatePermission(permission: Permission) {
    console.log(permission);
    return this.http.post(this.apiUrl + 'UpdatePermission', permission);
  }

  getRoles(getListRequest: GetListRequest): Observable<GetRolesResponse> {
    let params = new HttpParams().append("searchParm", getListRequest.searchParm)
      .append("PageSize", environment.pageSize.toString())
      .append("PageNumber", getListRequest.pageNumber.toString());

    return this.http.get<GetRolesResponse>(this.apiUrl + 'GetRoles', {
      headers: new HttpHeaders({
        'Accept': 'application/json',
        'Authorization': 'my-auth-token'
      }),
      params: params
    });
  }

  getPermissions(getListRequest: GetListRequest): Observable<GetPermissionsResponse> {
    let params = new HttpParams().append("searchParm", getListRequest.searchParm)
      .append("PageSize", environment.pageSize.toString())
      .append("PageNumber", getListRequest.pageNumber.toString());

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
      id: 0,
      userName: null,
      password: null,
      firstName: null,
      lastName: null,
      email: null,
      active: false,
      roles: null,
      permissions: ''
    };
  }

  logout(): void {
    this.resetSecurityObject();
  }

  resetSecurityObject(): void {
    this.securityObject.userName = "";
    this.securityObject.bearerToken = "";
    this.securityObject.isAuthenticated = false;
    this.securityObject.firstName = "";
    this.securityObject.permissions = [];
    this.securityObject.claims = [];
    
    localStorage.removeItem("bearerToken");  
    localStorage.removeItem("securityObject");    
  }
}