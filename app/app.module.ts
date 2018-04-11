import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
<<<<<<< HEAD
<<<<<<< HEAD
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
    ToolInventoryModule
=======
=======
>>>>>>> 4c7580295a9e499c82291902d2c68964ba1cc1c9


import { AppComponent } from './app.component';


@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule
<<<<<<< HEAD
>>>>>>> 4c7580295a9e499c82291902d2c68964ba1cc1c9
=======
>>>>>>> 4c7580295a9e499c82291902d2c68964ba1cc1c9
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
