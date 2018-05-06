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

  users: User[];
  errorMessage: string;
  recordCount: number;
  currentPage: number = 1;
  pageSize: number = environment.pageSize;

  _listFilter: string;
  get listFilter(): string {
    return this._listFilter;
  }
  set listFilter(value: string) {
    this._listFilter = value;
    this.filterUsersList(this.listFilter);
  }

  constructor(private secSvc: SecurityService, private handleErrorService: HandleErrorService) { }

  ngOnInit() {
    this._listFilter = '';
    this.getPage(1);
  }

  filterUsersList(filterBy: string): void {
    filterBy = filterBy.toLocaleLowerCase();
    this.getPage(1);
  }

  getPage(page: number) {
    this.currentPage = page;
    let getListRequest: GetListRequest = new GetListRequest();
    getListRequest.PageNumber = page;
    getListRequest.SearchParm = this._listFilter;

    this.secSvc.getUsers(getListRequest)
      .subscribe(getUsersResponse => {
        this.users = getUsersResponse.Users;
        this.recordCount = getUsersResponse.RecordCount
      },
        error => this.errorMessage = <any>error
      );
  }

  updateUserStatus(user: User) {
    this.secSvc.updateUserStatus(user.Id, user.Active)
      .subscribe(res => { },
        error => {
          this.errorMessage = this.handleErrorService.handleError(error);
        }
      );
  }
}
