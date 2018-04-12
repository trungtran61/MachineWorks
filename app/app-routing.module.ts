import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { DashboardComponent } from './dashboard/dashboard.component';
import { SearchToolinventoryComponent } from './toolinventory/search-toolinventory.component';
import { ToolSetupSheet } from './toolinventory/toolinventory';
import { ToolSetupSheetComponent } from './toolinventory/tool-setup-sheet.component';
import { OpenToolSetupSheetComponent } from './toolinventory/open-tool-setup-sheet.component';
import { CuttingMethodTemplateEditorComponent } from './toolinventory/cutting-method-template-editor.component';

const routes: Routes = [
  {
    path: 'dashboard', 
    component: DashboardComponent
  },
  { 
    path: 'searchtoolinventory', 
    component: SearchToolinventoryComponent
  },
  { 
    path: 'toolsetupsheet', 
    component: ToolSetupSheetComponent
  },
  { 
    path: 'opentoolsetupsheet', 
    component: OpenToolSetupSheetComponent
  },    
  { 
    path: 'cuttingmethodtemplateeditor', 
    component: CuttingMethodTemplateEditorComponent
  },     
  {
    path: '', redirectTo: 'dashboard', pathMatch: 'full'
  },
  {
    path: '**', component: DashboardComponent
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
