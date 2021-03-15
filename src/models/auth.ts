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
  avatar_url: string;
}

export interface AuthContextData {
  user: User;
  loading: boolean;
  signIn(credentials: AuthCredentials): Promise<void>;
  signOut(): void;
  updateUser(user: User): void;
}
