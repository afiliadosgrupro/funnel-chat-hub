
import { useEffect, useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { supabase } from '@/integrations/supabase/client';
import { useLeads } from '@/contexts/LeadContext';
import { cn } from '@/lib/utils';
import { Search, RefreshCw } from 'lucide-react';
import { Badge } from '@/components/ui/badge';
import { Input } from '@/components/ui/input';
import { toast } from 'sonner';

interface Conversation {
  id: string;
  nome?: string;
  phone?: string;
  funil?: string;
  created_at?: string;
  lastMessage?: string;
  lastMessageAt?: string;
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

const FunnelOverview = () => {
  const { updateFilters, filters, setSelectedLeadId, selectedLeadId } = useLeads();
  const [conversations, setConversations] = useState<Conversation[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState('');
  
  useEffect(() => {
    fetchConversations();
  }, []);
  
  const fetchConversations = async () => {
    setLoading(true);
    
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
      
      // Buscar as últimas mensagens de cada conversa usando conversation_id
      const { data: messagesData, error: messagesError } = await supabase
        .from('Março | Menssagem Bruno')
        .select('conversation_id, message_content, created_at')
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
      
      // Criar um mapa com as últimas mensagens por conversa usando conversation_id
      const lastMessagesMap = new Map();
      messagesData.forEach(msg => {
        if (!lastMessagesMap.has(msg.conversation_id)) {
          lastMessagesMap.set(msg.conversation_id, {
            content: msg.message_content,
            timestamp: msg.created_at
          });
        }
      });
      
      console.log('Mapa de mensagens:', lastMessagesMap);
      
      // Combinar dados
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
      });
      
      setConversations(conversations);
    } catch (err) {
      console.error('Erro ao buscar conversas:', err);
      toast.error('Erro ao carregar conversas');
    } finally {
      setLoading(false);
    }
  };
  
  const filteredConversations = searchQuery 
    ? conversations.filter(conv => 
        conv.nome?.toLowerCase().includes(searchQuery.toLowerCase()) || 
        conv.phone?.includes(searchQuery))
    : conversations;
  
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
  
  const handleSearchSubmit = (e: React.FormEvent) => {
    e.preventDefault();
  };
  
  const handleSelectLead = (leadId: string) => {
    console.log('Selecionando lead:', leadId);
    setSelectedLeadId(leadId);
  };
  
  return (
    <Card className="h-full flex flex-col">
      <CardHeader className="pb-2">
        <CardTitle className="text-lg font-medium">Conversas</CardTitle>
        <form onSubmit={handleSearchSubmit} className="mt-2">
          <div className="relative">
            <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-gray-500" />
            <Input
              type="search"
              placeholder="Buscar conversas..."
              className="pl-8"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </div>
        </form>
        <div className="flex items-center justify-between mt-2">
          <span className="text-sm text-muted-foreground">
            {filteredConversations.length} conversas
          </span>
          <button 
            onClick={fetchConversations} 
            className="text-gray-400 hover:text-gray-600"
            disabled={loading}
          >
            <RefreshCw className={`h-4 w-4 ${loading ? 'animate-spin' : ''}`} />
          </button>
        </div>
      </CardHeader>
      <CardContent className="flex-1 overflow-y-auto custom-scrollbar p-0">
        {loading ? (
          <div className="flex items-center justify-center h-full">
            <RefreshCw className="h-8 w-8 animate-spin text-whatsapp" />
          </div>
        ) : filteredConversations.length === 0 ? (
          <div className="flex flex-col items-center justify-center text-center p-8 h-full">
            <Search className="h-12 w-12 text-gray-400 mb-2" />
            <h3 className="text-lg font-medium text-gray-900">Nenhuma conversa encontrada</h3>
            <p className="text-gray-500">Tente ajustar sua busca</p>
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
