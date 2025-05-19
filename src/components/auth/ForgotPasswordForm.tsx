
import { useState } from 'react';
import { useAuth } from '@/contexts/AuthContext';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { ArrowLeft, Loader2, Mail } from 'lucide-react';
import { Link } from 'react-router-dom';
import { Alert, AlertDescription } from '@/components/ui/alert';

const ForgotPasswordForm = () => {
  const [email, setEmail] = useState('');
  const [submitted, setSubmitted] = useState(false);
  const { forgotPassword, loading, error } = useAuth();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    await forgotPassword(email);
    setSubmitted(true);
  };

  if (submitted && !error) {
    return (
      <div className="space-y-4 text-center w-full max-w-md">
        <Mail className="w-12 h-12 text-whatsapp mx-auto" />
        <h2 className="text-2xl font-bold">Verifique seu email</h2>
        <p className="text-gray-600">
          Enviamos um email para <strong>{email}</strong> com instruções para redefinir sua senha.
        </p>
        <Link to="/login">
          <Button variant="outline" className="mt-4">
            <ArrowLeft className="mr-2 h-4 w-4" />
            Voltar ao login
          </Button>
        </Link>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-4 w-full max-w-md">
      <div className="space-y-2">
        <Label htmlFor="email">Email</Label>
        <p className="text-sm text-gray-500">
          Digite seu email de cadastro e enviaremos instruções para redefinir sua senha.
        </p>
        <Input
          id="email"
          type="email"
          placeholder="seu@email.com"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
          className="w-full"
        />
      </div>
      
      {error && (
        <Alert variant="destructive">
          <AlertDescription>{error}</AlertDescription>
        </Alert>
      )}
      
      <div className="flex gap-4">
        <Link to="/login" className="flex-1">
          <Button variant="outline" className="w-full">
            <ArrowLeft className="mr-2 h-4 w-4" />
            Voltar
          </Button>
        </Link>
        <Button 
          type="submit" 
          className="flex-1 bg-whatsapp hover:bg-whatsapp-dark"
          disabled={loading}
        >
          {loading ? (
            <Loader2 className="mr-2 h-4 w-4 animate-spin" />
          ) : (
            <Mail className="mr-2 h-4 w-4" />
          )}
          Enviar
        </Button>
      </div>
    </form>
  );
};

export default ForgotPasswordForm;
