
import { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Alert, AlertDescription } from '@/components/ui/alert';
import Logo from '@/components/ui/Logo';
import { supabase } from '@/integrations/supabase/client';
import { toast } from 'sonner';

const Register = () => {
  const { token } = useParams<{ token: string }>();
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [validating, setValidating] = useState(true);
  const [inviteData, setInviteData] = useState<any>(null);
  const [error, setError] = useState<string | null>(null);
  
  const [formData, setFormData] = useState({
    nome: '',
    senha: '',
    confirmarSenha: ''
  });

  useEffect(() => {
    validateToken();
  }, [token]);

  const validateToken = async () => {
    if (!token) {
      setError('Token de convite inválido');
      setValidating(false);
      return;
    }

    try {
      const { data, error } = await supabase
        .from('convites_cadastro')
        .select('*')
        .eq('token', token)
        .eq('usado', false)
        .gt('expira_em', new Date().toISOString())
        .single();

      if (error || !data) {
        setError('Convite inválido ou expirado');
      } else {
        setInviteData(data);
      }
    } catch (error) {
      setError('Erro ao validar convite');
    } finally {
      setValidating(false);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (formData.senha !== formData.confirmarSenha) {
      toast.error('As senhas não coincidem');
      return;
    }

    if (formData.senha.length < 6) {
      toast.error('A senha deve ter pelo menos 6 caracteres');
      return;
    }

    setLoading(true);
    try {
      // Criar usuário na tabela sistema_usuarios
      const { error: userError } = await supabase
        .from('sistema_usuarios')
        .insert({
          email: inviteData.email,
          nome: formData.nome,
          role: inviteData.role,
          senha_hash: formData.senha, // TODO: Hash da senha
          criado_por: inviteData.criado_por
        });

      if (userError) throw userError;

      // Marcar convite como usado
      const { error: inviteError } = await supabase
        .from('convites_cadastro')
        .update({ usado: true })
        .eq('id', inviteData.id);

      if (inviteError) throw inviteError;

      toast.success('Cadastro realizado com sucesso!');
      navigate('/login');
    } catch (error) {
      console.error('Erro no cadastro:', error);
      toast.error('Erro ao realizar cadastro. Tente novamente.');
    } finally {
      setLoading(false);
    }
  };

  if (validating) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-gray-100">
        <div className="animate-pulse text-whatsapp">Validando convite...</div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex min-h-screen bg-gray-100 items-center justify-center p-8">
        <Card className="w-full max-w-md">
          <CardHeader className="text-center">
            <Logo size="lg" className="mx-auto mb-4" />
            <CardTitle className="text-red-600">Convite Inválido</CardTitle>
          </CardHeader>
          <CardContent>
            <Alert variant="destructive">
              <AlertDescription>{error}</AlertDescription>
            </Alert>
            <Button 
              className="w-full mt-4" 
              onClick={() => navigate('/login')}
            >
              Ir para Login
            </Button>
          </CardContent>
        </Card>
      </div>
    );
  }

  return (
    <div className="flex min-h-screen bg-gray-100">
      <div className="hidden lg:flex lg:w-1/2 bg-whatsapp justify-center items-center">
        <div className="max-w-md text-center p-8">
          <Logo size="lg" className="mx-auto mb-8 text-white" />
          <h2 className="text-3xl font-bold text-white mb-6">
            Bem-vindo à Plataforma
          </h2>
          <p className="text-white/80">
            Complete seu cadastro para ter acesso à plataforma de vendas para nutraceúticos.
          </p>
        </div>
      </div>
      
      <div className="flex w-full lg:w-1/2 justify-center items-center p-8">
        <div className="w-full max-w-md">
          <div className="mb-8 text-center lg:hidden">
            <Logo size="lg" className="mx-auto mb-4" />
            <h2 className="text-2xl font-bold text-gray-900">
              Complete seu cadastro
            </h2>
          </div>
          
          <Card>
            <CardHeader>
              <CardTitle className="hidden lg:block">Complete seu cadastro</CardTitle>
              <CardDescription>
                Convite para: <strong>{inviteData?.email}</strong><br />
                Nível de acesso: <strong>{inviteData?.role}</strong>
              </CardDescription>
            </CardHeader>
            <CardContent>
              <form onSubmit={handleSubmit} className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="nome">Nome completo</Label>
                  <Input
                    id="nome"
                    type="text"
                    placeholder="Seu nome completo"
                    value={formData.nome}
                    onChange={(e) => setFormData(prev => ({ ...prev, nome: e.target.value }))}
                    required
                  />
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="senha">Senha</Label>
                  <Input
                    id="senha"
                    type="password"
                    placeholder="Mínimo 6 caracteres"
                    value={formData.senha}
                    onChange={(e) => setFormData(prev => ({ ...prev, senha: e.target.value }))}
                    required
                  />
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="confirmarSenha">Confirmar senha</Label>
                  <Input
                    id="confirmarSenha"
                    type="password"
                    placeholder="Confirme sua senha"
                    value={formData.confirmarSenha}
                    onChange={(e) => setFormData(prev => ({ ...prev, confirmarSenha: e.target.value }))}
                    required
                  />
                </div>
                
                <Button 
                  type="submit" 
                  className="w-full bg-whatsapp hover:bg-whatsapp-dark"
                  disabled={loading}
                >
                  {loading ? 'Criando conta...' : 'Criar conta'}
                </Button>
              </form>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default Register;
