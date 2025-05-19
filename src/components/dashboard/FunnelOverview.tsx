
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { useLeads } from '@/contexts/LeadContext';
import { cn } from '@/lib/utils';

const stageLabels = {
  initial: 'Apresentação',
  identification: 'Identificação',
  awareness: 'Conscientização',
  validation: 'Validação',
  negotiation: 'Negociação',
  objection: 'Objeção',
  purchase: 'Compra',
};

const FunnelOverview = () => {
  const { leads, updateFilters, filters } = useLeads();
  
  const stageCounts = leads.reduce((acc, lead) => {
    acc[lead.stage] = (acc[lead.stage] || 0) + 1;
    return acc;
  }, {} as Record<string, number>);
  
  const totalLeads = leads.length;
  const maxCount = Math.max(...Object.values(stageCounts));
  
  return (
    <Card>
      <CardHeader className="pb-2">
        <CardTitle className="text-lg font-medium">Visão do Funil</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-2">
          {Object.entries(stageLabels).map(([stage, label]) => {
            const count = stageCounts[stage] || 0;
            const percentage = totalLeads > 0 ? (count / totalLeads * 100) : 0;
            const barWidth = maxCount > 0 ? (count / maxCount * 100) : 0;
            
            return (
              <div key={stage} className="space-y-1">
                <div className="flex items-center justify-between text-sm">
                  <button 
                    className={cn(
                      "hover:underline font-medium",
                      filters.stage === stage ? "text-whatsapp" : "text-gray-600"
                    )}
                    onClick={() => updateFilters({ stage: stage as any })}
                  >
                    {label}
                  </button>
                  <span className="text-gray-500">
                    {count} ({percentage.toFixed(1)}%)
                  </span>
                </div>
                <div className="h-2 bg-gray-100 rounded-full overflow-hidden">
                  <div
                    className={cn("h-full", `bg-funnel-${stage}`)}
                    style={{ width: `${barWidth}%` }}
                  />
                </div>
              </div>
            );
          })}
        </div>
      </CardContent>
    </Card>
  );
};

export default FunnelOverview;
