
import { supabase } from '@/integrations/supabase/client';
import { Lead, Message, FunnelStage } from '@/types/lead';
import { toast } from 'sonner';

// Convert data from Março | FUNIL Bruno to our Lead type
export const convertToLead = (funnelData: any, cadastroData: any = {}, lastMessage: any = null): Lead => {
  // Map the funil value to our FunnelStage type
  const stageMappings: Record<string, FunnelStage> = {
    'Apresentação': 'initial',
    'Identificação': 'identification',
    'Conscientização': 'awareness',
    'Validação': 'validation',
    'Negociação': 'negotiation',
    'Objeção': 'objection',
    'Compra': 'purchase'
  };
  
  const stage = stageMappings[funnelData.funil] || 'initial';
  
  return {
    id: funnelData.id,
    name: cadastroData.name || 'Sem nome',
    phone: cadastroData.phone || funnelData.phone || '',
    stage: stage,
    stageUpdatedAt: funnelData.created_at || new Date().toISOString(),
    assignedTo: funnelData.vendedor || null,
    isHot: stage === 'negotiation' || stage === 'objection',
    lastMessageAt: lastMessage?.created_at || funnelData.created_at || new Date().toISOString(),
    lastMessage: lastMessage?.message_content || 'Nova conversa',
    symptoms: funnelData['Sintomas Extração'] ? 
      funnelData['Sintomas Extração'].split(',').map((s: string) => s.trim()) : 
      [],
    problemDuration: funnelData['Tempo problema Extração'] || '',
    attemptsToSolve: funnelData['Medicamentos Extração'] ? 
      funnelData['Medicamentos Extração'].split(',').map((s: string) => s.trim()) : 
      [],
    isActive: true,
    isAutomationPaused: funnelData['Time_is_active'] === false
  };
};

// Convert a message from Março | Menssagem Bruno to our Message type
export const convertToMessage = (msgData: any): Message => {
  console.log('Convertendo mensagem:', msgData);
  return {
    id: msgData.id.toString(),
    leadId: msgData.conversation_id,
    content: msgData.message_content || '',
    sentAt: msgData.created_at,
    isFromLead: msgData.status === 'received',
    isAutomated: false, // Não temos essa info na tabela
    sentBy: msgData.nome_remente || undefined
  };
};

// Fetch leads from Supabase
export const fetchLeads = async (): Promise<Lead[]> => {
  try {
    // Fetch data from Março | FUNIL Bruno
    const { data: funnelData, error: funnelError } = await supabase
      .from('Março | FUNIL Bruno')
      .select('*')
      .order('created_at', { ascending: false });
    
    if (funnelError) throw funnelError;
    
    // Fetch user data from Março | Cadastro Bruno
    const { data: cadastroData, error: cadastroError } = await supabase
      .from('Março | Cadastro Bruno')
      .select('*');
    
    if (cadastroError) throw cadastroError;
    
    // Fetch last messages from Março | Menssagem Bruno
    const { data: messagesData, error: messagesError } = await supabase
      .from('Março | Menssagem Bruno')
      .select('conversation_id, message_content, created_at')
      .order('created_at', { ascending: false });
    
    if (messagesError) throw messagesError;
    
    // Create a map of cadastro data by ID for quick lookup
    const cadastroMap = new Map();
    cadastroData.forEach((item: any) => {
      cadastroMap.set(item.id, item);
    });
    
    // Create a map of last messages by conversation_id
    const lastMessagesMap = new Map();
    messagesData.forEach((msg: any) => {
      if (!lastMessagesMap.has(msg.conversation_id)) {
        lastMessagesMap.set(msg.conversation_id, msg);
      }
    });
    
    // Convert the data to our Lead format
    const leadsList: Lead[] = funnelData.map((funnel: any) => {
      const cadastro = cadastroMap.get(funnel.id);
      const lastMessage = lastMessagesMap.get(funnel.id);
      return convertToLead(funnel, cadastro, lastMessage);
    });
    
    return leadsList;
  } catch (error) {
    console.error('Error fetching leads:', error);
    toast.error('Erro ao buscar leads');
    throw error;
  }
};

