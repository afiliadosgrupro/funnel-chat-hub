
import { useState, useEffect } from 'react';
import MainLayout from '@/components/layout/MainLayout';
import { useAuth } from '@/contexts/AuthContext';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Search, Filter, Users, MessageSquare, Package, Settings } from 'lucide-react';
import ConversationList from '@/components/conversations/ConversationList';
import ConversationDetails from '@/components/conversations/ConversationDetails';
import ConversationFilters from '@/components/conversations/ConversationFilters';
import { toast } from 'sonner';

const ConversationManagement = () => {
  const { user } = useAuth();
  const [selectedConversationId, setSelectedConversationId] = useState<string | null>(null);
  const [activeTab, setActiveTab] = useState('all');

  // Verificar permissões
  if (!user || (user.role !== 'admin' && user.role !== 'dev')) {
    return (
      <MainLayout>
        <div className="flex items-center justify-center h-[60vh]">
          <Card className="w-96">
            <CardContent className="pt-6">
              <div className="text-center">
                <h3 className="text-lg font-semibold mb-2">Acesso Negado</h3>
                <p className="text-gray-600">
                  Você não tem permissão para acessar o gerenciamento de conversas.
                </p>
              </div>
            </CardContent>
          </Card>
        </div>
      </MainLayout>
    );
  }

  return (
    <MainLayout>
      <div className="space-y-6">
        {/* Header */}
        <div className="flex justify-between items-center">
          <div>
            <h1 className="text-2xl font-bold">Gerenciamento de Conversas</h1>
            <p className="text-gray-600">
              Gerencie conversas de todos os vendedores e produtos
            </p>
          </div>
          <div className="bg-blue-50 rounded-lg p-3">
            <div className="text-sm text-gray-600">
              Usuário: <span className="font-semibold">{user?.name}</span>
            </div>
            <div className="text-sm text-gray-600">
              Acesso: <span className="font-semibold capitalize">{user?.role}</span>
            </div>
          </div>
        </div>

        {/* Tabs principais */}
        <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
          <TabsList className="grid w-full grid-cols-4">
            <TabsTrigger value="all" className="flex items-center gap-2">
              <MessageSquare className="h-4 w-4" />
              Todas as Conversas
            </TabsTrigger>
            <TabsTrigger value="vendors" className="flex items-center gap-2">
              <Users className="h-4 w-4" />
              Por Vendedor
            </TabsTrigger>
            <TabsTrigger value="products" className="flex items-center gap-2">
              <Package className="h-4 w-4" />
              Por Produto
            </TabsTrigger>
            <TabsTrigger value="settings" className="flex items-center gap-2">
              <Settings className="h-4 w-4" />
              Configurações
            </TabsTrigger>
          </TabsList>

          <TabsContent value="all" className="space-y-4">
            <div className="grid lg:grid-cols-4 gap-6">
              {/* Filtros e Lista de Conversas */}
              <div className="lg:col-span-1">
                <ConversationFilters />
                <div className="mt-4">
                  <ConversationList 
                    selectedId={selectedConversationId}
                    onSelect={setSelectedConversationId}
                  />
                </div>
              </div>
              
              {/* Detalhes da Conversa */}
              <div className="lg:col-span-3">
                <ConversationDetails conversationId={selectedConversationId} />
              </div>
            </div>
          </TabsContent>

          <TabsContent value="vendors" className="space-y-4">
            <Card>
              <CardHeader>
                <CardTitle>Conversas por Vendedor</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-gray-600">
                  Visualização e estatísticas por vendedor em desenvolvimento...
                </p>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="products" className="space-y-4">
            <Card>
              <CardHeader>
                <CardTitle>Conversas por Produto</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-gray-600">
                  Visualização e estatísticas por produto em desenvolvimento...
                </p>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="settings" className="space-y-4">
            <Card>
              <CardHeader>
                <CardTitle>Configurações do Sistema</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-gray-600">
                  Configurações de produtos, fontes e automações em desenvolvimento...
                </p>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </MainLayout>
  );
};

export default ConversationManagement;
