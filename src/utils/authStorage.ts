
import { User } from '@/types/auth';

export const authStorage = {
  getStoredAuth(): { token: string | null; user: User | null } {
    const token = localStorage.getItem('authToken');
    const userStr = localStorage.getItem('user');
    
    if (token && userStr) {
      try {
        const user = JSON.parse(userStr) as User;
        return { token, user };
      } catch (error) {
        console.error('Falha ao analisar os dados do usuário armazenados', error);
        this.clearAuth();
        return { token: null, user: null };
      }
    }
    
    return { token: null, user: null };
  },

  storeAuth(user: User): void {
    localStorage.setItem('authToken', 'sistema-usuarios-token');
    localStorage.setItem('user', JSON.stringify(user));
  },

  clearAuth(): void {
    localStorage.removeItem('authToken');
    localStorage.removeItem('user');
  }
};
