import { Component, OnInit } from '@angular/core';
import { Organization } from './organizations';
import { OrganizationsService } from './organizations.service';
import { HandleErrorService } from '../shared/handle-error.service';

@Component({
  selector: 'app-manage-organization',
  templateUrl: './manage-organization.component.html',
  styleUrls: ['./manage-organization.component.css']
})
export class ManageOrganizationComponent implements OnInit {

  private errorMessage: string;

  constructor(private organizationsService: OrganizationsService,
    private handleErrorService: HandleErrorService) { }

  ngOnInit() {
  }

  getOrganization(id: number, orgType: string) {
    this.organizationsService.getOrganization(id, orgType)
      .subscribe(res => { },
        error => {
          this.errorMessage = this.handleErrorService.handleError(error);
        }
      );
  }
}
