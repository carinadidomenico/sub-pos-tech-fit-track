/** Usuário cadastrado localmente (app interno — sem backend). */
export interface User {
  id: string;
  name: string;
  email: string;
  /** Senha em texto — apenas para demo local, não usar em produção. */
  password: string;
}

export type UserInput = Pick<User, 'name' | 'email' | 'password'>;

/** Sessão ativa persistida no dispositivo. */
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
  confirmPassword: string;
}
