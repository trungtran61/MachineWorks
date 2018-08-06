import { Component, OnInit } from '@angular/core';
import {FormGroup, FormBuilder, FormArray, FormControl } from '@angular/forms';
import 'rxjs/add/operator/debounceTime';

import { ToolInventoryService } from './toolinventory.service';
import { ToolInventorySearch, ToolInventorySearchResults, ToolInventoryCodeColumn, LookupCategoryValue, ToolInventorySearchResult, ToolInventoryColumn, LinkToolRequest } from './toolinventory';
import { HandleErrorService } from '../shared/handle-error.service';
import { Observable, Observer } from 'rxjs';
import { environment } from '../../environments/environment';
import { ActivatedRoute } from '@angular/router';

@Component({
  templateUrl: './search-toolinventory.component.html',
  styleUrls: ['./search-toolinventory.component.css'],
  providers: [ToolInventoryService]
})
export class SearchToolinventoryComponent implements OnInit {
  searchForm: FormGroup;
  items: any[] = [];
  counter: number = 1;
  recordCount: number = 0;
  currentPage: number = 1;
  pageSize: number = environment.pageSize;
  propertyIndex: number = 0;


  // searchButton : FormControl = new FormControl();
  toolInventoryColumn: ToolInventoryColumn[] = [];
  searchResults: ToolInventorySearchResult[] = [];
  searchResult: ToolInventorySearchResults = new ToolInventorySearchResults();
  nameSearchResult = [];
  toolInventorySearch: ToolInventorySearch = {};
  errorMessage: string;
  toolInventoryCodeColumns =[{}];
  lookupCategoryValue: LookupCategoryValue[];
  typeaheadLoading: boolean;
  typeaheadNoResults: boolean;

  categoryDataSource = [{}];
  codeDataSource = [{}];
  externalLocationDataSource = [{}];
  statusDataSource = [{}];
  vendorNameDataSource = [{}];
  locationDataSource = [{}];
  manufacturerDataSource = [{}];
  machineNumberDataSource = [{}];
  stationNumberDataSource = [{}];
  cuttingMethodsDataSource = [{}];
  materialDataSource = [{}];
  gradeDataSource = [{}];
  nameDataSource = [{}];

  selectedName: string = '';
  selectedCategory: string = '';
  selectedCode: string = '';
  selectedExternalLocation: string = '';
  selectedStatus: string = '';
  selectedVendorName: string = '';
  selectedLocation: string = '';
  selectedManufacturer: string = '';
  selectedMachineNumber: string = '';
  selectedStationNumber: string = '';
  selectedCuttingMethods: string = '';
  selectedMaterial: string = '';
  selectedGrade: string = '';
  parentTool: string = '';
  selectedToolHolder: number[] = [];

