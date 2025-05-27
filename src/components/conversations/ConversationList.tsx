
import { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { RefreshCw, MessageSquare, User, Package } from 'lucide-react';
import { supabase } from '@/integrations/supabase/client';
import { toast } from 'sonner';
import { cn } from '@/lib/utils';

interface Conversation {
  id: string;
  lead_id: string;
  nome_lead?: string;
  telefone_lead?: string;
  fonte_lead?: string;
  funil_etapa: string;
  status: string;
  automacao_pausada: boolean;
  ultima_interacao: string;
  vendedor_nome?: string;
  produto_nome?: string;
  total_mensagens?: number;
}

interface ConversationListProps {
  selectedId: string | null;
  onSelect: (id: string) => void;
}

const stageBadgeColors = {
  'inicial': 'bg-gray-500',
  'identification': 'bg-blue-500',
  'awareness': 'bg-purple-500',
  'validation': 'bg-pink-500',
  'negotiation': 'bg-amber-500',
  'objection': 'bg-red-500',
  'purchase': 'bg-emerald-500',
};

const ConversationList = ({ selectedId, onSelect }: ConversationListProps) => {
  const [conversations, setConversations] = useState<Conversation[]>([]);
  const [loading, setLoading] = useState(true);

  const fetchConversations = async () => {
    try {
      setLoading(true);
      
      const { data, error } = await supabase
        .from('conversas_sistema')
        .select(`
          *,
          vendedor:sistema_usuarios(nome),
          produto:produtos(nome),
          mensagens:chat_messages(count)
        `)
        .order('ultima_interacao', { ascending: false });

      if (error) throw error;

      const formattedData = data.map(conv => ({
        id: conv.id,
        lead_id: conv.lead_id,
        nome_lead: conv.nome_lead || 'Sem nome',
        telefone_lead: conv.telefone_lead || 'Sem telefone',
        fonte_lead: conv.fonte_lead || 'Sistema',
        funil_etapa: conv.funil_etapa,
        status: conv.status,
        automacao_pausada: conv.automacao_pausada,
        ultima_interacao: conv.ultima_interacao,
        vendedor_nome: conv.vendedor?.nome || 'Não atribuído',
        produto_nome: conv.produto?.nome || 'Não definido',
        total_mensagens: Array.isArray(conv.mensagens) ? conv.mensagens.length : 0,
      }));

      setConversations(formattedData);
    } catch (error) {
      console.error('Erro ao carregar conversas:', error);
      toast.error('Erro ao carregar conversas');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchConversations();
  }, []);

  const formatDate = (dateStr: string) => {
    try {
      const date = new Date(dateStr);
      return new Intl.DateTimeFormat('pt-BR', {
        day: '2-digit',
        month: '2-digit',
        hour: '2-digit',
        minute: '2-digit'
      }).format(date);
    } catch {
      return dateStr;
    }
  };

  return (
    <Card className="h-[600px] flex flex-col">
      <CardHeader className="pb-2">
        <div className="flex justify-between items-center">
          <CardTitle className="text-lg">Conversas</CardTitle>
          <Button
            variant="ghost"
            size="icon"
            onClick={fetchConversations}
            disabled={loading}
          >
            <RefreshCw className={cn("h-4 w-4", loading && "animate-spin")} />
          </Button>
        </div>
        <div className="text-sm text-gray-600">
          {conversations.length} conversas encontradas
        </div>
      </CardHeader>
      
      <CardContent className="flex-1 overflow-y-auto p-0">
        {loading ? (
          <div className="flex items-center justify-center h-full">
            <RefreshCw className="h-8 w-8 animate-spin text-blue-500" />
          </div>
        ) : conversations.length === 0 ? (
          <div className="flex flex-col items-center justify-center h-full text-center p-4">
            <MessageSquare className="h-12 w-12 text-gray-400 mb-2" />
            <h3 className="text-lg font-medium text-gray-900">Nenhuma conversa</h3>
            <p className="text-gray-500">Não há conversas para exibir</p>
          </div>
        ) : (
          <div className="divide-y">
            {conversations.map((conv) => (
              <div
                key={conv.id}
                className={cn(
                  "p-4 cursor-pointer hover:bg-gray-50 transition-colors",
                  selectedId === conv.id && "bg-blue-50 border-r-2 border-blue-500"
                )}
                onClick={() => onSelect(conv.id)}
              >
                <div className="space-y-2">
                  {/* Nome e Status */}
                  <div className="flex justify-between items-start">
                    <h4 className="font-medium text-sm truncate flex-1">
                      {conv.nome_lead}
                    </h4>
                    <Badge 
                      className={cn(
                        "text-xs ml-2",
                        stageBadgeColors[conv.funil_etapa as keyof typeof stageBadgeColors] || 'bg-gray-500'
                      )}
                    >
                      {conv.funil_etapa}
                    </Badge>
                  </div>

                  {/* Telefone e Fonte */}
                  <div className="text-xs text-gray-600">
                    <div>{conv.telefone_lead}</div>
                    <div className="flex items-center gap-1">
                      <Package className="h-3 w-3" />
                      {conv.fonte_lead}
                    </div>
                  </div>

                  {/* Vendedor e Produto */}
                  <div className="text-xs text-gray-500">
                    <div className="flex items-center gap-1">
                      <User className="h-3 w-3" />
                      {conv.vendedor_nome}
                    </div>
                    <div>{conv.produto_nome}</div>
                  </div>

                  {/* Última interação e mensagens */}
                  <div className="flex justify-between items-center text-xs text-gray-400">
                    <span>{formatDate(conv.ultima_interacao)}</span>
                    <div className="flex items-center gap-1">
                      <MessageSquare className="h-3 w-3" />
                      {conv.total_mensagens}
                    </div>
                  </div>

                  {/* Status da automação */}
                  {conv.automacao_pausada && (
                    <Badge variant="outline" className="text-xs">
                      Automação Pausada
                    </Badge>
                  )}
                </div>
              </div>
            ))}
          </div>
        )}
      </CardContent>
    </Card>
  );
};

export default ConversationList;
