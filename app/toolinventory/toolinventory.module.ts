import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpModule } from '@angular/http';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { SearchToolinventoryComponent } from './search-toolinventory.component';
import { ToolInventoryService } from './toolinventory.service';
import { ToolSetupSheetComponent } from './tool-setup-sheet.component';
import { OpenToolSetupSheetComponent } from './open-tool-setup-sheet.component';
import { CuttingMethodTemplateEditorComponent } from './cutting-method-template-editor.component';
import { RouterModule, Routes } from '@angular/router';
import { AuthGuardService } from '../security/auth-guard.service';
import { TypeaheadModule } from 'ngx-bootstrap/typeahead';

const routes = [
  { 
    path: 'searchtoolinventory', 
    component: SearchToolinventoryComponent,
    canActivate: [AuthGuardService]
  },
  { 
    path: 'toolsetupsheet', 
    component: ToolSetupSheetComponent,
    canActivate: [AuthGuardService]
  },
  { 
    path: 'opentoolsetupsheet', 
    component: OpenToolSetupSheetComponent,
    canActivate: [AuthGuardService]
  },    
  { 
    path: 'cuttingmethodtemplateeditor', 
    component: CuttingMethodTemplateEditorComponent,
    canActivate: [AuthGuardService]
  }      
];

@NgModule({
  imports: [
    ReactiveFormsModule,
    BrowserAnimationsModule,
    FormsModule,
    HttpModule,
    TypeaheadModule.forRoot(),
    RouterModule.forChild(routes)    
  ],
  declarations: [
    SearchToolinventoryComponent,
    ToolSetupSheetComponent,
    OpenToolSetupSheetComponent,
    CuttingMethodTemplateEditorComponent
  ],
  providers: [ToolInventoryService]
})
export class ToolInventoryModule { }
