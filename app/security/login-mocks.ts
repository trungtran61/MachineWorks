import { SecurityUserAuth } from "./security-user-auth";

export const LOGIN_MOCKS: SecurityUserAuth[] = [
  {
    userId: 1,
    userName: "tienphan",
    bearerToken: "abi393kdkd9393ikd",
    firstName: "Tien",
    lastName: "Phan",
    email: "trungtran61@gmail.com",
    isAuthenticated: true,
    canAccessAdmin: true,
    canAccessToolInventory: true        
  },
  {
    userId: 2,
    userName: "trungtran",
    bearerToken: "sd9f923k3kdmcjkhd",
    firstName: "Trung",
    lastName: "Tran",
    email: "trungtran61@gmail.com",
    isAuthenticated: true,
    canAccessAdmin: false,
    canAccessToolInventory: true    
  },
  {
    userId: 3,
    userName: "kelvinsilakhom",
    bearerToken: "sd9f923k3kdmcjkxd",
    firstName: "Kelvin",
    lastName: "Silakhom",
    email: "trungtran61@gmail.com",
    isAuthenticated: true,
    canAccessAdmin: false,
    canAccessToolInventory: true    
  }
];
