import { Component, OnInit } from '@angular/core';
import { FileSystemFileEntry, UploadEvent, UploadFile } from 'ngx-file-drop';
import { ToolInventoryService } from './toolinventory.service';
import { FormGroup, FormControl, FormBuilder } from '@angular/forms';
import { ToolInventoryColumn, ToolInventorySearchResult, ToolInventorySearch, ToolInventorySaveRequest, LinkToolRequest, LookupCategoryValue } from './toolinventory';
import { Observable, Observer, concat } from 'rxjs';
import { HandleErrorService } from '../shared/handle-error.service';
import { ActivatedRoute } from '@angular/router';
import { environment } from '../../environments/environment';

@Component({
  selector: 'app-tool-detail',
  templateUrl: './tool-detail.component.html',
  styleUrls: ['./tool-detail.component.css']
})
export class ToolDetailComponent implements OnInit {
  static isDropped: boolean = false;
  uploadedImage: string = '';
  errorMessage: string = '';
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
  searchResult: ToolInventorySearchResult = new ToolInventorySearchResult();
  nameSearchResult = [];
  toolInventorySearch: ToolInventorySearch = {};
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
  manufacturerNameDataSource = [{}];
  machineNumberDataSource = [{}];
  stationNumberDataSource = [{}];
  cuttingMethodsDataSource = [{}];
  materialDataSource = [{}];
  gradeDataSource = [{}];
  nameDataSource = [{}];

  selectedCode: string = '';
  selectedToolID: string = '';

  message: string='';
  description: string = '';
  selectedName: string = '';
  selectedCategory: string = '';
  selectedExternalLocation: string = '';
  selectedStatus: string = '';
  selectedVendorName: string = '';
  selectedLocation: string = '';
  selectedManufacturerName: string = '';
  selectedMachineNumber: string = '';
  selectedStationNumber: string = '';
  selectedCuttingMethods: string = '';
  selectedMaterial: string = '';
  selectedGrade: string = '';
  //mwID:string = '';
  groups: string = '';
  isOnHand: boolean = false;
  vendorItemNo: string = '';
  isLocked: boolean = false;
  manufacturerItem: string = '';
  toolImagePath: string='';
  selectedToolHolder: number[] = [];
  //imageMessage: string='';
  
