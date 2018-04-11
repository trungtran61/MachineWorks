import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder } from '@angular/forms';
import 'rxjs/add/operator/debounceTime';
import 'rxjs/add/operator/map';

import { ToolInventoryService } from './toolinventory.service';
import { ToolInventorySearch, ToolInventorySearchResults } from './toolinventory';

@Component({
  templateUrl: './search-toolinventory.component.html',
  styleUrls: ['./search-toolinventory.component.css'],
  providers: [ToolInventoryService]
})
export class SearchToolinventoryComponent implements OnInit {
  searchForm: FormGroup;

  // searchButton : FormControl = new FormControl();
  codeSearchResult = [];
  nameSearchResult = [];
  searchResult: ToolInventorySearchResults;
  toolInventorySearch: ToolInventorySearch = {};

  constructor(private toolInventoryService: ToolInventoryService, private fb: FormBuilder) {

  }

  createFormGroup(): void {
    this.searchForm = this.fb.group({
      Code: '',
      Name: '',
      ItemNumber: '',
      CategoryID: '',
      MWID: '',
      Radius: '',
      NumberOfCutters: '',
      ChipBreaker: ''
    });

    const nameControl = this.searchForm.get('Name');
    const codeControl = this.searchForm.get('Code');

    nameControl.valueChanges
      .debounceTime(400)
      .subscribe(data => {
        this.toolInventoryService.GetToolNames("Name", data).subscribe(response => {
          this.nameSearchResult = response
        })
      })

    codeControl.valueChanges
      .debounceTime(400)
      .subscribe(data => {
        this.toolInventoryService.GetToolNames("Code", data).subscribe(response => {
          this.codeSearchResult = response
        })
      })
  }

  GetSearchResults() {
    this.toolInventorySearch = Object.assign({}, this.searchForm.value);
    this.toolInventoryService.GetSearchResults(this.toolInventorySearch).subscribe(response => {
      this.searchResult = response
    })
  }

  ngOnInit() {
    this.createFormGroup();
  }

}
