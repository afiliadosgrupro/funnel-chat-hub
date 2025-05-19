
import React, { createContext, useContext, useState, useEffect } from 'react';
import { Lead, Message, FunnelStage } from '@/types/lead';
import { useAuth } from './AuthContext';
import { supabase } from '@/integrations/supabase/client';
import { toast } from 'sonner';

// Sample mock data
const MOCK_LEADS: Lead[] = [
  {
    id: '1',
    name: 'João Silva',
    phone: '5511999991111',
    stage: 'negotiation',
    stageUpdatedAt: new Date().toISOString(),
    assignedTo: null,
    isHot: true,
    lastMessageAt: new Date().toISOString(),
    lastMessage: 'Olá, estou interessado no produto',
    symptoms: ['dor nas costas', 'insônia'],
    problemDuration: '3 meses',
    attemptsToSolve: ['fisioterapia', 'medicação'],
    isActive: true,
    isAutomationPaused: false
  },
  {
    id: '2',
    name: 'Maria Oliveira',
    phone: '5511888882222',
    stage: 'awareness',
    stageUpdatedAt: new Date(Date.now() - 24 * 60 * 60 * 1000).toISOString(),
    assignedTo: null,
    isHot: false,
    lastMessageAt: new Date(Date.now() - 2 * 60 * 60 * 1000).toISOString(),
    lastMessage: 'Quais são os benefícios do produto?',
    symptoms: ['fadiga', 'baixa imunidade'],
    problemDuration: '6 meses',
    attemptsToSolve: ['vitaminas', 'suplementos'],
    isActive: true,
    isAutomationPaused: false
  },
  {
    id: '3',
    name: 'Pedro Santos',
    phone: '5511777773333',
    stage: 'validation',
    stageUpdatedAt: new Date(Date.now() - 12 * 60 * 60 * 1000).toISOString(),
    assignedTo: '2',
    isHot: true,
    lastMessageAt: new Date(Date.now() - 30 * 60 * 1000).toISOString(),
    lastMessage: 'Quanto custa o tratamento completo?',
    symptoms: ['problemas digestivos', 'refluxo'],
    problemDuration: '1 ano',
    attemptsToSolve: ['medicação', 'dieta'],
    isActive: true,
    isAutomationPaused: false
  },
  {
    id: '4',
    name: 'Ana Souza',
    phone: '5511666664444',
    stage: 'objection',
    stageUpdatedAt: new Date(Date.now() - 4 * 60 * 60 * 1000).toISOString(),
    assignedTo: '2',
    isHot: true,
    lastMessageAt: new Date(Date.now() - 10 * 60 * 1000).toISOString(),
    lastMessage: 'Achei o valor muito alto',
    symptoms: ['dores articulares', 'inflamação'],
    problemDuration: '2 anos',
    attemptsToSolve: ['fisioterapia', 'antiinflamatórios'],
    isActive: true,
    isAutomationPaused: true
  },
  {
    id: '5',
    name: 'Lucas Mendes',
    phone: '5511555555555',
    stage: 'initial',
    stageUpdatedAt: new Date(Date.now() - 1 * 60 * 60 * 1000).toISOString(),
    assignedTo: null,
    isHot: false,
    lastMessageAt: new Date(Date.now() - 1 * 60 * 60 * 1000).toISOString(),
    lastMessage: 'Olá, vi seu anúncio',
    isActive: true,
    isAutomationPaused: false
  }
];

