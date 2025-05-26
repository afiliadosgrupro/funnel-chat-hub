
import React, { createContext, useContext, useState, useEffect } from 'react';
import { Lead, Message, FunnelStage } from '@/types/lead';
import { useAuth } from './AuthContext';
import { toast } from 'sonner';
import { 
  fetchLeads,
  assignLead as apiAssignLead,
  toggleLeadAutomation,
  updateLeadStage as apiUpdateLeadStage,
} from '@/services/leadService';
import { useLeadFilters } from '@/hooks/useLeadFilters';
import { useMessages } from '@/hooks/useMessages';

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
  refreshMessages: () => Promise<void>;
}

const LeadContext = createContext<LeadContextType | undefined>(undefined);

export const LeadProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const { user } = useAuth();
  
  const [leads, setLeads] = useState<Lead[]>([]);
  const [selectedLeadId, setSelectedLeadId] = useState<string | null>(null);
  const [loading, setLoading] = useState({
    leads: true,
    messages: false,
  });

  // Use the filter hook
  const { filters, filteredLeads, updateFilters } = useLeadFilters(leads, user);

  // Get the selected lead
  const selectedLead = leads.find(lead => lead.id === selectedLeadId) || null;
  
  // Use the new messages hook
  const { 
    messages, 
    loading: messagesLoading, 
    sendMessage: hookSendMessage,
    setMessages,
    refreshMessages: hookRefreshMessages
  } = useMessages(selectedLeadId, selectedLead);

  // Update loading state from messages hook
  useEffect(() => {
    setLoading(prev => ({ ...prev, messages: messagesLoading }));
  }, [messagesLoading]);

  // Initial load of leads
  useEffect(() => {
    const loadLeads = async () => {
      try {
        setLoading(prev => ({ ...prev, leads: true }));
        const loadedLeads = await fetchLeads();
        setLeads(loadedLeads);
      } catch (error) {
        console.error('Error loading leads:', error);
      } finally {
        setLoading(prev => ({ ...prev, leads: false }));
      }
    };

    loadLeads();
  }, []);

  const assignLead = async (leadId: string, userId: string | null) => {
    try {
      await apiAssignLead(leadId, userId);
      
      // Update local state
      setLeads(prevLeads => 
        prevLeads.map(lead => 
          lead.id === leadId ? { ...lead, assignedTo: userId } : lead
        )
      );
    } catch (error) {
      console.error('Error in assignLead:', error);
    }
  };

  const sendMessage = async (leadId: string, content: string) => {
    if (!user) return;
    
    try {
      const newMessage = await hookSendMessage(leadId, content, user.name || 'User');
      
      if (newMessage) {
        // Update lead's last message in the leads list
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
      }
    } catch (error) {
      // Error is already handled in the hook
      console.error('Error in sendMessage handler:', error);
    }
  };

  const toggleAutomation = async (leadId: string) => {
    try {
      // Find the current lead
      const lead = leads.find(l => l.id === leadId);
      if (!lead) return;
      
      // Toggle the isAutomationPaused value
      const newValue = await toggleLeadAutomation(leadId, lead.isAutomationPaused);
      
      // Update local state
      setLeads(prevLeads => 
        prevLeads.map(lead => 
          lead.id === leadId 
            ? { ...lead, isAutomationPaused: newValue } 
            : lead
        )
      );
    } catch (error) {
      console.error('Error in toggleAutomation:', error);
    }
  };

  const updateLeadStage = async (leadId: string, stage: FunnelStage) => {
    try {
      await apiUpdateLeadStage(leadId, stage);
      
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
    } catch (error) {
      console.error('Error in updateLeadStage:', error);
    }
  };

  const refreshLeads = async () => {
    try {
      setLoading(prev => ({ ...prev, leads: true }));
      const refreshedLeads = await fetchLeads();
      setLeads(refreshedLeads);
      toast.success('Leads atualizados');
    } catch (error) {
      console.error('Error refreshing leads:', error);
      toast.error('Erro ao atualizar leads');
    } finally {
      setLoading(prev => ({ ...prev, leads: false }));
    }
  };

  const refreshMessages = async () => {
    await hookRefreshMessages();
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
    refreshMessages,
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
