import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { ChangePasswordComponent } from './change-password.component';
import { AuthGuardService } from './auth-guard.service';
import { ManageUsersComponent } from './manage-users.component';
import { ManageRolesComponent } from './manage-roles.component';
import { ManagePermissionsComponent } from './manage-permissions.component';

const routes = [
  { 
    path: 'changepassword', 
    component: ChangePasswordComponent,
    canActivate: [AuthGuardService]
  },
  { 
    path: 'manageusers', 
    component: ManageUsersComponent,
    canActivate: [AuthGuardService]
  },
  { 
    path: 'manageroles', 
    component: ManageRolesComponent,
    canActivate: [AuthGuardService]
  },    
  { 
    path: 'managepermissions', 
    component: ManagePermissionsComponent,
    canActivate: [AuthGuardService]
  }      
];

@NgModule({
  imports: [
    CommonModule,
    RouterModule.forChild(routes)    
  ],
  declarations: [
    ChangePasswordComponent,
    ManageUsersComponent,
    ManageRolesComponent,
    ManagePermissionsComponent
  ]
})
export class SecurityModule { }
