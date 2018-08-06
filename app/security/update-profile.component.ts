
import {throwError as observableThrowError,  Observable } from 'rxjs';
import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, FormArray, Validators } from '@angular/forms';


import { SecurityService } from './security.service';
import { ActivatedRoute, Router } from '@angular/router';
import { User, UserRole, SecurityUserAuth } from './security';
import { ValidationService } from '../shared/validation.service';
import { forEach } from '@angular/router/src/utils/collection';
import { Response } from '@angular/http';

@Component({
  templateUrl: './update-profile.component.html',
  styleUrls: ['./update-profile.component.css']
})

export class UpdateProfileComponent implements OnInit {
  entryForm: FormGroup;
  user: User;
  errorMessage: string = '';
  securityObject: SecurityUserAuth = null;
  
  constructor(private route: ActivatedRoute,
    private router: Router,
    private fb: FormBuilder,
    private secSvc: SecurityService) {
  }

  createFormGroup(): void {
    this.entryForm = this.fb.group({
      UserName: '',
      Password: ['', Validators.required], //, ValidationService.passwordValidator]],
      FirstName: ['', Validators.required],
      LastName: ['', Validators.required],
      Email: ['', Validators.required],  // ValidationService.emailValidator]],
    });
  }
  
  ngOnInit() {
    this.createFormGroup();
    this.entryForm.get('UserName').disable();
    this.securityObject = this.secSvc.getSecurityObject();   
    this.secSvc.getUser(this.securityObject.id)
      .subscribe(
        (user: User) => this.onUserRetrieved(user),
        error => {
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

    this.entryForm.patchValue({
      UserName: user.userName,
      Password: user.password,
      FirstName: user.firstName,
      LastName: user.lastName,
      Email: user.email
    });  
    
  }

  updateUserProfile() {
    let user = Object.assign({}, this.user, this.entryForm.value);
    
    this.secSvc.updateUserProfile(user)
      .subscribe(
        res => {
          this.onSaveComplete();
        },
        err => {
          this.handleError(err);
        }
      );;
  }

  onSaveComplete(): void {
    this.entryForm.markAsPristine();
    this.errorMessage = 'User Profile updated.'    
  }

  private handleError(error: Response): Observable<any> {
    console.error(error);
    return observableThrowError(error || 'Server error');
  }
}