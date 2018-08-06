import { Component, OnInit } from '@angular/core';
import { environment } from '../../environments/environment';

import { GetListRequest, Role } from './security';
import { SecurityService } from './security.service';
import { HandleErrorService } from '../shared/handle-error.service';

@Component({
  selector: 'app-manage-roles',
  templateUrl: './manage-roles.component.html',
  styleUrls: ['./manage-roles.component.css']
})
export class ManageRolesComponent implements OnInit {

  roles: Role[];
  errorMessage: string;
  recordCount: number;
  currentPage: number = 1;
  pageSize: number = environment.pageSize;

  constructor(private secSvc: SecurityService,
    private handleErrorService: HandleErrorService) { }

  ngOnInit() {
    this.getPage(1);
  }

  getPage(page: number) {
    this.currentPage = page;
    let getListRequest: GetListRequest = new GetListRequest();
    getListRequest.pageNumber = page;

    this.secSvc.getRoles(getListRequest)
      .subscribe(getRolesResponse => {
        this.roles = getRolesResponse.roles;
        this.recordCount = getRolesResponse.recordCount
      },
        error => {
          this.errorMessage = this.handleErrorService.handleError(error);
        }
      );
  }

  updateRoleStatus(role: Role) {
    this.secSvc.updateRoleStatus(role)
      .subscribe(res => { },
        error => {
          this.errorMessage = this.handleErrorService.handleError(error);
        }
      );
  }
}


