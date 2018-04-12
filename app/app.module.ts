import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';

import { AppComponent } from './app.component';
import { AppRoutingModule } from './app-routing.module';
import { DashboardComponent } from './dashboard/dashboard.component';
import { ToolInventoryModule } from './toolinventory/toolinventory.module';

@NgModule({
  declarations: [
    AppComponent,
    DashboardComponent    
  ],
  imports: [
    BrowserModule,
    ReactiveFormsModule,
    HttpClientModule,
    AppRoutingModule,
    ToolInventoryModule],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
