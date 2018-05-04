import { Component, OnInit, Input } from '@angular/core';
import { Permission } from './security';
import { BsModalRef } from 'ngx-bootstrap/modal';
import { SecurityService } from './security.service';
import { ModalDataService } from '../shared/modal-data.service';
import { Observable } from 'rxjs/Observable';

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
    private modalDataService: ModalDataService) { }

  ngOnInit() {

    this.permissionId = this.modalDataService.data;
    console.log(this.permissionId);

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
            console.log(error);
            this.errorMessage = <any>error;
          }
        );
    }
  }

  initializePermission(): void {
    this.permission.Name = '';
    this.permission.DisplayName = '';
    this.permission.Active = true;
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
        err => {
          this.handleError(err);
        }
      );;
  }

  closeModal() {
    this.bsModalRef.hide();
  }

  onSaveComplete(permissionId): void {
    this.infoMessage = this.permissionId == 0 ? 'Permission added.' : 'Permission updated.';
    this.errorMessage = '';
  }

  private handleError(error: Response): Observable<any> {
    this.errorMessage = error.statusText;
    return Observable.throw(error || 'Server error');
  }
}