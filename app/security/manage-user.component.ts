import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, FormArray, Validators } from '@angular/forms';
import 'rxjs/add/operator/debounceTime';
import 'rxjs/add/operator/map';
import { SecurityService } from './security.service';
import { ActivatedRoute, Router } from '@angular/router';
import { User, UserRole } from './security';
import { Observable } from 'rxjs/Observable';
import { ValidationService } from '../shared/validation.service';
import { forEach } from '@angular/router/src/utils/collection';

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

  addRole(role: UserRole): FormGroup {
    return this.fb.group({
      role: role.Name,
      chkRole: role.Assigned
    });
  }

  constructor(private route: ActivatedRoute,
    private router: Router,
    private fb: FormBuilder,
    private secSvc: SecurityService) {     
    }

  createFormGroup(): void {
    /*
    this.entryForm = this.fb.group({
      UserName:  ['', Validators.required],
      Password: ['', [Validators.required, ValidationService.passwordValidator]],
      Active: '',
      FirstName:  ['', Validators.required],
      LastName:  ['', Validators.required],
      Email: ['', [Validators.required, ValidationService.emailValidator]],
      roles: this.fb.array([this.buildRole()])
    });
    */
   this.entryForm = this.fb.group({
    UserName:  '',
    Password: '',
    Active: '',
    FirstName:  '',
    LastName: '',
    Email: '',
    roles: this.fb.array([this.buildRole()])
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
        error => 
        {
          console.log(error);
          this.errorMessage = <any>error;
        }
      );
  }

  onUserRetrieved(user: User): void {
    if (this.entryForm) {
      this.entryForm.reset();
    }
    this.user = user;
    console.log(user);

    this.entryForm.patchValue({
      UserName: user.UserName,
      FirstName: user.FirstName,
      LastName: user.LastName,
      Email: user.Email,
      Active: user.Active
    });    

    let roles = this.user.Roles;
    //let roles = this.user.Roles;
    console.log(roles);    
    var i: number;    

    for (i = 0; i < roles.length; i++) {
      console.log(roles[i]);
      this._roles.push(this.addRole(Object.assign(new UserRole,roles[i])));
    }

    this.entryForm.setControl('roles', this._roles);
  }

  updateUserRoles(roleIndex: number) {
    //console.log(this.userId);
    //var roles = this.entryForm.get('roles') as FormArray;
    var roles = this.roles;
    var arrRoles = [];
    this.roles.value.forEach(roleElement => {
      if (roleElement.chkRole)
         arrRoles.push(roleElement.role);
    });  
  
    //console.log(item.controls.role.value);
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

  updateUserProfile() {    
    let user = Object.assign({}, this.user, this.entryForm.value);    
    this.secSvc.updateUserProfile(user)
    .subscribe(
      res => {
        console.log(res);
      },
      err => {
        this.handleError(err);
      }
    );;     
  }

  onSaveComplete(): void {
    // Reset the form to clear the flags
    this.entryForm.reset();
    this.router.navigate(['/users']);
  }

  private handleError(error: Response): Observable<any> {
    console.error(error);
    return Observable.throw(error || 'Server error');
  }
}