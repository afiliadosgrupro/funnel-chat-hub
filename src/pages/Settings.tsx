
import { useState, useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import { useNavigate } from 'react-router-dom';
import MainLayout from '@/components/layout/MainLayout';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Switch } from '@/components/ui/switch';
import { useAuth } from '@/contexts/AuthContext';
import { supabase } from '@/integrations/supabase/client';
import { toast } from '@/hooks/use-toast';
import { 
  Loader2, Save, Building, MessageSquare, LucideGithub, 
  Facebook, CreditCard, Receipt, ShoppingBag, Sheet 
} from 'lucide-react';
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';

// Schema for the company profile form
const companyProfileSchema = z.object({
  nome_empresa: z.string().min(2, { message: 'Nome da empresa é obrigatório' }),
  telefone_empresa: z.string().optional(),
  endereco_empresa: z.string().optional(),
  produto_principal: z.string(),
  cnpj: z.string().optional()
});

// Schema for the WhatsApp integration form
const whatsappSchema = z.object({
  whatsapp_url_servidor: z.string().optional(),
  whatsapp_api_key: z.string().optional(),
  whatsapp_instancia: z.string().optional(),
  whatsapp_numero: z.string().optional(),
  whatsapp_webhook_url: z.string().optional(),
  whatsapp_webhook_conectado: z.boolean().optional(),
  whatsapp_status: z.string().optional(),
  whatsapp_nome_perfil: z.string().optional()
});

// Schema for the OpenAI integration form
const openaiSchema = z.object({
  openai_token: z.string().optional(),
  openai_assistente_id: z.string().optional(),
  openai_modelo_preferido: z.string(),
  openai_ativo: z.boolean().optional()
});

// Schema for the Facebook integration form
const facebookSchema = z.object({
  facebook_token_pagina: z.string().optional(),
  facebook_token_usuario: z.string().optional(),
  facebook_token_api: z.string().optional(),
  facebook_pixel_id: z.string().optional(),
  facebook_app_id: z.string().optional(),
  facebook_ativo: z.boolean().optional()
});

// Schema for the Braip integration form
const braipSchema = z.object({
  braip_webhook_url: z.string().optional(),
  braip_token: z.string().optional(),
  braip_ativo: z.boolean().optional()
});

// Schema for the Keed integration form
const keedSchema = z.object({
  keed_webhook_url: z.string().optional(),
  keed_token: z.string().optional(),
  keed_ativo: z.boolean().optional()
});

// Schema for the Payt integration form
const paytSchema = z.object({
  payt_webhook_url: z.string().optional(),
  payt_token: z.string().optional(),
  payt_ativo: z.boolean().optional()
});

// Schema for the Google Sheets integration form
const googleSheetsSchema = z.object({
  google_sheets_token: z.string().optional(),
  google_sheets_id_planilha: z.string().optional(),
  google_sheets_ativo: z.boolean().optional()
});

type CompanyProfileFormValues = z.infer<typeof companyProfileSchema>;
type WhatsappFormValues = z.infer<typeof whatsappSchema>;
type OpenAIFormValues = z.infer<typeof openaiSchema>;
type FacebookFormValues = z.infer<typeof facebookSchema>;
type BraipFormValues = z.infer<typeof braipSchema>;
type KeedFormValues = z.infer<typeof keedSchema>;
type PaytFormValues = z.infer<typeof paytSchema>;
type GoogleSheetsFormValues = z.infer<typeof googleSheetsSchema>;

