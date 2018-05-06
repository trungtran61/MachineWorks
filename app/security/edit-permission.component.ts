import { Component, OnInit, Input } from '@angular/core';
import { Permission } from './security';
import { BsModalRef } from 'ngx-bootstrap/modal';
import { SecurityService } from './security.service';
import { ModalDataService } from '../shared/modal-data.service';
import { Observable } from 'rxjs/Observable';
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
    this.permission.Name = '';
    this.permission.DisplayName = '';
    this.permission.Active = true;
  }

  onSomething() {
    this.communicationService.emitChange({proprty: 'value'});
}

  onPermissionRetrieved(permission: Permission) {
    this.permission = Object.assign(new Permission, permission);
  }

  updatePermission() {

    this.secSvc.updatePermission(Object.assign({}, this.permission))
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
    this.bsModalRef.hide();
    this.router.navigate(['/managepermissions']);
  }
}