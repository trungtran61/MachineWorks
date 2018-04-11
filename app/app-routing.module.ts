import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { DashboardComponent } from './dashboard/dashboard.component';
import { SearchToolinventoryComponent } from './toolinventory/search-toolinventory.component';

const routes: Routes = [
  {
    path: 'dashboard', 
    component: DashboardComponent
  },
  { 
    path: 'searchtoolinventory', 
    component: SearchToolinventoryComponent
  },
  {
    path: '', redirectTo: 'dashboard', pathMatch: 'full'
  },
  {
    path: '**', component: DashboardComponent
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
