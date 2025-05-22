
import { useState, useEffect } from 'react';
import { Message } from '@/types/lead';
import { toast } from 'sonner';
import { fetchMessages, saveMessage } from '@/services/leadService';
import { sendWhatsAppMessage } from '@/services/whatsappService';
import { sendToN8nWebhook } from '@/services/webhookService';

export const useMessages = (selectedLeadId: string | null, selectedLead: any) => {
  const [messages, setMessages] = useState<Message[]>([]);
  const [loading, setLoading] = useState(false);

  // Load messages when a lead is selected
  useEffect(() => {
    const loadMessages = async () => {
      if (!selectedLeadId) return;
      
      try {
        setLoading(true);
        const loadedMessages = await fetchMessages(selectedLeadId);
        setMessages(loadedMessages);
      } catch (error) {
        console.error('Error loading messages:', error);
      } finally {
        setLoading(false);
      }
    };

    loadMessages();
  }, [selectedLeadId]);

  // Function to send a message
  const sendMessage = async (leadId: string, content: string, userName: string) => {
    try {
      // Get the lead to access phone number (this will now be passed from context)
      if (!selectedLead) {
        toast.error('Lead não encontrado');
        return;
      }
      
      // Save message to database
      const newMessage = await saveMessage(leadId, content, userName);
      
      // Update messages
      setMessages(prev => [...prev, newMessage]);
      
      // Send to n8n webhook if configured
      await sendToN8nWebhook(leadId, content, userName, newMessage.sentAt, selectedLead);
      
      // Send via WhatsApp using Evolution API
      const whatsappSent = await sendWhatsAppMessage(selectedLead.phone, content);
      if (!whatsappSent) {
        console.warn('Could not send WhatsApp message via Evolution API');
      }
      
      toast.success('Mensagem enviada');
      
      return newMessage;
    } catch (error) {
      console.error('Error sending message:', error);
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
