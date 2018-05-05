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
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/do';
import { Ng4LoadingSpinnerService } from 'ng4-loading-spinner';
import { Router } from '@angular/router';

@Injectable()
export class TokenInterceptor implements HttpInterceptor {
  public showLoading: boolean = false;
  public pendingRequests: number = 0;

  constructor(public secSvc: SecurityService, private spinnerService: Ng4LoadingSpinnerService, private router: Router) {}

  intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    this.pendingRequests++;
    this.turnOnModal();

    request = request.clone({
      setHeaders: {
        Authorization: `Bearer ${this.secSvc.getToken()}`
      }
    });
    return next.handle(request).do((event: HttpEvent<any>) => {      
      if (event instanceof HttpResponse) {
        this.turnOffModal();        
      }
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