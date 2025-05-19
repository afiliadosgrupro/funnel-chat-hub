
import React, { createContext, useContext, useState, useEffect } from 'react';
import { Lead, Message, FunnelStage } from '@/types/lead';
import { useAuth } from './AuthContext';

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

  const selectedLead = leads.find(lead => lead.id === selectedLeadId) || null;

  // Initial load of leads
  useEffect(() => {
    const fetchLeads = async () => {
      try {
        // Replace with actual API call to Supabase
        await new Promise(resolve => setTimeout(resolve, 1000)); // Simulate API delay
        setLeads(MOCK_LEADS);
      } catch (error) {
        console.error('Error fetching leads:', error);
      } finally {
        setLoading(prev => ({ ...prev, leads: false }));
      }
    };

    fetchLeads();
  }, []);

  // Load messages when a lead is selected
  useEffect(() => {
    const fetchMessages = async () => {
      if (!selectedLeadId) return;
      
      try {
        setLoading(prev => ({ ...prev, messages: true }));
        
        // Replace with actual API call to Supabase
        await new Promise(resolve => setTimeout(resolve, 500)); // Simulate API delay
        
        const leadMessages = MOCK_MESSAGES[selectedLeadId] || [];
        setMessages(leadMessages);
      } catch (error) {
        console.error('Error fetching messages:', error);
      } finally {
        setLoading(prev => ({ ...prev, messages: false }));
      }
    };

    fetchMessages();
  }, [selectedLeadId]);

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
      // Replace with actual API call to Supabase
      await new Promise(resolve => setTimeout(resolve, 500)); // Simulate API delay
      
      setLeads(prevLeads => 
        prevLeads.map(lead => 
          lead.id === leadId ? { ...lead, assignedTo: userId } : lead
        )
      );
    } catch (error) {
      console.error('Error assigning lead:', error);
      throw error;
    }
  };

  const sendMessage = async (leadId: string, content: string) => {
    if (!user) return;
    
    try {
      // Replace with actual API call to Supabase
      await new Promise(resolve => setTimeout(resolve, 300)); // Simulate API delay
      
      const newMessage: Message = {
        id: `${leadId}-${Date.now()}`,
        leadId,
        content,
        sentAt: new Date().toISOString(),
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
      
      // If we had MOCK_MESSAGES permanently, we would update it like this:
      // MOCK_MESSAGES[leadId] = [...(MOCK_MESSAGES[leadId] || []), newMessage];
    } catch (error) {
      console.error('Error sending message:', error);
      throw error;
    }
  };

  const toggleAutomation = async (leadId: string) => {
    try {
      // Replace with actual API call to Supabase
      await new Promise(resolve => setTimeout(resolve, 500)); // Simulate API delay
      
      setLeads(prevLeads => 
        prevLeads.map(lead => 
          lead.id === leadId 
            ? { ...lead, isAutomationPaused: !lead.isAutomationPaused } 
            : lead
        )
      );
    } catch (error) {
      console.error('Error toggling automation:', error);
      throw error;
    }
  };

  const updateLeadStage = async (leadId: string, stage: FunnelStage) => {
    try {
      // Replace with actual API call to Supabase
      await new Promise(resolve => setTimeout(resolve, 500)); // Simulate API delay
      
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
    } catch (error) {
      console.error('Error updating lead stage:', error);
      throw error;
    }
  };

  const refreshLeads = async () => {
    try {
      setLoading(prev => ({ ...prev, leads: true }));
      
      // Replace with actual API call to Supabase
      await new Promise(resolve => setTimeout(resolve, 1000)); // Simulate API delay
      
      // In a real app, this would fetch the latest data from Supabase
      // For now, we'll just shuffle the array to simulate changes
      setLeads([...MOCK_LEADS].sort(() => Math.random() - 0.5));
    } catch (error) {
      console.error('Error refreshing leads:', error);
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
