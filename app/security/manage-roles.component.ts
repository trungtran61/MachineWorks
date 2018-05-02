import { Component, OnInit } from '@angular/core';
import { environment } from '../../environments/environment';

import { GetListRequest, Role } from './security';
import { SecurityService } from './security.service';

@Component({
  selector: 'app-manage-roles',
  templateUrl: './manage-roles.component.html',
  styleUrls: ['./manage-roles.component.css']
})
export class ManageRolesComponent implements OnInit {  

  roles : Role[];   
  errorMessage: string;
  recordCount : number;
  currentPage: number = 1;
  pageSize: number = environment.pageSize;
  
  constructor(private secSvc: SecurityService) { }

  ngOnInit() {    
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
      },
        error => this.errorMessage = <any>error
      );
  }

}
