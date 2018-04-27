import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder } from '@angular/forms';
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

  constructor(private route: ActivatedRoute, private fb: FormBuilder, private secSvc: SecurityService) { }

  createFormGroup(): void {
    this.entryForm = this.fb.group({
      pageTitle: 'New User',
      userName: '',
      active: '',
      firstName: '',
      lastName: '',
      email: '',
      address: '',
    });
   
    this.entryForm.get('pageTitle').disable();
  }

  ngOnInit() {
    this.createFormGroup();

    let userId = +this.route.snapshot.params['id'];
    this.userId = userId;
    
    if (userId != 0)
    {
      this.entryForm.get('userName').disable() ;     
      this.entryForm.get('pageTitle').setValue('Manage User');

      this.secSvc.getUser(userId)
        .subscribe(user => {
          //this.user = user;
          this.entryForm.patchValue({
            userName: user.UserName,
            firstName: user.FirstName,
            lastName: user.LastName,
            active: user.Active,
            email: user.Email   
          });          
        },
          error => this.errorMessage = <any>error
        );
      }
    else
    {
      this.entryForm.get('pageTitle').setValue('New User');
    }
  }
}