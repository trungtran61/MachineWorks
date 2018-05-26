import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { PaginationModule } from 'ngx-bootstrap/pagination';

import { ManageOrganizationsComponent } from './manage-organizations.component';
import { OrganizationsService } from './organizations.service';
import { AuthGuardService } from '../security/auth-guard.service';
import { PendingChangesGuard } from '../pending-changes-guard';
import { RouterModule } from '@angular/router';

const routes = [ 
  { path: 'manageorganizations/:id', component: ManageOrganizationsComponent, canActivate: [AuthGuardService],canDeactivate: [PendingChangesGuard] },
  { path: 'manageorganizations/customers', component: ManageOrganizationsComponent, canActivate: [AuthGuardService] },  
  { path: 'manageorganizations/manufacturers', component: ManageOrganizationsComponent, canActivate: [AuthGuardService] },  
  { path: 'manageorganizations/vendors', component: ManageOrganizationsComponent, canActivate: [AuthGuardService] }  
];

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    PaginationModule,
    RouterModule.forChild(routes),   
  ],
  declarations: [
    ManageOrganizationsComponent
  ],
  providers: [
    OrganizationsService
  ]
})
export class OrganizationsModule { }
