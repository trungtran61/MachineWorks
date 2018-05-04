import { Component, OnInit, HostListener } from '@angular/core';
import { FormGroup, FormBuilder, FormArray, Validators } from '@angular/forms';
import 'rxjs/add/operator/debounceTime';
import 'rxjs/add/operator/map';
import { SecurityService } from './security.service';
import { ActivatedRoute, Router } from '@angular/router';
import { Permission, RolePermission, Role } from './security';
import { Observable } from 'rxjs/Observable';
import { ValidationService } from '../shared/validation.service';
import { forEach } from '@angular/router/src/utils/collection';
import { ComponentCanDeactivate } from '../component-can-deactivate';

@Component({
  templateUrl: './manage-role.component.html',
  styleUrls: ['./manage-role.component.css']
})
export class ManageRoleComponent implements OnInit, ComponentCanDeactivate  {
  entryForm: FormGroup;
  role: Role;
  errorMessage: string = '';
  infoMessage: string = '';
  roleId: number;
  pageTitle: string = 'New Role';
  _permissions: FormArray = this.fb.array([]);
  
  @HostListener('window:beforeunload')

  canDeactivate(): boolean {
    return !this.entryForm.dirty;
  }

  get permissions(): FormArray {
    return <FormArray>this.entryForm.get('Permissions');
  }

  buildPermission(): FormGroup {
    return this.fb.group({
      Name: '',
      Assigned: ''
    });
  }

  addPermission(permission: RolePermission): FormGroup {
    return this.fb.group({
      Name: permission.Name,
      Assigned: permission.Assigned
    });
  }

  constructor(private route: ActivatedRoute,
    private router: Router,
    private fb: FormBuilder,
    private secSvc: SecurityService) {
  }

  createFormGroup(): void {
    this.entryForm = this.fb.group({
      Name: ['', Validators.required],
      DisplayName: '',
      Active: '',
      Permissions: this.fb.array([this.buildPermission()])
    });
  }

  ngOnInit() {
    this.createFormGroup();

    let roleId = +this.route.snapshot.params['id'];
    this.roleId = roleId;

    if (roleId != 0) {
      this.pageTitle = 'Manage Role';
    }
    else {
      this.pageTitle = 'New Role';
    }

    this.secSvc.getRole(roleId)
      .subscribe(
        (role: Role) => this.onRoleRetrieved(role),
        error => {
          console.log(error);
          this.errorMessage = <any>error;
        }
      );
  }

  onRoleRetrieved(role: Role): void {
    if (this.entryForm) {
      this.entryForm.reset();
    }
    this.role = role;

    this.entryForm.patchValue({
      Name: role.Name,
      DisplayName: role.DisplayName,
      Active: role.Active
    });

    // FormArray needs to be iterated
    let permissions = this.role.Permissions;
    var i: number;

    for (i = 0; i < permissions.length; i++) {
      this._permissions.push(this.addPermission(Object.assign(new RolePermission, permissions[i])));
    }
    this.entryForm.setControl('Permissions', this._permissions);
  }
  
  updateRole() {
    let role = Object.assign({}, this.role, this.entryForm.value);

    if (!this.entryForm.get("Permissions").dirty)
      role.Permissions = null;

    this.secSvc.updateRole(role)
      .subscribe(
        res => {
          this.onSaveComplete(res);
        },
        err => {
          this.handleError(err);
        }
      );;
  }

  onSaveComplete(roleId): void {
    this.entryForm.markAsPristine();
    this.infoMessage = 'Role updated.'
    this.errorMessage = '';
    this.router.navigate(['/manageroles/' + roleId]);
  }

  private handleError(error: Response): Observable<any> {
    this.errorMessage = error.statusText;
    return Observable.throw(error || 'Server error');
  }
}