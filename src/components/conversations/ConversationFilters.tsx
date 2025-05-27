
import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Button } from '@/components/ui/button';
import { Search, Filter, X } from 'lucide-react';

const ConversationFilters = () => {
  const [filters, setFilters] = useState({
    search: '',
    vendor: '',
    product: '',
    stage: '',
    status: '',
    source: ''
  });

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
            <SelectItem value="">Todos os vendedores</SelectItem>
            <SelectItem value="unassigned">Não atribuído</SelectItem>
            {/* Aqui você pode adicionar vendedores dinamicamente */}
          </SelectContent>
        </Select>

        {/* Produto */}
        <Select value={filters.product} onValueChange={(value) => setFilters(prev => ({ ...prev, product: value }))}>
          <SelectTrigger className="text-sm">
            <SelectValue placeholder="Produto" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="">Todos os produtos</SelectItem>
            <SelectItem value="cha-rmgi">Chá RMGI</SelectItem>
            <SelectItem value="keed">Produto Keed</SelectItem>
            <SelectItem value="braip">Produto Braip</SelectItem>
          </SelectContent>
        </Select>

        {/* Etapa do Funil */}
        <Select value={filters.stage} onValueChange={(value) => setFilters(prev => ({ ...prev, stage: value }))}>
          <SelectTrigger className="text-sm">
            <SelectValue placeholder="Etapa do funil" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="">Todas as etapas</SelectItem>
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
            <SelectItem value="">Todos os status</SelectItem>
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
            <SelectItem value="">Todas as fontes</SelectItem>
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
