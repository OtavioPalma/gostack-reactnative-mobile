export interface AuthCredentials {
  email: string;
  password: string;
}

export interface AuthState {
  token: string;
  user: User;
}

export interface User {
  id: string;
  name: string;
  email: string;
  avatar: string;
}

export interface AuthContextData {
  user: User;
  signIn(credentials: AuthCredentials): Promise<void>;
  signOut(): void;
}
