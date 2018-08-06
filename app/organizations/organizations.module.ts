import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { PaginationModule } from 'ngx-bootstrap/pagination';

import { ManageOrganizationsComponent } from './manage-organizations.component';
import { OrganizationsService } from './organizations.service';
import { AuthGuardService } from '../security/auth-guard.service';
import { PendingChangesGuard } from '../pending-changes-guard';
import { RouterModule } from '@angular/router';
import { ManageOrganizationComponent } from './manage-organization.component';

const routes = [   
  { path: 'manageorganizations',
  children: [
      { path: 'customers', component: ManageOrganizationsComponent, canActivate: [AuthGuardService] },  
      { path: 'customers:id', component: ManageOrganizationComponent, canActivate: [AuthGuardService] },        
      { path: 'manufacturers', component: ManageOrganizationsComponent, canActivate: [AuthGuardService] },  
      { path: 'manufacturers:id', component: ManageOrganizationComponent, canActivate: [AuthGuardService] },        
      { path: 'vendors', component: ManageOrganizationsComponent, canActivate: [AuthGuardService] },  
      { path: 'vendors:id', component: ManageOrganizationComponent, canActivate: [AuthGuardService] },        
  ] }  
];

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    PaginationModule,
    RouterModule.forChild(routes),   
  ],
  declarations: [
    ManageOrganizationsComponent,
    ManageOrganizationComponent
  ],
  providers: [
    OrganizationsService
  ]
})
export class OrganizationsModule { }
