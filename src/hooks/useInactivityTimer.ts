
import { useEffect } from 'react';

interface UseInactivityTimerProps {
  isAuthenticated: boolean;
  onTimeout: () => void;
  timeoutMinutes?: number;
}

export const useInactivityTimer = ({ 
  isAuthenticated, 
  onTimeout, 
  timeoutMinutes = 30 
}: UseInactivityTimerProps) => {
  useEffect(() => {
    let inactivityTimer: number;
    
    const resetTimer = () => {
      clearTimeout(inactivityTimer);
      inactivityTimer = window.setTimeout(() => {
        if (isAuthenticated) {
          onTimeout();
          alert('Sua sessão expirou devido à inatividade. Por favor, faça login novamente.');
        }
      }, timeoutMinutes * 60 * 1000);
    };

    const handleActivity = () => {
      resetTimer();
    };

    if (isAuthenticated) {
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
  }, [isAuthenticated, onTimeout, timeoutMinutes]);
};
