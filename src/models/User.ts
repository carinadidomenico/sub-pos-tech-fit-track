export interface User {
  id: string;
  name: string;
  email: string;
  password: string;
}

export type UserInput = Pick<User, 'name' | 'email' | 'password'>;

export interface AuthSession {
  userId: string;
  name: string;
  email: string;
}

export interface LoginCredentials {
  email: string;
  password: string;
}

export interface SignUpCredentials extends LoginCredentials {
  name: string;
}
