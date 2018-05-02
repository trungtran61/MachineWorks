import { Component, OnInit } from '@angular/core';

import { GetListRequest, User, Role } from './security';
import { SecurityService } from './security.service';

@Component({
  selector: 'app-manage-roles',
  templateUrl: './manage-roles.component.html',
  styleUrls: ['./manage-roles.component.css']
})
export class ManageRolesComponent implements OnInit {  

  roles : Role[];
  recordCount : number;
  errorMessage: string;
  currentPage: number = 1;
  
  constructor(private secSvc: SecurityService) { }

  ngOnInit() {    
    let getListRequest: GetListRequest = new GetListRequest();
    this.getPage(1);
  }

  getPage(page: number)
  {
    this.currentPage = page;
    let getListRequest: GetListRequest = new GetListRequest();
    getListRequest.PageNumber = page;

    this.secSvc.getRoles(getListRequest)
      .subscribe(getRolesResponse => {
        this.roles = getRolesResponse.Roles;
        this.recordCount = getRolesResponse.RecordCount
        console.log(getRolesResponse);
      },
        error => this.errorMessage = <any>error
      );
  }

}
