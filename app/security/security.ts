export class User {
    id: number;
    userName: string;
    password: string;
    firstName: string;
    lastName: string;
    email: string;
    dateCreated?: string;
    active: boolean;
    roles: UserRole[];
    permissions: string;
}

export class UserClaim {
    claimId: string='';
    userId: string='';
    claimType: string='';
    claimValue: string='';    
}

export class UserAuthRequest {
    userName: string;
    password: string;
}

export class SecurityUserAuth {
    id: number;
    userName: string = "";
    bearerToken: string = "";
    firstName: string = "";
    email: string = "";
    isAuthenticated: boolean = false;
    permissions: String[];
    claims: UserClaim[] = [];   
}

export class Role {
    id: number;
    name: string;
    displayName: string;
    active: boolean;
    permissions: RolePermission[];
}

export class GetUsersResponse {
    recordCount: number;
    users: User[];
}

export class GetRolesResponse {
    recordCount: number;
    roles: Role[];
}

export class GetPermissionsResponse {
    recordCount: number;
    permissions: Permission[];
}

export class UserRole {
    name: string;
    assigned: boolean;
}

export class Permission {
    id: number;
    name: string;
    displayName: string;
    active: boolean;
}

export class RolePermission {
    name: string;
    assigned: boolean;
}

export class GetListRequest {
    searchParm?: string = '';
    sortColumn?: string = '';
    sortDirection?: string = 'ASC';
    activeOnly?: number = 0;
    pageSize?: number = 50;
    pageNumber?: number = 1;
}