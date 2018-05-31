import { Component, OnInit, Input } from '@angular/core';
import { Permission } from './security';
import { BsModalRef } from 'ngx-bootstrap/modal';
import { SecurityService } from './security.service';
import { ModalDataService } from '../shared/modal-data.service';
import { Observable } from 'rxjs';
import { Route, Router } from '@angular/router';
import { HandleErrorService } from '../shared/handle-error.service';
import { CommunicationService } from '../shared/communication.service';

@Component({
  selector: 'app-edit-permission',
  templateUrl: './edit-permission.component.html',
  styleUrls: ['./edit-permission.component.css']
})
export class EditPermissionComponent implements OnInit {
  permissionId: number;
  permission: Permission = new Permission();
  pageTitle: string = '';
  errorMessage: string = '';
  infoMessage: string = '';

  constructor(private bsModalRef: BsModalRef,
    private secSvc: SecurityService,
    private modalDataService: ModalDataService,
    private router: Router,
    private handleErrorService: HandleErrorService,
    private communicationService: CommunicationService) { }

  ngOnInit() {

    this.permissionId = this.modalDataService.data;
console.log(this.permissionId );

    if (this.permissionId == 0) {
      this.pageTitle = 'New Permission';
      this.initializePermission();
    }
    else {
      this.pageTitle = 'Edit Permission';
      this.secSvc.getPermission(this.permissionId)
        .subscribe(
          (permission: Permission) => this.onPermissionRetrieved(permission),
          error => {
            this.errorMessage = this.handleErrorService.handleError(error);
          }
        );
    }
  }

  initializePermission(): void {
    this.permission.name = '';
    this.permission.displayName = '';
    this.permission.active = true;
  }
  
  onPermissionRetrieved(permission: Permission) {    
    this.permission = Object.assign(new Permission, permission);   
  }

  updatePermission() {

    this.secSvc.updatePermission(this.permission)
      .subscribe(
        res => {
          this.onSaveComplete(res);
        },
        error => {
          this.errorMessage = this.handleErrorService.handleError(error);
        }
      );;
  }

  closeModal() {
    this.bsModalRef.hide();
    this.router.navigate(['/managepermissions']);
  }

  onSaveComplete(permissionId): void {
    this.communicationService.emitChange({property: 'value'});  // update parent permissions list
    this.bsModalRef.hide();
    this.router.navigate(['/managepermissions']);
  }
}