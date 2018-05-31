import { Component, OnInit, HostListener } from '@angular/core';
import { FormGroup, FormBuilder, FormArray, Validators } from '@angular/forms';


import { SecurityService } from './security.service';
import { ActivatedRoute, Router } from '@angular/router';
import { User, UserRole } from './security';
import { Observable } from 'rxjs';
import { ValidationService } from '../shared/validation.service';
import { forEach } from '@angular/router/src/utils/collection';
import { ComponentCanDeactivate } from '../component-can-deactivate';
import { HandleErrorService } from '../shared/handle-error.service';

@Component({
  templateUrl: './manage-user.component.html',
  styleUrls: ['./manage-user.component.css']
})
export class ManageUserComponent implements OnInit, ComponentCanDeactivate {
  entryForm: FormGroup;
  user: User;
  errorMessage: string = '';
  infoMessage: string = '';
  userId: number;
  pageTitle: string = 'New User';
  _roles: FormArray = this.fb.array([]);

  @HostListener('window:beforeunload')

  canDeactivate(): boolean {
    return !this.entryForm.dirty;
  }

  get roles(): FormArray {
    return <FormArray>this.entryForm.get('Roles');
  }

  buildRole(): FormGroup {
    return this.fb.group({
      Name: '',
      Assigned: ''
    });
  }

  addRole(role: UserRole): FormGroup {
    return this.fb.group({
      Name: role.name,
      Assigned: role.assigned
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
      UserName: ['', Validators.required],
      Password: ['', Validators.required], //, ValidationService.passwordValidator]],
      Active: '',
      FirstName: ['', Validators.required],
      LastName: ['', Validators.required],
      Email: ['', Validators.required],  // ValidationService.emailValidator]],
      Roles: this.fb.array([this.buildRole()])
    });
  }

  ngOnInit() {
    this.createFormGroup();

    let userId = +this.route.snapshot.params['id'];
    this.userId = userId;

    if (userId != 0) {
      this.entryForm.get('UserName').disable();
      this.pageTitle = 'Manage User';
    }
    else {
      this.pageTitle = 'New User';
    }

    this.secSvc.getUser(userId)
      .subscribe(
        (user: User) => this.onUserRetrieved(user),
        error => {
          this.errorMessage = this.handleErrorService.handleError(error);
        }
      );
  }

  onUserRetrieved(user: User): void {
    if (this.entryForm) {
      this.entryForm.reset();
    }
    this.user = user;

    this.entryForm.patchValue({
      UserName: user.userName,
      Password: user.password,
      FirstName: user.firstName,
      LastName: user.lastName,
      Email: user.email,
      Active: user.active
    });

    // FormArray needs to be iterated
    let roles = this.user.roles;
    var i: number;

    for (i = 0; i < roles.length; i++) {
      this._roles.push(this.addRole(Object.assign(new UserRole, roles[i])));
    }
    this.entryForm.setControl('Roles', this._roles);
  }
  /*
    updateUserRoles(roleIndex: number) {
      var roles = this.roles;
      var arrRoles = [];
      this.roles.value.forEach(roleElement => {
        if (roleElement.chkRole)
          arrRoles.push(roleElement.role);
      });
  
      this.secSvc.updateUserRoles(this.userId, arrRoles)
        .subscribe(
          res => {
            console.log(res);
          },
          err => {
            this.handleError(err);
          }
        );;
    }
  
    updateUserStatus() {
      this.secSvc.updateUserStatus(this.userId, this.entryForm.get('Active').value)
        .subscribe(
          res => {
            console.log(res);
          },
          err => {
            this.handleError(err);
          }
        );;
    }
  */
  updateUserProfile() {
    let user = Object.assign({}, this.user, this.entryForm.value);

    if (!this.entryForm.get("Roles").dirty)
      user.Roles = null;

    this.secSvc.updateUserProfile(user)
      .subscribe(
        res => {
          this.onSaveComplete(res);
        },
        error => {
          this.errorMessage = this.handleErrorService.handleError(error);
        }
      );;
  }

  onSaveComplete(userId): void {
    this.entryForm.markAsPristine();
    this.infoMessage = 'User Profile updated.'
    this.errorMessage = '';
    this.router.navigate(['/manageusers/' + userId]);
  }
}