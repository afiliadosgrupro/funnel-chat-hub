
import { useState } from 'react';
import { useLeads } from '@/contexts/LeadContext';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Search, Filter, RefreshCw } from 'lucide-react';
import { cn } from '@/lib/utils';
import { Badge } from '@/components/ui/badge';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import LeadListItem from './LeadListItem';

const LeadList = () => {
  const { 
    filteredLeads, 
    selectedLeadId, 
    setSelectedLeadId, 
    filters,
    updateFilters,
    loading,
    refreshLeads
  } = useLeads();
  
  const [searchQuery, setSearchQuery] = useState(filters.search);
  
  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    updateFilters({ search: searchQuery });
  };
  
  const handleRefresh = () => {
    refreshLeads();
  };

  return (
    <div className="border rounded-md h-full flex flex-col">
      <div className="p-4 border-b bg-gray-50">
        <form onSubmit={handleSearch} className="flex gap-2">
          <div className="relative flex-1">
            <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-gray-500" />
            <Input
              type="search"
              placeholder="Buscar leads..."
              className="pl-8"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </div>
          <Button 
            type="submit" 
            size="icon" 
            variant="ghost"
            className="border"
          >
            <Filter className="h-4 w-4" />
          </Button>
          <Button 
            type="button" 
            size="icon" 
            variant="ghost"
            className="border"
            onClick={handleRefresh}
            disabled={loading.leads}
          >
            <RefreshCw className={cn("h-4 w-4", loading.leads && "animate-spin")} />
          </Button>
        </form>
        <div className="flex gap-2 mt-2">
          <Select
            value={filters.stage}
            onValueChange={(value) => updateFilters({ stage: value as any })}
          >
            <SelectTrigger className="h-8 text-xs w-[140px]">
              <SelectValue placeholder="Etapa do funil" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">Todas as etapas</SelectItem>
              <SelectItem value="initial">Apresentação</SelectItem>
              <SelectItem value="identification">Identificação</SelectItem>
              <SelectItem value="awareness">Conscientização</SelectItem>
              <SelectItem value="validation">Validação</SelectItem>
              <SelectItem value="negotiation">Negociação</SelectItem>
              <SelectItem value="objection">Quebra de Objeção</SelectItem>
              <SelectItem value="purchase">Compra</SelectItem>
            </SelectContent>
          </Select>
          
          <Select
            value={filters.assignee}
            onValueChange={(value) => updateFilters({ assignee: value as any })}
          >
            <SelectTrigger className="h-8 text-xs w-[140px]">
              <SelectValue placeholder="Atribuição" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">Todos</SelectItem>
              <SelectItem value="me">Meus leads</SelectItem>
              <SelectItem value="unassigned">Não atribuídos</SelectItem>
            </SelectContent>
          </Select>
          
          <Select
            value={filters.date}
            onValueChange={(value) => updateFilters({ date: value as any })}
          >
            <SelectTrigger className="h-8 text-xs w-[140px]">
              <SelectValue placeholder="Data" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">Todo período</SelectItem>
              <SelectItem value="today">Hoje</SelectItem>
              <SelectItem value="week">Últimos 7 dias</SelectItem>
              <SelectItem value="month">Últimos 30 dias</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </div>

      <div className="flex-1 overflow-y-auto custom-scrollbar">
        {loading.leads ? (
          <div className="flex items-center justify-center h-full">
            <RefreshCw className="h-8 w-8 animate-spin text-whatsapp" />
          </div>
        ) : filteredLeads.length === 0 ? (
          <div className="flex flex-col items-center justify-center text-center p-8 h-full">
            <Search className="h-12 w-12 text-gray-400 mb-2" />
            <h3 className="text-lg font-medium text-gray-900">Nenhum lead encontrado</h3>
            <p className="text-gray-500">Tente ajustar seus filtros ou busque por outro termo</p>
          </div>
        ) : (
          <ul>
            {filteredLeads.map((lead) => (
              <LeadListItem
                key={lead.id}
                lead={lead}
                isSelected={selectedLeadId === lead.id}
                onClick={() => setSelectedLeadId(lead.id)}
              />
            ))}
          </ul>
        )}
      </div>
      <div className="p-3 border-t bg-gray-50 text-sm text-gray-500">
        {filteredLeads.length} lead(s) encontrado(s)
      </div>
    </div>
  );
};

export default LeadList;
