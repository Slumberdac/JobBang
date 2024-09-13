export interface User extends UserLogin {
  firstName: string;
  lastName: string;
  isCandidate: boolean;
}

export interface UserLogin {
  email: string;
  password: string;
}
