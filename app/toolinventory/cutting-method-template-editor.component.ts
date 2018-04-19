import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder } from '@angular/forms';
import 'rxjs/add/operator/debounceTime';
import 'rxjs/add/operator/map';
import { ToolInventoryService } from './toolinventory.service';
import { LookUpRequest } from './toolinventory';

@Component({
templateUrl: './cutting-method-template-editor.component.html',
styleUrls: ['./cutting-method-template-editor.component.css']
})
export class CuttingMethodTemplateEditorComponent implements OnInit {
entryForm: FormGroup;
cuttingMethodSearchResult = [{}];
lookUpRequest : LookUpRequest = new LookUpRequest();

constructor(private fb: FormBuilder, private toolInventoryService: ToolInventoryService) {}

createFormGroup(): void {
this.entryForm = this.fb.group({
cuttingMethod: '',
snippet: '',
lblMessage: '',
hdnCuttingMethodID: '',
autoCuttingMethod: ''
});

const cuttingMethodControl = this.entryForm.get('cuttingMethod');
const hdnCuttingMethodID = this.entryForm.get('hdnCuttingMethodID');
const autoCuttingMethod = this.entryForm.get ('autoCuttingMethod');

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
          this.cuttingMethodSearchResult = response
        })
      })
}

displayFn(item) {  
  console.log (this.entryForm)  
  return item.Text;  
}

ngOnInit()
{
this.createFormGroup();
}
}