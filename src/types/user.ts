
export interface SistemaUsuario {
  id: string;
  nome: string;
  email: string;
  senha_hash?: string; // Opcional para edição
  role: 'dev' | 'admin' | 'vendedor';
  ativo: boolean;
  telefone?: string;
  data_nascimento?: string;
  endereco?: string;
  observacoes?: string;
  criado_em: string;
  atualizado_em: string;
  criado_por?: string;
}

export interface CreateUserData {
  nome: string;
  email: string;
  senha: string;
  role: 'dev' | 'admin' | 'vendedor';
  telefone?: string;
  data_nascimento?: string;
  endereco?: string;
  observacoes?: string;
}

export interface UpdateUserData {
  nome?: string;
  email?: string;
  senha?: string;
  role?: 'dev' | 'admin' | 'vendedor';
  ativo?: boolean;
  telefone?: string;
  data_nascimento?: string;
  endereco?: string;
  observacoes?: string;
}
