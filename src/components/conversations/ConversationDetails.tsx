
import { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { User, Package, MessageSquare, Settings, Play, Pause, Save } from 'lucide-react';
import { supabase } from '@/integrations/supabase/client';
import { toast } from 'sonner';

interface ConversationDetailsProps {
  conversationId: string | null;
}

interface ConversationData {
  id: string;
  lead_id: string;
  nome_lead?: string;
  telefone_lead?: string;
  email_lead?: string;
  fonte_lead?: string;
  funil_etapa: string;
  status: string;
  automacao_pausada: boolean;
  criado_em: string;
  ultima_interacao: string;
  vendedor?: { id: string; nome: string; email: string };
  produto?: { id: string; nome: string };
  metadados?: any;
}

interface Message {
  id: string;
  content: string;
  sender_type: string;
  sender_name?: string;
  created_at: string;
  message_type: string;
}

interface SaasUser {
  id: string;
  nome_usuario: string;
  email: string;
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

const ConversationDetails = ({ conversationId }: ConversationDetailsProps) => {
  const [conversation, setConversation] = useState<ConversationData | null>(null);
  const [messages, setMessages] = useState<Message[]>([]);
  const [saasUsers, setSaasUsers] = useState<SaasUser[]>([]);
  const [products, setProducts] = useState<any[]>([]);
  const [loading, setLoading] = useState(false);

  const fetchConversationDetails = async (id: string) => {
    try {
      setLoading(true);
      
      // Buscar dados da conversa
      const { data: convData, error: convError } = await supabase
        .from('conversas_sistema')
        .select(`
          *,
          vendedor:sistema_usuarios(id, nome, email),
          produto:produtos(id, nome)
        `)
        .eq('id', id)
        .single();

      if (convError) throw convError;
      setConversation(convData);

      // Buscar mensagens
      const { data: msgData, error: msgError } = await supabase
        .from('chat_messages')
        .select('*')
        .eq('conversation_id', convData.lead_id)
        .order('created_at', { ascending: true });

      if (msgError) throw msgError;
      setMessages(msgData || []);

    } catch (error) {
      console.error('Erro ao carregar detalhes:', error);
      toast.error('Erro ao carregar detalhes da conversa');
    } finally {
      setLoading(false);
    }
  };

  const fetchSelectOptions = async () => {
    try {
      // Buscar usuários do SAAS (vendedores)
      const { data: saasData } = await supabase
        .from('SAAS_usuarios')
        .select('id, nome_usuario, email')
        .eq('ativo', true)
        .order('nome_usuario');

      setSaasUsers(saasData || []);

      // Buscar produtos
      const { data: productsData } = await supabase
        .from('produtos')
        .select('id, nome')
        .eq('ativo', true)
        .order('nome');

      setProducts(productsData || []);
    } catch (error) {
      console.error('Erro ao carregar opções:', error);
    }
  };

  useEffect(() => {
    fetchSelectOptions();
  }, []);

  useEffect(() => {
    if (conversationId) {
      fetchConversationDetails(conversationId);
    }
  }, [conversationId]);

  const updateConversation = async (field: string, value: any) => {
    if (!conversation) return;

    try {
      const { error } = await supabase
        .from('conversas_sistema')
        .update({ [field]: value })
        .eq('id', conversation.id);

      if (error) throw error;

      setConversation(prev => prev ? { ...prev, [field]: value } : null);
      toast.success('Conversa atualizada com sucesso');
    } catch (error) {
      console.error('Erro ao atualizar conversa:', error);
      toast.error('Erro ao atualizar conversa');
    }
  };

  const toggleAutomation = () => {
    if (conversation) {
      updateConversation('automacao_pausada', !conversation.automacao_pausada);
    }
  };

  if (!conversationId) {
    return (
      <Card className="h-[600px] flex items-center justify-center">
        <CardContent>
          <div className="text-center text-gray-500">
            <MessageSquare className="h-12 w-12 mx-auto mb-2" />
            <p>Selecione uma conversa para ver os detalhes</p>
          </div>
        </CardContent>
      </Card>
    );
  }

  if (loading || !conversation) {
    return (
      <Card className="h-[600px] flex items-center justify-center">
        <CardContent>
          <div className="text-center">
            <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-500 mx-auto"></div>
            <p className="mt-2 text-gray-500">Carregando...</p>
          </div>
        </CardContent>
      </Card>
    );
  }

  return (
    <Card className="h-[600px] flex flex-col">
      <CardHeader>
        <div className="flex justify-between items-center">
          <div>
            <CardTitle className="text-lg">{conversation.nome_lead}</CardTitle>
            <p className="text-sm text-gray-600">{conversation.telefone_lead}</p>
          </div>
          <div className="flex gap-2">
            <Button
              variant={conversation.automacao_pausada ? "default" : "secondary"}
              size="sm"
              onClick={toggleAutomation}
            >
              {conversation.automacao_pausada ? (
                <>
                  <Play className="h-4 w-4 mr-1" />
                  Ativar IA
                </>
              ) : (
                <>
                  <Pause className="h-4 w-4 mr-1" />
                  Pausar IA
                </>
              )}
            </Button>
          </div>
        </div>
      </CardHeader>

      <CardContent className="flex-1 overflow-hidden">
        <Tabs defaultValue="info" className="h-full flex flex-col">
          <TabsList className="grid w-full grid-cols-3">
            <TabsTrigger value="info">Informações</TabsTrigger>
            <TabsTrigger value="messages">Mensagens ({messages.length})</TabsTrigger>
            <TabsTrigger value="config">Configurações</TabsTrigger>
          </TabsList>

          <TabsContent value="info" className="flex-1 space-y-4 overflow-y-auto">
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="text-sm font-medium">Vendedor Responsável</label>
                <Select
                  value={conversation.vendedor?.id || 'unassigned'}
                  onValueChange={(value) => updateConversation('vendedor_id', value === 'unassigned' ? null : value)}
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Selecionar vendedor" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="unassigned">Não atribuído</SelectItem>
                    {saasUsers.map(user => (
                      <SelectItem key={user.id} value={user.id}>
                        {user.nome_usuario}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              <div>
                <label className="text-sm font-medium">Produto</label>
                <Select
                  value={conversation.produto?.id || 'none'}
                  onValueChange={(value) => updateConversation('produto_id', value === 'none' ? null : value)}
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Selecionar produto" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="none">Nenhum produto</SelectItem>
                    {products.map(product => (
                      <SelectItem key={product.id} value={product.id}>
                        {product.nome}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              <div>
                <label className="text-sm font-medium">Etapa do Funil</label>
                <Select
                  value={conversation.funil_etapa}
                  onValueChange={(value) => updateConversation('funil_etapa', value)}
                >
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="inicial">Inicial</SelectItem>
                    <SelectItem value="identification">Identificação</SelectItem>
                    <SelectItem value="awareness">Conscientização</SelectItem>
                    <SelectItem value="validation">Validação</SelectItem>
                    <SelectItem value="negotiation">Negociação</SelectItem>
                    <SelectItem value="objection">Objeção</SelectItem>
                    <SelectItem value="purchase">Compra</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div>
                <label className="text-sm font-medium">Status</label>
                <Select
                  value={conversation.status}
                  onValueChange={(value) => updateConversation('status', value)}
                >
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="ativo">Ativo</SelectItem>
                    <SelectItem value="pausado">Pausado</SelectItem>
                    <SelectItem value="finalizado">Finalizado</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>

            <div className="space-y-2">
              <h4 className="font-medium">Informações do Lead</h4>
              <div className="grid grid-cols-2 gap-2 text-sm">
                <div><strong>Email:</strong> {conversation.email_lead || 'Não informado'}</div>
                <div><strong>Fonte:</strong> {conversation.fonte_lead}</div>
                <div><strong>Criado em:</strong> {new Date(conversation.criado_em).toLocaleString('pt-BR')}</div>
                <div><strong>Última interação:</strong> {new Date(conversation.ultima_interacao).toLocaleString('pt-BR')}</div>
              </div>
            </div>

            <div className="space-y-2">
              <h4 className="font-medium">Vendedor Atribuído</h4>
              <div className="text-sm">
                {conversation.vendedor ? (
                  <div>
                    <strong>Nome:</strong> {conversation.vendedor.nome}<br/>
                    <strong>Email:</strong> {conversation.vendedor.email}
                  </div>
                ) : (
                  <span className="text-gray-500">Nenhum vendedor atribuído</span>
                )}
              </div>
            </div>
          </TabsContent>

          <TabsContent value="messages" className="flex-1 overflow-y-auto space-y-2">
            {messages.length === 0 ? (
              <div className="text-center text-gray-500 py-8">
                <MessageSquare className="h-8 w-8 mx-auto mb-2" />
                <p>Nenhuma mensagem encontrada</p>
              </div>
            ) : (
              messages.map(message => (
                <div
                  key={message.id}
                  className={`p-3 rounded-lg ${
                    message.sender_type === 'user' 
                      ? 'bg-gray-100 ml-4' 
                      : 'bg-blue-100 mr-4'
                  }`}
                >
                  <div className="flex justify-between items-start mb-1">
                    <span className="text-xs font-medium">
                      {message.sender_name || message.sender_type}
                    </span>
                    <span className="text-xs text-gray-500">
                      {new Date(message.created_at).toLocaleTimeString('pt-BR')}
                    </span>
                  </div>
                  <p className="text-sm">{message.content}</p>
                </div>
              ))
            )}
          </TabsContent>

          <TabsContent value="config" className="flex-1 space-y-4">
            <div>
              <h4 className="font-medium mb-2">Configurações da Conversa</h4>
              <p className="text-sm text-gray-600">
                Configurações avançadas serão implementadas em breve...
              </p>
            </div>
          </TabsContent>
        </Tabs>
      </CardContent>
    </Card>
  );
};

export default ConversationDetails;
