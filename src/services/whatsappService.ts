
import { supabase } from '@/integrations/supabase/client';

// Get WhatsApp credentials from database
export const getWhatsAppCredentials = async (): Promise<{ instance: string; apiKey: string; baseUrl: string } | null> => {
  try {
    // Get the WhatsApp credentials from SAAS_usuarios table
    const { data, error } = await supabase
      .from('SAAS_usuarios')
      .select('whatsapp_instancia, whatsapp_api_key')
      .limit(1)
      .single();
    
    if (error) throw error;
    
    if (!data?.whatsapp_instancia || !data?.whatsapp_api_key) {
      console.error('Missing WhatsApp credentials in SAAS_usuarios');
      return null;
    }
    
    return {
      instance: data.whatsapp_instancia,
      apiKey: data.whatsapp_api_key,
      baseUrl: "https://zapns.edgeserver.com.br"
    };
  } catch (error) {
    console.error('Error getting WhatsApp credentials:', error);
    return null;
  }
};

// Send message via Evolution API
export const sendWhatsAppMessage = async (phone: string, content: string): Promise<boolean> => {
  try {
    const credentials = await getWhatsAppCredentials();
    
    if (!credentials) {
      console.error('No WhatsApp credentials available');
      return false;
    }
    
    const { instance, apiKey, baseUrl } = credentials;
    
    const endpoint = `${baseUrl}/message/sendText/${instance}`;
    
    // Make sure phone is in correct format (just numbers, no special chars)
    const cleanPhone = phone.replace(/\D/g, '');
    
    const response = await fetch(endpoint, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'apikey': apiKey
      },
      body: JSON.stringify({
        number: cleanPhone,
        options: {
          delay: 1200,
          presence: 'composing'
        },
        textMessage: {
          text: content
        }
      })
    });
    
    if (!response.ok) {
      const errorText = await response.text();
      console.error('Failed to send WhatsApp message:', errorText);
      return false;
    }
    
    const responseData = await response.json();
    console.log('WhatsApp message sent successfully:', responseData);
    return true;
    
  } catch (error) {
    console.error('Error sending WhatsApp message:', error);
    return false;
  }
};
