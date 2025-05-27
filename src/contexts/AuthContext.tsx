
import React, { createContext, useContext, useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { User, AuthState } from '@/types/auth';
import { toast } from '@/hooks/use-toast';
import { authService, LoginCredentials } from '@/services/authService';
import { useInactivityTimer } from '@/hooks/useInactivityTimer';
import { authStorage } from '@/utils/authStorage';

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

  // Define logout function early to avoid hoisting issues
  const logout = () => {
    authStorage.clearAuth();
    
    setState({
      isAuthenticated: false,
      user: null,
      loading: false,
      error: null,
    });
    
    navigate('/login');
  };

  // Check for stored authentication on component mount
  useEffect(() => {
    const checkAuth = () => {
      const { token, user } = authStorage.getStoredAuth();
      
      if (token && user) {
        setState({
          isAuthenticated: true,
          user,
          loading: false,
          error: null,
        });
      } else {
        setState(prev => ({ ...prev, loading: false }));
      }
    };

    checkAuth();
  }, []);

  // Auto logout on inactivity - now logout is defined
  useInactivityTimer({
    isAuthenticated: state.isAuthenticated,
    onTimeout: logout
  });

  // Check permissions based on role hierarchy
  const hasPermission = (requiredRole: 'dev' | 'admin' | 'vendedor'): boolean => {
    if (!state.user) return false;
    return authService.hasPermission(state.user.role, requiredRole);
  };

  // Login function using sistema_usuarios table
  const login = async (email: string, password: string) => {
    setState(prev => ({ ...prev, loading: true, error: null }));

    const credentials: LoginCredentials = { email, password };
    const result = await authService.login(credentials);

    if (result.error) {
      setState(prev => ({
        ...prev,
        loading: false,
        error: result.error!,
      }));
      return;
    }

    if (result.user) {
      authStorage.storeAuth(result.user);
      
      setState({
        isAuthenticated: true,
        user: result.user,
        loading: false,
        error: null,
      });
      
      navigate('/dashboard');
      toast({
        title: "Login bem-sucedido",
        description: `Bem-vindo, ${result.user.name}!`,
      });
    }
  };

  const forgotPassword = async (email: string) => {
    setState(prev => ({ ...prev, loading: true, error: null }));
    
    const result = await authService.forgotPassword(email);
    
    if (result.error) {
      setState(prev => ({
        ...prev,
        loading: false,
        error: result.error!,
      }));
      return;
    }
    
    setState(prev => ({ ...prev, loading: false }));
    toast({
      title: "Email enviado",
      description: "Instruções de recuperação de senha foram enviadas para seu email.",
    });
  };

  const resetPassword = async (token: string, newPassword: string) => {
    setState(prev => ({ ...prev, loading: true, error: null }));
    
    const result = await authService.resetPassword(token, newPassword);
    
    if (result.error) {
      setState(prev => ({
        ...prev,
        loading: false,
        error: result.error!,
      }));
      return;
    }
    
    setState(prev => ({ ...prev, loading: false }));
    toast({
      title: "Senha atualizada",
      description: "Sua senha foi redefinida com sucesso. Você já pode fazer login.",
    });
    
    navigate('/login');
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
