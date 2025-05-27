
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Switch } from '@/components/ui/switch';
import { Loader2, Save } from 'lucide-react';
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';
import { supabase } from '@/integrations/supabase/client';
import { toast } from 'sonner';
import * as schemas from './schemas';

interface IntegrationTabProps {
  userData: any;
  loading: boolean;
  setLoading: (loading: boolean) => void;
  tabType: 'openai' | 'facebook' | 'braip' | 'keed' | 'payt' | 'google-sheets';
  title: string;
  description: string;
}

export const IntegrationTab = ({ userData, loading, setLoading, tabType, title, description }: IntegrationTabProps) => {
  const getSchemaAndDefaults = () => {
    switch (tabType) {
      case 'openai':
        return {
          schema: schemas.openaiSchema,
          defaults: {
            openai_token: userData?.openai_token || '',
            openai_assistente_id: userData?.openai_assistente_id || '',
            openai_modelo_preferido: userData?.openai_modelo_preferido || 'gpt-4',
            openai_ativo: userData?.openai_ativo || false
          }
        };
      case 'facebook':
        return {
          schema: schemas.facebookSchema,
          defaults: {
            facebook_token_pagina: userData?.facebook_token_pagina || '',
            facebook_token_usuario: userData?.facebook_token_usuario || '',
            facebook_token_api: userData?.facebook_token_api || '',
            facebook_pixel_id: userData?.facebook_pixel_id || '',
            facebook_app_id: userData?.facebook_app_id || '',
            facebook_ativo: userData?.facebook_ativo || false
          }
        };
      case 'braip':
        return {
          schema: schemas.braipSchema,
          defaults: {
            braip_webhook_url: userData?.braip_webhook_url || '',
            braip_token: userData?.braip_token || '',
            braip_ativo: userData?.braip_ativo || false
          }
        };
      case 'keed':
        return {
          schema: schemas.keedSchema,
          defaults: {
            keed_webhook_url: userData?.keed_webhook_url || '',
            keed_token: userData?.keed_token || '',
            keed_ativo: userData?.keed_ativo || false
          }
        };
      case 'payt':
        return {
          schema: schemas.paytSchema,
          defaults: {
            payt_webhook_url: userData?.payt_webhook_url || '',
            payt_token: userData?.payt_token || '',
            payt_ativo: userData?.payt_ativo || false
          }
        };
      case 'google-sheets':
        return {
          schema: schemas.googleSheetsSchema,
          defaults: {
            google_sheets_token: userData?.google_sheets_token || '',
            google_sheets_id_planilha: userData?.google_sheets_id_planilha || '',
            google_sheets_ativo: userData?.google_sheets_ativo || false
          }
        };
      default:
        throw new Error(`Unknown tab type: ${tabType}`);
    }
  };

  const { schema, defaults } = getSchemaAndDefaults();
  
  const form = useForm({
    resolver: zodResolver(schema),
    defaultValues: defaults
  });

  const onSubmit = async (values: any) => {
    if (!userData) return;
    
    try {
      setLoading(true);
      
      const updateData = {
        ...values,
        data_alteracao: new Date().toISOString()
      };

      const { error } = await supabase
        .from('SAAS_usuarios')
        .update(updateData)
        .eq('id', userData.id);

      if (error) {
        throw error;
      }

      toast.success(`Configurações da ${title} atualizadas com sucesso.`);
    } catch (error: any) {
      console.error(`Erro ao atualizar configurações da ${title}:`, error);
      toast.error(`Não foi possível atualizar as configurações da ${title}.`);
    } finally {
      setLoading(false);
    }
  };

  const renderFields = () => {
    switch (tabType) {
      case 'openai':
        return (
          <>
            <FormField
              control={form.control}
              name="openai_token"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Token da API</FormLabel>
                  <FormControl>
                    <Input type="password" placeholder="Token de autenticação da API OpenAI" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            
            <FormField
              control={form.control}
              name="openai_assistente_id"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>ID do Assistente</FormLabel>
                  <FormControl>
                    <Input placeholder="ID do assistente criado na OpenAI" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            
            <FormField
              control={form.control}
              name="openai_modelo_preferido"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Modelo</FormLabel>
                  <Select value={field.value} onValueChange={field.onChange}>
                    <FormControl>
                      <SelectTrigger>
                        <SelectValue placeholder="Selecione o modelo da OpenAI" />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      <SelectItem value="gpt-4">GPT-4</SelectItem>
                      <SelectItem value="gpt-4-turbo">GPT-4 Turbo</SelectItem>
                      <SelectItem value="gpt-3.5-turbo">GPT-3.5 Turbo</SelectItem>
                    </SelectContent>
                  </Select>
                  <FormMessage />
                </FormItem>
              )}
            />
            
            <FormField
              control={form.control}
              name="openai_ativo"
              render={({ field }) => (
                <FormItem className="flex flex-row items-center justify-between rounded-lg border p-4">
                  <div className="space-y-0.5">
                    <FormLabel className="text-base">API Ativa</FormLabel>
                    <FormDescription>Ativa ou desativa a integração com a OpenAI</FormDescription>
                  </div>
                  <FormControl>
                    <Switch checked={field.value} onCheckedChange={field.onChange} />
                  </FormControl>
                </FormItem>
              )}
            />
          </>
        );
        
      case 'facebook':
        return (
          <>
            <FormField
              control={form.control}
              name="facebook_token_pagina"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Token da Página</FormLabel>
                  <FormControl>
                    <Input type="password" placeholder="Token da página do Facebook" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            
            <FormField
              control={form.control}
              name="facebook_token_usuario"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Token do Usuário</FormLabel>
                  <FormControl>
                    <Input type="password" placeholder="Token de acesso do usuário" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            
            <FormField
              control={form.control}
              name="facebook_token_api"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Token da API</FormLabel>
                  <FormControl>
                    <Input type="password" placeholder="Token da API do Facebook" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            
            <FormField
              control={form.control}
              name="facebook_pixel_id"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>ID do Pixel</FormLabel>
                  <FormControl>
                    <Input placeholder="ID do pixel de conversão" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            
            <FormField
              control={form.control}
              name="facebook_app_id"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>ID do Aplicativo</FormLabel>
                  <FormControl>
                    <Input placeholder="ID do aplicativo do Facebook" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            
            <FormField
              control={form.control}
              name="facebook_ativo"
              render={({ field }) => (
                <FormItem className="flex flex-row items-center justify-between rounded-lg border p-4">
                  <div className="space-y-0.5">
                    <FormLabel className="text-base">API Ativa</FormLabel>
                    <FormDescription>Ativa ou desativa a integração com o Facebook</FormDescription>
                  </div>
                  <FormControl>
                    <Switch checked={field.value} onCheckedChange={field.onChange} />
                  </FormControl>
                </FormItem>
              )}
            />
          </>
        );
        
      case 'google-sheets':
        return (
          <>
            <FormField
              control={form.control}
              name="google_sheets_token"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Token de Acesso</FormLabel>
                  <FormControl>
                    <Input type="password" placeholder="Token de autenticação do Google Sheets" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            
            <FormField
              control={form.control}
              name="google_sheets_id_planilha"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>ID da Planilha</FormLabel>
                  <FormControl>
                    <Input placeholder="ID da planilha no Google Sheets" {...field} />
                  </FormControl>
                  <FormDescription>O ID está presente na URL da planilha</FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />
            
            <FormField
              control={form.control}
              name="google_sheets_ativo"
              render={({ field }) => (
                <FormItem className="flex flex-row items-center justify-between rounded-lg border p-4">
                  <div className="space-y-0.5">
                    <FormLabel className="text-base">API Ativa</FormLabel>
                    <FormDescription>Ativa ou desativa a integração com o Google Sheets</FormDescription>
                  </div>
                  <FormControl>
                    <Switch checked={field.value} onCheckedChange={field.onChange} />
                  </FormControl>
                </FormItem>
              )}
            />
          </>
        );
        
      case 'braip':
        return (
          <>
            <FormField
              control={form.control}
              name="braip_webhook_url"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>URL do Webhook</FormLabel>
                  <FormControl>
                    <Input placeholder={`URL para receber notificações da ${title}`} {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            
            <FormField
              control={form.control}
              name="braip_token"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Token da API</FormLabel>
                  <FormControl>
                    <Input type="password" placeholder={`Token de autenticação da API ${title}`} {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            
            <FormField
              control={form.control}
              name="braip_ativo"
              render={({ field }) => (
                <FormItem className="flex flex-row items-center justify-between rounded-lg border p-4">
                  <div className="space-y-0.5">
                    <FormLabel className="text-base">API Ativa</FormLabel>
                    <FormDescription>Ativa ou desativa a integração com a {title}</FormDescription>
                  </div>
                  <FormControl>
                    <Switch checked={field.value} onCheckedChange={field.onChange} />
                  </FormControl>
                </FormItem>
              )}
            />
          </>
        );
        
      case 'keed':
        return (
          <>
            <FormField
              control={form.control}
              name="keed_webhook_url"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>URL do Webhook</FormLabel>
                  <FormControl>
                    <Input placeholder={`URL para receber notificações da ${title}`} {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            
            <FormField
              control={form.control}
              name="keed_token"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Token da API</FormLabel>
                  <FormControl>
                    <Input type="password" placeholder={`Token de autenticação da API ${title}`} {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            
            <FormField
              control={form.control}
              name="keed_ativo"
              render={({ field }) => (
                <FormItem className="flex flex-row items-center justify-between rounded-lg border p-4">
                  <div className="space-y-0.5">
                    <FormLabel className="text-base">API Ativa</FormLabel>
                    <FormDescription>Ativa ou desativa a integração com a {title}</FormDescription>
                  </div>
                  <FormControl>
                    <Switch checked={field.value} onCheckedChange={field.onChange} />
                  </FormControl>
                </FormItem>
              )}
            />
          </>
        );
        
      case 'payt':
        return (
          <>
            <FormField
              control={form.control}
              name="payt_webhook_url"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>URL do Webhook</FormLabel>
                  <FormControl>
                    <Input placeholder={`URL para receber notificações da ${title}`} {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            
            <FormField
              control={form.control}
              name="payt_token"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Token da API</FormLabel>
                  <FormControl>
                    <Input type="password" placeholder={`Token de autenticação da API ${title}`} {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            
            <FormField
              control={form.control}
              name="payt_ativo"
              render={({ field }) => (
                <FormItem className="flex flex-row items-center justify-between rounded-lg border p-4">
                  <div className="space-y-0.5">
                    <FormLabel className="text-base">API Ativa</FormLabel>
                    <FormDescription>Ativa ou desativa a integração com a {title}</FormDescription>
                  </div>
                  <FormControl>
                    <Switch checked={field.value} onCheckedChange={field.onChange} />
                  </FormControl>
                </FormItem>
              )}
            />
          </>
        );
        
      default:
        return null;
    }
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle>Configurações da {title}</CardTitle>
        <CardDescription>{description}</CardDescription>
      </CardHeader>
      <CardContent>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
            {renderFields()}
            
            <Button 
              type="submit" 
              className="w-full md:w-auto bg-whatsapp hover:bg-whatsapp-dark"
              disabled={loading}
            >
              {loading ? (
                <>
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  Salvando...
                </>
              ) : (
                <>
                  <Save className="mr-2 h-4 w-4" />
                  Salvar Configurações
                </>
              )}
            </Button>
          </form>
        </Form>
      </CardContent>
    </Card>
  );
};