  constructor(private toolInventoryService: ToolInventoryService, private fb: FormBuilder, private handleErrorService: HandleErrorService,
    private route:ActivatedRoute) { }
  createFormGroup(): void {
    this.searchForm = this.fb.group({
      code: new FormControl(''),
      category: new FormControl(''),
      categoryID: new FormControl(''),
      externalLocation: new FormControl(''),
      status: new FormControl(''),
      statusID: new FormControl(''),
      onHand: new FormControl(''),
      vendorName: new FormControl(''),
      location: new FormControl(''),
      image: new FormControl(''),
      manufacturer: new FormControl(''),
      machineNumber: new FormControl(''),
      stationNumber: new FormControl(''),
      comment: new FormControl(''),
      cuttingMethods: new FormControl(''),
      material: new FormControl(''),
      grade: new FormControl(''),
      name: new FormControl(''),
      groups: new FormControl(''),
      radius: new FormControl(''),
      description: new FormControl(''),
      locked: new FormControl(''),
      manufacturerItem: new FormControl(''),
      orderPoint: new FormControl(''),
      inventoryLevel: new FormControl(''),
      unitPrice: new FormControl(''),
      packSize: new FormControl(''),
      imageCode: new FormControl(''),
      mwHid: new FormControl(''),
      width: new FormControl(''),
      numberOfCutters: new FormControl(''),
      cuttingDiameter: new FormControl(''),
      shankDiameter: new FormControl(''),
      neckDiameter: new FormControl(''),
      fluteLength: new FormControl(''),
      lbs: new FormControl(''),
      oal: new FormControl(''),
      numberOfFlutes: new FormControl(''),
      angle: new FormControl(''),
      maxDepthCut: new FormControl(''),
      chipBreaker: new FormControl(''),
      direction: new FormControl(''),
      materialRecommended: new FormControl(''),
      vendorItem: new FormControl('')

    });
    this.route.params.subscribe(
      params => this.parentTool = params.parentTool);
console.log(this.parentTool);
    const categoryControl = this.searchForm.get('category');
    //const codeControl = this.searchForm.get('code');
    this.categoryDataSource = Observable.create((observer: Observer<string>) => observer.next(this.selectedCategory))
    .mergeMap((searchTerm: string) =>
    this.toolInventoryService.GetToolCategoryNames(searchTerm));
    
    
        this.nameDataSource = Observable.create((observer: Observer<string>) => observer.next(this.selectedName))
        .mergeMap((searchTerm: string) =>
          this.toolInventoryService.LookUp('name', searchTerm));
     
    this.codeDataSource = Observable.create((observer: Observer<string>) => observer.next(this.selectedCode))
      .mergeMap((searchTerm: string) =>
        this.toolInventoryService.LookUp('code', searchTerm));

  this.externalLocationDataSource = Observable.create((observer: Observer<string>) => observer.next(this.selectedExternalLocation))
      .mergeMap((searchTerm: string) =>
        this.toolInventoryService.LookUp('externalLocation', searchTerm));

        this.statusDataSource = Observable.create((observer: Observer<string>) => observer.next(this.selectedStatus))
        .mergeMap((searchTerm: string) =>
          this.toolInventoryService.LookUp('status', searchTerm));
  
    this.vendorNameDataSource = Observable.create((observer: Observer<string>) => observer.next(this.selectedVendorName))
    .mergeMap((searchTerm: string) =>
      this.toolInventoryService.LookUp('vendorID', searchTerm));          
    
    this.locationDataSource = Observable.create((observer: Observer<string>) => observer.next(this.selectedLocation))
      .mergeMap((searchTerm: string) =>
        this.toolInventoryService.LookUp('location', searchTerm));
    
        this.manufacturerDataSource = Observable.create((observer: Observer<string>) => observer.next(this.selectedManufacturer))
        .mergeMap((searchTerm: string) =>
          this.toolInventoryService.LookUp('manufacturerName', searchTerm));
        
        this.machineNumberDataSource = Observable.create((observer: Observer<string>) => observer.next(this.selectedMachineNumber))
        .mergeMap((searchTerm: string) =>
          this.toolInventoryService.LookUp('machineNumber', searchTerm));
          
        this.stationNumberDataSource = Observable.create((observer: Observer<string>) => observer.next(this.selectedStationNumber))
        .mergeMap((searchTerm: string) =>
          this.toolInventoryService.LookUp('stationNumber', searchTerm));
          
        this.cuttingMethodsDataSource = Observable.create((observer: Observer<string>) => observer.next(this.selectedCuttingMethods))
        .mergeMap((searchTerm: string) =>
          this.toolInventoryService.LookUp('cuttingMethod', searchTerm));
          
        this.materialDataSource = Observable.create((observer: Observer<string>) => observer.next(this.selectedMaterial))
        .mergeMap((searchTerm: string) =>
          this.toolInventoryService.LookUp('material', searchTerm));
          
        this.gradeDataSource = Observable.create((observer: Observer<string>) => observer.next(this.selectedGrade))
        .mergeMap((searchTerm: string) =>
          this.toolInventoryService.LookUp('grade', searchTerm));
          
          
      //GetToolCategoryNames
    // this.toolInventoryService.GetToolCategoryNames("")
    //   .subscribe(x => {this.lookupCategoryValue = x;
    //     console.log(this.lookupCategoryValue);
    //   },
    //     error => {
    //       this.errorMessage = this.handleErrorService.handleError(error);
    //     }
    //   );

      this.toolInventoryService.GetColumnsByCode('')
      .subscribe(x => {this.toolInventoryCodeColumns = x.filter(x => x.Sequence > 0);
        //console.log(this.toolInventoryCodeColumns);
      },
        error => {
          this.errorMessage = this.handleErrorService.handleError(error);
        }
      );
//   let group = <FormGroup>this.searchForm;
//     group.addControl('test', this.fb.group({
//       hello: "one",
//       yt: "two",
//       ig: "three",
//       tw: "four",
//     }))
// console.log (group);
     // const nameControl = this.searchForm.get('Name');
    // const codeControl = this.searchForm.get('Code');

    // nameControl.valueChanges
    //   .debounceTime(400)
    //   .subscribe(data => {
    //     this.toolInventoryService.GetToolNames("Name", data).subscribe(response => {
    //       this.nameSearchResult = response
    //     })
    //   })

    // codeControl.valueChanges
    //   .debounceTime(400)
    //   .subscribe(data => {
    //     this.toolInventoryService.GetToolNames("Code", data).subscribe(response => {
    //       this.codeSearchResult = response
    //     })
    //   })
  }

