
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Loader2, Save } from 'lucide-react';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';
import { companyProfileSchema, CompanyProfileFormValues } from './schemas';
import { supabase } from '@/integrations/supabase/client';
import { toast } from 'sonner';

interface CompanyProfileTabProps {
  userData: any;
  loading: boolean;
  setLoading: (loading: boolean) => void;
}

export const CompanyProfileTab = ({ userData, loading, setLoading }: CompanyProfileTabProps) => {
  const form = useForm<CompanyProfileFormValues>({
    resolver: zodResolver(companyProfileSchema),
    defaultValues: {
      nome_empresa: userData?.nome_empresa || '',
      telefone_empresa: userData?.telefone_empresa || '',
      endereco_empresa: userData?.endereco_empresa || '',
      produto_principal: userData?.produto_principal || 'cha_rmgi',
      cnpj: userData?.cnpj || ''
    }
  });

  const onSubmit = async (values: CompanyProfileFormValues) => {
    if (!userData) return;
    
    try {
      setLoading(true);
      
      const { error } = await supabase
        .from('SAAS_usuarios')
        .update({
          nome_empresa: values.nome_empresa,
          telefone_empresa: values.telefone_empresa,
          endereco_empresa: values.endereco_empresa,
          produto_principal: values.produto_principal,
          cnpj: values.cnpj,
          data_alteracao: new Date().toISOString()
        })
        .eq('id', userData.id);

      if (error) {
        throw error;
      }

      toast.success('Perfil da empresa atualizado com sucesso.');
    } catch (error: any) {
      console.error('Erro ao atualizar perfil:', error);
      toast.error('Não foi possível atualizar o perfil da empresa.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle>Perfil da Empresa</CardTitle>
        <CardDescription>
          Configure as informações básicas da sua empresa
        </CardDescription>
      </CardHeader>
      <CardContent>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
            <FormField
              control={form.control}
              name="nome_empresa"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Nome da Empresa</FormLabel>
                  <FormControl>
                    <Input placeholder="Nome da sua empresa" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            
            <FormField
              control={form.control}
              name="cnpj"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>CNPJ</FormLabel>
                  <FormControl>
                    <Input placeholder="CNPJ da empresa" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            
            <FormField
              control={form.control}
              name="telefone_empresa"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Telefone</FormLabel>
                  <FormControl>
                    <Input placeholder="Telefone de contato" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            
            <FormField
              control={form.control}
              name="endereco_empresa"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Endereço</FormLabel>
                  <FormControl>
                    <Input placeholder="Endereço da empresa" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            
            <FormField
              control={form.control}
              name="produto_principal"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Produto Principal</FormLabel>
                  <Select 
                    value={field.value} 
                    onValueChange={field.onChange}
                  >
                    <FormControl>
                      <SelectTrigger>
                        <SelectValue placeholder="Selecione o produto principal" />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      <SelectItem value="cha_rmgi">Chá RMGI</SelectItem>
                      <SelectItem value="vitamina">Complexo Vitamínico</SelectItem>
                      <SelectItem value="omega">Ômega 3</SelectItem>
                    </SelectContent>
                  </Select>
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
                  Salvar Alterações
                </>
              )}
            </Button>
          </form>
        </Form>
      </CardContent>
    </Card>
  );
};
