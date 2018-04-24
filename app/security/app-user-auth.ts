export class AppUserAuth {
  userName: string = "";
  bearerToken: string = "";
  firstName: string = "";
  lastName: string = "";
  email: string = "";
  isAuthenticated: boolean = false;
  canAccessAdmin: boolean = false;
  canAccessToolInventory: boolean = false;  
}
