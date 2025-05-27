
import React, { createContext, useContext, useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { User, AuthState } from '@/types/auth';
import { supabase } from '@/integrations/supabase/client';
import { toast } from '@/hooks/use-toast';

interface AuthContextType extends AuthState {
  login: (email: string, password: string) => Promise<void>;
  logout: () => void;
  forgotPassword: (email: string) => Promise<void>;
  resetPassword: (token: string, newPassword: string) => Promise<void>;
  hasPermission: (requiredRole: 'dev' | 'admin' | 'vendedor') => boolean;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [state, setState] = useState<AuthState>({
    isAuthenticated: false,
    user: null,
    loading: true,
    error: null,
  });
  
  const navigate = useNavigate();

  // Check for stored authentication on component mount
  useEffect(() => {
    const checkAuth = () => {
      const token = localStorage.getItem('authToken');
      const userStr = localStorage.getItem('user');
      
      if (token && userStr) {
        try {
          const user = JSON.parse(userStr) as User;
          setState({
            isAuthenticated: true,
            user,
            loading: false,
            error: null,
          });
        } catch (error) {
          console.error('Falha ao analisar os dados do usuário armazenados', error);
          localStorage.removeItem('authToken');
          localStorage.removeItem('user');
          setState({
            isAuthenticated: false,
            user: null,
            loading: false,
            error: null,
          });
        }
      } else {
        setState(prev => ({ ...prev, loading: false }));
      }
    };

    checkAuth();
  }, []);

  // Auto logout on inactivity (30 minutes)
  useEffect(() => {
    let inactivityTimer: number;
    
    const resetTimer = () => {
      clearTimeout(inactivityTimer);
      inactivityTimer = window.setTimeout(() => {
        if (state.isAuthenticated) {
          logout();
          alert('Sua sessão expirou devido à inatividade. Por favor, faça login novamente.');
        }
      }, 30 * 60 * 1000); // 30 minutes
    };

    // Reset timer on user activity
    const handleActivity = () => {
      resetTimer();
    };

    if (state.isAuthenticated) {
      resetTimer();
      
      window.addEventListener('mousemove', handleActivity);
      window.addEventListener('keypress', handleActivity);
      window.addEventListener('click', handleActivity);
      window.addEventListener('scroll', handleActivity);
    }

    return () => {
      clearTimeout(inactivityTimer);
      window.removeEventListener('mousemove', handleActivity);
      window.removeEventListener('keypress', handleActivity);
      window.removeEventListener('click', handleActivity);
      window.removeEventListener('scroll', handleActivity);
    };
  }, [state.isAuthenticated]);

  // Check permissions based on role hierarchy
  const hasPermission = (requiredRole: 'dev' | 'admin' | 'vendedor'): boolean => {
    if (!state.user) return false;
    
    const roleHierarchy = {
      'dev': 3,
      'admin': 2,
      'vendedor': 1
    };
    
    return roleHierarchy[state.user.role] >= roleHierarchy[requiredRole];
  };

  // Login function using sistema_usuarios table
  const login = async (email: string, password: string) => {
    try {
      setState(prev => ({ ...prev, loading: true, error: null }));

      // Consultar a tabela sistema_usuarios para verificar credenciais
      const { data, error } = await supabase
        .from('sistema_usuarios')
        .select('*')
        .eq('email', email.toLowerCase().trim())
        .eq('ativo', true)
        .single();

      if (error || !data) {
        setState(prev => ({
          ...prev,
          loading: false,
          error: 'Credenciais inválidas ou usuário inativo.',
        }));
        return;
      }

      // TODO: Implementar verificação de senha hash aqui
      // Por enquanto, qualquer senha será aceita para desenvolvimento

      const user: User = {
        id: data.id,
        email: data.email,
        name: data.nome,
        role: data.role as 'dev' | 'admin' | 'vendedor',
        avatar: undefined,
      };
      
      localStorage.setItem('authToken', 'sistema-usuarios-token');
      localStorage.setItem('user', JSON.stringify(user));
      
      setState({
        isAuthenticated: true,
        user,
        loading: false,
        error: null,
      });
      
      navigate('/dashboard');
      toast({
        title: "Login bem-sucedido",
        description: `Bem-vindo, ${user.name}!`,
      });
      
    } catch (error) {
      console.error('Erro no login:', error);
      setState(prev => ({
        ...prev,
        loading: false,
        error: 'Ocorreu um erro durante o login. Tente novamente.',
      }));
    }
  };

  const logout = () => {
    localStorage.removeItem('authToken');
    localStorage.removeItem('user');
    
    setState({
      isAuthenticated: false,
      user: null,
      loading: false,
      error: null,
    });
    
    navigate('/login');
  };

  const forgotPassword = async (email: string) => {
    try {
      setState(prev => ({ ...prev, loading: true, error: null }));
      
      const { data, error } = await supabase
        .from('sistema_usuarios')
        .select('email')
        .eq('email', email.toLowerCase().trim())
        .single();
        
      if (error || !data) {
        setState(prev => ({
          ...prev,
          loading: false,
          error: 'Email não encontrado em nosso sistema.',
        }));
        return;
      }
      
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      setState(prev => ({ ...prev, loading: false }));
      toast({
        title: "Email enviado",
        description: "Instruções de recuperação de senha foram enviadas para seu email.",
      });
    } catch (error) {
      console.error('Erro ao recuperar senha:', error);
      setState(prev => ({
        ...prev,
        loading: false,
        error: 'Ocorreu um erro ao processar sua solicitação. Tente novamente.',
      }));
    }
  };

  const resetPassword = async (token: string, newPassword: string) => {
    try {
      setState(prev => ({ ...prev, loading: true, error: null }));
      
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      setState(prev => ({ ...prev, loading: false }));
      toast({
        title: "Senha atualizada",
        description: "Sua senha foi redefinida com sucesso. Você já pode fazer login.",
      });
      
      navigate('/login');
    } catch (error) {
      console.error('Erro ao redefinir senha:', error);
      setState(prev => ({
        ...prev,
        loading: false,
        error: 'Ocorreu um erro ao redefinir sua senha. Tente novamente.',
      }));
    }
  };

  const contextValue = {
    ...state,
    login,
    logout,
    forgotPassword,
    resetPassword,
    hasPermission,
  };

  return (
    <AuthContext.Provider value={contextValue}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};
