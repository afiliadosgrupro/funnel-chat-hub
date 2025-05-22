
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
        const loadedMessages = await fetchMessages(selectedLeadId);
        console.log('Mensagens carregadas:', loadedMessages);
        setMessages(loadedMessages);
      } catch (error) {
        console.error('Erro ao carregar mensagens:', error);
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
        return;
      }
      
      console.log('Enviando mensagem para:', selectedLead.phone, 'conteúdo:', content);
      
      // Salvar mensagem no banco de dados
      // Modificado para não usar o campo 'vendedor' que não existe na tabela
      const newMessage = await saveMessage(leadId, content, userName);
      
      // Atualizar mensagens locais
      setMessages(prev => [...prev, newMessage]);
      
      // Enviar para webhook n8n se configurado
      await sendToN8nWebhook(leadId, content, userName, newMessage.sentAt, selectedLead);
      
      // Enviar via WhatsApp usando Evolution API
      const whatsappSent = await sendWhatsAppMessage(selectedLead.phone, content);
      if (!whatsappSent) {
        console.warn('Não foi possível enviar mensagem de WhatsApp via Evolution API');
      }
      
      toast.success('Mensagem enviada');
      
      return newMessage;
    } catch (error) {
      console.error('Erro ao enviar mensagem:', error);
      toast.error('Erro ao enviar mensagem');
      throw error;
    }
  };

  return {
    messages,
    loading,
    sendMessage,
    setMessages
  };
};
