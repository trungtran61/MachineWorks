import { Component, OnInit } from '@angular/core';
import { GetListRequest, User } from './security';
import { SecurityService } from './security.service';

@Component({
  selector: 'app-manage-users',
  templateUrl: './manage-users.component.html',
  styleUrls: ['./manage-users.component.css']
})
export class ManageUsersComponent implements OnInit {  

  users : User[];
  errorMessage: string;
  
  constructor(private secSvc: SecurityService) { }

  ngOnInit() {    
    this.secSvc.getUsers(new GetListRequest())
      .subscribe(users => this.users = users,
        error => this.errorMessage = <any>error
      );
  }

}