const MOCK_MESSAGES: Record<string, Message[]> = {
  '1': [
    {
      id: '1-1',
      leadId: '1',
      content: 'Olá, estou interessado no produto',
      sentAt: new Date(Date.now() - 2 * 60 * 60 * 1000).toISOString(),
      isFromLead: true,
      isAutomated: false
    },
    {
      id: '1-2',
      leadId: '1',
      content: 'Olá João! Que bom que você está interessado no chá RMGI. Ele tem ajudado muitas pessoas com problemas similares aos seus. Você sabe como ele funciona?',
      sentAt: new Date(Date.now() - 118 * 60 * 1000).toISOString(),
      isFromLead: false,
      isAutomated: true
    },
    {
      id: '1-3',
      leadId: '1',
      content: 'Não sei muito bem, mas tenho dor nas costas há 3 meses e nada tem resolvido',
      sentAt: new Date(Date.now() - 115 * 60 * 1000).toISOString(),
      isFromLead: true,
      isAutomated: false
    },
    {
      id: '1-4',
      leadId: '1',
      content: 'Entendo sua preocupação. O chá RMGI atua diretamente na inflamação e ajuda a reduzir as dores nas costas. Muitos clientes relatam melhora em poucas semanas de uso. Você já tentou outras soluções?',
      sentAt: new Date(Date.now() - 114 * 60 * 1000).toISOString(),
      isFromLead: false,
      isAutomated: true
    },
    {
      id: '1-5',
      leadId: '1',
      content: 'Sim, já fiz fisioterapia e tomei medicação, mas nada funcionou por muito tempo',
      sentAt: new Date(Date.now() - 110 * 60 * 1000).toISOString(),
      isFromLead: true,
      isAutomated: false
    },
    {
      id: '1-6',
      leadId: '1',
      content: 'O diferencial do chá RMGI é que ele atua nas causas do problema, não apenas nos sintomas. O tratamento completo de 3 meses costuma trazer resultados duradouros. Gostaria de saber mais sobre os valores e como funciona o tratamento?',
      sentAt: new Date(Date.now() - 108 * 60 * 1000).toISOString(),
      isFromLead: false,
      isAutomated: true
    },
    {
      id: '1-7',
      leadId: '1',
      content: 'Sim, por favor. Quanto custa?',
      sentAt: new Date(Date.now() - 105 * 60 * 1000).toISOString(),
      isFromLead: true,
      isAutomated: false
    },
  ],
  '4': [
    {
      id: '4-1',
      leadId: '4',
      content: 'Olá, vi o anúncio de vocês sobre o chá para dores articulares',
      sentAt: new Date(Date.now() - 5 * 60 * 60 * 1000).toISOString(),
      isFromLead: true,
      isAutomated: false
    },
    {
      id: '4-2',
      leadId: '4',
      content: 'Olá Ana! Obrigado por entrar em contato. O chá RMGI tem ajudado muitas pessoas com dores articulares. Há quanto tempo você sente essas dores?',
      sentAt: new Date(Date.now() - 4 * 60 * 60 * 1000 - 50 * 60 * 1000).toISOString(),
      isFromLead: false,
      isAutomated: true
    },
    {
      id: '4-3',
      leadId: '4',
      content: 'Já faz uns 2 anos, principalmente nos joelhos e tornozelos',
      sentAt: new Date(Date.now() - 4 * 60 * 60 * 1000 - 45 * 60 * 1000).toISOString(),
      isFromLead: true,
      isAutomated: false
    },
    {
      id: '4-4',
      leadId: '4',
      content: 'Entendo. E você já buscou algum tratamento antes?',
      sentAt: new Date(Date.now() - 4 * 60 * 60 * 1000 - 43 * 60 * 1000).toISOString(),
      isFromLead: false,
      isAutomated: true
    },
    {
      id: '4-5',
      leadId: '4',
      content: 'Sim, fisioterapia e remédios anti-inflamatórios, mas o alívio é temporário',
      sentAt: new Date(Date.now() - 4 * 60 * 60 * 1000 - 40 * 60 * 1000).toISOString(),
      isFromLead: true,
      isAutomated: false
    },
    {
      id: '4-6',
      leadId: '4',
      content: 'O chá RMGI tem uma fórmula natural que atua diretamente na inflamação crônica, que é a causa da maioria das dores articulares. Muitos clientes conseguem reduzir ou até eliminar a necessidade de anti-inflamatórios após o tratamento completo de 3 meses. Posso lhe enviar mais informações sobre o produto?',
      sentAt: new Date(Date.now() - 4 * 60 * 60 * 1000 - 35 * 60 * 1000).toISOString(),
      isFromLead: false,
      isAutomated: true
    },
    {
      id: '4-7',
      leadId: '4',
      content: 'Sim, por favor',
      sentAt: new Date(Date.now() - 4 * 60 * 60 * 1000 - 30 * 60 * 1000).toISOString(),
      isFromLead: true,
      isAutomated: false
    },
    {
      id: '4-8',
      leadId: '4',
      content: 'Ótimo! O tratamento completo inclui 3 meses de chá RMGI, um guia de alimentação anti-inflamatória e suporte durante todo o período. O investimento é de R$697,00, podendo ser parcelado em até 12x no cartão. Também oferecemos 30 dias de garantia de satisfação.',
      sentAt: new Date(Date.now() - 4 * 60 * 60 * 1000 - 25 * 60 * 1000).toISOString(),
      isFromLead: false,
      isAutomated: true
    },
    {
      id: '4-9',
      leadId: '4',
      content: 'Achei o valor muito alto',
      sentAt: new Date(Date.now() - 4 * 60 * 60 * 1000 - 20 * 60 * 1000).toISOString(),
      isFromLead: true,
      isAutomated: false
    },
    {
      id: '4-10',
      leadId: '4',
      content: 'Entendo sua preocupação com o investimento. Considerando que muitos clientes gastam mais de R$200 por mês com medicamentos e terapias para dor, o tratamento completo acaba sendo econômico a longo prazo. Além disso, temos opções mais acessíveis, como o kit de 1 mês por R$297,00 para você experimentar os benefícios. O que acha?',
      sentAt: new Date(Date.now() - 4 * 60 * 60 * 1000 - 15 * 60 * 1000).toISOString(),
      isFromLead: false,
      isAutomated: false,
      sentBy: 'Seller User'
    },
    {
      id: '4-11',
      leadId: '4',
      content: 'Mesmo assim está fora do meu orçamento agora',
      sentAt: new Date(Date.now() - 10 * 60 * 1000).toISOString(),
      isFromLead: true,
      isAutomated: false
    },
  ]
};

