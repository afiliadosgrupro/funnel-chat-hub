
import { supabase } from '@/integrations/supabase/client';
import { User } from '@/types/auth';

export interface LoginCredentials {
  email: string;
  password: string;
}

export interface AuthResult {
  user?: User;
  error?: string;
}

export const authService = {
  async login(credentials: LoginCredentials): Promise<AuthResult> {
    const { email, password } = credentials;
    
    console.log('Tentando login com:', email);

    try {
      // Consultar a tabela sistema_usuarios para verificar credenciais
      const { data, error } = await supabase
        .from('sistema_usuarios')
        .select('*')
        .eq('email', email.toLowerCase().trim())
        .eq('ativo', true)
        .single();

      console.log('Resultado da consulta:', { data, error });

      if (error || !data) {
        console.error('Erro na consulta ou usuário não encontrado:', error);
        return { error: 'Credenciais inválidas ou usuário inativo.' };
      }

      // Verificar senha - o hash é aplicado pelo trigger, então comparamos diretamente
      if (data.senha_hash !== password) {
        console.log('Senha incorreta');
        return { error: 'Credenciais inválidas.' };
      }

      const user: User = {
        id: data.id,
        email: data.email,
        name: data.nome,
        role: data.role as 'dev' | 'admin' | 'vendedor',
        avatar: undefined,
      };
      
      return { user };
    } catch (error) {
      console.error('Erro no login:', error);
      return { error: 'Ocorreu um erro durante o login. Tente novamente.' };
    }
  },

  async forgotPassword(email: string): Promise<{ error?: string }> {
    try {
      const { data, error } = await supabase
        .from('sistema_usuarios')
        .select('email')
        .eq('email', email.toLowerCase().trim())
        .single();
        
      if (error || !data) {
        return { error: 'Email não encontrado em nosso sistema.' };
      }
      
      // Simular delay de envio de email
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      return {};
    } catch (error) {
      console.error('Erro ao recuperar senha:', error);
      return { error: 'Ocorreu um erro ao processar sua solicitação. Tente novamente.' };
    }
  },

  async resetPassword(token: string, newPassword: string): Promise<{ error?: string }> {
    try {
      // Simular delay de reset de senha
      await new Promise(resolve => setTimeout(resolve, 1000));
      return {};
    } catch (error) {
      console.error('Erro ao redefinir senha:', error);
      return { error: 'Ocorreu um erro ao redefinir sua senha. Tente novamente.' };
    }
  },

  hasPermission(userRole: 'dev' | 'admin' | 'vendedor', requiredRole: 'dev' | 'admin' | 'vendedor'): boolean {
    const roleHierarchy = {
      'dev': 3,
      'admin': 2,
      'vendedor': 1
    };
    
    return roleHierarchy[userRole] >= roleHierarchy[requiredRole];
  }
};
