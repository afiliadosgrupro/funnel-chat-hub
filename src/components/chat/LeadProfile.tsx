
import { Lead } from '@/types/lead';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Avatar, AvatarFallback } from '@/components/ui/avatar';
import { Edit, User, Calendar, Clock, Target } from 'lucide-react';
import { formatDistanceToNow } from 'date-fns';
import { ptBR } from 'date-fns/locale';
import { useLeads } from '@/contexts/LeadContext';
import { useAuth } from '@/contexts/AuthContext';
import { cn } from '@/lib/utils';

const stageBadges = {
  initial: { label: 'Apresentação', variant: 'default' },
  identification: { label: 'Identificação', variant: 'secondary' },
  awareness: { label: 'Conscientização', variant: 'outline' },
  validation: { label: 'Validação', variant: 'outline' },
  negotiation: { label: 'Negociação', variant: 'whatsapp' },
  objection: { label: 'Objeção', variant: 'destructive' },
  purchase: { label: 'Compra', variant: 'success' },
} as const;

interface LeadProfileProps {
  lead: Lead;
}

const LeadProfile = ({ lead }: LeadProfileProps) => {
  const { assignLead, updateLeadStage } = useLeads();
  const { user } = useAuth();
  
  const stageBadge = stageBadges[lead.stage];
  
  const timeInStage = formatDistanceToNow(new Date(lead.stageUpdatedAt), {
    locale: ptBR,
  });
  
  const handleAssignToMe = async () => {
    if (!user) return;
    await assignLead(lead.id, user.id);
  };
  
  const handleUnassign = async () => {
    await assignLead(lead.id, null);
  };
  
  const isAssignedToCurrentUser = user && lead.assignedTo === user.id;
  
  return (
    <div className="w-[300px] bg-white border-l overflow-y-auto custom-scrollbar">
      <div className="p-4 flex flex-col items-center border-b">
        <Avatar className="h-16 w-16 mb-2">
          <AvatarFallback className="bg-funnel-awareness text-white text-xl">
            {lead.name.substring(0, 2).toUpperCase()}
          </AvatarFallback>
        </Avatar>
        <h2 className="text-lg font-medium">{lead.name}</h2>
        <p className="text-sm text-gray-500 mb-2">{lead.phone}</p>
        <Badge
          variant={stageBadge.variant as any}
          className={cn(
            "mb-2",
            lead.stage === 'negotiation' && "bg-whatsapp text-white"
          )}
        >
          {stageBadge.label}
        </Badge>
        
        {!isAssignedToCurrentUser && !lead.assignedTo && (
          <Button 
            size="sm"
            variant="outline"
            className="w-full mt-2"
            onClick={handleAssignToMe}
          >
            <User className="h-4 w-4 mr-2" />
            Atribuir a mim
          </Button>
        )}
        
        {isAssignedToCurrentUser && (
          <Button 
            size="sm"
            variant="outline"
            className="w-full mt-2"
            onClick={handleUnassign}
          >
            Desatribuir
          </Button>
        )}
      </div>
      
      <div className="p-4 border-b">
        <h3 className="font-medium mb-2 flex items-center text-sm text-gray-700">
          <Target className="h-4 w-4 mr-2" />
          Informações do Funil
        </h3>
        <div className="space-y-3 text-sm">
          <div className="flex justify-between">
            <span className="text-gray-500">Etapa atual:</span>
            <span className="font-medium">{stageBadge.label}</span>
          </div>
          <div className="flex justify-between">
            <span className="text-gray-500">Tempo na etapa:</span>
            <span className="font-medium">{timeInStage}</span>
          </div>
          <div className="flex justify-between">
            <span className="text-gray-500">Lead quente:</span>
            <span className="font-medium">{lead.isHot ? 'Sim' : 'Não'}</span>
          </div>
          <div className="flex justify-between">
            <span className="text-gray-500">Automação:</span>
            <span className="font-medium">
              {lead.isAutomationPaused ? 'Pausada' : 'Ativa'}
            </span>
          </div>
        </div>
      </div>
      
      {lead.symptoms && lead.symptoms.length > 0 && (
        <div className="p-4 border-b">
          <h3 className="font-medium mb-2 text-sm text-gray-700">Sintomas relatados</h3>
          <div className="flex flex-wrap gap-1">
            {lead.symptoms.map((symptom, index) => (
              <Badge key={index} variant="outline" className="text-xs">
                {symptom}
              </Badge>
            ))}
          </div>
        </div>
      )}
      
      {(lead.problemDuration || (lead.attemptsToSolve && lead.attemptsToSolve.length > 0)) && (
        <div className="p-4 border-b">
          <h3 className="font-medium mb-2 text-sm text-gray-700">Detalhes do problema</h3>
          <div className="space-y-2 text-sm">
            {lead.problemDuration && (
              <div>
                <span className="text-gray-500">Duração:</span>
                <span className="ml-2">{lead.problemDuration}</span>
              </div>
            )}
            
            {lead.attemptsToSolve && lead.attemptsToSolve.length > 0 && (
              <div>
                <span className="text-gray-500">Tentativas anteriores:</span>
                <ul className="list-disc list-inside mt-1 pl-1">
                  {lead.attemptsToSolve.map((attempt, index) => (
                    <li key={index} className="text-gray-700">{attempt}</li>
                  ))}
                </ul>
              </div>
            )}
          </div>
        </div>
      )}
      
      <div className="p-4">
        <h3 className="font-medium mb-2 text-sm text-gray-700">Atualizar etapa do funil</h3>
        <div className="grid grid-cols-2 gap-2">
          {Object.entries(stageBadges).map(([stage, badge]) => (
            <Button 
              key={stage} 
              size="sm" 
              variant="outline"
              className={cn(
                "text-xs justify-start",
                lead.stage === stage && "border-whatsapp border-2 text-whatsapp"
              )}
              onClick={() => updateLeadStage(lead.id, stage as any)}
              disabled={lead.stage === stage}
            >
              {badge.label}
            </Button>
          ))}
        </div>
      </div>
    </div>
  );
};

export default LeadProfile;
