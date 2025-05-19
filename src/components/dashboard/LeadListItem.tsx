
import { Avatar, AvatarFallback } from '@/components/ui/avatar';
import { Badge } from '@/components/ui/badge';
import { Lead } from '@/types/lead';
import { cn } from '@/lib/utils';
import { formatDistanceToNow } from 'date-fns';
import { ptBR } from 'date-fns/locale';

interface LeadListItemProps {
  lead: Lead;
  isSelected: boolean;
  onClick: () => void;
}

const stageBadges = {
  initial: { label: 'Apresentação', variant: 'default' },
  identification: { label: 'Identificação', variant: 'secondary' },
  awareness: { label: 'Conscientização', variant: 'outline' },
  validation: { label: 'Validação', variant: 'outline' },
  negotiation: { label: 'Negociação', variant: 'whatsapp' },
  objection: { label: 'Objeção', variant: 'destructive' },
  purchase: { label: 'Compra', variant: 'success' },
} as const;

const LeadListItem = ({ lead, isSelected, onClick }: LeadListItemProps) => {
  const stageBadge = stageBadges[lead.stage];
  
  const formattedTime = formatDistanceToNow(new Date(lead.lastMessageAt), {
    addSuffix: true,
    locale: ptBR,
  });
  
  return (
    <li
      className={cn(
        "border-b last:border-b-0 hover:bg-gray-50 cursor-pointer transition-colors",
        isSelected && "bg-gray-100 hover:bg-gray-100"
      )}
      onClick={onClick}
    >
      <div className="flex items-center p-4">
        <div className="relative">
          <Avatar>
            <AvatarFallback className="bg-funnel-awareness text-white">
              {lead.name.substring(0, 2).toUpperCase()}
            </AvatarFallback>
          </Avatar>
          {lead.isHot && (
            <span className="absolute bottom-0 right-0 w-3 h-3 bg-red-500 rounded-full border-2 border-white" />
          )}
        </div>
        <div className="ml-3 flex-1 overflow-hidden">
          <div className="flex items-center justify-between">
            <h3 className="font-medium text-gray-900 truncate">{lead.name}</h3>
            <span className="text-xs text-gray-500">{formattedTime}</span>
          </div>
          <div className="flex items-center justify-between mt-0.5">
            <p className="text-sm text-gray-500 truncate max-w-[180px]">
              {lead.lastMessage}
            </p>
            <Badge
              variant={stageBadge.variant as any}
              className={cn(
                "text-[10px] px-1.5 py-0",
                lead.stage === 'negotiation' && "bg-whatsapp text-white"
              )}
            >
              {stageBadge.label}
            </Badge>
          </div>
        </div>
      </div>
    </li>
  );
};

export default LeadListItem;
