
import { Navigate } from 'react-router-dom';
import { useAuth } from '@/contexts/AuthContext';
import LoginForm from '@/components/auth/LoginForm';
import Logo from '@/components/ui/Logo';

const Login = () => {
  const { isAuthenticated, loading } = useAuth();
  
  if (isAuthenticated) {
    return <Navigate to="/dashboard" replace />;
  }
  
  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-gray-100">
        <div className="animate-pulse text-whatsapp">Carregando...</div>
      </div>
    );
  }

  return (
    <div className="flex min-h-screen bg-gray-100">
      <div className="hidden lg:flex lg:w-1/2 bg-whatsapp justify-center items-center">
        <div className="max-w-md text-center p-8">
          <Logo size="lg" className="mx-auto mb-8 text-white" />
          <h2 className="text-3xl font-bold text-white mb-6">
            Plataforma de Vendas para Nutraceuticos
          </h2>
          <p className="text-white/80">
            Gerencie seus leads, automatize suas vendas e aumente sua conversão com nossa plataforma integrada com WhatsApp.
          </p>
        </div>
      </div>
      <div className="flex w-full lg:w-1/2 justify-center items-center p-8">
        <div className="w-full max-w-md">
          <div className="mb-8 text-center lg:hidden">
            <Logo size="lg" className="mx-auto mb-4" />
            <h2 className="text-2xl font-bold text-gray-900">
              Acesse sua conta
            </h2>
          </div>
          <div className="bg-white p-8 rounded-lg shadow-md">
            <h1 className="text-2xl font-bold mb-6 hidden lg:block">Acesse sua conta</h1>
            <LoginForm />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