interface LeadContextType {
  leads: Lead[];
  filteredLeads: Lead[];
  selectedLeadId: string | null;
  messages: Message[];
  filters: {
    stage: FunnelStage | 'all';
    search: string;
    date: 'all' | 'today' | 'week' | 'month';
    assignee: 'all' | 'me' | 'unassigned';
  };
  loading: {
    leads: boolean;
    messages: boolean;
  };
  selectedLead: Lead | null;
  setSelectedLeadId: (id: string | null) => void;
  updateFilters: (newFilters: Partial<LeadContextType['filters']>) => void;
  assignLead: (leadId: string, userId: string | null) => Promise<void>;
  sendMessage: (leadId: string, content: string) => Promise<void>;
  toggleAutomation: (leadId: string) => Promise<void>;
  updateLeadStage: (leadId: string, stage: FunnelStage) => Promise<void>;
  refreshLeads: () => Promise<void>;
}

const LeadContext = createContext<LeadContextType | undefined>(undefined);

export const LeadProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const { user } = useAuth();
  
  const [leads, setLeads] = useState<Lead[]>([]);
  const [filteredLeads, setFilteredLeads] = useState<Lead[]>([]);
  const [selectedLeadId, setSelectedLeadId] = useState<string | null>(null);
  const [messages, setMessages] = useState<Message[]>([]);
  const [filters, setFilters] = useState({
    stage: 'all' as FunnelStage | 'all',
    search: '',
    date: 'all' as 'all' | 'today' | 'week' | 'month',
    assignee: 'all' as 'all' | 'me' | 'unassigned',
  });
  const [loading, setLoading] = useState({
    leads: true,
    messages: false,
  });

  // This function will convert data from Março | FUNIL Bruno to our Lead type
  const convertToLead = (funnelData: any, cadastroData: any = {}): Lead => {
    // Map the funil value to our FunnelStage type
    const stageMappings: Record<string, FunnelStage> = {
      'Apresentação': 'initial',
      'Identificação': 'identification',
      'Conscientização': 'awareness',
      'Validação': 'validation',
      'Negociação': 'negotiation',
      'Objeção': 'objection',
      'Compra': 'purchase'
    };
    
    const stage = stageMappings[funnelData.funil] || 'initial';
    
    return {
      id: funnelData.id,
      name: cadastroData.name || 'Sem nome',
      phone: cadastroData.phone || funnelData.phone || '',
      stage: stage,
      stageUpdatedAt: funnelData.created_at || new Date().toISOString(),
      assignedTo: funnelData.vendedor || null,
      isHot: stage === 'negotiation' || stage === 'objection',
      lastMessageAt: funnelData.ULTIMA_INTERACAO_CLIENTE || funnelData.created_at || new Date().toISOString(),
      lastMessage: funnelData.HISTORICO_CONVERSA ? 
        funnelData.HISTORICO_CONVERSA.split('\n').slice(-1)[0] || 'Nova conversa' : 
        'Nova conversa',
      symptoms: funnelData['Sintomas Extração'] ? 
        funnelData['Sintomas Extração'].split(',').map((s: string) => s.trim()) : 
        [],
      problemDuration: funnelData['Tempo problema Extração'] || '',
      attemptsToSolve: funnelData['Medicamentos Extração'] ? 
        funnelData['Medicamentos Extração'].split(',').map((s: string) => s.trim()) : 
        [],
      isActive: true,
      isAutomationPaused: funnelData['Time_is_active'] === false
    };
  };

  // Convert a message from Março | Menssagem Bruno to our Message type
  const convertToMessage = (msgData: any): Message => {
    return {
      id: msgData.id.toString(),
      leadId: msgData.conversation_id,
      content: msgData.message_content || '',
      sentAt: msgData.created_at,
      isFromLead: msgData.status === 'received',
      isAutomated: msgData.vendedor === 'AI',
      sentBy: msgData.vendedor !== 'AI' ? msgData.vendedor : undefined
    };
  };

  // Initial load of leads using Supabase
  useEffect(() => {
    const fetchLeads = async () => {
      try {
        setLoading(prev => ({ ...prev, leads: true }));
        
        // Fetch data from Março | FUNIL Bruno
        const { data: funnelData, error: funnelError } = await supabase
          .from('Março | FUNIL Bruno')
          .select('*')
          .order('created_at', { ascending: false });
        
        if (funnelError) throw funnelError;
        
        // Fetch user data from Março | Cadastro Bruno
        const { data: cadastroData, error: cadastroError } = await supabase
          .from('Março | Cadastro Bruno')
          .select('*');
        
        if (cadastroError) throw cadastroError;
        
        // Create a map of cadastro data by ID for quick lookup
        const cadastroMap = new Map();
        cadastroData.forEach((item: any) => {
          cadastroMap.set(item.id, item);
        });
        
        // Convert the data to our Lead format
        const leadsList: Lead[] = funnelData.map((funnel: any) => {
          const cadastro = cadastroMap.get(funnel.id);
          return convertToLead(funnel, cadastro);
        });
        
        setLeads(leadsList);
      } catch (error) {
        console.error('Error fetching leads:', error);
        toast.error('Erro ao buscar leads');
      } finally {
        setLoading(prev => ({ ...prev, leads: false }));
      }
    };

    fetchLeads();
  }, []);

  // Load messages when a lead is selected using Supabase
  useEffect(() => {
    const fetchMessages = async () => {
      if (!selectedLeadId) return;
      
      try {
        setLoading(prev => ({ ...prev, messages: true }));
        
        // Fetch messages from Março | Menssagem Bruno
        const { data: messagesData, error: messagesError } = await supabase
          .from('Março | Menssagem Bruno')
          .select('*')
          .eq('conversation_id', selectedLeadId)
          .order('created_at', { ascending: true });
        
        if (messagesError) throw messagesError;
        
        // Convert to our Message format
        const messagesList: Message[] = messagesData.map(convertToMessage);
        
        setMessages(messagesList);
        console.log('Fetched messages:', messagesList);
      } catch (error) {
        console.error('Error fetching messages:', error);
        toast.error('Erro ao buscar mensagens');
      } finally {
        setLoading(prev => ({ ...prev, messages: false }));
      }
    };

    fetchMessages();
  }, [selectedLeadId]);

  // Get the selected lead
  const selectedLead = leads.find(lead => lead.id === selectedLeadId) || null;

  // Apply filters to leads
  useEffect(() => {
    let result = [...leads];
    
    // Filter by stage
    if (filters.stage !== 'all') {
      result = result.filter(lead => lead.stage === filters.stage);
    }
    
    // Filter by search term
    if (filters.search) {
      const searchLower = filters.search.toLowerCase();
      result = result.filter(
        lead => 
          lead.name.toLowerCase().includes(searchLower) || 
          lead.phone.includes(filters.search)
      );
    }
    
    // Filter by date
    if (filters.date !== 'all') {
      const now = new Date();
      let cutoff: Date;
      
      switch (filters.date) {
        case 'today':
          cutoff = new Date(now.setHours(0, 0, 0, 0));
          break;
        case 'week':
          cutoff = new Date(now.setDate(now.getDate() - 7));
          break;
        case 'month':
          cutoff = new Date(now.setMonth(now.getMonth() - 1));
          break;
      }
      
      result = result.filter(
        lead => new Date(lead.lastMessageAt) > cutoff
      );
    }
    
    // Filter by assignee
    if (filters.assignee !== 'all' && user) {
      if (filters.assignee === 'me') {
        result = result.filter(lead => lead.assignedTo === user.id);
      } else if (filters.assignee === 'unassigned') {
        result = result.filter(lead => lead.assignedTo === null);
      }
    }
    
    setFilteredLeads(result);
  }, [leads, filters, user]);

  const updateFilters = (newFilters: Partial<typeof filters>) => {
    setFilters(prev => ({ ...prev, ...newFilters }));
  };

  const assignLead = async (leadId: string, userId: string | null) => {
    try {
      // Update in Supabase
      const { error } = await supabase
        .from('Março | FUNIL Bruno')
        .update({ vendedor: userId })
        .eq('id', leadId);
      
      if (error) throw error;
      
      // Update local state
      setLeads(prevLeads => 
        prevLeads.map(lead => 
          lead.id === leadId ? { ...lead, assignedTo: userId } : lead
        )
      );
      
      toast.success('Lead atribuído com sucesso');
    } catch (error) {
      console.error('Error assigning lead:', error);
      toast.error('Erro ao atribuir lead');
      throw error;
    }
  };

  const sendMessage = async (leadId: string, content: string) => {
    if (!user) return;
    
    try {
      // Insert into Março | Menssagem Bruno
      const { data, error } = await supabase
        .from('Março | Menssagem Bruno')
        .insert({
          conversation_id: leadId,
          message_content: content,
          status: 'sent',
          vendedor: user.name || 'User'
        })
        .select()
        .single();
      
      if (error) throw error;
      
      // Create new message for local state
      const newMessage: Message = {
        id: data.id.toString(),
        leadId,
        content,
        sentAt: data.created_at,
        isFromLead: false,
        isAutomated: false,
        sentBy: user.name,
      };
      
      // Update messages
      setMessages(prev => [...prev, newMessage]);
      
      // Update lead's last message
      setLeads(prevLeads => 
        prevLeads.map(lead => 
          lead.id === leadId 
            ? { 
                ...lead, 
                lastMessage: content,
                lastMessageAt: newMessage.sentAt
              } 
            : lead
        )
      );
      
      // Update in Março | FUNIL Bruno
      await supabase
        .from('Março | FUNIL Bruno')
        .update({ 
          HISTORICO_CONVERSA: `${selectedLead?.lastMessage || ''}\n${content}`
        })
        .eq('id', leadId);
      
      toast.success('Mensagem enviada');
    } catch (error) {
      console.error('Error sending message:', error);
      toast.error('Erro ao enviar mensagem');
      throw error;
    }
  };

  const toggleAutomation = async (leadId: string) => {
    try {
      // Find the current lead
      const lead = leads.find(l => l.id === leadId);
      if (!lead) return;
      
      // Toggle the isAutomationPaused value
      const newValue = !lead.isAutomationPaused;
      
      // Update in Supabase
      const { error } = await supabase
        .from('Março | FUNIL Bruno')
        .update({ Time_is_active: !newValue })
        .eq('id', leadId);
      
      if (error) throw error;
      
      // Update local state
      setLeads(prevLeads => 
        prevLeads.map(lead => 
          lead.id === leadId 
            ? { ...lead, isAutomationPaused: newValue } 
            : lead
        )
      );
      
      toast.success(`Automação ${newValue ? 'pausada' : 'ativada'}`);
    } catch (error) {
      console.error('Error toggling automation:', error);
      toast.error('Erro ao alterar automação');
      throw error;
    }
  };

  const updateLeadStage = async (leadId: string, stage: FunnelStage) => {
    try {
      // Map our FunnelStage type to Março | FUNIL Bruno funil values
      const stageMapping: Record<FunnelStage, string> = {
        initial: 'Apresentação',
        identification: 'Identificação',
        awareness: 'Conscientização',
        validation: 'Validação',
        negotiation: 'Negociação',
        objection: 'Objeção',
        purchase: 'Compra'
      };
      
      // Update in Supabase
      const { error } = await supabase
        .from('Março | FUNIL Bruno')
        .update({ 
          funil: stageMapping[stage],
        })
        .eq('id', leadId);
      
      if (error) throw error;
      
      // Update local state
      setLeads(prevLeads => 
        prevLeads.map(lead => 
          lead.id === leadId 
            ? { 
                ...lead, 
                stage,
                stageUpdatedAt: new Date().toISOString()
              } 
            : lead
        )
      );
      
      toast.success('Etapa do funil atualizada');
    } catch (error) {
      console.error('Error updating lead stage:', error);
      toast.error('Erro ao atualizar etapa do funil');
      throw error;
    }
  };

  const refreshLeads = async () => {
    try {
      setLoading(prev => ({ ...prev, leads: true }));
      
      // Fetch data from Março | FUNIL Bruno
      const { data: funnelData, error: funnelError } = await supabase
        .from('Março | FUNIL Bruno')
        .select('*')
        .order('created_at', { ascending: false });
      
      if (funnelError) throw funnelError;
      
      // Fetch user data from Março | Cadastro Bruno
      const { data: cadastroData, error: cadastroError } = await supabase
        .from('Março | Cadastro Bruno')
        .select('*');
      
      if (cadastroError) throw cadastroError;
      
      // Create a map of cadastro data by ID for quick lookup
      const cadastroMap = new Map();
      cadastroData.forEach((item: any) => {
        cadastroMap.set(item.id, item);
      });
      
      // Convert the data to our Lead format
      const leadsList: Lead[] = funnelData.map((funnel: any) => {
        const cadastro = cadastroMap.get(funnel.id);
        return convertToLead(funnel, cadastro);
      });
      
      setLeads(leadsList);
      toast.success('Leads atualizados');
    } catch (error) {
      console.error('Error refreshing leads:', error);
      toast.error('Erro ao atualizar leads');
    } finally {
      setLoading(prev => ({ ...prev, leads: false }));
    }
  };

  const contextValue = {
    leads,
    filteredLeads,
    selectedLeadId,
    messages,
    filters,
    loading,
    selectedLead,
    setSelectedLeadId,
    updateFilters,
    assignLead,
    sendMessage,
    toggleAutomation,
    updateLeadStage,
    refreshLeads,
  };

  return (
    <LeadContext.Provider value={contextValue}>
      {children}
    </LeadContext.Provider>
  );
};

export const useLeads = () => {
  const context = useContext(LeadContext);
  if (context === undefined) {
    throw new Error('useLeads must be used within a LeadProvider');
  }
  return context;
};
