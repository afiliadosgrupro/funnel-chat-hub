
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
      
      const { data: newUserData, error: insertError } = await supabase
        .from('SAAS_usuarios')
        .insert({
          email: userEmail,
          nome_usuario: 'Usuário',
          senha_hash: 'temp123', // senha temporária
          tipo_usuario: 'vendedor',
          ativo: true,
          produto_principal: 'cha_rmgi'
        } as any)
        .select()
        .single();

      if (insertError) {
        console.error('Settings: Erro ao criar usuário:', insertError);
        toast.error('Não foi possível criar o perfil do usuário.');
        throw insertError;
      }

      console.log('Settings: Usuário criado com sucesso:', newUserData);
      toast.success('Perfil criado com sucesso! Configure suas informações.');
      return newUserData;
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
    // Criar usuário se não existir
    const { data: newUserData, error: insertError } = await supabase
      .from('SAAS_usuarios')
      .insert({
        email: userEmail,
        nome_usuario: 'Usuário',
        senha_hash: 'temp123',
        tipo_usuario: 'vendedor',
        ativo: true,
        produto_principal: 'cha_rmgi'
      } as any)
      .select()
      .single();

    if (insertError) {
      console.error('Settings: Erro ao criar usuário:', insertError);
      toast.error('Não foi possível criar o perfil do usuário.');
      throw insertError;
    }

    toast.success('Perfil criado! Configure suas informações.');
    return newUserData;
  }
};
