
import { useState, useEffect, useRef } from 'react';
import { Message } from '@/types/lead';
import { toast } from 'sonner';
import { fetchMessages, saveMessage } from '@/services/leadService';
import { sendWhatsAppMessage } from '@/services/whatsappService';
import { sendToN8nWebhook } from '@/services/webhookService';

export const useMessages = (selectedLeadId: string | null, selectedLead: any) => {
  const [messages, setMessages] = useState<Message[]>([]);
  const [loading, setLoading] = useState(false);
  const intervalRef = useRef<NodeJS.Timeout | null>(null);

  // Carrega as mensagens quando um lead é selecionado
  useEffect(() => {
    const loadMessages = async () => {
      if (!selectedLeadId) return;
      
      try {
        setLoading(true);
        console.log(`Buscando mensagens para lead: ${selectedLeadId}`);
        const loadedMessages = await fetchMessages(selectedLeadId);
        console.log('Mensagens carregadas:', loadedMessages);
        setMessages(loadedMessages);
      } catch (error) {
        console.error('Erro ao carregar mensagens:', error);
        toast.error('Falha ao carregar mensagens');
      } finally {
        setLoading(false);
      }
    };

    // Limpar interval anterior
    if (intervalRef.current) {
      clearInterval(intervalRef.current);
      intervalRef.current = null;
    }

    if (selectedLeadId) {
      loadMessages();
      
      // Configurar atualização automática a cada 10 segundos
      intervalRef.current = setInterval(() => {
        console.log('Atualizando mensagens automaticamente...');
        loadMessages();
      }, 10000);
    } else {
      setMessages([]);
    }

    // Cleanup do interval quando o lead mudar ou componente desmontar
    return () => {
      if (intervalRef.current) {
        clearInterval(intervalRef.current);
        intervalRef.current = null;
      }
    };
  }, [selectedLeadId]);

  // Função para enviar uma mensagem
  const sendMessage = async (leadId: string, content: string, userName: string) => {
    try {
      // Verificar se o lead está selecionado
      if (!selectedLead) {
        toast.error('Lead não encontrado');
        return null;
      }
      
      console.log('Enviando mensagem para:', selectedLead.phone, 'conteúdo:', content);
      
      // Criar uma mensagem temporária para mostrar no chat
      const tempMessage: Message = {
        id: `temp-${Date.now()}`,
        leadId,
        content,
        sentAt: new Date().toISOString(),
        isFromLead: false,
        isAutomated: false,
        sentBy: userName,
      };
      
      // Atualizar mensagens locais com a mensagem temporária
      setMessages(prev => [...prev, tempMessage]);
      
      // Salvar mensagem no banco de dados usando a nova estrutura
      const newMessage = await saveMessage(leadId, content, userName);
      
      // Substituir a mensagem temporária pela mensagem salva
      setMessages(prev => prev.map(msg => 
        msg.id === tempMessage.id ? newMessage : msg
      ));
      
      // Enviar para webhook n8n se configurado
      await sendToN8nWebhook(leadId, content, userName, newMessage.sentAt, selectedLead)
        .catch(err => console.warn('Erro ao enviar para webhook:', err));
      
      // Enviar via WhatsApp usando Evolution API
      const whatsappSent = await sendWhatsAppMessage(selectedLead.phone, content)
        .catch(err => {
          console.warn('Erro ao enviar WhatsApp:', err);
          return false;
        });
        
      if (!whatsappSent) {
        console.warn('Não foi possível enviar mensagem de WhatsApp via Evolution API');
      }
      
      toast.success('Mensagem enviada');
      
      return newMessage;
    } catch (error) {
      console.error('Erro ao enviar mensagem:', error);
      toast.error('Erro ao enviar mensagem');
      return null;
    }
  };

  const refreshMessages = async () => {
    if (!selectedLeadId) return;
    
    try {
      console.log('Atualizando mensagens manualmente...');
      const loadedMessages = await fetchMessages(selectedLeadId);
      setMessages(loadedMessages);
      toast.success('Mensagens atualizadas');
    } catch (error) {
      console.error('Erro ao atualizar mensagens:', error);
      toast.error('Erro ao atualizar mensagens');
    }
  };

  return {
    messages,
    loading,
    sendMessage,
    setMessages,
    refreshMessages
  };
};
