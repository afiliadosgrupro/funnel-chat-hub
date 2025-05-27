
import { useEffect, useState, useRef } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { supabase } from '@/integrations/supabase/client';
import { useLeads } from '@/contexts/LeadContext';
import { cn } from '@/lib/utils';
import { Search, RefreshCw, Calendar, Filter } from 'lucide-react';
import { Badge } from '@/components/ui/badge';
import { Input } from '@/components/ui/input';
import { toast } from 'sonner';
import { Button } from '@/components/ui/button';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';
import { Calendar as CalendarComponent } from '@/components/ui/calendar';
import { format } from 'date-fns';
import { ptBR } from 'date-fns/locale';

interface Conversation {
  id: string;
  nome?: string;
  phone?: string;
  funil?: string;
  created_at?: string;
  lastMessage?: string;
  lastMessageAt?: string;
}

interface Filters {
  search: string;
  phone: string;
  funil: string;
  dateFrom?: Date;
  dateTo?: Date;
}

const stageBadgeColors = {
  'Apresentação': 'bg-green-500',
  'Identificação': 'bg-blue-500',
  'Conscientização': 'bg-purple-500',
  'Validação': 'bg-pink-500',
  'Negociação': 'bg-amber-500',
  'Objeção': 'bg-red-500',
  'Compra': 'bg-emerald-500',
  'default': 'bg-gray-500'
};

const funnelStages = [
  'Apresentação',
  'Identificação', 
  'Conscientização',
  'Validação',
  'Negociação',
  'Objeção',
  'Compra'
];

