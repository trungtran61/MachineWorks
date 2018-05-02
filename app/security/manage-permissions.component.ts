import { Component, OnInit } from '@angular/core';
import { environment } from '../../environments/environment';

import { GetListRequest, Permission } from './security';
import { SecurityService } from './security.service';

@Component({
  selector: 'app-manage-permissions',
  templateUrl: './manage-permissions.component.html',
  styleUrls: ['./manage-permissions.component.css']
})
export class ManagePermissionsComponent implements OnInit {  

  permissions : Permission[];
  recordCount : number;  
  errorMessage: string;
  currentPage: number = 1;
  pageSize: number = environment.pageSize;
  
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

    this.secSvc.getPermissions(getListRequest)
      .subscribe(getPermissionsResponse => {
        this.permissions = getPermissionsResponse.Permissions;
        this.recordCount = getPermissionsResponse.RecordCount;
        console.log(this.recordCount);        
      },
        error => this.errorMessage = <any>error
      );
  }

}
