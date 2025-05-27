
import { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Textarea } from '@/components/ui/textarea';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { SistemaUsuario, CreateUserData, UpdateUserData } from '@/types/user';
import { X, Save, User } from 'lucide-react';

interface UserFormProps {
  user?: SistemaUsuario;
  onSave: (userData: CreateUserData | UpdateUserData) => Promise<void>;
  onCancel: () => void;
  loading?: boolean;
}

const UserForm = ({ user, onSave, onCancel, loading = false }: UserFormProps) => {
  const [formData, setFormData] = useState({
    nome: '',
    email: '',
    senha: '',
    role: 'vendedor' as 'dev' | 'admin' | 'vendedor',
    telefone: '',
    data_nascimento: '',
    endereco: '',
    observacoes: '',
    ativo: true
  });

  const [showPassword, setShowPassword] = useState(false);

  useEffect(() => {
    if (user) {
      setFormData({
        nome: user.nome || '',
        email: user.email || '',
        senha: '',
        role: user.role || 'vendedor',
        telefone: user.telefone || '',
        data_nascimento: user.data_nascimento || '',
        endereco: user.endereco || '',
        observacoes: user.observacoes || '',
        ativo: user.ativo ?? true
      });
    }
  }, [user]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!formData.nome || !formData.email) {
      return;
    }

    if (!user && !formData.senha) {
      return;
    }

    const userData = {
      nome: formData.nome,
      email: formData.email,
      role: formData.role,
      telefone: formData.telefone || undefined,
      data_nascimento: formData.data_nascimento || undefined,
      endereco: formData.endereco || undefined,
      observacoes: formData.observacoes || undefined,
      ...(user ? { ativo: formData.ativo } : {}),
      ...(formData.senha ? { senha: formData.senha } : {})
    };

    await onSave(userData);
  };

  const getRoleLabel = (role: string) => {
    switch (role) {
      case 'dev': return 'Desenvolvedor';
      case 'admin': return 'Administrador';
      case 'vendedor': return 'Vendedor';
      default: return role;
    }
  };

  return (
    <Card className="w-full max-w-2xl mx-auto">
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <User className="h-5 w-5" />
          {user ? 'Editar Usuário' : 'Novo Usuário'}
        </CardTitle>
        <CardDescription>
          {user ? 'Altere as informações do usuário' : 'Preencha os dados para criar um novo usuário'}
        </CardDescription>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="nome">Nome Completo *</Label>
              <Input
                id="nome"
                type="text"
                value={formData.nome}
                onChange={(e) => setFormData(prev => ({ ...prev, nome: e.target.value }))}
                placeholder="Nome do usuário"
                required
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="email">Email *</Label>
              <Input
                id="email"
                type="email"
                value={formData.email}
                onChange={(e) => setFormData(prev => ({ ...prev, email: e.target.value }))}
                placeholder="email@exemplo.com"
                required
              />
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="senha">
                {user ? 'Nova Senha (deixe vazio para manter)' : 'Senha *'}
              </Label>
              <div className="relative">
                <Input
                  id="senha"
                  type={showPassword ? "text" : "password"}
                  value={formData.senha}
                  onChange={(e) => setFormData(prev => ({ ...prev, senha: e.target.value }))}
                  placeholder="Digite a senha"
                  required={!user}
                />
                <Button
                  type="button"
                  variant="ghost"
                  size="sm"
                  className="absolute right-2 top-1/2 transform -translate-y-1/2"
                  onClick={() => setShowPassword(!showPassword)}
                >
                  {showPassword ? 'Ocultar' : 'Mostrar'}
                </Button>
              </div>
            </div>

            <div className="space-y-2">
              <Label htmlFor="role">Nível de Acesso *</Label>
              <Select value={formData.role} onValueChange={(value: 'dev' | 'admin' | 'vendedor') => 
                setFormData(prev => ({ ...prev, role: value }))}>
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="vendedor">Vendedor</SelectItem>
                  <SelectItem value="admin">Administrador</SelectItem>
                  <SelectItem value="dev">Desenvolvedor</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="telefone">Telefone</Label>
              <Input
                id="telefone"
                type="tel"
                value={formData.telefone}
                onChange={(e) => setFormData(prev => ({ ...prev, telefone: e.target.value }))}
                placeholder="(11) 99999-9999"
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="data_nascimento">Data de Nascimento</Label>
              <Input
                id="data_nascimento"
                type="date"
                value={formData.data_nascimento}
                onChange={(e) => setFormData(prev => ({ ...prev, data_nascimento: e.target.value }))}
              />
            </div>
          </div>

          <div className="space-y-2">
            <Label htmlFor="endereco">Endereço</Label>
            <Input
              id="endereco"
              type="text"
              value={formData.endereco}
              onChange={(e) => setFormData(prev => ({ ...prev, endereco: e.target.value }))}
              placeholder="Endereço completo"
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="observacoes">Observações</Label>
            <Textarea
              id="observacoes"
              value={formData.observacoes}
              onChange={(e) => setFormData(prev => ({ ...prev, observacoes: e.target.value }))}
              placeholder="Observações adicionais sobre o usuário"
              rows={3}
            />
          </div>

          {user && (
            <div className="space-y-2">
              <Label htmlFor="ativo">Status</Label>
              <Select 
                value={formData.ativo ? 'true' : 'false'} 
                onValueChange={(value) => setFormData(prev => ({ ...prev, ativo: value === 'true' }))}
              >
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="true">Ativo</SelectItem>
                  <SelectItem value="false">Inativo</SelectItem>
                </SelectContent>
              </Select>
            </div>
          )}

          <div className="flex gap-3 pt-4">
            <Button 
              type="submit" 
              disabled={loading || !formData.nome || !formData.email || (!user && !formData.senha)}
              className="bg-whatsapp hover:bg-whatsapp-dark"
            >
              <Save className="mr-2 h-4 w-4" />
              {loading ? 'Salvando...' : (user ? 'Atualizar' : 'Criar Usuário')}
            </Button>
            <Button type="button" variant="outline" onClick={onCancel}>
              <X className="mr-2 h-4 w-4" />
              Cancelar
            </Button>
          </div>
        </form>
      </CardContent>
    </Card>
  );
};

export default UserForm;
