import { Injectable } from '@angular/core';
import { Organization, FilterOrganizationsRequest, GetOrganizationsResponse } from './organizations';
import { HttpParams, HttpClient } from '@angular/common/http';
import { environment } from '../../environments/environment';
import { Observable } from 'rxjs';

@Injectable()
export class OrganizationsService {
  apiUrl: string = environment.apiUrl;

  constructor(private http: HttpClient) { }

  getOrganizations(filterOrganizationsRequest: FilterOrganizationsRequest): Observable<GetOrganizationsResponse> {
    let params = new HttpParams().append("orgType", filterOrganizationsRequest.orgType)
      .append("nameFilter", filterOrganizationsRequest.nameFilter)
      .append("typeFilter", filterOrganizationsRequest.typeFilter)
      .append("addressFilter", filterOrganizationsRequest.addressFilter)
      .append("PageSize", environment.pageSize.toString())
      .append("PageNumber", filterOrganizationsRequest.pageNumber.toString());

    return this.http.get<GetOrganizationsResponse>(this.apiUrl + 'organizations/GetOrganizations', {     
      params: params
    });
  }

  getOrganization(id: number, orgType: string): Observable<Organization> {
    let params = new HttpParams().append("orgType", orgType)
      .append("id", id.toString());
    return this.http.get<Organization>(this.apiUrl + 'organizations/GetOrganization', {     
      params: params
    });
  }

  updateOrganizationStatus(organization: Organization) {
    return (this.http.post(this.apiUrl + 'organizations/UpdateOrganizationStatus', { id: organization.id, active: organization.active }));
  }

}
