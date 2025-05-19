
import { useEffect, useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { supabase } from '@/integrations/supabase/client';
import { Flame, HandCoins, Users, AlertTriangle } from 'lucide-react';

interface StatsData {
  totalLeads: number;
  hotLeads: number;
  negotiationLeads: number;
  needsAttention: number;
}

const LeadStats = () => {
  const [stats, setStats] = useState<StatsData>({
    totalLeads: 0,
    hotLeads: 0,
    negotiationLeads: 0,
    needsAttention: 0
  });
  
  const [loading, setLoading] = useState(true);
  
  useEffect(() => {
    fetchStatsData();
  }, []);
  
  const fetchStatsData = async () => {
    setLoading(true);
    
    try {
      // Buscar dados da tabela Março | FUNIL Bruno
      const { data: funnelData, error: funnelError } = await supabase
        .from('Março | FUNIL Bruno')
        .select('*');
        
      if (funnelError) throw funnelError;
      
      // Calcular estatísticas
      const totalLeads = funnelData.length;
      
      // Considerando leads em estágios avançados como "quentes"
      const hotLeads = funnelData.filter(lead => 
        ['Negociação', 'Validação'].includes(lead.funil || '')
      ).length;
      
      // Leads em negociação
      const negotiationLeads = funnelData.filter(lead => 
        lead.funil === 'Negociação'
      ).length;
      
      // Leads que precisam de atenção (tem objeções ou estão em negociação sem vendedor)
      const needsAttention = funnelData.filter(lead => 
        (lead.funil === 'Objeção' || 
        (lead.funil === 'Negociação' && !lead.vendedor))
      ).length;
      
      setStats({
        totalLeads,
        hotLeads,
        negotiationLeads,
        needsAttention
      });
    } catch (err) {
      console.error('Erro ao buscar dados de estatísticas:', err);
    } finally {
      setLoading(false);
    }
  };
  
  return (
    <Card>
      <CardHeader className="flex flex-row items-center justify-between pb-2 space-y-0">
        <CardTitle className="text-sm font-medium">Leads Quentes</CardTitle>
        <Flame className="h-4 w-4 text-orange-500" />
      </CardHeader>
      <CardContent>
        <div className="text-2xl font-bold">{loading ? '-' : stats.hotLeads}</div>
        <p className="text-xs text-muted-foreground">Prontos para conversão</p>
      </CardContent>
      
      <CardHeader className="flex flex-row items-center justify-between pb-2 space-y-0 border-t pt-4">
        <CardTitle className="text-sm font-medium">Em Negociação</CardTitle>
        <HandCoins className="h-4 w-4 text-blue-500" />
      </CardHeader>
      <CardContent>
        <div className="text-2xl font-bold">{loading ? '-' : stats.negotiationLeads}</div>
        <p className="text-xs text-muted-foreground">Próximos da compra</p>
      </CardContent>
      
      <CardHeader className="flex flex-row items-center justify-between pb-2 space-y-0 border-t pt-4">
        <CardTitle className="text-sm font-medium">Atenção Necessária</CardTitle>
        <AlertTriangle className="h-4 w-4 text-red-500" />
      </CardHeader>
      <CardContent>
        <div className="text-2xl font-bold">{loading ? '-' : stats.needsAttention}</div>
        <p className="text-xs text-muted-foreground">Requer intervenção manual</p>
      </CardContent>
    </Card>
  );
};

export default LeadStats;