// Fetch messages for a lead from Supabase
export const fetchMessages = async (leadId: string): Promise<Message[]> => {
  try {
    console.log('Buscando mensagens para lead:', leadId);
    
    // Fetch messages from Março | Menssagem Bruno usando conversation_id para parear
    const { data: messagesData, error: messagesError } = await supabase
      .from('Março | Menssagem Bruno')
      .select('*')
      .eq('conversation_id', leadId)
      .order('created_at', { ascending: true });
    
    if (messagesError) {
      console.error('Erro na consulta:', messagesError);
      throw messagesError;
    }
    
    // Convert to our Message format
    const messagesList: Message[] = messagesData ? messagesData.map(convertToMessage) : [];
    
    console.log('Mensagens encontradas:', messagesList.length, messagesData);
    return messagesList;
  } catch (error) {
    console.error('Erro ao buscar mensagens:', error);
    toast.error('Erro ao buscar mensagens');
    throw error;
  }
};

// Assign a lead to a user
export const assignLead = async (leadId: string, userId: string | null): Promise<void> => {
  try {
    // Update in Supabase
    const { error } = await supabase
      .from('Março | FUNIL Bruno')
      .update({ vendedor: userId })
      .eq('id', leadId);
    
    if (error) throw error;
    
    toast.success('Lead atribuído com sucesso');
  } catch (error) {
    console.error('Error assigning lead:', error);
    toast.error('Erro ao atribuir lead');
    throw error;
  }
};

// Toggle lead automation
export const toggleLeadAutomation = async (leadId: string, currentValue: boolean): Promise<boolean> => {
  try {
    // Toggle the isAutomationPaused value
    const newValue = !currentValue;
    
    // Update in Supabase
    const { error } = await supabase
      .from('Março | FUNIL Bruno')
      .update({ Time_is_active: !newValue })
      .eq('id', leadId);
    
    if (error) throw error;
    
    toast.success(`Automação ${newValue ? 'pausada' : 'ativada'}`);
    return newValue;
  } catch (error) {
    console.error('Error toggling automation:', error);
    toast.error('Erro ao alterar automação');
    throw error;
  }
};

// Update a lead's stage
export const updateLeadStage = async (leadId: string, stage: FunnelStage): Promise<void> => {
  try {
    // Map our FunnelStage type to Março | FUNIL Bruno funil values
    const stageMapping: Record<FunnelStage, string> = {
      initial: 'Apresentação',
      identification: 'Identificação',
      awareness: 'Conscientização',
      validation: 'Validação',
      negotiation: 'Negociação',
      objection: 'Objeção',
      purchase: 'Compra'
    };
    
    // Update in Supabase
    const { error } = await supabase
      .from('Março | FUNIL Bruno')
      .update({ 
        funil: stageMapping[stage],
      })
      .eq('id', leadId);
    
    if (error) throw error;
    
    toast.success('Etapa do funil atualizada');
  } catch (error) {
    console.error('Error updating lead stage:', error);
    toast.error('Erro ao atualizar etapa do funil');
    throw error;
  }
};

// Send and save a message
export const saveMessage = async (leadId: string, content: string, userName: string): Promise<Message> => {
  try {
    console.log(`Salvando mensagem para lead ${leadId}: ${content}`);
    
    // Construir objeto de dados para inserção usando conversation_id corretamente
    const messageData = {
      conversation_id: leadId,
      message_content: content,
      status: 'sent',
      nome_remente: userName
    };
    
    // Inserir na tabela Março | Menssagem Bruno
    const { data, error } = await supabase
      .from('Março | Menssagem Bruno')
      .insert(messageData)
      .select()
      .single();
    
    if (error) {
      console.error('Erro ao inserir mensagem:', error);
      throw error;
    }
    
    console.log('Mensagem salva com sucesso:', data);
    
    // Criar nova mensagem
    const newMessage: Message = {
      id: data.id.toString(),
      leadId,
      content,
      sentAt: data.created_at,
      isFromLead: false,
      isAutomated: false,
      sentBy: userName,
    };
    
    // Atualizar histórico em Março | FUNIL Bruno (opcional, manter compatibilidade)
    await supabase
      .from('Março | FUNIL Bruno')
      .update({ 
        HISTORICO_CONVERSA: content, 
        ULTIMA_INTERACAO_CLIENTE: new Date().toISOString()
      })
      .eq('id', leadId);
    
    return newMessage;
  } catch (error) {
    console.error('Erro ao salvar mensagem:', error);
    toast.error('Erro ao salvar mensagem');
    throw error;
  }
};
