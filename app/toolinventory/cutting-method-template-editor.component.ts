import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder } from '@angular/forms';
import 'rxjs/add/operator/debounceTime';
import 'rxjs/add/operator/map';

@Component({
templateUrl: './cutting-method-template-editor.component.html',
styleUrls: ['./cutting-method-template-editor.component.css']
})
export class CuttingMethodTemplateEditorComponent implements OnInit {
entryForm: FormGroup;
constructor(private fb: FormBuilder) {}

createFormGroup(): void {
this.entryForm = this.fb.group({
cuttingMethod: '',
searchclear: '',
snippet: '',
btnSave: '',
lblMessage: '',
});

const cuttingMethodControl = this.entryForm.get('cuttingMethod');
const searchclearControl = this.entryForm.get('searchclear');
const snippetControl = this.entryForm.get('snippet');
const btnSaveControl = this.entryForm.get('btnSave');
const lblMessageControl = this.entryForm.get('lblMessage');
}

ngOnInit()
{
this.createFormGroup();
}
}