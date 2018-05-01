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
import { NgHttpLoaderModule } from 'ng-http-loader/ng-http-loader.module';
import { RouterExtService } from './router-ext.service';

@NgModule({
  declarations: [
    AppComponent,
    DashboardComponent,
    LoginComponent,
    PagenotfoundComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,    
    NgHttpLoaderModule,
    ToolInventoryModule,
    SecurityModule,
    AppRoutingModule
  ],  
  providers: [
    SecurityService, AuthGuardService,RouterExtService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { 
  constructor(private routerExtService: RouterExtService){}
}