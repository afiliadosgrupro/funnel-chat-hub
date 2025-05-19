
import { useState } from 'react';
import MainLayout from '@/components/layout/MainLayout';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { useAuth } from '@/contexts/AuthContext';
import { Navigate } from 'react-router-dom';
import { UserPlus, Save, Trash2, User, Settings, Link } from 'lucide-react';

const Admin = () => {
  const { user } = useAuth();
  
  // Sample mock data for the admin panel
  const [sellers] = useState([
    { id: '2', name: 'Seller User', email: 'seller@example.com', role: 'seller', status: 'active' },
    { id: '3', name: 'Maria Silva', email: 'maria@example.com', role: 'seller', status: 'active' },
    { id: '4', name: 'João Santos', email: 'joao@example.com', role: 'seller', status: 'inactive' },
  ]);
  
  if (!user || user.role !== 'admin') {
    return <Navigate to="/dashboard" replace />;
  }

  return (
    <MainLayout>
      <div className="space-y-6">
        <div className="flex items-center justify-between">
          <h1 className="text-2xl font-bold">Painel Administrativo</h1>
        </div>
        
        <Tabs defaultValue="users">
          <TabsList className="grid w-full grid-cols-3 lg:w-[400px]">
            <TabsTrigger value="users" className="flex items-center gap-2">
              <User className="w-4 h-4" />
              <span>Usuários</span>
            </TabsTrigger>
            <TabsTrigger value="integrations" className="flex items-center gap-2">
              <Link className="w-4 h-4" />
              <span>Integrações</span>
            </TabsTrigger>
            <TabsTrigger value="settings" className="flex items-center gap-2">
              <Settings className="w-4 h-4" />
              <span>Configurações</span>
            </TabsTrigger>
          </TabsList>
          
          <TabsContent value="users" className="space-y-4 mt-4">
            <Card>
              <CardHeader>
                <div className="flex items-center justify-between">
                  <div>
                    <CardTitle>Gerenciar Vendedores</CardTitle>
                    <CardDescription>
                      Adicione ou edite contas de vendedores
                    </CardDescription>
                  </div>
                  <Button className="bg-whatsapp hover:bg-whatsapp-dark">
                    <UserPlus className="mr-2 h-4 w-4" />
                    Novo Vendedor
                  </Button>
                </div>
              </CardHeader>
              <CardContent>
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Nome</TableHead>
                      <TableHead>Email</TableHead>
                      <TableHead>Função</TableHead>
                      <TableHead>Status</TableHead>
                      <TableHead className="text-right">Ações</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {sellers.map((seller) => (
                      <TableRow key={seller.id}>
                        <TableCell className="font-medium">{seller.name}</TableCell>
                        <TableCell>{seller.email}</TableCell>
                        <TableCell>
                          <span className="capitalize">{seller.role}</span>
                        </TableCell>
                        <TableCell>
                          <span className={`inline-block h-2 w-2 rounded-full ${
                            seller.status === 'active' ? 'bg-green-500' : 'bg-gray-400'
                          } mr-2`}></span>
                          <span className="capitalize">{seller.status}</span>
                        </TableCell>
                        <TableCell className="text-right">
                          <Button variant="ghost" size="sm">
                            Editar
                          </Button>
                          <Button variant="ghost" size="sm" className="text-red-500 hover:text-red-700">
                            <Trash2 className="h-4 w-4" />
                          </Button>
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </CardContent>
            </Card>
          </TabsContent>
          
          <TabsContent value="integrations" className="space-y-4 mt-4">
            <Card>
              <CardHeader>
                <CardTitle>Configurações de Integração</CardTitle>
                <CardDescription>
                  Configure as conexões com sistemas externos
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div>
                  <h3 className="font-medium mb-2">n8n Webhook</h3>
                  <div className="space-y-3">
                    <div className="grid gap-2">
                      <Label htmlFor="webhook-url">URL do Webhook</Label>
                      <div className="flex gap-2">
                        <Input id="webhook-url" defaultValue="https://n8n.example.com/webhook/r5f3e2d1" className="flex-1" />
                        <Button variant="secondary">Copiar</Button>
                      </div>
                    </div>
                    <div className="grid gap-2">
                      <Label htmlFor="webhook-secret">Segredo do Webhook</Label>
                      <div className="flex gap-2">
                        <Input id="webhook-secret" type="password" defaultValue="s3cr3t" className="flex-1" />
                        <Button variant="secondary">Mostrar</Button>
                      </div>
                    </div>
                  </div>
                </div>
                
                <div>
                  <h3 className="font-medium mb-2">Supabase</h3>
                  <div className="space-y-3">
                    <div className="grid gap-2">
                      <Label htmlFor="supabase-url">URL do Supabase</Label>
                      <Input id="supabase-url" defaultValue="https://example.supabase.co" />
                    </div>
                    <div className="grid gap-2">
                      <Label htmlFor="supabase-key">Chave de API</Label>
                      <div className="flex gap-2">
                        <Input id="supabase-key" type="password" defaultValue="sb-key" className="flex-1" />
                        <Button variant="secondary">Mostrar</Button>
                      </div>
                    </div>
                  </div>
                </div>
                
                <div>
                  <h3 className="font-medium mb-2">Evolution API</h3>
                  <div className="space-y-3">
                    <div className="grid gap-2">
                      <Label htmlFor="evolution-url">URL da API</Label>
                      <Input id="evolution-url" defaultValue="https://evolution-api.example.com" />
                    </div>
                    <div className="grid gap-2">
                      <Label htmlFor="evolution-key">Chave de API</Label>
                      <div className="flex gap-2">
                        <Input id="evolution-key" type="password" defaultValue="ev-api-key" className="flex-1" />
                        <Button variant="secondary">Mostrar</Button>
                      </div>
                    </div>
                    <div className="grid gap-2">
                      <Label htmlFor="evolution-instance">Instância do WhatsApp</Label>
                      <Input id="evolution-instance" defaultValue="bot-vendas" />
                    </div>
                  </div>
                </div>
                
                <Button className="bg-whatsapp hover:bg-whatsapp-dark">
                  <Save className="mr-2 h-4 w-4" />
                  Salvar Configurações
                </Button>
              </CardContent>
            </Card>
          </TabsContent>
          
          <TabsContent value="settings" className="space-y-4 mt-4">
            <Card>
              <CardHeader>
                <CardTitle>Configurações Gerais</CardTitle>
                <CardDescription>
                  Personalize a aparência e comportamento da plataforma
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid gap-2">
                  <Label htmlFor="company-name">Nome da Empresa</Label>
                  <Input id="company-name" defaultValue="NutriSales" />
                </div>
                
                <div className="grid gap-2">
                  <Label>Tema de Cores</Label>
                  <div className="flex gap-4">
                    <div className="space-y-2">
                      <div className="w-10 h-10 rounded-full bg-whatsapp border-2 border-gray-200 cursor-pointer"></div>
                      <span className="text-xs text-center block">Padrão</span>
                    </div>
                    <div className="space-y-2">
                      <div className="w-10 h-10 rounded-full bg-blue-600 cursor-pointer"></div>
                      <span className="text-xs text-center block">Azul</span>
                    </div>
                    <div className="space-y-2">
                      <div className="w-10 h-10 rounded-full bg-purple-600 cursor-pointer"></div>
                      <span className="text-xs text-center block">Roxo</span>
                    </div>
                    <div className="space-y-2">
                      <div className="w-10 h-10 rounded-full bg-gray-800 cursor-pointer"></div>
                      <span className="text-xs text-center block">Escuro</span>
                    </div>
                  </div>
                </div>
                
                <div className="grid gap-2">
                  <Label htmlFor="timeout">Timeout de Inatividade</Label>
                  <Select defaultValue="30">
                    <SelectTrigger>
                      <SelectValue placeholder="Selecione um tempo" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="10">10 minutos</SelectItem>
                      <SelectItem value="20">20 minutos</SelectItem>
                      <SelectItem value="30">30 minutos</SelectItem>
                      <SelectItem value="60">1 hora</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                
                <div className="grid gap-2">
                  <Label htmlFor="default-product">Produto Padrão</Label>
                  <Select defaultValue="rmgi">
                    <SelectTrigger>
                      <SelectValue placeholder="Selecione o produto" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="rmgi">Chá RMGI</SelectItem>
                      <SelectItem value="vitamina">Complexo Vitamínico</SelectItem>
                      <SelectItem value="omega">Ômega 3</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                
                <Button className="bg-whatsapp hover:bg-whatsapp-dark">
                  <Save className="mr-2 h-4 w-4" />
                  Salvar Configurações
                </Button>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </MainLayout>
  );
};

export default Admin;
