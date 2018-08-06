import { Component, OnInit } from '@angular/core';
import { environment } from '../../environments/environment';

import { GetListRequest, Permission } from './security';
import { SecurityService } from './security.service';
import { BsModalService } from 'ngx-bootstrap/modal';
import { EditPermissionComponent } from './edit-permission.component';
import { ModalDataService } from '../shared/modal-data.service';
import { HandleErrorService } from '../shared/handle-error.service';
import { CommunicationService } from '../shared/communication.service';

@Component({
  selector: 'app-manage-permissions',
  templateUrl: './manage-permissions.component.html',
  styleUrls: ['./manage-permissions.component.css']
})
export class ManagePermissionsComponent implements OnInit {

  permissions: Permission[];
  recordCount: number;
  errorMessage: string;
  currentPage: number = 1;
  pageSize: number = environment.pageSize;

  constructor(private secSvc: SecurityService,
    private modalService: BsModalService,
    private modalDataService: ModalDataService,
    private handleErrorService: HandleErrorService,
    private communicationService: CommunicationService) { }

  ngOnInit() {
    this.communicationService.changeEmitted$.subscribe(data => {
      this.getPage(1);
    })
    let getListRequest: GetListRequest = new GetListRequest();
    this.getPage(1);
  }

  getPage(page: number) {
    this.currentPage = page;
    let getListRequest: GetListRequest = new GetListRequest();
    getListRequest.pageNumber = page;

    this.secSvc.getPermissions(getListRequest)
      .subscribe(getPermissionsResponse => {
        this.permissions = getPermissionsResponse.permissions;
        this.recordCount = getPermissionsResponse.recordCount;
      },
        error => {
          this.errorMessage = this.handleErrorService.handleError(error);
        }
      );
  }

  openEditPermission(id: number) {
    this.modalDataService.data = id;
    const modal = this.modalService.show(EditPermissionComponent, { 'class': 'modal-dialog-primary' });
  }

  updatePermissionStatus(permission: Permission) {
    this.secSvc.updatePermissionStatus(permission)
      .subscribe(res => { },
        error => {
          this.errorMessage = this.handleErrorService.handleError(error);
        }
      );
  }
}
