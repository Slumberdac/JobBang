export interface User extends UserLogin {
  firstName: string;
  lastName: string;
}

export interface UserLogin {
  email: string;
  password: string;
}
