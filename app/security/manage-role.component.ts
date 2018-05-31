import { Component, OnInit, HostListener } from '@angular/core';
import { FormGroup, FormBuilder, FormArray, Validators } from '@angular/forms';


import { SecurityService } from './security.service';
import { ActivatedRoute, Router } from '@angular/router';
import { Permission, RolePermission, Role } from './security';
import { Observable } from 'rxjs';
import { ValidationService } from '../shared/validation.service';
import { forEach } from '@angular/router/src/utils/collection';
import { ComponentCanDeactivate } from '../component-can-deactivate';
import { HandleErrorService } from '../shared/handle-error.service';

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
      Name: permission.name,
      Assigned: permission.assigned
    });
  }

  constructor(private route: ActivatedRoute,
    private router: Router,
    private fb: FormBuilder,
    private secSvc: SecurityService,
    private handleErrorService: HandleErrorService) {
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
          this.errorMessage = this.handleErrorService.handleError(error);
        }
      );
  }

  onRoleRetrieved(role: Role): void {
    if (this.entryForm) {
      this.entryForm.reset();
    }
    this.role = role;

    this.entryForm.patchValue({
      Name: role.name,
      DisplayName: role.displayName,
      Active: role.active
    });

    // FormArray needs to be iterated
    let permissions = this.role.permissions;
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
        error => {
          this.errorMessage = this.handleErrorService.handleError(error);
        }
      );;
  }

  onSaveComplete(roleId): void {
    this.entryForm.markAsPristine();
    this.infoMessage = 'Role updated.'
    this.errorMessage = '';
    this.router.navigate(['/manageroles/' + roleId]);
  }  
}