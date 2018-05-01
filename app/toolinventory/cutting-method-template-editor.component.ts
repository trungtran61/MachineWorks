import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder } from '@angular/forms';
import 'rxjs/add/operator/debounceTime';
import 'rxjs/add/operator/map';
import { ToolInventoryService } from './toolinventory.service';
import { LookUpRequest, Lookup, CuttingMethodTemplate } from './toolinventory';

@Component({
  templateUrl: './cutting-method-template-editor.component.html',
  styleUrls: ['./cutting-method-template-editor.component.css']
})
export class CuttingMethodTemplateEditorComponent implements OnInit {
  entryForm: FormGroup;
  cuttingMethodSearchResult = [{}];
  lookUpRequest: LookUpRequest = new LookUpRequest();
  cuttingMethodTemplate: CuttingMethodTemplate = new CuttingMethodTemplate();
  errorMessage: string = '';

  constructor(private fb: FormBuilder, private toolInventoryService: ToolInventoryService) { }

  createFormGroup(): void {
    this.entryForm = this.fb.group({
      cuttingMethod: '',
      snippet: '',     
      hdnCuttingMethodID: '',
      autoCuttingMethod: ''
    });

    const cuttingMethodControl = this.entryForm.get('cuttingMethod');
    const hdnCuttingMethodID = this.entryForm.get('hdnCuttingMethodID');
    const autoCuttingMethod = this.entryForm.get('autoCuttingMethod');

    //const searchClearControl = this.entryForm.get('searchClear');
    const snippetControl = this.entryForm.get('snippet');
    //const btnSaveControl = this.entryForm.get('btnSave');
    const lblMessageControl = this.entryForm.get('lblMessage');

    cuttingMethodControl.valueChanges
      .debounceTime(400)
      .subscribe(data => {
        this.lookUpRequest.Category = 'CuttingMethod';
        this.lookUpRequest.SearchTerm = data;
        this.toolInventoryService.LookUp(this.lookUpRequest).subscribe(response => {
          this.cuttingMethodSearchResult = response;
        })
      })
  }

  displayFn(item) {
    return item.Text;
  }

  GetCuttingMethodTemplate(item: Lookup) {
    console.log(item.Text);
    this.toolInventoryService.GetCuttingMethodTemplate(item.Text).subscribe(response => {
      this.entryForm.get('snippet').setValue(response[0]);
    });
  }

  SaveTemplate(): void {
    if (this.entryForm.dirty && this.entryForm.valid) {
      let cuttingMethodTemplate = new CuttingMethodTemplate();
      let cm = this.entryForm.get('cuttingMethod');
      cuttingMethodTemplate.CuttingMethod = this.entryForm.get('cuttingMethod').value.Text;
      cuttingMethodTemplate.Template =  this.entryForm.get('snippet').value;
      this.toolInventoryService.SaveTemplate(cuttingMethodTemplate)
        .subscribe(
          () => this.onSaveComplete(),
          (error: any) => this.errorMessage = <any>error
        );
    }
  }

  onSaveComplete(): void {    
    //this.entryForm.reset();
    this.errorMessage= 'Template Updated.'
  }

  ngOnInit() {
    this.createFormGroup();   
  }
}