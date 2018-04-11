import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpModule } from '@angular/http';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatAutocompleteModule, MatInputModule } from '@angular/material';
import { SearchToolinventoryComponent } from './search-toolinventory.component';
import { ToolInventoryService } from './toolinventory.service';

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
    SearchToolinventoryComponent
  ],
  providers: [ToolInventoryService]
})
export class ToolInventoryModule { }
