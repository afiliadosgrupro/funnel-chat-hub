
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
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
import { whatsappSchema, WhatsappFormValues } from './schemas';
import { supabase } from '@/integrations/supabase/client';
import { toast } from 'sonner';

interface WhatsAppTabProps {
  userData: any;
  loading: boolean;
  setLoading: (loading: boolean) => void;
}

export const WhatsAppTab = ({ userData, loading, setLoading }: WhatsAppTabProps) => {
  const form = useForm<WhatsappFormValues>({
    resolver: zodResolver(whatsappSchema),
    defaultValues: {
      whatsapp_url_servidor: userData?.whatsapp_url_servidor || '',
      whatsapp_api_key: userData?.whatsapp_api_key || '',
      whatsapp_instancia: userData?.whatsapp_instancia || '',
      whatsapp_numero: userData?.whatsapp_numero || '',
      whatsapp_webhook_url: userData?.whatsapp_webhook_url || '',
      whatsapp_webhook_conectado: userData?.whatsapp_webhook_conectado || false,
      whatsapp_status: userData?.whatsapp_status || 'desconectado',
      whatsapp_nome_perfil: userData?.whatsapp_nome_perfil || ''
    }
  });

  const onSubmit = async (values: WhatsappFormValues) => {
    if (!userData) return;
    
    try {
      setLoading(true);
      
      const { error } = await supabase
        .from('SAAS_usuarios')
        .update({
          whatsapp_url_servidor: values.whatsapp_url_servidor,
          whatsapp_api_key: values.whatsapp_api_key,
          whatsapp_instancia: values.whatsapp_instancia,
          whatsapp_numero: values.whatsapp_numero,
          whatsapp_webhook_url: values.whatsapp_webhook_url,
          whatsapp_webhook_conectado: values.whatsapp_webhook_conectado,
          whatsapp_status: values.whatsapp_status,
          whatsapp_nome_perfil: values.whatsapp_nome_perfil,
          data_alteracao: new Date().toISOString()
        })
        .eq('id', userData.id);

      if (error) {
        throw error;
      }

      toast.success('Configurações do WhatsApp atualizadas com sucesso.');
    } catch (error: any) {
      console.error('Erro ao atualizar configurações do WhatsApp:', error);
      toast.error('Não foi possível atualizar as configurações do WhatsApp.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle>Configurações do WhatsApp</CardTitle>
        <CardDescription>
          Configure a integração com a API do WhatsApp
        </CardDescription>
      </CardHeader>
      <CardContent>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
            <FormField
              control={form.control}
              name="whatsapp_url_servidor"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>URL do Servidor</FormLabel>
                  <FormControl>
                    <Input placeholder="URL do servidor da API do WhatsApp" {...field} />
                  </FormControl>
                  <FormDescription>
                    URL da API de integração com o WhatsApp
                  </FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />
            
            <FormField
              control={form.control}
              name="whatsapp_api_key"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Chave da API</FormLabel>
                  <FormControl>
                    <Input type="password" placeholder="Chave de autenticação da API" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            
            <FormField
              control={form.control}
              name="whatsapp_instancia"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Nome da Instância</FormLabel>
                  <FormControl>
                    <Input placeholder="Nome da instância do WhatsApp" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            
            <FormField
              control={form.control}
              name="whatsapp_numero"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Número do WhatsApp</FormLabel>
                  <FormControl>
                    <Input placeholder="Número no formato: 5511999999999" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            
            <FormField
              control={form.control}
              name="whatsapp_webhook_url"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>URL do Webhook</FormLabel>
                  <FormControl>
                    <Input placeholder="URL para receber notificações do WhatsApp" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            
            <FormField
              control={form.control}
              name="whatsapp_webhook_conectado"
              render={({ field }) => (
                <FormItem className="flex flex-row items-center justify-between rounded-lg border p-4">
                  <div className="space-y-0.5">
                    <FormLabel className="text-base">
                      Webhook Conectado
                    </FormLabel>
                    <FormDescription>
                      Indica se o webhook está atualmente conectado
                    </FormDescription>
                  </div>
                  <FormControl>
                    <Switch
                      checked={field.value}
                      onCheckedChange={field.onChange}
                    />
                  </FormControl>
                </FormItem>
              )}
            />
            
            <FormField
              control={form.control}
              name="whatsapp_nome_perfil"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Nome do Perfil</FormLabel>
                  <FormControl>
                    <Input placeholder="Nome exibido no perfil do WhatsApp" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            
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
