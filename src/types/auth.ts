
export interface User {
  id: string;
  email: string;
  name: string;
  role: 'admin' | 'seller';
  avatar?: string;
}

export interface AuthState {
  isAuthenticated: boolean;
  user: User | null;
  loading: boolean;
  error: string | null;
}
