
import { useState, useMemo } from 'react';
import { Lead, FunnelStage } from '@/types/lead';
import { User } from '@/types/auth';

interface LeadFilters {
  stage: FunnelStage | 'all';
  search: string;
  date: 'all' | 'today' | 'week' | 'month';
  assignee: 'all' | 'me' | 'unassigned';
}

export const useLeadFilters = (leads: Lead[], currentUser: User | null) => {
  const [filters, setFilters] = useState<LeadFilters>({
    stage: 'all',
    search: '',
    date: 'all',
    assignee: 'all',
  });

  const filteredLeads = useMemo(() => {
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
    if (filters.assignee !== 'all' && currentUser) {
      if (filters.assignee === 'me') {
        result = result.filter(lead => lead.assignedTo === currentUser.id);
      } else if (filters.assignee === 'unassigned') {
        result = result.filter(lead => lead.assignedTo === null);
      }
    }
    
    return result;
  }, [leads, filters, currentUser]);

  const updateFilters = (newFilters: Partial<LeadFilters>) => {
    setFilters(prev => ({ ...prev, ...newFilters }));
  };

  return {
    filters,
    filteredLeads,
    updateFilters
  };
};
