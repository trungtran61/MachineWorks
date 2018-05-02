import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor
} from '@angular/common/http';
import { SecurityService } from './security.service';
import { Observable } from 'rxjs/Observable';
@Injectable()
export class TokenInterceptor implements HttpInterceptor {
  constructor(public secSvc: SecurityService) {}
  intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    
    request = request.clone({
      setHeaders: {
        Authorization: `Bearer ${this.secSvc.getToken()}`
      }
    });
    return next.handle(request);
  }
}