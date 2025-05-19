
import { Message } from '@/types/lead';
import { formatDistanceToNow } from 'date-fns';
import { ptBR } from 'date-fns/locale';
import { cn } from '@/lib/utils';
import { Robot } from 'lucide-react';

interface ChatMessageProps {
  message: Message;
}

const ChatMessage = ({ message }: ChatMessageProps) => {
  const isFromLead = message.isFromLead;
  const isAutomated = !isFromLead && message.isAutomated;
  
  const formattedTime = formatDistanceToNow(new Date(message.sentAt), {
    addSuffix: true,
    locale: ptBR,
  });
  
  return (
    <div 
      className={cn(
        "flex",
        isFromLead ? "justify-start" : "justify-end"
      )}
    >
      <div className="max-w-[75%]">
        <div
          className={cn(
            "p-3 rounded-lg",
            isFromLead 
              ? "bg-white text-gray-800 rounded-tl-none" 
              : isAutomated
                ? "bg-gray-200 text-gray-800 rounded-tr-none"
                : "bg-whatsapp-light text-white rounded-tr-none"
          )}
        >
          {message.content}
          {isAutomated && (
            <div className="flex items-center mt-1 text-xs text-gray-500">
              <Robot className="h-3 w-3 mr-1" />
              <span>Resposta automática</span>
            </div>
          )}
          {!isFromLead && !isAutomated && message.sentBy && (
            <div className="mt-1 text-xs text-white/70">
              <span>Enviado por {message.sentBy}</span>
            </div>
          )}
        </div>
        <div 
          className={cn(
            "text-xs mt-1",
            isFromLead ? "text-left text-gray-500" : "text-right text-gray-500"
          )}
        >
          {formattedTime}
        </div>
      </div>
    </div>
  );
};

export default ChatMessage;
