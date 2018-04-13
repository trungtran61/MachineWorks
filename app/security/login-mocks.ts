import { AppUserAuth } from "./app-user-auth";

export const LOGIN_MOCKS: AppUserAuth[] = [
  {
    userName: "tienphan",
    bearerToken: "abi393kdkd9393ikd",
    isAuthenticated: true,
    canAccessAdmin: true,
    canAccessToolInventory: true        
  },
  {
    userName: "trungtran",
    bearerToken: "sd9f923k3kdmcjkhd",
    isAuthenticated: true,
    canAccessAdmin: false,
    canAccessToolInventory: true    
  },
  {
    userName: "kelvinsilakhom",
    bearerToken: "sd9f923k3kdmcjkxd",
    isAuthenticated: true,
    canAccessAdmin: false,
    canAccessToolInventory: true    
  }
];
