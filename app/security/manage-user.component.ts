import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, FormArray } from '@angular/forms';
import 'rxjs/add/operator/debounceTime';
import 'rxjs/add/operator/map';
import { SecurityService } from './security.service';
import { ActivatedRoute } from '@angular/router';
import { User } from './security';

@Component({
  templateUrl: './manage-user.component.html',
  styleUrls: ['./manage-user.component.css']
})
export class ManageUserComponent implements OnInit {
  entryForm: FormGroup;
  user: User;
  errorMessage: string;
  userId: number;
  pageTitle: string = 'New User';
  _roles: FormArray = this.fb.array([]);

  get roles(): FormArray {
    return <FormArray>this.entryForm.get('roles');
  }

  buildRole(): FormGroup {
    return this.fb.group({
      role: '',
      chkRole: ''
    });
  }

  addRole(role: string): FormGroup {
    return this.fb.group({
      role: role,
      chkRole: true
    });
  }

  constructor(private route: ActivatedRoute, private fb: FormBuilder, private secSvc: SecurityService) { }

  createFormGroup(): void {
    this.entryForm = this.fb.group({
      userName: '',
      active: '',
      firstName: '',
      lastName: '',
      email: '',
      roles: this.fb.array([this.buildRole()])
    });
  }

  ngOnInit() {
    this.createFormGroup();

    let userId = +this.route.snapshot.params['id'];
    this.userId = userId;

    if (userId != 0) {
      this.entryForm.get('userName').disable();
      this.pageTitle = 'Manage User';
    }
    else {
      this.pageTitle = 'New User';
    }

    this.secSvc.getUser(userId)
      .subscribe(
        (user: User) => this.onUserRetrieved(user),
        error => this.errorMessage = <any>error
      );
  }

  onUserRetrieved(user: User): void {
    if (this.entryForm) {
      this.entryForm.reset();
    }
    this.user = user;
    console.log(JSON.parse(user.Roles));
    this.entryForm.patchValue({
      userName: user.UserName,
      firstName: user.FirstName,
      lastName: user.LastName,
      active: user.Active,
      email: user.Email
    });

    let roles = JSON.parse(this.user.Roles);
    var i: number;

    for (i = 0; i < roles.length; i++) {
      this._roles.push(this.addRole(roles[i]));
    }

    this.entryForm.setControl('roles', this._roles);
  }

  setRole(roleIndex: number)
  {
    console.log(this.userId);
    var roles = this.entryForm.get('roles') as FormArray;
    var item = roles.at(roleIndex) as FormGroup;
    //console.log(roles);
    //console.log(item.controls.role.value);
    
    this.secSvc.setUserRole(this.userId, roles.value)
    .subscribe(
      (user: User) => this.onUserRetrieved(user),
      error => this.errorMessage = <any>error
    );    
  }
}