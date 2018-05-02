export class User {
    Id: number;
    UserName: string;
    Password: string;
    FirstName: string;
    LastName: string;
    Email: string;
    DateCreated?: string;
    Active: boolean;
    Roles: UserRole[];
    Permissions: string;
}

export class Role {
    Id: number;
    Name: string;
    DisplayName: string;
    Active: boolean;
}

export class GetUsersResponse {
    RecordCount: number;
    Users: User[];
}

export class GetRolesResponse {
    RecordCount: number;
    Roles: Role[];
}

export class GetPermissionsResponse {
    RecordCount: number;
    Permissions: Permission[];
}

export class UserRole {
    Name: string;
    Assigned: boolean;
}

export class Permission {
    Id: number;
    Name: string;
    DisplayName: string;
    Active: boolean;
}

export class GetListRequest {
    SearchParm?: string = '';
    SortColumn?: string = '';
    SortDirection?: string = 'ASC';
    ActiveOnly?: number = 0;
    PageSize?: number = 50;
    PageNumber?: number = 1;
}