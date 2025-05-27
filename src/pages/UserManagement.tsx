
import { useState, useEffect } from 'react';
import MainLayout from '@/components/layout/MainLayout';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Badge } from '@/components/ui/badge';
import { UserPlus, Send, Trash2, Copy } from 'lucide-react';
import { supabase } from '@/integrations/supabase/client';
import { toast } from 'sonner';
import { ConviteRegistro } from '@/types/auth';

const UserManagement = () => {
  const [convites, setConvites] = useState<ConviteRegistro[]>([]);
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    email: '',
    role: 'vendedor' as 'dev' | 'admin' | 'vendedor'
  });

  useEffect(() => {
    loadConvites();
  }, []);

  const loadConvites = async () => {
    try {
      const { data, error } = await supabase
        .from('convites_cadastro')
        .select('*')
        .order('criado_em', { ascending: false });

      if (error) throw error;
      setConvites(data || []);
    } catch (error) {
      console.error('Erro ao carregar convites:', error);
      toast.error('Erro ao carregar convites');
    }
  };

  const generateInviteLink = (token: string) => {
    return `${window.location.origin}/registro/${token}`;
  };

  const createInvite = async () => {
    if (!formData.email) {
      toast.error('Email é obrigatório');
      return;
    }

    setLoading(true);
    try {
      const token = crypto.randomUUID();
      const expiraEm = new Date();
      expiraEm.setDate(expiraEm.getDate() + 7); // Expira em 7 dias

      const { error } = await supabase
        .from('convites_cadastro')
        .insert({
          email: formData.email.toLowerCase(),
          role: formData.role,
          token,
          expira_em: expiraEm.toISOString(),
          criado_por: 'temp-user-id' // TODO: Usar ID do usuário logado
        });

      if (error) throw error;

      const inviteLink = generateInviteLink(token);
      
      // Copiar link para clipboard
      await navigator.clipboard.writeText(inviteLink);
      
      toast.success('Convite criado! Link copiado para área de transferência.');
      
      setFormData({ email: '', role: 'vendedor' });
      loadConvites();
    } catch (error) {
      console.error('Erro ao criar convite:', error);
      toast.error('Erro ao criar convite');
    } finally {
      setLoading(false);
    }
  };

  const copyInviteLink = async (token: string) => {
    try {
      const link = generateInviteLink(token);
      await navigator.clipboard.writeText(link);
      toast.success('Link copiado para área de transferência!');
    } catch (error) {
      toast.error('Erro ao copiar link');
    }
  };

  const deleteInvite = async (id: string) => {
    try {
      const { error } = await supabase
        .from('convites_cadastro')
        .delete()
        .eq('id', id);

      if (error) throw error;
      
      toast.success('Convite removido');
      loadConvites();
    } catch (error) {
      console.error('Erro ao remover convite:', error);
      toast.error('Erro ao remover convite');
    }
  };

  const getRoleBadgeVariant = (role: string) => {
    switch (role) {
      case 'dev': return 'destructive';
      case 'admin': return 'default';
      case 'vendedor': return 'secondary';
      default: return 'outline';
    }
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
    <MainLayout>
      <div className="space-y-6">
        <div className="flex items-center justify-between">
          <h1 className="text-2xl font-bold">Gerenciamento de Usuários</h1>
        </div>
        
        <div className="grid gap-6">
          {/* Criar novo convite */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <UserPlus className="h-5 w-5" />
                Criar Convite de Cadastro
              </CardTitle>
              <CardDescription>
                Envie um convite por email para que novos usuários possam se cadastrar
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="email">Email</Label>
                  <Input
                    id="email"
                    type="email"
                    placeholder="usuario@exemplo.com"
                    value={formData.email}
                    onChange={(e) => setFormData(prev => ({ ...prev, email: e.target.value }))}
                  />
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="role">Nível de Acesso</Label>
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
                
                <div className="flex items-end">
                  <Button 
                    onClick={createInvite}
                    disabled={loading}
                    className="w-full bg-whatsapp hover:bg-whatsapp-dark"
                  >
                    <Send className="mr-2 h-4 w-4" />
                    Criar Convite
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Lista de convites */}
          <Card>
            <CardHeader>
              <CardTitle>Convites Pendentes</CardTitle>
              <CardDescription>
                Gerencie os convites de cadastro enviados
              </CardDescription>
            </CardHeader>
            <CardContent>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Email</TableHead>
                    <TableHead>Nível</TableHead>
                    <TableHead>Status</TableHead>
                    <TableHead>Criado em</TableHead>
                    <TableHead>Expira em</TableHead>
                    <TableHead className="text-right">Ações</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {convites.map((convite) => (
                    <TableRow key={convite.id}>
                      <TableCell className="font-medium">{convite.email}</TableCell>
                      <TableCell>
                        <Badge variant={getRoleBadgeVariant(convite.role)}>
                          {getRoleLabel(convite.role)}
                        </Badge>
                      </TableCell>
                      <TableCell>
                        <Badge variant={convite.usado ? 'secondary' : 'default'}>
                          {convite.usado ? 'Usado' : 'Pendente'}
                        </Badge>
                      </TableCell>
                      <TableCell>
                        {new Date(convite.criado_em).toLocaleDateString('pt-BR')}
                      </TableCell>
                      <TableCell>
                        {new Date(convite.expira_em).toLocaleDateString('pt-BR')}
                      </TableCell>
                      <TableCell className="text-right">
                        <div className="flex gap-2 justify-end">
                          <Button
                            variant="outline"
                            size="sm"
                            onClick={() => copyInviteLink(convite.token)}
                            disabled={convite.usado}
                          >
                            <Copy className="h-4 w-4" />
                          </Button>
                          <Button
                            variant="outline"
                            size="sm"
                            onClick={() => deleteInvite(convite.id)}
                            className="text-red-500 hover:text-red-700"
                          >
                            <Trash2 className="h-4 w-4" />
                          </Button>
                        </div>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
              
              {convites.length === 0 && (
                <div className="text-center py-8 text-gray-500">
                  Nenhum convite encontrado
                </div>
              )}
            </CardContent>
          </Card>
        </div>
      </div>
    </MainLayout>
  );
};

export default UserManagement;
