import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';

import { AppComponent } from './app.component';
import { AppRoutingModule } from './app-routing.module';
import { DashboardComponent } from './dashboard/dashboard.component';
import { ToolInventoryModule } from './toolinventory/toolinventory.module';
import { LoginComponent } from './security/login.component';

import { SecurityService } from './security/security.service';
import { AuthGuardService } from './security/auth-guard.service';
import { PagenotfoundComponent } from './pagenotfound.component';
import { SecurityModule } from './security/security.module';
//import { NgHttpLoaderModule } from 'ng-http-loader/ng-http-loader.module';
import { RouterExtService } from './router-ext.service';
import { HTTP_INTERCEPTORS } from '@angular/common/http';
import { TokenInterceptor } from './security/token-interceptor';
import { Ng4LoadingSpinnerModule } from 'ng4-loading-spinner';
import { ConfirmLeaveComponent } from './shared/confirm-leave.component';
import { PendingChangesGuard } from './pending-changes-guard';
import { BsModalService, ModalModule } from 'ngx-bootstrap';
import { ModalDataService } from './shared/modal-data.service';
import { HandleErrorService } from './shared/handle-error.service';
 
@NgModule({
  declarations: [
    AppComponent,
    DashboardComponent,
    LoginComponent,
    PagenotfoundComponent,
    ConfirmLeaveComponent        
  ],
  imports: [
    BrowserModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,    
    //NgHttpLoaderModule,
    ToolInventoryModule,
    SecurityModule,
    AppRoutingModule,    
    Ng4LoadingSpinnerModule.forRoot(),
    ModalModule.forRoot(), 
  ],  
  providers: [
    SecurityService, AuthGuardService, RouterExtService,PendingChangesGuard, BsModalService, ModalDataService, HandleErrorService,
    {
      provide: HTTP_INTERCEPTORS,
      useClass: TokenInterceptor,
      multi: true
    }
  ],
  entryComponents: [ ConfirmLeaveComponent ], 
  bootstrap: [AppComponent]
})
export class AppModule { 
  constructor(private routerExtService: RouterExtService){}
}