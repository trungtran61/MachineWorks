export class User
{
    Id: number;
    UserName: string;
    FirstName: string;
    LastName: string;
    Email: string;
    DateCreated?: string;
    Active: boolean;
    Roles: string;
    Permissions: string;
}

export class Role
{
    Id: number;
    Name: string;
    DisplayName: string;
    Active: boolean;
}

export class UserRole
{
    Name: string;
    Assigned: boolean;
}

export class Permission
{
    Id: number;
    Name: string;
    DisplayName: string;
    Active: boolean;
}

export class GetListRequest
{
    SearchParm?: string = '';
    SortColumn?: string = '';
    SortDirection?: string = 'ASC';
    ActiveOnly?: number = 0;
    PageSize?: number = 50;
    PageNumber?: number = 1;
}