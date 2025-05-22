
import { supabase } from '@/integrations/supabase/client';
import { Lead } from '@/types/lead';

// Function to get n8n webhook URL from database
export const getN8nWebhookUrl = async (): Promise<string | null> => {
  try {
    // Get the n8n webhook URL from SAAS_usuarios table
    const { data, error } = await supabase
      .from('SAAS_usuarios')
      .select('n8n_webhook_url')
      .limit(1)
      .single();
    
    if (error) throw error;
    
    return data?.n8n_webhook_url || null;
  } catch (error) {
    console.error('Error getting n8n webhook URL:', error);
    return null;
  }
};

// Function to send data to n8n webhook
export const sendToN8nWebhook = async (
  leadId: string, 
  message: string, 
  sentBy: string, 
  sentAt: string, 
  leadData: Lead | null
): Promise<boolean> => {
  try {
    const webhookUrl = await getN8nWebhookUrl();
    
    if (!webhookUrl) {
      console.log('No webhook URL configured');
      return false;
    }
    
    const webhookResponse = await fetch(webhookUrl, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        leadId,
        message,
        sentBy,
        sentAt,
        leadData
      })
    });

    if (!webhookResponse.ok) {
      console.error('Failed to send to n8n webhook:', await webhookResponse.text());
      return false;
    } 
    
    console.log('Successfully sent to n8n webhook');
    return true;
  } catch (error) {
    console.error('Error sending to n8n webhook:', error);
    return false;
  }
};
