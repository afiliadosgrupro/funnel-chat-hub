
export interface User {
  id: string;
  email: string;
  name: string;
  role: 'dev' | 'admin' | 'vendedor';
  avatar?: string;
}

export interface AuthState {
  isAuthenticated: boolean;
  user: User | null;
  loading: boolean;
  error: string | null;
}

export interface ConviteRegistro {
  id: string;
  email: string;
  role: 'dev' | 'admin' | 'vendedor';
  token: string;
  usado: boolean;
  expira_em: string;
  criado_em: string;
}