const Settings = () => {
  const { user } = useAuth();
  const [loading, setLoading] = useState(true);
  const [userData, setUserData] = useState<any>(null);
  const [activeTab, setActiveTab] = useState('profile');
  const navigate = useNavigate();

  // Initialize forms
  const companyProfileForm = useForm<CompanyProfileFormValues>({
    resolver: zodResolver(companyProfileSchema),
    defaultValues: {
      nome_empresa: '',
      telefone_empresa: '',
      endereco_empresa: '',
      produto_principal: 'cha_rmgi',
      cnpj: ''
    }
  });

  const whatsappForm = useForm<WhatsappFormValues>({
    resolver: zodResolver(whatsappSchema),
    defaultValues: {
      whatsapp_url_servidor: '',
      whatsapp_api_key: '',
      whatsapp_instancia: '',
      whatsapp_numero: '',
      whatsapp_webhook_url: '',
      whatsapp_webhook_conectado: false,
      whatsapp_status: 'desconectado',
      whatsapp_nome_perfil: ''
    }
  });

  const openaiForm = useForm<OpenAIFormValues>({
    resolver: zodResolver(openaiSchema),
    defaultValues: {
      openai_token: '',
      openai_assistente_id: '',
      openai_modelo_preferido: 'gpt-4',
      openai_ativo: false
    }
  });

  const facebookForm = useForm<FacebookFormValues>({
    resolver: zodResolver(facebookSchema),
    defaultValues: {
      facebook_token_pagina: '',
      facebook_token_usuario: '',
      facebook_token_api: '',
      facebook_pixel_id: '',
      facebook_app_id: '',
      facebook_ativo: false
    }
  });

  const braipForm = useForm<BraipFormValues>({
    resolver: zodResolver(braipSchema),
    defaultValues: {
      braip_webhook_url: '',
      braip_token: '',
      braip_ativo: false
    }
  });

  const keedForm = useForm<KeedFormValues>({
    resolver: zodResolver(keedSchema),
    defaultValues: {
      keed_webhook_url: '',
      keed_token: '',
      keed_ativo: false
    }
  });

  const paytForm = useForm<PaytFormValues>({
    resolver: zodResolver(paytSchema),
    defaultValues: {
      payt_webhook_url: '',
      payt_token: '',
      payt_ativo: false
    }
  });

  const googleSheetsForm = useForm<GoogleSheetsFormValues>({
    resolver: zodResolver(googleSheetsSchema),
    defaultValues: {
      google_sheets_token: '',
      google_sheets_id_planilha: '',
      google_sheets_ativo: false
    }
  });

  // Fetch user data from Supabase
  useEffect(() => {
    const fetchUserData = async () => {
      if (!user) return;
      
      try {
        setLoading(true);
        const { data, error } = await supabase
          .from('SAAS_usuarios')
          .select('*')
          .eq('email', user.email)
          .single();

        if (error) {
          console.error('Erro ao buscar dados do usuário:', error);
          toast({
            title: 'Erro',
            description: 'Não foi possível carregar as configurações do usuário.',
            variant: 'destructive'
          });
          return;
        }

        if (data) {
          setUserData(data);
          
          // Set form values for company profile
          companyProfileForm.reset({
            nome_empresa: data.nome_empresa || '',
            telefone_empresa: data.telefone_empresa || '',
            endereco_empresa: data.endereco_empresa || '',
            produto_principal: data.produto_principal || 'cha_rmgi',
            cnpj: data.cnpj || ''
          });

          // Set form values for WhatsApp
          whatsappForm.reset({
            whatsapp_url_servidor: data.whatsapp_url_servidor || '',
            whatsapp_api_key: data.whatsapp_api_key || '',
            whatsapp_instancia: data.whatsapp_instancia || '',
            whatsapp_numero: data.whatsapp_numero || '',
            whatsapp_webhook_url: data.whatsapp_webhook_url || '',
            whatsapp_webhook_conectado: data.whatsapp_webhook_conectado || false,
            whatsapp_status: data.whatsapp_status || 'desconectado',
            whatsapp_nome_perfil: data.whatsapp_nome_perfil || ''
          });

          // Set form values for OpenAI
          openaiForm.reset({
            openai_token: data.openai_token || '',
            openai_assistente_id: data.openai_assistente_id || '',
            openai_modelo_preferido: data.openai_modelo_preferido || 'gpt-4',
            openai_ativo: data.openai_ativo || false
          });
          
          // Set form values for Facebook
          facebookForm.reset({
            facebook_token_pagina: data.facebook_token_pagina || '',
            facebook_token_usuario: data.facebook_token_usuario || '',
            facebook_token_api: data.facebook_token_api || '',
            facebook_pixel_id: data.facebook_pixel_id || '',
            facebook_app_id: data.facebook_app_id || '',
            facebook_ativo: data.facebook_ativo || false
          });
          
          // Set form values for Braip
          braipForm.reset({
            braip_webhook_url: data.braip_webhook_url || '',
            braip_token: data.braip_token || '',
            braip_ativo: data.braip_ativo || false
          });
          
          // Set form values for Keed
          keedForm.reset({
            keed_webhook_url: data.keed_webhook_url || '',
            keed_token: data.keed_token || '',
            keed_ativo: data.keed_ativo || false
          });
          
          // Set form values for Payt
          paytForm.reset({
            payt_webhook_url: data.payt_webhook_url || '',
            payt_token: data.payt_token || '',
            payt_ativo: data.payt_ativo || false
          });
          
          // Set form values for Google Sheets
          googleSheetsForm.reset({
            google_sheets_token: data.google_sheets_token || '',
            google_sheets_id_planilha: data.google_sheets_id_planilha || '',
            google_sheets_ativo: data.google_sheets_ativo || false
          });
        }
      } catch (error) {
        console.error('Erro ao processar dados:', error);
        toast({
          title: 'Erro',
          description: 'Ocorreu um erro ao processar os dados.',
          variant: 'destructive'
        });
      } finally {
        setLoading(false);
      }
    };

    fetchUserData();
  }, [user]);

  // Handle company profile form submission
  const onSubmitCompanyProfile = async (values: CompanyProfileFormValues) => {
    if (!user) return;
    
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
        .eq('email', user.email);

      if (error) {
        throw error;
      }

      toast({
        title: 'Sucesso',
        description: 'Perfil da empresa atualizado com sucesso.',
      });
    } catch (error: any) {
      console.error('Erro ao atualizar perfil:', error);
      toast({
        title: 'Erro',
        description: 'Não foi possível atualizar o perfil da empresa.',
        variant: 'destructive'
      });
    } finally {
      setLoading(false);
    }
  };

  // Handle WhatsApp form submission
  const onSubmitWhatsapp = async (values: WhatsappFormValues) => {
    if (!user) return;
    
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
        .eq('email', user.email);

      if (error) {
        throw error;
      }

      toast({
        title: 'Sucesso',
        description: 'Configurações do WhatsApp atualizadas com sucesso.',
      });
    } catch (error: any) {
      console.error('Erro ao atualizar configurações do WhatsApp:', error);
      toast({
        title: 'Erro',
        description: 'Não foi possível atualizar as configurações do WhatsApp.',
        variant: 'destructive'
      });
    } finally {
      setLoading(false);
    }
  };

  // Handle OpenAI form submission
  const onSubmitOpenAI = async (values: OpenAIFormValues) => {
    if (!user) return;
    
    try {
      setLoading(true);
      
      const { error } = await supabase
        .from('SAAS_usuarios')
        .update({
          openai_token: values.openai_token,
          openai_assistente_id: values.openai_assistente_id,
          openai_modelo_preferido: values.openai_modelo_preferido,
          openai_ativo: values.openai_ativo,
          data_alteracao: new Date().toISOString()
        })
        .eq('email', user.email);

      if (error) {
        throw error;
      }

      toast({
        title: 'Sucesso',
        description: 'Configurações da OpenAI atualizadas com sucesso.',
      });
    } catch (error: any) {
      console.error('Erro ao atualizar configurações da OpenAI:', error);
      toast({
        title: 'Erro',
        description: 'Não foi possível atualizar as configurações da OpenAI.',
        variant: 'destructive'
      });
    } finally {
      setLoading(false);
    }
  };
  
  // Handle Facebook form submission
  const onSubmitFacebook = async (values: FacebookFormValues) => {
    if (!user) return;
    
    try {
      setLoading(true);
      
      const { error } = await supabase
        .from('SAAS_usuarios')
        .update({
          facebook_token_pagina: values.facebook_token_pagina,
          facebook_token_usuario: values.facebook_token_usuario,
          facebook_token_api: values.facebook_token_api,
          facebook_pixel_id: values.facebook_pixel_id,
          facebook_app_id: values.facebook_app_id,
          facebook_ativo: values.facebook_ativo,
          data_alteracao: new Date().toISOString()
        })
        .eq('email', user.email);

      if (error) {
        throw error;
      }

      toast({
        title: 'Sucesso',
        description: 'Configurações do Facebook atualizadas com sucesso.',
      });
    } catch (error: any) {
      console.error('Erro ao atualizar configurações do Facebook:', error);
      toast({
        title: 'Erro',
        description: 'Não foi possível atualizar as configurações do Facebook.',
        variant: 'destructive'
      });
    } finally {
      setLoading(false);
    }
  };
  
  // Handle Braip form submission
  const onSubmitBraip = async (values: BraipFormValues) => {
    if (!user) return;
    
    try {
      setLoading(true);
      
      const { error } = await supabase
        .from('SAAS_usuarios')
        .update({
          braip_webhook_url: values.braip_webhook_url,
          braip_token: values.braip_token,
          braip_ativo: values.braip_ativo,
          data_alteracao: new Date().toISOString()
        })
        .eq('email', user.email);

      if (error) {
        throw error;
      }

      toast({
        title: 'Sucesso',
        description: 'Configurações da Braip atualizadas com sucesso.',
      });
    } catch (error: any) {
      console.error('Erro ao atualizar configurações da Braip:', error);
      toast({
        title: 'Erro',
        description: 'Não foi possível atualizar as configurações da Braip.',
        variant: 'destructive'
      });
    } finally {
      setLoading(false);
    }
  };
  
  // Handle Keed form submission
  const onSubmitKeed = async (values: KeedFormValues) => {
    if (!user) return;
    
    try {
      setLoading(true);
      
      const { error } = await supabase
        .from('SAAS_usuarios')
        .update({
          keed_webhook_url: values.keed_webhook_url,
          keed_token: values.keed_token,
          keed_ativo: values.keed_ativo,
          data_alteracao: new Date().toISOString()
        })
        .eq('email', user.email);

      if (error) {
        throw error;
      }

      toast({
        title: 'Sucesso',
        description: 'Configurações da Keed atualizadas com sucesso.',
      });
    } catch (error: any) {
      console.error('Erro ao atualizar configurações da Keed:', error);
      toast({
        title: 'Erro',
        description: 'Não foi possível atualizar as configurações da Keed.',
        variant: 'destructive'
      });
    } finally {
      setLoading(false);
    }
  };
  
  // Handle Payt form submission
  const onSubmitPayt = async (values: PaytFormValues) => {
    if (!user) return;
    
    try {
      setLoading(true);
      
      const { error } = await supabase
        .from('SAAS_usuarios')
        .update({
          payt_webhook_url: values.payt_webhook_url,
          payt_token: values.payt_token,
          payt_ativo: values.payt_ativo,
          data_alteracao: new Date().toISOString()
        })
        .eq('email', user.email);

      if (error) {
        throw error;
      }

      toast({
        title: 'Sucesso',
        description: 'Configurações da Payt atualizadas com sucesso.',
      });
    } catch (error: any) {
      console.error('Erro ao atualizar configurações da Payt:', error);
      toast({
        title: 'Erro',
        description: 'Não foi possível atualizar as configurações da Payt.',
        variant: 'destructive'
      });
    } finally {
      setLoading(false);
    }
  };
  
  // Handle Google Sheets form submission
  const onSubmitGoogleSheets = async (values: GoogleSheetsFormValues) => {
    if (!user) return;
    
    try {
      setLoading(true);
      
      const { error } = await supabase
        .from('SAAS_usuarios')
        .update({
          google_sheets_token: values.google_sheets_token,
          google_sheets_id_planilha: values.google_sheets_id_planilha,
          google_sheets_ativo: values.google_sheets_ativo,
          data_alteracao: new Date().toISOString()
        })
        .eq('email', user.email);

      if (error) {
        throw error;
      }

      toast({
        title: 'Sucesso',
        description: 'Configurações do Google Sheets atualizadas com sucesso.',
      });
    } catch (error: any) {
      console.error('Erro ao atualizar configurações do Google Sheets:', error);
      toast({
        title: 'Erro',
        description: 'Não foi possível atualizar as configurações do Google Sheets.',
        variant: 'destructive'
      });
    } finally {
      setLoading(false);
    }
  };

  // If user data failed to load, show error message
  if (!loading && !userData && user) {
    return (
      <MainLayout>
        <div className="flex flex-col items-center justify-center h-full py-12">
          <h2 className="text-xl font-semibold text-center mb-4">Informações não encontradas</h2>
          <p className="text-gray-500 text-center mb-6">
            Não encontramos suas informações no sistema. Por favor, contate o suporte técnico.
          </p>
          <Button onClick={() => navigate('/dashboard')}>
            Voltar para o Dashboard
          </Button>
        </div>
      </MainLayout>
    );
  }

  return (
    <MainLayout>
      <div className="space-y-6">
        <div className="flex items-center justify-between">
          <h1 className="text-2xl font-bold">Configurações da Conta</h1>
        </div>
        
        {loading ? (
          <div className="flex justify-center items-center h-64">
            <Loader2 className="h-8 w-8 animate-spin text-whatsapp" />
          </div>
        ) : (
          <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-6">
            <TabsList className="grid w-full md:w-auto md:inline-flex grid-cols-4 md:grid-cols-none gap-2 overflow-x-auto">
              <TabsTrigger value="profile" className="flex items-center gap-2">
                <Building className="h-4 w-4" />
                <span>Perfil da Empresa</span>
              </TabsTrigger>
              <TabsTrigger value="whatsapp" className="flex items-center gap-2">
                <MessageSquare className="h-4 w-4" />
                <span>WhatsApp</span>
              </TabsTrigger>
              <TabsTrigger value="openai" className="flex items-center gap-2">
                <LucideGithub className="h-4 w-4" />
                <span>OpenAI</span>
              </TabsTrigger>
              <TabsTrigger value="facebook" className="flex items-center gap-2">
                <Facebook className="h-4 w-4" />
                <span>Facebook</span>
              </TabsTrigger>
              <TabsTrigger value="braip" className="flex items-center gap-2">
                <ShoppingBag className="h-4 w-4" />
                <span>Braip</span>
              </TabsTrigger>
              <TabsTrigger value="keed" className="flex items-center gap-2">
                <Receipt className="h-4 w-4" />
                <span>Keed</span>
              </TabsTrigger>
              <TabsTrigger value="payt" className="flex items-center gap-2">
                <CreditCard className="h-4 w-4" />
                <span>Payt</span>
              </TabsTrigger>
              <TabsTrigger value="google-sheets" className="flex items-center gap-2">
                <Sheet className="h-4 w-4" />
                <span>Google Sheets</span>
              </TabsTrigger>
            </TabsList>
            
            {/* Perfil da Empresa */}
            <TabsContent value="profile">
              <Card>
                <CardHeader>
                  <CardTitle>Perfil da Empresa</CardTitle>
                  <CardDescription>
                    Configure as informações básicas da sua empresa
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <Form {...companyProfileForm}>
                    <form onSubmit={companyProfileForm.handleSubmit(onSubmitCompanyProfile)} className="space-y-4">
                      <FormField
                        control={companyProfileForm.control}
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
                        control={companyProfileForm.control}
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
                        control={companyProfileForm.control}
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
                        control={companyProfileForm.control}
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
                        control={companyProfileForm.control}
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
            </TabsContent>
            
            {/* Configurações do WhatsApp */}
            <TabsContent value="whatsapp">
              <Card>
                <CardHeader>
                  <CardTitle>Configurações do WhatsApp</CardTitle>
                  <CardDescription>
                    Configure a integração com a API do WhatsApp
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <Form {...whatsappForm}>
                    <form onSubmit={whatsappForm.handleSubmit(onSubmitWhatsapp)} className="space-y-4">
                      <FormField
                        control={whatsappForm.control}
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
                        control={whatsappForm.control}
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
                        control={whatsappForm.control}
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
                        control={whatsappForm.control}
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
                        control={whatsappForm.control}
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
                        control={whatsappForm.control}
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
                        control={whatsappForm.control}
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
            </TabsContent>
            
            {/* Configurações da OpenAI */}
            <TabsContent value="openai">
              <Card>
                <CardHeader>
                  <CardTitle>Configurações da OpenAI</CardTitle>
                  <CardDescription>
                    Configure a integração com a API da OpenAI
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <Form {...openaiForm}>
                    <form onSubmit={openaiForm.handleSubmit(onSubmitOpenAI)} className="space-y-4">
                      <FormField
                        control={openaiForm.control}
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
                        control={openaiForm.control}
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
                        control={openaiForm.control}
                        name="openai_modelo_preferido"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Modelo</FormLabel>
                            <Select 
                              value={field.value} 
                              onValueChange={field.onChange}
                            >
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
                        control={openaiForm.control}
                        name="openai_ativo"
                        render={({ field }) => (
                          <FormItem className="flex flex-row items-center justify-between rounded-lg border p-4">
                            <div className="space-y-0.5">
                              <FormLabel className="text-base">
                                API Ativa
                              </FormLabel>
                              <FormDescription>
                                Ativa ou desativa a integração com a OpenAI
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
            </TabsContent>
            
            {/* Configurações do Facebook */}
            <TabsContent value="facebook">
              <Card>
                <CardHeader>
                  <CardTitle>Configurações do Facebook</CardTitle>
                  <CardDescription>
                    Configure a integração com a API do Facebook
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <Form {...facebookForm}>
                    <form onSubmit={facebookForm.handleSubmit(onSubmitFacebook)} className="space-y-4">
                      <FormField
                        control={facebookForm.control}
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
                        control={facebookForm.control}
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
                        control={facebookForm.control}
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
                        control={facebookForm.control}
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
                        control={facebookForm.control}
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
                        control={facebookForm.control}
                        name="facebook_ativo"
                        render={({ field }) => (
                          <FormItem className="flex flex-row items-center justify-between rounded-lg border p-4">
                            <div className="space-y-0.5">
                              <FormLabel className="text-base">
                                API Ativa
                              </FormLabel>
                              <FormDescription>
                                Ativa ou desativa a integração com o Facebook
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
            </TabsContent>
            
            {/* Configurações da Braip */}
            <TabsContent value="braip">
              <Card>
                <CardHeader>
                  <CardTitle>Configurações da Braip</CardTitle>
                  <CardDescription>
                    Configure a integração com a plataforma Braip
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <Form {...braipForm}>
                    <form onSubmit={braipForm.handleSubmit(onSubmitBraip)} className="space-y-4">
                      <FormField
                        control={braipForm.control}
                        name="braip_webhook_url"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>URL do Webhook</FormLabel>
                            <FormControl>
                              <Input placeholder="URL para receber notificações da Braip" {...field} />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                      
                      <FormField
                        control={braipForm.control}
                        name="braip_token"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Token da API</FormLabel>
                            <FormControl>
                              <Input type="password" placeholder="Token de autenticação da API Braip" {...field} />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                      
                      <FormField
                        control={braipForm.control}
                        name="braip_ativo"
                        render={({ field }) => (
                          <FormItem className="flex flex-row items-center justify-between rounded-lg border p-4">
                            <div className="space-y-0.5">
                              <FormLabel className="text-base">
                                API Ativa
                              </FormLabel>
                              <FormDescription>
                                Ativa ou desativa a integração com a Braip
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
            </TabsContent>
            
            {/* Configurações da Keed */}
            <TabsContent value="keed">
              <Card>
                <CardHeader>
                  <CardTitle>Configurações da Keed</CardTitle>
                  <CardDescription>
                    Configure a integração com a plataforma Keed
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <Form {...keedForm}>
                    <form onSubmit={keedForm.handleSubmit(onSubmitKeed)} className="space-y-4">
                      <FormField
                        control={keedForm.control}
                        name="keed_webhook_url"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>URL do Webhook</FormLabel>
                            <FormControl>
                              <Input placeholder="URL para receber notificações da Keed" {...field} />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                      
                      <FormField
                        control={keedForm.control}
                        name="keed_token"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Token da API</FormLabel>
                            <FormControl>
                              <Input type="password" placeholder="Token de autenticação da API Keed" {...field} />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                      
                      <FormField
                        control={keedForm.control}
                        name="keed_ativo"
                        render={({ field }) => (
                          <FormItem className="flex flex-row items-center justify-between rounded-lg border p-4">
                            <div className="space-y-0.5">
                              <FormLabel className="text-base">
                                API Ativa
                              </FormLabel>
                              <FormDescription>
                                Ativa ou desativa a integração com a Keed
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
            </TabsContent>
            
            {/* Configurações da Payt */}
            <TabsContent value="payt">
              <Card>
                <CardHeader>
                  <CardTitle>Configurações da Payt</CardTitle>
                  <CardDescription>
                    Configure a integração com a plataforma Payt
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <Form {...paytForm}>
                    <form onSubmit={paytForm.handleSubmit(onSubmitPayt)} className="space-y-4">
                      <FormField
                        control={paytForm.control}
                        name="payt_webhook_url"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>URL do Webhook</FormLabel>
                            <FormControl>
                              <Input placeholder="URL para receber notificações da Payt" {...field} />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                      
                      <FormField
                        control={paytForm.control}
                        name="payt_token"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Token da API</FormLabel>
                            <FormControl>
                              <Input type="password" placeholder="Token de autenticação da API Payt" {...field} />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                      
                      <FormField
                        control={paytForm.control}
                        name="payt_ativo"
                        render={({ field }) => (
                          <FormItem className="flex flex-row items-center justify-between rounded-lg border p-4">
                            <div className="space-y-0.5">
                              <FormLabel className="text-base">
                                API Ativa
                              </FormLabel>
                              <FormDescription>
                                Ativa ou desativa a integração com a Payt
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
            </TabsContent>
            
            {/* Configurações do Google Sheets */}
            <TabsContent value="google-sheets">
              <Card>
                <CardHeader>
                  <CardTitle>Configurações do Google Sheets</CardTitle>
                  <CardDescription>
                    Configure a integração com o Google Sheets
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <Form {...googleSheetsForm}>
                    <form onSubmit={googleSheetsForm.handleSubmit(onSubmitGoogleSheets)} className="space-y-4">
                      <FormField
                        control={googleSheetsForm.control}
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
                        control={googleSheetsForm.control}
                        name="google_sheets_id_planilha"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>ID da Planilha</FormLabel>
                            <FormControl>
                              <Input placeholder="ID da planilha no Google Sheets" {...field} />
                            </FormControl>
                            <FormDescription>
                              O ID está presente na URL da planilha
                            </FormDescription>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                      
                      <FormField
                        control={googleSheetsForm.control}
                        name="google_sheets_ativo"
                        render={({ field }) => (
                          <FormItem className="flex flex-row items-center justify-between rounded-lg border p-4">
                            <div className="space-y-0.5">
                              <FormLabel className="text-base">
                                API Ativa
                              </FormLabel>
                              <FormDescription>
                                Ativa ou desativa a integração com o Google Sheets
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
            </TabsContent>
          </Tabs>
        )}
      </div>
    </MainLayout>
  );
};

export default Settings;
