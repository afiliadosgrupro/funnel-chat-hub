
import React, { createContext, useContext, useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { User, AuthState } from '@/types/auth';

interface AuthContextType extends AuthState {
  login: (email: string, password: string) => Promise<void>;
  logout: () => void;
  forgotPassword: (email: string) => Promise<void>;
  resetPassword: (token: string, newPassword: string) => Promise<void>;
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
          console.error('Failed to parse stored user data', error);
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
      // Set up the initial timer
      resetTimer();
      
      // Add event listeners for user activity
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

  // Mock login function - replace with actual Supabase auth
  const login = async (email: string, password: string) => {
    try {
      setState(prev => ({ ...prev, loading: true, error: null }));

      // In a real implementation, this would call your Supabase auth endpoint
      // For demo purposes, we're using mock data
      if (email === 'admin@example.com' && password === 'password') {
        const user: User = {
          id: '1',
          email: 'admin@example.com',
          name: 'Admin User',
          role: 'admin',
        };
        
        localStorage.setItem('authToken', 'mock-jwt-token');
        localStorage.setItem('user', JSON.stringify(user));
        
        setState({
          isAuthenticated: true,
          user,
          loading: false,
          error: null,
        });
        
        navigate('/dashboard');
      } else if (email === 'seller@example.com' && password === 'password') {
        const user: User = {
          id: '2',
          email: 'seller@example.com',
          name: 'Seller User',
          role: 'seller',
        };
        
        localStorage.setItem('authToken', 'mock-jwt-token');
        localStorage.setItem('user', JSON.stringify(user));
        
        setState({
          isAuthenticated: true,
          user,
          loading: false,
          error: null,
        });
        
        navigate('/dashboard');
      } else {
        setState(prev => ({
          ...prev,
          loading: false,
          error: 'Credenciais inválidas. Tente novamente.',
        }));
      }
    } catch (error) {
      console.error('Login error:', error);
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
      
      // Mock API call - replace with actual Supabase implementation
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      setState(prev => ({ ...prev, loading: false }));
    } catch (error) {
      console.error('Forgot password error:', error);
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
      
      // Mock API call - replace with actual Supabase implementation
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      setState(prev => ({ ...prev, loading: false }));
      navigate('/login');
    } catch (error) {
      console.error('Reset password error:', error);
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
