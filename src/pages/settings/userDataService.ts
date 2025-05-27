
import { supabase } from '@/integrations/supabase/client';
import { toast } from 'sonner';

export const fetchUserData = async (userEmail: string) => {
  console.log('Settings: Buscando dados para o email:', userEmail);
  
  // Primeiro, vamos verificar se existe o usuário na tabela SAAS_usuarios
  const { data, error, count } = await supabase
    .from('SAAS_usuarios')
    .select('*', { count: 'exact' })
    .eq('email', userEmail);

  console.log('Settings: Resultado da consulta:', { data, error, count });

  if (error) {
    console.error('Settings: Erro ao buscar dados do usuário:', error);
    
    // Se não encontrou o usuário, vamos criar um registro básico
    if (error.code === 'PGRST116') {
      console.log('Settings: Usuário não encontrado, criando registro básico...');
      return await createNewUser(userEmail);
    } else {
      toast.error('Erro ao carregar configurações do usuário.');
      throw error;
    }
  }

  if (data && data.length > 0) {
    const user_data = data[0];
    console.log('Settings: Dados do usuário encontrados:', user_data);
    return user_data;
  } else {
    console.log('Settings: Nenhum dado encontrado para o usuário');
    return await createNewUser(userEmail);
  }
};

const createNewUser = async (userEmail: string) => {
  try {
    // Buscar o próximo ID disponível
    const { data: maxIdData } = await supabase
      .from('SAAS_usuarios')
      .select('id')
      .order('id', { ascending: false })
      .limit(1);

    const nextId = maxIdData && maxIdData.length > 0 ? maxIdData[0].id + 1 : 1;

    const newUserData = {
      id: nextId,
      email: userEmail,
      nome_usuario: 'Usuário',
      senha_hash: 'temp123',
      tipo_usuario: 'vendedor',
      ativo: true,
      produto_principal: 'cha_rmgi'
    } as any;

    const { data, error: insertError } = await supabase
      .from('SAAS_usuarios')
      .insert(newUserData)
      .select()
      .single();

    if (insertError) {
      console.error('Settings: Erro ao criar usuário:', insertError);
      toast.error('Não foi possível criar o perfil do usuário.');
      throw insertError;
    }

    console.log('Settings: Usuário criado com sucesso:', data);
    toast.success('Perfil criado com sucesso! Configure suas informações.');
    return data;
  } catch (error) {
    console.error('Settings: Erro ao criar usuário:', error);
    toast.error('Não foi possível criar o perfil do usuário.');
    throw error;
  }
};
