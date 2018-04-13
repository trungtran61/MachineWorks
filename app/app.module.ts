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

@NgModule({
  declarations: [
    AppComponent,
    DashboardComponent,
    LoginComponent    
  ],
  imports: [
    BrowserModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
    AppRoutingModule,
    ToolInventoryModule],
  providers: [SecurityService],
  bootstrap: [AppComponent]
})
export class AppModule { }
