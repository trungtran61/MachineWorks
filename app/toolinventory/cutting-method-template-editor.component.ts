import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, FormControl } from '@angular/forms';

import { ToolInventoryService } from './toolinventory.service';
import { LookUpRequest, Lookup, CuttingMethodTemplate } from './toolinventory';
import { Observable ,  Observer } from 'rxjs';
import { TypeaheadMatch } from 'ngx-bootstrap/typeahead';
import 'rxjs/add/operator/mergeMap';

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
  selectedCuttingMethod: string;
  typeaheadLoading: boolean;
  typeaheadNoResults: boolean;
  cuttingMethodDataSource = [{}];

  constructor(private fb: FormBuilder, private toolInventoryService: ToolInventoryService) { }

  createFormGroup(): void {

    this.entryForm = this.fb.group({
      cuttingMethod: '',
      snippet: ''
    });

    const cuttingMethodControl = this.entryForm.get('cuttingMethod');
    const snippetControl = this.entryForm.get('snippet');
    const lblMessageControl = this.entryForm.get('lblMessage');

    this.cuttingMethodDataSource = Observable.create((observer: Observer<string>) => observer.next(this.selectedCuttingMethod))
      .mergeMap((searchTerm: string) =>
        this.toolInventoryService.LookUp('CuttingMethod', searchTerm));
  }

  cuttingMethodLoading(e: boolean): void {
    this.typeaheadLoading = e;
  }

  cuttingMethodOnSelect(e: TypeaheadMatch): void {
    this.errorMessage = '';
    this.toolInventoryService.GetCuttingMethodTemplate(e.item.Text).subscribe(response => {
      this.entryForm.get('snippet').setValue(response[0]);
    });
  }

  SaveTemplate(): void {
    if (this.entryForm.dirty && this.entryForm.valid) {
      let cuttingMethodTemplate = new CuttingMethodTemplate();
      let cm = this.entryForm.get('cuttingMethod');
      cuttingMethodTemplate.CuttingMethod = this.selectedCuttingMethod;
      cuttingMethodTemplate.Template = this.entryForm.get('snippet').value;
      this.toolInventoryService.SaveTemplate(cuttingMethodTemplate)
        .subscribe(
          () => this.onSaveComplete(),
          (error: any) => this.errorMessage = <any>error
        );
    }
  }

  onSaveComplete(): void {
    //this.entryForm.reset();
    this.errorMessage = 'Template Updated.'
  }

  onSubmit() {

  }

  ngOnInit() {
    this.createFormGroup();
  }
}