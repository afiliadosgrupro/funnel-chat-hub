
import { useState, useEffect } from 'react';
import { Message } from '@/types/lead';
import { toast } from 'sonner';
import { fetchMessages, saveMessage } from '@/services/leadService';
import { sendWhatsAppMessage } from '@/services/whatsappService';
import { sendToN8nWebhook } from '@/services/webhookService';

export const useMessages = (selectedLeadId: string | null, selectedLead: any) => {
  const [messages, setMessages] = useState<Message[]>([]);
  const [loading, setLoading] = useState(false);

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

    loadMessages();
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
      
      // Salvar mensagem no banco de dados
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

  return {
    messages,
    loading,
    sendMessage,
    setMessages
  };
};
