export class User
{
    ID: number;
    UserName: string;
    FirstName: string;
    LastName: string;
    Email: string;
    DateCreated?: string;
    Active: string;
}

export class Role
{
    ID: number;
    Name: string;
    DisplayName: string;
    Active: string;
}

export class Permission
{
    ID: number;
    Name: string;
    DisplayName: string;
    Active: string;
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