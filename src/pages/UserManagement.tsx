
import { useState, useEffect } from 'react';
import MainLayout from '@/components/layout/MainLayout';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { UserPlus, Search, Users } from 'lucide-react';
import { toast } from 'sonner';
import { useAuth } from '@/contexts/AuthContext';
import { SistemaUsuario, CreateUserData, UpdateUserData } from '@/types/user';
import { userManagementService } from '@/services/userManagementService';
import UserForm from '@/components/users/UserForm';
import UsersList from '@/components/users/UsersList';

const UserManagement = () => {
  const { user: currentUser } = useAuth();
  const [users, setUsers] = useState<SistemaUsuario[]>([]);
  const [filteredUsers, setFilteredUsers] = useState<SistemaUsuario[]>([]);
  const [loading, setLoading] = useState(false);
  const [showForm, setShowForm] = useState(false);
  const [editingUser, setEditingUser] = useState<SistemaUsuario | undefined>();
  const [searchTerm, setSearchTerm] = useState('');
  const [formLoading, setFormLoading] = useState(false);

  useEffect(() => {
    loadUsers();
  }, []);

  useEffect(() => {
    // Filtrar usuários baseado no termo de busca
    if (searchTerm.trim() === '') {
      setFilteredUsers(users);
    } else {
      const filtered = users.filter(user => 
        user.nome.toLowerCase().includes(searchTerm.toLowerCase()) ||
        user.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
        user.telefone?.includes(searchTerm) ||
        user.role.toLowerCase().includes(searchTerm.toLowerCase())
      );
      setFilteredUsers(filtered);
    }
  }, [users, searchTerm]);

  const loadUsers = async () => {
    try {
      setLoading(true);
      const loadedUsers = await userManagementService.getAllUsers();
      setUsers(loadedUsers);
    } catch (error) {
      console.error('Erro ao carregar usuários:', error);
      toast.error('Erro ao carregar usuários');
    } finally {
      setLoading(false);
    }
  };

  const handleCreateUser = () => {
    setEditingUser(undefined);
    setShowForm(true);
  };

  const handleEditUser = (user: SistemaUsuario) => {
    setEditingUser(user);
    setShowForm(true);
  };

  const handleSaveUser = async (userData: CreateUserData | UpdateUserData) => {
    if (!currentUser) return;

    try {
      setFormLoading(true);
      
      if (editingUser) {
        // Atualizar usuário existente
        await userManagementService.updateUser(editingUser.id, userData);
        toast.success('Usuário atualizado com sucesso!');
      } else {
        // Criar novo usuário
        await userManagementService.createUser(userData as CreateUserData, currentUser.id);
        toast.success('Usuário criado com sucesso!');
      }
      
      setShowForm(false);
      setEditingUser(undefined);
      await loadUsers();
    } catch (error) {
      console.error('Erro ao salvar usuário:', error);
      toast.error(error instanceof Error ? error.message : 'Erro ao salvar usuário');
    } finally {
      setFormLoading(false);
    }
  };

  const handleDeleteUser = async (userId: string) => {
    try {
      await userManagementService.deleteUser(userId);
      toast.success('Usuário excluído com sucesso!');
      await loadUsers();
    } catch (error) {
      console.error('Erro ao excluir usuário:', error);
      toast.error('Erro ao excluir usuário');
    }
  };

  const handleToggleUserStatus = async (userId: string, ativo: boolean) => {
    try {
      await userManagementService.toggleUserStatus(userId, ativo);
      toast.success(`Usuário ${ativo ? 'ativado' : 'desativado'} com sucesso!`);
      await loadUsers();
    } catch (error) {
      console.error('Erro ao alterar status do usuário:', error);
      toast.error('Erro ao alterar status do usuário');
    }
  };

  const handleCancelForm = () => {
    setShowForm(false);
    setEditingUser(undefined);
  };

  if (showForm) {
    return (
      <MainLayout>
        <div className="space-y-6">
          <div className="flex items-center justify-between">
            <h1 className="text-2xl font-bold">
              {editingUser ? 'Editar Usuário' : 'Novo Usuário'}
            </h1>
          </div>
          
          <UserForm
            user={editingUser}
            onSave={handleSaveUser}
            onCancel={handleCancelForm}
            loading={formLoading}
          />
        </div>
      </MainLayout>
    );
  }

  return (
    <MainLayout>
      <div className="space-y-6">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Users className="h-6 w-6" />
            <h1 className="text-2xl font-bold">Gerenciamento de Usuários</h1>
          </div>
          <Button 
            onClick={handleCreateUser}
            className="bg-whatsapp hover:bg-whatsapp-dark"
          >
            <UserPlus className="mr-2 h-4 w-4" />
            Novo Usuário
          </Button>
        </div>

        <Card>
          <CardHeader>
            <CardTitle>Usuários do Sistema</CardTitle>
            <CardDescription>
              Gerencie todos os usuários, suas permissões e informações pessoais
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex items-center gap-4">
              <div className="relative flex-1 max-w-sm">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
                <Input
                  placeholder="Buscar por nome, email, telefone..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-10"
                />
              </div>
              <div className="text-sm text-gray-500">
                {filteredUsers.length} usuário(s) encontrado(s)
              </div>
            </div>

            <UsersList
              users={filteredUsers}
              onEdit={handleEditUser}
              onDelete={handleDeleteUser}
              onToggleStatus={handleToggleUserStatus}
              loading={loading}
            />
          </CardContent>
        </Card>
      </div>
    </MainLayout>
  );
};

export default UserManagement;