const FunnelOverview = () => {
  const { updateFilters, filters, setSelectedLeadId, selectedLeadId } = useLeads();
  const [conversations, setConversations] = useState<Conversation[]>([]);
  const [loading, setLoading] = useState(true);
  const [localFilters, setLocalFilters] = useState<Filters>({
    search: '',
    phone: '',
    funil: ''
  });
  
  const intervalRef = useRef<NodeJS.Timeout | null>(null);
  
  useEffect(() => {
    fetchConversations();
    
    // Configurar atualização automática a cada 2 minutos (120 segundos)
    intervalRef.current = setInterval(() => {
      fetchConversations();
    }, 120000);
    
    // Cleanup do interval quando o componente for desmontado
    return () => {
      if (intervalRef.current) {
        clearInterval(intervalRef.current);
      }
    };
  }, []);

  // Auto-selecionar a conversa mais recente quando os dados são carregados
  useEffect(() => {
    if (conversations.length > 0 && !selectedLeadId) {
      const mostRecent = conversations[0]; // Já está ordenado por data mais recente
      setSelectedLeadId(mostRecent.id);
    }
  }, [conversations, selectedLeadId, setSelectedLeadId]);
  
  const fetchConversations = async () => {
    // Não mostrar loading se for uma atualização automática e já temos dados
    if (conversations.length === 0) {
      setLoading(true);
    }
    
    try {
      // Buscar dados das tabelas Março | FUNIL Bruno e Março | Cadastro Bruno
      const { data: funnelData, error: funnelError } = await supabase
        .from('Março | FUNIL Bruno')
        .select('*')
        .order('created_at', { ascending: false });
      
      if (funnelError) throw funnelError;
      
      // Buscar nomes de contatos da tabela de cadastro
      const { data: cadastroData, error: cadastroError } = await supabase
        .from('Março | Cadastro Bruno')
        .select('id, name, phone');
      
      if (cadastroError) throw cadastroError;
      
      // Buscar as últimas mensagens da tabela chat_messages ordenadas por data mais recente
      const { data: messagesData, error: messagesError } = await supabase
        .from('chat_messages')
        .select('conversation_id, content, created_at')
        .order('created_at', { ascending: false });
      
      if (messagesError) throw messagesError;
      
      // Criar um mapa com os dados do cadastro
      const cadastroMap = new Map();
      cadastroData.forEach(item => {
        cadastroMap.set(item.id, {
          nome: item.name,
          phone: item.phone
        });
      });
      
      // Criar um mapa com as últimas mensagens por conversa
      const lastMessagesMap = new Map();
      messagesData.forEach(msg => {
        if (!lastMessagesMap.has(msg.conversation_id)) {
          lastMessagesMap.set(msg.conversation_id, {
            content: msg.content,
            timestamp: msg.created_at
          });
        }
      });
      
      // Combinar dados e ordenar por última mensagem mais recente
      const conversations = funnelData.map(funnel => {
        const cadastro = cadastroMap.get(funnel.id) || {};
        const lastMessage = lastMessagesMap.get(funnel.id);
        
        return {
          id: funnel.id,
          nome: cadastro.nome || 'Sem nome',
          phone: cadastro.phone || funnel.phone || 'Sem telefone',
          funil: funnel.funil || 'Apresentação',
          created_at: funnel.created_at,
          lastMessage: lastMessage?.content || 'Nenhuma mensagem',
          lastMessageAt: lastMessage?.timestamp || funnel.created_at
        };
      }).sort((a, b) => {
        // Ordenar por última mensagem mais recente
        const dateA = new Date(a.lastMessageAt || a.created_at || 0);
        const dateB = new Date(b.lastMessageAt || b.created_at || 0);
        return dateB.getTime() - dateA.getTime();
      });
      
      setConversations(conversations);
    } catch (err) {
      console.error('Erro ao buscar conversas:', err);
      toast.error('Erro ao carregar conversas');
    } finally {
      setLoading(false);
    }
  };

  const handleManualRefresh = () => {
    fetchConversations();
    toast.success('Conversas atualizadas');
  };

  const filteredConversations = conversations.filter(conv => {
    // Filtro por busca (nome)
    if (localFilters.search && !conv.nome?.toLowerCase().includes(localFilters.search.toLowerCase())) {
      return false;
    }
    
    // Filtro por telefone
    if (localFilters.phone && !conv.phone?.includes(localFilters.phone)) {
      return false;
    }
    
    // Filtro por funil
    if (localFilters.funil && conv.funil !== localFilters.funil) {
      return false;
    }
    
    // Filtro por data
    if (localFilters.dateFrom || localFilters.dateTo) {
      const convDate = new Date(conv.lastMessageAt || conv.created_at || 0);
      
      if (localFilters.dateFrom) {
        const fromDate = new Date(localFilters.dateFrom);
        fromDate.setHours(0, 0, 0, 0);
        if (convDate < fromDate) return false;
      }
      
      if (localFilters.dateTo) {
        const toDate = new Date(localFilters.dateTo);
        toDate.setHours(23, 59, 59, 999);
        if (convDate > toDate) return false;
      }
    }
    
    return true;
  });
  
  const formatDate = (dateStr?: string) => {
    if (!dateStr) return '';
    try {
      const date = new Date(dateStr);
      return new Intl.DateTimeFormat('pt-BR', {
        day: '2-digit',
        month: '2-digit',
        hour: '2-digit',
        minute: '2-digit'
      }).format(date);
    } catch (e) {
      return dateStr;
    }
  };
  
  const handleSelectLead = (leadId: string) => {
    console.log('Selecionando lead:', leadId);
    setSelectedLeadId(leadId);
  };

  const clearFilters = () => {
    setLocalFilters({
      search: '',
      phone: '',
      funil: ''
    });
  };

  const hasActiveFilters = localFilters.search || localFilters.phone || localFilters.funil || localFilters.dateFrom || localFilters.dateTo;
  
  return (
    <Card className="h-full flex flex-col">
      <CardHeader className="pb-2">
        <CardTitle className="text-lg font-medium">Conversas</CardTitle>
        
        {/* Busca por nome */}
        <div className="relative">
          <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-gray-500" />
          <Input
            type="search"
            placeholder="Buscar por nome..."
            className="pl-8"
            value={localFilters.search}
            onChange={(e) => setLocalFilters(prev => ({ ...prev, search: e.target.value }))}
          />
        </div>

        {/* Filtros adicionais */}
        <div className="grid grid-cols-2 gap-2">
          {/* Busca por telefone */}
          <Input
            type="search"
            placeholder="Buscar por número..."
            value={localFilters.phone}
            onChange={(e) => setLocalFilters(prev => ({ ...prev, phone: e.target.value }))}
          />

          {/* Filtro por funil */}
          <Select value={localFilters.funil} onValueChange={(value) => setLocalFilters(prev => ({ ...prev, funil: value === 'all' ? '' : value }))}>
            <SelectTrigger>
              <SelectValue placeholder="Todos os funis" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">Todos os funis</SelectItem>
              {funnelStages.map(stage => (
                <SelectItem key={stage} value={stage}>{stage}</SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>

        {/* Filtros de data */}
        <div className="grid grid-cols-2 gap-2">
          <Popover>
            <PopoverTrigger asChild>
              <Button variant="outline" className="justify-start text-left font-normal">
                <Calendar className="mr-2 h-4 w-4" />
                {localFilters.dateFrom ? format(localFilters.dateFrom, "dd/MM/yyyy", { locale: ptBR }) : "Data inicial"}
              </Button>
            </PopoverTrigger>
            <PopoverContent className="w-auto p-0">
              <CalendarComponent
                mode="single"
                selected={localFilters.dateFrom}
                onSelect={(date) => setLocalFilters(prev => ({ ...prev, dateFrom: date }))}
                initialFocus
              />
            </PopoverContent>
          </Popover>

          <Popover>
            <PopoverTrigger asChild>
              <Button variant="outline" className="justify-start text-left font-normal">
                <Calendar className="mr-2 h-4 w-4" />
                {localFilters.dateTo ? format(localFilters.dateTo, "dd/MM/yyyy", { locale: ptBR }) : "Data final"}
              </Button>
            </PopoverTrigger>
            <PopoverContent className="w-auto p-0">
              <CalendarComponent
                mode="single"
                selected={localFilters.dateTo}
                onSelect={(date) => setLocalFilters(prev => ({ ...prev, dateTo: date }))}
                initialFocus
              />
            </PopoverContent>
          </Popover>
        </div>

        {/* Botão para limpar filtros */}
        {hasActiveFilters && (
          <Button variant="outline" size="sm" onClick={clearFilters} className="self-start">
            <Filter className="mr-2 h-4 w-4" />
            Limpar filtros
          </Button>
        )}
        
        <div className="flex items-center justify-between mt-2">
          <span className="text-sm text-muted-foreground">
            {filteredConversations.length} conversas
          </span>
          <div className="flex items-center gap-2">
            <span className="text-xs text-muted-foreground">Atualiza a cada 2 min</span>
            <button 
              onClick={handleManualRefresh} 
              className="text-gray-400 hover:text-gray-600 transition-colors"
              disabled={loading}
              title="Atualizar agora"
            >
              <RefreshCw className={`h-4 w-4 ${loading ? 'animate-spin' : ''}`} />
            </button>
          </div>
        </div>
      </CardHeader>
      
      <CardContent className="flex-1 overflow-y-auto custom-scrollbar p-0">
        {loading && conversations.length === 0 ? (
          <div className="flex items-center justify-center h-full">
            <RefreshCw className="h-8 w-8 animate-spin text-whatsapp" />
          </div>
        ) : filteredConversations.length === 0 ? (
          <div className="flex flex-col items-center justify-center text-center p-8 h-full">
            <Search className="h-12 w-12 text-gray-400 mb-2" />
            <h3 className="text-lg font-medium text-gray-900">Nenhuma conversa encontrada</h3>
            <p className="text-gray-500">Tente ajustar seus filtros</p>
          </div>
        ) : (
          <ul className="divide-y">
            {filteredConversations.map((conv) => (
              <li 
                key={conv.id}
                className={cn(
                  "hover:bg-gray-50 cursor-pointer", 
                  selectedLeadId === conv.id ? "bg-gray-100" : ""
                )}
                onClick={() => handleSelectLead(conv.id)}
              >
                <div className="px-4 py-3">
                  <div className="flex justify-between items-start">
                    <div className="flex-1 min-w-0">
                      <div className="flex justify-between items-center mb-1">
                        <h4 className="font-medium truncate">{conv.nome}</h4>
                        <Badge className={cn("text-xs ml-2", stageBadgeColors[conv.funil as keyof typeof stageBadgeColors] || stageBadgeColors.default)}>
                          {conv.funil}
                        </Badge>
                      </div>
                      <div className="text-sm text-gray-600 mb-1">{conv.phone}</div>
                      <div className="text-sm text-gray-500 truncate mb-1">
                        {conv.lastMessage}
                      </div>
                      <div className="text-xs text-gray-400">
                        {formatDate(conv.lastMessageAt)}
                      </div>
                    </div>
                  </div>
                </div>
              </li>
            ))}
          </ul>
        )}
      </CardContent>
    </Card>
  );
};

export default FunnelOverview;
