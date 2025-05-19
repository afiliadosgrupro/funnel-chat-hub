
import { Link } from 'react-router-dom';
import ForgotPasswordForm from '@/components/auth/ForgotPasswordForm';
import Logo from '@/components/ui/Logo';

const ForgotPassword = () => {
  return (
    <div className="flex min-h-screen bg-gray-100">
      <div className="flex w-full justify-center items-center p-8">
        <div className="w-full max-w-md">
          <div className="mb-8 text-center">
            <Link to="/">
              <Logo size="lg" className="mx-auto mb-4" />
            </Link>
            <h2 className="text-2xl font-bold text-gray-900">
              Recuperação de senha
            </h2>
            <p className="text-gray-600 mt-2">
              Informe seu email para resetar sua senha
            </p>
          </div>
          <div className="bg-white p-8 rounded-lg shadow-md">
            <ForgotPasswordForm />
          </div>
        </div>
      </div>
    </div>
  );
};

export default ForgotPassword;
