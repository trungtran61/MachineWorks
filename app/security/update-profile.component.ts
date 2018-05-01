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
import { SecurityUserAuth } from './security-user-auth';

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
    this.secSvc.getUser(this.securityObject.userId)
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
      UserName: user.UserName,
      Password: user.Password,
      FirstName: user.FirstName,
      LastName: user.LastName,
      Email: user.Email
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
    return Observable.throw(error || 'Server error');
  }
}