
import { supabase } from '@/integrations/supabase/client';
import { SistemaUsuario, CreateUserData, UpdateUserData } from '@/types/user';

export const userManagementService = {
  async getAllUsers(): Promise<SistemaUsuario[]> {
    const { data, error } = await supabase
      .from('sistema_usuarios')
      .select('*')
      .order('criado_em', { ascending: false });

    if (error) {
      console.error('Erro ao buscar usuários:', error);
      throw new Error('Falha ao carregar usuários');
    }

    return data || [];
  },

  async createUser(userData: CreateUserData, createdBy: string): Promise<SistemaUsuario> {
    // Verificar se email já existe
    const { data: existingUser } = await supabase
      .from('sistema_usuarios')
      .select('email')
      .eq('email', userData.email.toLowerCase())
      .single();

    if (existingUser) {
      throw new Error('Email já está em uso');
    }

    const { data, error } = await supabase
      .from('sistema_usuarios')
      .insert({
        nome: userData.nome,
        email: userData.email.toLowerCase(),
        senha_hash: userData.senha, // O trigger aplicará o hash
        role: userData.role,
        telefone: userData.telefone,
        data_nascimento: userData.data_nascimento,
        endereco: userData.endereco,
        observacoes: userData.observacoes,
        criado_por: createdBy,
        ativo: true
      })
      .select()
      .single();

    if (error) {
      console.error('Erro ao criar usuário:', error);
      throw new Error('Falha ao criar usuário');
    }

    return data;
  },

  async updateUser(userId: string, userData: UpdateUserData): Promise<SistemaUsuario> {
    const updateData: any = { ...userData };
    
    // Se está atualizando a senha, usar o campo correto
    if (userData.senha) {
      updateData.senha_hash = userData.senha; // O trigger aplicará o hash
      delete updateData.senha;
    }

    const { data, error } = await supabase
      .from('sistema_usuarios')
      .update(updateData)
      .eq('id', userId)
      .select()
      .single();

    if (error) {
      console.error('Erro ao atualizar usuário:', error);
      throw new Error('Falha ao atualizar usuário');
    }

    return data;
  },

  async deleteUser(userId: string): Promise<void> {
    const { error } = await supabase
      .from('sistema_usuarios')
      .delete()
      .eq('id', userId);

    if (error) {
      console.error('Erro ao excluir usuário:', error);
      throw new Error('Falha ao excluir usuário');
    }
  },

  async toggleUserStatus(userId: string, ativo: boolean): Promise<SistemaUsuario> {
    const { data, error } = await supabase
      .from('sistema_usuarios')
      .update({ ativo })
      .eq('id', userId)
      .select()
      .single();

    if (error) {
      console.error('Erro ao alterar status do usuário:', error);
      throw new Error('Falha ao alterar status do usuário');
    }

    return data;
  }
};
