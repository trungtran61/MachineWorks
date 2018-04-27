import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { ChangePasswordComponent } from './change-password.component';
import { AuthGuardService } from './auth-guard.service';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { ManageUsersComponent } from './manage-users.component';
import { ManageRolesComponent } from './manage-roles.component';
import { ManagePermissionsComponent } from './manage-permissions.component';
import { ManageUserComponent } from './manage-user.component';
import { ManageRoleComponent } from './manage-role.component';
import { ManagePermissionComponent } from './manage-permission.component';
import { IconsModule } from '../icons/icons.module';

const routes = [
  {
    path: 'changepassword',
    component: ChangePasswordComponent,
    canActivate: [AuthGuardService]
  },
  { path: 'manageusers', component: ManageUsersComponent, canActivate: [AuthGuardService] },
  { path: 'manageusers/:id', component: ManageUserComponent, canActivate: [AuthGuardService] },
  { path: 'manageroles', component: ManageRolesComponent, canActivate: [AuthGuardService] },
  { path: 'manageroles/:id', component: ManageRoleComponent, canActivate: [AuthGuardService] },
  { path: 'managepermissions', component: ManagePermissionsComponent, canActivate: [AuthGuardService] },
  { path: 'managepermissions/:id', component: ManagePermissionComponent, canActivate: [AuthGuardService] }
];

@NgModule({
  imports: [
    CommonModule,
    FormsModule, ReactiveFormsModule,
    RouterModule.forChild(routes),
    IconsModule
  ],
  declarations: [
    ChangePasswordComponent,
    ManageUsersComponent,
    ManageRolesComponent,
    ManagePermissionsComponent,
    ManageUserComponent,
    ManageRoleComponent,
    ManagePermissionComponent
  ]
})
export class SecurityModule { }