  get staticDropped() {
    return ToolDetailComponent.isDropped;
  }
  constructor(private toolInventoryService: ToolInventoryService, private fb: FormBuilder
      , private handleErrorService: HandleErrorService, private route:ActivatedRoute) {}
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
      isLocked: new FormControl(''),
      manufacturerItem: new FormControl(''),
      orderPoint: new FormControl(''),
      inventoryLevel: new FormControl(''),
      unitPrice: new FormControl(''),
      packSize: new FormControl(''),
      imageCode: new FormControl(''),
      mwID: new FormControl(''),
      width: new FormControl(''),
      numOfCutters: new FormControl(''),
      Diameter: new FormControl(''), //cuttingDiameter
      shankDiameter: new FormControl(''),
      neckDiameter: new FormControl(''),
      fluteLength: new FormControl(''),
      lbs: new FormControl(''),
      oal: new FormControl(''),
      numOfFlutes: new FormControl(''),
      angle: new FormControl(''),
      maxDepthOfCut: new FormControl(''),
      chipBreaker: new FormControl(''),
      direction: new FormControl(''),
      materialRecommended: new FormControl(''),
      vendorItem: new FormControl('')

    });

    // this.route.params.subscribe(
    //   params => this.selectedCode = params.code);
    this.route.params.subscribe(
        params => this.selectedToolID = params.toolID);

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
    
        this.manufacturerNameDataSource = Observable.create((observer: Observer<string>) => observer.next(this.selectedManufacturerName))
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
  }

  // GetSearchResults() {
  //   this.toolInventorySearch = Object.assign({}, this.searchForm.value);
  //   this.toolInventoryService.GetSearchResults(this.toolInventorySearch).subscribe(response => {
  //     this.searchResult = response
  //   })
  // }
  GetToolDetails(){
    this.toolInventoryService.GetToolDetails(this.selectedToolID).subscribe(response =>{
      this.populateControls(response);
      this.toolImagePath = "./assets/images/".concat(response["ImagePath"]); 
      //console.log(this.toolImagePath);
      this.selectedCode = response["Code"];
      this.getSelectedCodeColumns();
      this.searchResult = response;
      console.log(this.searchResults);
    })
  }
  public RefreshPage(msg: string){
    console.log(msg);
    this.GetToolDetails();
  }
  ngOnInit() {
    this.createFormGroup();
    if(parseInt(this.selectedToolID) > 0){
      this.GetToolDetails();
    }
    //console.log(this.selectedCode);
  }
  openWin(){
    let childWin = window.open('searchtoolinventory/'.concat(this.selectedToolID), '_blank', 'width=700,height=500,left=200,top=100');
    childWin.onbeforeunload = () => {
      //console.log("I'm back");
      this.GetToolDetails();
    }
  }
  onSubmit() {

  }
  // getPage(page: number) {
  //   this.currentPage = page;
  //   let searchParam: ToolInventorySearch = new ToolInventorySearch();
  //   //searchParam.Name = this.selectedCategory.trim() ;
  //   searchParam.Code = [];
  //   searchParam.Code.push(this.selectedCode.trim());
  //   searchParam.Radius = this.searchForm.get('radius').value;
  //   searchParam.Description = this.searchForm.get('description').value;
  //   // searchParam.width = this.searchForm.get('width').value; 
  //   // searchParam.NumberOfCutters = this.searchForm.get('numberOfCutter').value; 
  //   // searchParam.cuttingDiameter = this.searchForm.get('cuttingDiameter').value; 
  //   // searchParam.shankDiameter = this.searchForm.get('shankDiameter').value; 
  //   // searchParam.neckDiameter = this.searchForm.get('neckDiameter').value; 
  //   // searchParam.fluteLength = this.searchForm.get('fluteLength').value; 
  //   // searchParam.lbs = this.searchForm.get('lbs').value; 
  //   // searchParam.oal = this.searchForm.get('oal').value; 
  //   // searchParam.numberOfFlutes = this.searchForm.get('numberOfFlutes').value; 
  //   // searchParam.angle = this.searchForm.get('angle').value; 
  //   // searchParam.maxDepthCut = this.searchForm.get('maxDepthCut').value; 
  //   // searchParam.chipBreaker = this.searchForm.get('chipBreaker').value; 
  //   // searchParam.direction = this.searchForm.get('direction').value; 
  //   // searchParam.materialRecommended = this.searchForm.get('materialRecommended').value; 
  //   searchParam.PageSize = this.pageSize;
  //   searchParam.PageNumber = page;
  //   this.toolInventoryService.GetSearchResults(searchParam).subscribe(response => {
  //     this.searchResults = response.searchResults;
  //       this.recordCount = response.recordCount;
  //     //console.log(this.searchResults);
  //   })
  // }
  typeaheadOnSelect(controlName: string, controlValue: string){
    this.searchForm.controls[controlName].setValue(controlValue);
  }
  getSelectedCodeColumns() {
    //console.log("getSelectedCodeColumns");
    console.log(this.selectedCode);
    //this.toolInventorySearch = Object.assign({}, this.searchForm.value);
    this.toolInventoryService.GetSelectedToolInventoryColumns(this.selectedCode).subscribe(response => {
      this.toolInventoryColumn = response
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




  public dropped(event: UploadEvent) {

    for (const droppedFile of event.files) {
      // Is it a file?
      if (droppedFile.fileEntry.isFile) {
        const fileEntry = droppedFile.fileEntry as FileSystemFileEntry;
        fileEntry.file((file: File) => {
          
          var reader = new FileReader();
          var preview = <HTMLImageElement>document.querySelector("#toolImage");
          reader.addEventListener("load", function () {
            ToolDetailComponent.isDropped = true;
            preview.src = reader.result;
          }, false);
          reader.readAsDataURL(file);

          const formData = new FormData()
          formData.append('toolImage', file, droppedFile.relativePath)
          formData.append('toolId', this.selectedToolID);
          this.toolInventoryService.UploadToolImage(formData)
            .subscribe(
              () => this.onSaveComplete(),
              (error: any) => this.errorMessage = <any>error
            );
        });
      }
    }

  }

  public fileOver(event) {
    console.log(event);
  }

  public fileLeave(event) {
    console.log(event);
  }

  onSaveComplete(): void {
    console.log("Saved Image");
    //this.message = "Image Saved"
  }
  public addNew(){
    this.selectedToolID = "0";
    //this.GetToolDetails();
    this.selectedCode = "";
    this.toolInventoryColumn = [];
    this.searchForm.reset();
  }

  public saveToolDetails(){
    let req: ToolInventorySaveRequest = new ToolInventorySaveRequest();
    req = Object.assign({}, this.searchForm.value);
    req.iD = parseInt(this.selectedToolID);
    //req.ExternalLocation = this.searchForm.get['externalLocation'].value;
    //console.log(this.searchForm.value.externalLocation);
    this.toolInventoryService.SaveToolDetails(req)
    .then(x => {
        console.log("promised");
        //console.log(x);
        this.message = "Tool Saved:";
        if(x != this.selectedToolID){
          this.selectedToolID = String(x);
          this.GetToolDetails();
        }
      }
    ), err =>{
      console.log(err);
    };
  }
public copyTool(){
  let req: ToolInventorySaveRequest = new ToolInventorySaveRequest();
  req.iD = parseInt(this.selectedToolID);
  //req.ExternalLocation = this.searchForm.get['externalLocation'].value;
  //console.log(this.searchForm.value.externalLocation);
  this.toolInventoryService.CopyTool(req)
  .then(x => {
      console.log("promised");
      //console.log(x);
      this.message = "Tool Copied";
      if(x != this.selectedToolID){
        this.selectedToolID = String(x);
        this.GetToolDetails();
      }
    }
  ), err =>{
    console.log(err);
  };
}

public unlinkTool(){
  console.log(this.selectedToolHolder);
  let req: LinkToolRequest = new LinkToolRequest();
  req.ParentID = parseInt(this.selectedToolID);
  req.Action = "unlink";
  req.ChildIDs = this.selectedToolHolder;

  this.toolInventoryService.LinkTool(req)
    .subscribe(response => {
      console.log(response);
      this.GetToolDetails();
  })
  this.selectedToolHolder = [];
}

public updateCheckedOptions(value, evt){
  if(evt.target.checked == true)
    this.selectedToolHolder.push(value);
  else
    this.selectedToolHolder.splice(this.selectedToolHolder.indexOf(value),1);

  console.log(this.selectedToolHolder);
}
  private populateControls(result: ToolInventorySearchResult){
    this.searchForm.setValue({code: result["Code"],
      //category: result[""],
      category: result["CategoryName"],
      categoryID: result["CategoryID"],
       description: result["Description"],
       externalLocation: result["ExternalLocation"],
       status: result["Status"],
       statusID: result["StatusID"],
       onHand: result["OnHand"],
       vendorName: result["VendorInfo"]["CompanyName"],
       location: result["Location"],
       manufacturer: result["Manufacturer"],
       machineNumber: result["MachineNumber"],
       stationNumber: result["StationNumber"],
       comment: result["Comment"],
       cuttingMethods: result["CuttingMethods"],
       material: result["Material"],
       grade: result["Grade"],
       name: result["Name"],
       groups: "?",
       radius: result["Radius"],
       isLocked: result["isLocked"] == "True",
       manufacturerItem: "?",
       orderPoint: result["OrderPoint"],
       inventoryLevel: result["InventoryLevel"],
       unitPrice: result["UnitPrice"],
       packSize: result["PackSize"],
       imageCode: result["ImageCode"],
       mwID: result["MWID"],
       width: result["Width"],
       numOfCutters: result["NumOfCutters"],
       Diameter: result["Diameter"],
       shankDiameter: result["ShankDiameter"],
       neckDiameter: result["NeckDiameter"],
       fluteLength: result["FluteLength"],
       lbs: result["LBS"],
       oal: result["OAL"],
       numOfFlutes: result["NumOfFlutes"],
       angle: result["Angle"],
       maxDepthOfCut: result["MaxDepthOfCut"],
       chipBreaker: result["ChipBreaker"],
       direction: result["Direction"],
       materialRecommended: "?",
       vendorItem: "?"
      });
  }

}
