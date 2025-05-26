import { useState, useRef, useEffect } from 'react';
import { useLeads } from '@/contexts/LeadContext';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Send, PauseCircle, PlayCircle, ChevronRight, ChevronLeft, RefreshCw } from 'lucide-react';
import ChatMessage from './ChatMessage';
import LeadProfile from './LeadProfile';
import { cn } from '@/lib/utils';
import { toast } from 'sonner';

const ChatInterface = () => {
  const { selectedLead, messages, loading, sendMessage, toggleAutomation } = useLeads();
  const [messageText, setMessageText] = useState('');
  const [showProfile, setShowProfile] = useState(true);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  
  // Scroll to bottom when messages change or load
  useEffect(() => {
    const scrollToBottom = () => {
      if (messagesEndRef.current) {
        messagesEndRef.current.scrollIntoView({ behavior: 'smooth' });
      }
    };

    // Small delay to ensure DOM is updated
    const timeoutId = setTimeout(scrollToBottom, 100);
    
    return () => clearTimeout(timeoutId);
  }, [messages, selectedLead]);
  
  // Log de debug quando um lead é selecionado
  useEffect(() => {
    if (selectedLead) {
      console.info('Selecionando lead:', selectedLead.id);
    }
  }, [selectedLead]);
  
  const handleSendMessage = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!selectedLead || !messageText.trim()) {
      if (!selectedLead) {
        toast.error('Selecione um lead para enviar mensagem');
      }
      return;
    }
    
    try {
      await sendMessage(selectedLead.id, messageText.trim());
      setMessageText('');
    } catch (error) {
      console.error('Erro ao enviar mensagem:', error);
      toast.error('Não foi possível enviar a mensagem. Tente novamente.');
    }
  };
  
  const handleToggleAutomation = () => {
    if (!selectedLead) {
      toast.error('Selecione um lead para alternar automação');
      return;
    }
    toggleAutomation(selectedLead.id);
  };

  const handleManualRefresh = () => {
    // Triggering a refresh by calling the refresh function from context
    window.location.reload();
  };
  
  // Templates para respostas rápidas
  const messageTemplates = [
    "Olá! Como posso ajudar?",
    "O chá RMGI pode ajudar muito com esse problema.",
    "Entendo sua preocupação. Vamos encontrar uma solução.",
    "Oferecemos parcelamento em até 12x sem juros.",
    "Posso explicar melhor sobre os benefícios do produto?"
  ];
  
  const handleSelectTemplate = (template: string) => {
    setMessageText(template);
  };
  
  if (!selectedLead) {
    return (
      <div className="flex items-center justify-center h-full border rounded-md bg-gray-50">
        <div className="text-center p-6">
          <div className="w-12 h-12 bg-gray-200 rounded-full flex items-center justify-center mx-auto mb-4">
            <Send className="h-6 w-6 text-gray-400" />
          </div>
          <h3 className="text-lg font-medium text-gray-900">Nenhum lead selecionado</h3>
          <p className="text-gray-500 mt-1">Selecione um lead para ver a conversa</p>
        </div>
      </div>
    );
  }
  
  return (
    <div className="flex h-full border rounded-md overflow-hidden">
      <div className={cn(
        "flex flex-col flex-1 bg-gray-100",
        showProfile ? 'w-[calc(100%-300px)]' : 'w-full'
      )}>
        {/* Chat header */}
        <div className="px-4 py-3 bg-whatsapp text-white flex items-center justify-between">
          <div className="flex items-center">
            <h3 className="font-medium">{selectedLead.name}</h3>
            <span className="ml-2 text-xs opacity-75">({selectedLead.phone})</span>
          </div>
          <div className="flex gap-2">
            <div className="flex items-center gap-2">
              <span className="text-xs opacity-75">Atualiza a cada 30s</span>
              <button 
                onClick={handleManualRefresh} 
                className="text-white hover:bg-whatsapp-dark transition-colors p-1 rounded"
                title="Atualizar mensagens"
              >
                <RefreshCw className={`h-4 w-4`} />
              </button>
            </div>
            <Button 
              variant="ghost" 
              size="sm" 
              className="text-white hover:bg-whatsapp-dark"
              onClick={handleToggleAutomation}
            >
              {selectedLead.isAutomationPaused ? (
                <>
                  <PlayCircle className="h-4 w-4 mr-1" />
                  <span className="text-xs">Retomar IA</span>
                </>
              ) : (
                <>
                  <PauseCircle className="h-4 w-4 mr-1" />
                  <span className="text-xs">Pausar IA</span>
                </>
              )}
            </Button>
            <Button
              variant="ghost"
              size="icon"
              className="text-white hover:bg-whatsapp-dark h-8 w-8"
              onClick={() => setShowProfile(!showProfile)}
            >
              {showProfile ? <ChevronRight className="h-4 w-4" /> : <ChevronLeft className="h-4 w-4" />}
            </Button>
          </div>
        </div>
        
        {/* Chat messages */}
        <div className="flex-1 overflow-y-auto p-4 custom-scrollbar">
          {loading.messages ? (
            <div className="flex items-center justify-center h-full">
              <div className="animate-pulse text-gray-400">Carregando mensagens...</div>
            </div>
          ) : messages.length === 0 ? (
            <div className="flex items-center justify-center h-full">
              <div className="text-gray-400">Nenhuma mensagem encontrada</div>
            </div>
          ) : (
            <div className="space-y-3">
              {messages.map(message => (
                <ChatMessage key={message.id} message={message} />
              ))}
              <div ref={messagesEndRef} />
            </div>
          )}
        </div>
        
        {/* Template quick replies */}
        <div className="px-2 py-2 bg-white border-t flex overflow-x-auto">
          {messageTemplates.map((template, index) => (
            <button
              key={index}
              className="px-3 py-1.5 text-xs bg-gray-100 rounded-full mr-2 whitespace-nowrap hover:bg-gray-200"
              onClick={() => handleSelectTemplate(template)}
            >
              {template}
            </button>
          ))}
        </div>
        
        {/* Message input */}
        <form onSubmit={handleSendMessage} className="p-3 bg-white border-t flex gap-2">
          <Input
            placeholder="Digite uma mensagem..."
            value={messageText}
            onChange={(e) => setMessageText(e.target.value)}
            className="flex-1"
          />
          <Button 
            type="submit" 
            className="bg-whatsapp hover:bg-whatsapp-dark"
            disabled={!messageText.trim()}
          >
            <Send className="h-4 w-4" />
          </Button>
        </form>
      </div>
      
      {/* Lead profile sidebar */}
      {showProfile && <LeadProfile lead={selectedLead} />}
    </div>
  );
};

export default ChatInterface;
