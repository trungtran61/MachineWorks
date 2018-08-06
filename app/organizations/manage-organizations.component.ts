import { Component, OnInit } from '@angular/core';
import { Organization, FilterOrganizationsRequest, OrganizationType } from './organizations';
import { environment } from '../../environments/environment';
import { HandleErrorService } from '../shared/handle-error.service';
import { OrganizationsService } from './organizations.service';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-manage-organizations',
  templateUrl: './manage-organizations.component.html',
  styleUrls: ['./manage-organizations.component.css']
})
export class ManageOrganizationsComponent implements OnInit {
  organizations: Organization[];
  errorMessage: string;
  recordCount: number;
  currentPage: number = 1;
  pageSize: number = environment.pageSize;
  orgType: OrganizationType;

  _nameFilter: string;
  get nameFilter(): string {
    return this._nameFilter;
  }
  set nameFilter(value: string) {
    this._nameFilter = value;
    this.filterOrganizationsList();
  }

  _addressFilter: string;
  get addressFilter(): string {
    return this._addressFilter;
  }
  set addressFilter(value: string) {
    this._addressFilter = value;
    this.filterOrganizationsList();
  }

  _typeFilter: string;
  get typeFilter(): string {
    return this._typeFilter;
  }
  set typeFilter(value: string) {
    this._typeFilter = value;
    this.filterOrganizationsList();
  }

  constructor(private route: ActivatedRoute, private organizationsService: OrganizationsService, private handleErrorService: HandleErrorService) {
    this.route.url.subscribe(params => {
      this.orgType == OrganizationType[params[0].path];
    });
  }

  ngOnInit() {
    this._nameFilter = '';
    this._typeFilter = '';
    this._addressFilter = '';
    this.getPage(1);
  }

  filterOrganizationsList(): void {
    this.getPage(1);
  }

  getPage(page: number) {
    this.currentPage = page;
    let filterOrganizationsRequest: FilterOrganizationsRequest = new FilterOrganizationsRequest();
    filterOrganizationsRequest.orgType = this.orgType;
    filterOrganizationsRequest.pageNumber = page;
    filterOrganizationsRequest.nameFilter = this._nameFilter.toLocaleLowerCase();
    filterOrganizationsRequest.typeFilter = this._typeFilter.toLocaleLowerCase();
    filterOrganizationsRequest.addressFilter = this._addressFilter.toLocaleLowerCase();

    this.organizationsService.getOrganizations(filterOrganizationsRequest)
      .subscribe(getOrganizationsResponse => {
        this.organizations = getOrganizationsResponse.organizations;
        this.recordCount = getOrganizationsResponse.recordCount
      },
        error => this.errorMessage = <any>error
      );
  }

  updateOrganizationStatus(organization: Organization) {
    this.organizationsService.updateOrganizationStatus(organization)
      .subscribe(res => { },
        error => {
          this.errorMessage = this.handleErrorService.handleError(error);
        }
      );
  }
}
