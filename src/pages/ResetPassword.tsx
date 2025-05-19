
import { Link } from 'react-router-dom';
import ResetPasswordForm from '@/components/auth/ResetPasswordForm';
import Logo from '@/components/ui/Logo';

const ResetPassword = () => {
  return (
    <div className="flex min-h-screen bg-gray-100">
      <div className="flex w-full justify-center items-center p-8">
        <div className="w-full max-w-md">
          <div className="mb-8 text-center">
            <Link to="/">
              <Logo size="lg" className="mx-auto mb-4" />
            </Link>
            <h2 className="text-2xl font-bold text-gray-900">
              Criar nova senha
            </h2>
            <p className="text-gray-600 mt-2">
              Escolha uma nova senha forte para sua conta
            </p>
          </div>
          <div className="bg-white p-8 rounded-lg shadow-md">
            <ResetPasswordForm />
          </div>
        </div>
      </div>
    </div>
  );
};

export default ResetPassword;
