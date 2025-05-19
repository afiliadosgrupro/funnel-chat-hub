
import { useEffect, useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { supabase } from '@/integrations/supabase/client';
import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer, TooltipProps } from 'recharts';
import { format } from 'date-fns';
import { ptBR } from 'date-fns/locale';
import { ChartContainer, ChartTooltipContent } from '@/components/ui/chart';
import { RefreshCw } from 'lucide-react';

interface LeadsByStage {
  stage: string;
  count: number;
  label: string;
}

const stageLabels = {
  'Apresentação': 'Apresentação',
  'Identificação': 'Identificação',
  'Conscientização': 'Conscientização',
  'Validação': 'Validação',
  'Negociação': 'Negociação',
  'Objeção': 'Objeção',
  'Compra': 'Compra',
};

const FunnelChart = () => {
  const [data, setData] = useState<LeadsByStage[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  
  useEffect(() => {
    fetchLeadsData();
  }, []);
  
  const fetchLeadsData = async () => {
    setLoading(true);
    setError(null);
    
    try {
      // Buscar dados da tabela Março | FUNIL Bruno - contagem por estágio do funil
      const today = new Date();
      today.setHours(0, 0, 0, 0);
      
      const { data, error } = await supabase
        .from('Março | FUNIL Bruno')
        .select('funil')
        .gte('created_at', today.toISOString());
      
      if (error) {
        throw error;
      }
      
      // Contar leads por estágio
      const stageCounts: Record<string, number> = {};
      
      data.forEach(lead => {
        const stage = lead.funil || 'Apresentação';
        stageCounts[stage] = (stageCounts[stage] || 0) + 1;
      });
      
      // Transformar dados para formato do gráfico
      const chartData = Object.entries(stageLabels).map(([stage, label]) => ({
        stage,
        label,
        count: stageCounts[stage] || 0
      }));
      
      setData(chartData);
    } catch (err) {
      console.error('Erro ao buscar dados para o gráfico:', err);
      setError('Falha ao carregar dados do gráfico');
    } finally {
      setLoading(false);
    }
  };
  
  // Configuração de cores para o gráfico
  const chartConfig = {
    'Apresentação': { color: '#22c55e' },
    'Identificação': { color: '#3b82f6' },
    'Conscientização': { color: '#8b5cf6' },
    'Validação': { color: '#ec4899' },
    'Negociação': { color: '#f59e0b' },
    'Objeção': { color: '#ef4444' },
    'Compra': { color: '#10b981' },
  };
  
  // Componente personalizado para o tooltip
  const CustomTooltip = ({ active, payload, label }: TooltipProps<number, string>) => {
    if (!active || !payload || !payload.length) {
      return null;
    }
    
    const data = payload[0];
    const stageName = data.name || '';
    const value = data.value || 0;
    
    return (
      <div className="rounded-md border bg-white p-2 shadow-md">
        <p className="font-medium">{stageName}</p>
        <p className="text-sm text-gray-500">
          <span className="font-medium text-gray-700">{value}</span> leads
        </p>
      </div>
    );
  };
  
  return (
    <Card>
      <CardHeader className="flex flex-row items-center justify-between pb-2">
        <CardTitle className="text-lg font-medium">Leads por Etapa (Hoje)</CardTitle>
        <button 
          onClick={fetchLeadsData} 
          className="text-gray-400 hover:text-gray-600"
          disabled={loading}
        >
          <RefreshCw className={`h-4 w-4 ${loading ? 'animate-spin' : ''}`} />
        </button>
      </CardHeader>
      <CardContent className="h-[300px]">
        {loading ? (
          <div className="flex items-center justify-center h-full">
            <RefreshCw className="h-8 w-8 animate-spin text-whatsapp" />
          </div>
        ) : error ? (
          <div className="flex items-center justify-center h-full text-red-500">
            {error}
          </div>
        ) : (
          <ChartContainer config={chartConfig} className="h-full">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={data}>
                <XAxis 
                  dataKey="label" 
                  tickLine={false} 
                  axisLine={false}
                  fontSize={12}
                />
                <YAxis 
                  tickLine={false} 
                  axisLine={false} 
                  fontSize={12}
                  allowDecimals={false}
                />
                <Tooltip content={<CustomTooltip />} />
                <Bar 
                  dataKey="count" 
                  fill="var(--color-Apresentação, #22c55e)" 
                  radius={[4, 4, 0, 0]}
                  barSize={30}
                />
              </BarChart>
            </ResponsiveContainer>
          </ChartContainer>
        )}
      </CardContent>
    </Card>
  );
};

export default FunnelChart;
