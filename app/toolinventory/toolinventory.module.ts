import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpModule } from '@angular/http';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatAutocompleteModule, MatInputModule } from '@angular/material';
import { SearchToolinventoryComponent } from './search-toolinventory.component';
import { ToolInventoryService } from './toolinventory.service';
import { ToolSetupSheetComponent } from './tool-setup-sheet.component';
import { OpenToolSetupSheetComponent } from './open-tool-setup-sheet.component';
import { CuttingMethodTemplateEditorComponent } from './cutting-method-template-editor.component';

@NgModule({
  imports: [
    MatInputModule,
    ReactiveFormsModule,
    MatAutocompleteModule,
    BrowserAnimationsModule,
    FormsModule,
    HttpModule    
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
