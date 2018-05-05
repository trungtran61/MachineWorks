import { Component, OnInit } from '@angular/core';
import { GetListRequest, User } from './security';
import { SecurityService } from './security.service';
import { environment } from '../../environments/environment';
import { HandleErrorService } from '../shared/handle-error.service';

@Component({
  selector: 'app-manage-users',
  templateUrl: './manage-users.component.html',
  styleUrls: ['./manage-users.component.css']
})
export class ManageUsersComponent implements OnInit {  

  users : User[];
  errorMessage: string;
  recordCount : number; 
  currentPage: number = 1;
  pageSize: number = environment.pageSize;
  
  constructor(private secSvc: SecurityService, private handleErrorService: HandleErrorService) { }

  ngOnInit() {    
    this.getPage(1);    
  }

  getPage(page: number)
  {
    this.currentPage = page;
    let getListRequest: GetListRequest = new GetListRequest();
    getListRequest.PageNumber = page;

    this.secSvc.getUsers(getListRequest)
      .subscribe(getUsersResponse => {
        this.users = getUsersResponse.Users;
        this.recordCount = getUsersResponse.RecordCount        
      },
        error => this.errorMessage = <any>error
      );
  }

  updateUserStatus(user: User)
  {      
    this.secSvc.updateUserStatus(user.Id, user.Active)
      .subscribe(res => {},             
        error => {
          this.errorMessage = this.handleErrorService.handleError(error);
        }
      );
  }
}
