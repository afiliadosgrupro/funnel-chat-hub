
import { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Button } from '@/components/ui/button';
import { Search, Filter, X } from 'lucide-react';
import { supabase } from '@/integrations/supabase/client';

interface SaasUser {
  id: string;
  nome_usuario: string;
  email: string;
}

interface Product {
  id: string;
  nome: string;
}

const ConversationFilters = () => {
  const [filters, setFilters] = useState({
    search: '',
    vendor: '',
    product: '',
    stage: '',
    status: '',
    source: ''
  });
  
  const [saasUsers, setSaasUsers] = useState<SaasUser[]>([]);
  const [products, setProducts] = useState<Product[]>([]);

  useEffect(() => {
    fetchFilterOptions();
  }, []);

  const fetchFilterOptions = async () => {
    try {
      // Buscar usuários SAAS (vendedores)
      const { data: usersData } = await supabase
        .from('SAAS_usuarios')
        .select('id, nome_usuario, email')
        .eq('ativo', true)
        .order('nome_usuario');

      setSaasUsers(usersData || []);

      // Buscar produtos
      const { data: productsData } = await supabase
        .from('produtos')
        .select('id, nome')
        .eq('ativo', true)
        .order('nome');

      setProducts(productsData || []);
    } catch (error) {
      console.error('Erro ao carregar opções de filtro:', error);
    }
  };

  const clearFilters = () => {
    setFilters({
      search: '',
      vendor: '',
      product: '',
      stage: '',
      status: '',
      source: ''
    });
  };

  const hasActiveFilters = Object.values(filters).some(filter => filter !== '');

  return (
    <Card>
      <CardHeader className="pb-2">
        <div className="flex justify-between items-center">
          <CardTitle className="text-sm">Filtros</CardTitle>
          {hasActiveFilters && (
            <Button
              variant="ghost"
              size="sm"
              onClick={clearFilters}
              className="text-xs"
            >
              <X className="h-3 w-3 mr-1" />
              Limpar
            </Button>
          )}
        </div>
      </CardHeader>
      
      <CardContent className="space-y-3">
        {/* Busca */}
        <div className="relative">
          <Search className="absolute left-2 top-2.5 h-4 w-4 text-gray-500" />
          <Input
            placeholder="Buscar por nome..."
            value={filters.search}
            onChange={(e) => setFilters(prev => ({ ...prev, search: e.target.value }))}
            className="pl-8 text-sm"
          />
        </div>

        {/* Vendedor */}
        <Select value={filters.vendor} onValueChange={(value) => setFilters(prev => ({ ...prev, vendor: value }))}>
          <SelectTrigger className="text-sm">
            <SelectValue placeholder="Vendedor" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">Todos os vendedores</SelectItem>
            <SelectItem value="unassigned">Não atribuído</SelectItem>
            {saasUsers.map(user => (
              <SelectItem key={user.id} value={user.id}>
                {user.nome_usuario}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>

        {/* Produto */}
        <Select value={filters.product} onValueChange={(value) => setFilters(prev => ({ ...prev, product: value }))}>
          <SelectTrigger className="text-sm">
            <SelectValue placeholder="Produto" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">Todos os produtos</SelectItem>
            <SelectItem value="none">Sem produto</SelectItem>
            {products.map(product => (
              <SelectItem key={product.id} value={product.id}>
                {product.nome}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>

        {/* Etapa do Funil */}
        <Select value={filters.stage} onValueChange={(value) => setFilters(prev => ({ ...prev, stage: value }))}>
          <SelectTrigger className="text-sm">
            <SelectValue placeholder="Etapa do funil" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">Todas as etapas</SelectItem>
            <SelectItem value="inicial">Inicial</SelectItem>
            <SelectItem value="identification">Identificação</SelectItem>
            <SelectItem value="awareness">Conscientização</SelectItem>
            <SelectItem value="validation">Validação</SelectItem>
            <SelectItem value="negotiation">Negociação</SelectItem>
            <SelectItem value="objection">Objeção</SelectItem>
            <SelectItem value="purchase">Compra</SelectItem>
          </SelectContent>
        </Select>

        {/* Status */}
        <Select value={filters.status} onValueChange={(value) => setFilters(prev => ({ ...prev, status: value }))}>
          <SelectTrigger className="text-sm">
            <SelectValue placeholder="Status" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">Todos os status</SelectItem>
            <SelectItem value="ativo">Ativo</SelectItem>
            <SelectItem value="pausado">Pausado</SelectItem>
            <SelectItem value="finalizado">Finalizado</SelectItem>
          </SelectContent>
        </Select>

        {/* Fonte */}
        <Select value={filters.source} onValueChange={(value) => setFilters(prev => ({ ...prev, source: value }))}>
          <SelectTrigger className="text-sm">
            <SelectValue placeholder="Fonte" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">Todas as fontes</SelectItem>
            <SelectItem value="março">Março</SelectItem>
            <SelectItem value="keed">Keed</SelectItem>
            <SelectItem value="braip">Braip</SelectItem>
            <SelectItem value="sistema">Sistema</SelectItem>
          </SelectContent>
        </Select>
      </CardContent>
    </Card>
  );
};

export default ConversationFilters;
