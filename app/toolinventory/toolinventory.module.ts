import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpModule } from '@angular/http';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
//import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ReactiveFormsModule } from '@angular/forms';
import { SearchToolinventoryComponent } from './search-toolinventory.component';
import { ToolInventoryService } from './toolinventory.service';
import { ToolSetupSheetComponent } from './tool-setup-sheet.component';
import { OpenToolSetupSheetComponent } from './open-tool-setup-sheet.component';
import { CuttingMethodTemplateEditorComponent } from './cutting-method-template-editor.component';
import { RouterModule, Routes } from '@angular/router';
import { AuthGuardService } from '../security/auth-guard.service';
import { TypeaheadModule } from 'ngx-bootstrap/typeahead';
import { ToolDetailComponent } from './tool-detail.component';
import { FileDropModule } from 'ngx-file-drop';
import { PaginationModule } from 'ngx-bootstrap/pagination/pagination.module';
//import { AddNewToolComponent } from './add-new-tool.component';

const routes = [
  { 
    path: 'searchtoolinventory',
    component: SearchToolinventoryComponent,
    canActivate: [AuthGuardService]
  },
  { 
    path: 'searchtoolinventory/:toolID',
    component: ToolDetailComponent,
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
  },
  { 
    path: 'tooldetail/:toolID', 
    component: ToolDetailComponent,
    canActivate: [AuthGuardService]
  }      
];

@NgModule({
  imports: [
    ReactiveFormsModule,
    BrowserAnimationsModule,
    //FormsModule,
    HttpModule,    
    FileDropModule,
    TypeaheadModule.forRoot(),
    RouterModule.forChild(routes),
    PaginationModule.forRoot()
  ],
  declarations: [
    SearchToolinventoryComponent,
    ToolSetupSheetComponent,
    OpenToolSetupSheetComponent,
    CuttingMethodTemplateEditorComponent,
    ToolDetailComponent  
  ],
  providers: [ToolInventoryService]
})
export class ToolInventoryModule { }
