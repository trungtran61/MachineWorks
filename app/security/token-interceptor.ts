import { Injectable, Inject } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor,
  HttpResponse,
  HttpErrorResponse
} from '@angular/common/http';
import { SecurityService } from './security.service';
import { Observable } from 'rxjs';
import 'rxjs/add/operator/do';

import { Ng4LoadingSpinnerService } from 'ng4-loading-spinner';
import { Router } from '@angular/router';

@Injectable()
export class TokenInterceptor implements HttpInterceptor {
  public showLoading: boolean = false;
  public pendingRequests: number = 0;

  constructor(public secSvc: SecurityService, private spinnerService: Ng4LoadingSpinnerService, private router: Router) { }

  intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    var token = localStorage.getItem('bearerToken');   

    this.pendingRequests++;
    this.turnOnModal();
    if (token) {
       request = request.clone({
        headers: request.headers.set('Authorization',
        'bearer ' + token)
      });
      return next.handle(request).do((event: HttpEvent<any>) => {
        //if (event instanceof HttpResponse) {
          this.turnOffModal();
        //}
      }, (err: any) => {
        if (err instanceof HttpErrorResponse) {
          console.log(err);
          this.turnOffModal();
          if (err.status === 401) {
            this.router.navigate(['/login']);
          }
        }
      });
    }
    else {
      this.turnOffModal();
      return next.handle(request);
    }
  }

  private turnOnModal() {
    if (!this.showLoading) {
      this.showLoading = true;
      this.spinnerService.show();
    }
    this.showLoading = true;
  }

  private turnOffModal() {
    this.pendingRequests--;
    if (this.pendingRequests <= 0) {
      if (this.showLoading) {
        this.spinnerService.hide();
      }
      this.showLoading = false;
    }
  }
}