  GetSearchResults() {
    this.toolInventorySearch = Object.assign({}, this.searchForm.value);
    this.toolInventoryService.GetSearchResults(this.toolInventorySearch).subscribe(response => {
      this.searchResult = response
    })
  }
  ngOnInit() {
    this.createFormGroup();
    this.initializeControlValues();
  }
  onSubmit() {

  }
  getPage(page: number) {
    this.currentPage = page;
    let searchParam: ToolInventorySearch = new ToolInventorySearch();
    searchParam = Object.assign({}, this.searchForm.value);
    searchParam.PageSize = this.pageSize;
    searchParam.PageNumber = page;
    console.log(searchParam);
    this.toolInventoryService.GetSearchResults(searchParam).subscribe(response => {
      this.searchResults = response.searchResults;
        this.recordCount = response.recordCount;
      //console.log(this.searchResults);
    })
  }
  typeaheadOnSelect(controlName: string, controlValue: string){
    this.searchForm.controls[controlName].setValue(controlValue);
  }
  getSelectedCodeColumns() {
    this.toolInventorySearch = Object.assign({}, this.searchForm.value);
    this.toolInventoryService.GetSelectedToolInventoryColumns(this.selectedCode, true).subscribe(response => {
      this.toolInventoryColumn = response
      console.log(this.selectedCode);
       //console.log(this.toolInventoryColumn.findIndex(x => x.Name === "mwAngle" && x.Display === true));
      //this.toolInventoryColumn.forEach(x => console.log(x.Name));
     //console.log(this.toolInventoryColumn.map(function(e){return e.Name;}).indexOf("mwCategoryID") != -1);
     //console.log(this.toolInventoryColumn.findIndex(i => i.Name === "mwCategoryIDs") != -1);
    })
  }
  hideColumn(columnId: string){
    if(this.toolInventoryColumn.length > 0)
    {
      //return false;
      //console.log(this.toolInventoryColumn.length);
      if(this.toolInventoryColumn.findIndex(x => x.Name === columnId && x.Display === true) > -1)
      {
        return false;
      }
    }
    return true;    
  }
  public linkTool(){
    console.log(this.selectedToolHolder);
    let req: LinkToolRequest = new LinkToolRequest();
    req.ParentID = parseInt(this.parentTool);
    req.Action = "link";
    req.ChildIDs = this.selectedToolHolder;
  
    this.toolInventoryService.LinkTool(req)
      .subscribe(response => {
        console.log(response);
        this.selectedToolHolder = [];
        window.close();
    })
  }
  public updateCheckedOptions(value, evt){
    if(evt.target.checked == true)
      this.selectedToolHolder.push(value);
    else
      this.selectedToolHolder.splice(this.selectedToolHolder.indexOf(value),1);
  
    console.log(this.selectedToolHolder);
  }
  initializeControlValues(){
    this.searchForm.setValue({
      code: "",
      category: "",
      categoryID: "",
      externalLocation: "",
      status: "",
      statusID: "",
      onHand: "",
      vendorName: "",
      location: "",
      image: "",
      manufacturer: "",
      machineNumber: "",
      stationNumber: "",
      comment: "",
      cuttingMethods: "",
      material: "",
      grade: "",
      name: "",
      groups: "",
      radius: "",
      description: "",
      locked: "",
      manufacturerItem: "",
      orderPoint: "",
      inventoryLevel: "",
      unitPrice: "",
      packSize: "",
      imageCode: "",
      mwHid: "",
      width: "",
      numberOfCutters: "",
      cuttingDiameter: "",
      shankDiameter: "",
      neckDiameter: "",
      fluteLength: "",
      lbs: "",
      oal: "",
      numberOfFlutes: "",
      angle: "",
      maxDepthCut: "",
      chipBreaker: "",
      direction: "",
      materialRecommended: "",
      vendorItem: ""})
  }
}
