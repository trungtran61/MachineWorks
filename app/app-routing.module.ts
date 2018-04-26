import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { DashboardComponent } from './dashboard/dashboard.component';
import { SearchToolinventoryComponent } from './toolinventory/search-toolinventory.component';
import { ToolSetupSheet } from './toolinventory/toolinventory';
import { ToolSetupSheetComponent } from './toolinventory/tool-setup-sheet.component';
import { OpenToolSetupSheetComponent } from './toolinventory/open-tool-setup-sheet.component';
import { CuttingMethodTemplateEditorComponent } from './toolinventory/cutting-method-template-editor.component';
import { LoginComponent } from './security/login.component';
import { AuthGuardService } from './security/auth-guard.service';
import { PagenotfoundComponent } from './pagenotfound.component';

const routes: Routes = [
  {
    path: 'dashboard', 
    component: DashboardComponent,
    canActivate: [AuthGuardService]
  },
  { 
    path: 'login', 
    component: LoginComponent
  },  
  {
    path: '', redirectTo: 'dashboard', pathMatch: 'full'
  },
  {
    path: '**', component: PagenotfoundComponent
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
