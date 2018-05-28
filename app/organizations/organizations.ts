export class Organization {
    orgtype: string;
    id: number;
    type: string;
    name: string;
    address: string;
    phone: string;
    fax: string;
    mobile: string;
    tollfree: string;
    email: string;
    website: string;
    active: boolean;        
}

export class FilterOrganizationsRequest {
    type: string;
    orgType: OrganizationType;
    nameFilter?: string = '';
    typeFilter?: string = '';
    addressFilter?: string = '';
    sortColumn?: string = '';
    sortDirection?: string = 'ASC';
    activeOnly?: number = 0;
    pageSize?: number = 50;
    pageNumber?: number = 1;
}

export class GetOrganizationsResponse {
    recordCount: number;
    organizations: Organization[];
}

export enum OrganizationType {
    customer = 'customer',
    manufacturer= 'manufacturer',
    vendor = 'manufacturer'
}