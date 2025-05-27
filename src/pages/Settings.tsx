
import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import MainLayout from '@/components/layout/MainLayout';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Button } from '@/components/ui/button';
import { useAuth } from '@/contexts/AuthContext';
import { Loader2, Building, MessageSquare, LucideGithub, Facebook, CreditCard, Receipt, ShoppingBag, Sheet } from 'lucide-react';

import { fetchUserData } from './settings/userDataService';
import { CompanyProfileTab } from './settings/CompanyProfileTab';
import { WhatsAppTab } from './settings/WhatsAppTab';
import { IntegrationTab } from './settings/IntegrationTab';

const Settings = () => {
  const { user } = useAuth();
  const [loading, setLoading] = useState(true);
  const [userData, setUserData] = useState<any>(null);
  const [activeTab, setActiveTab] = useState('profile');
  const navigate = useNavigate();

  // Fetch user data from Supabase
  useEffect(() => {
    const loadUserData = async () => {
      if (!user) {
        console.log('Settings: Nenhum usuário logado');
        setLoading(false);
        return;
      }
      
      try {
        setLoading(true);
        const data = await fetchUserData(user.email);
        setUserData(data);
      } catch (error) {
        console.error('Settings: Erro ao processar dados:', error);
      } finally {
        setLoading(false);
      }
    };

    loadUserData();
  }, [user]);

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
            
            <TabsContent value="profile">
              <CompanyProfileTab userData={userData} loading={loading} setLoading={setLoading} />
            </TabsContent>
            
            <TabsContent value="whatsapp">
              <WhatsAppTab userData={userData} loading={loading} setLoading={setLoading} />
            </TabsContent>
            
            <TabsContent value="openai">
              <IntegrationTab 
                userData={userData} 
                loading={loading} 
                setLoading={setLoading}
                tabType="openai"
                title="OpenAI"
                description="Configure a integração com a API da OpenAI"
              />
            </TabsContent>
            
            <TabsContent value="facebook">
              <IntegrationTab 
                userData={userData} 
                loading={loading} 
                setLoading={setLoading}
                tabType="facebook"
                title="Facebook"
                description="Configure a integração com a API do Facebook"
              />
            </TabsContent>
            
            <TabsContent value="braip">
              <IntegrationTab 
                userData={userData} 
                loading={loading} 
                setLoading={setLoading}
                tabType="braip"
                title="Braip"
                description="Configure a integração com a plataforma Braip"
              />
            </TabsContent>
            
            <TabsContent value="keed">
              <IntegrationTab 
                userData={userData} 
                loading={loading} 
                setLoading={setLoading}
                tabType="keed"
                title="Keed"
                description="Configure a integração com a plataforma Keed"
              />
            </TabsContent>
            
            <TabsContent value="payt">
              <IntegrationTab 
                userData={userData} 
                loading={loading} 
                setLoading={setLoading}
                tabType="payt"
                title="Payt"
                description="Configure a integração com a plataforma Payt"
              />
            </TabsContent>
            
            <TabsContent value="google-sheets">
              <IntegrationTab 
                userData={userData} 
                loading={loading} 
                setLoading={setLoading}
                tabType="google-sheets"
                title="Google Sheets"
                description="Configure a integração com o Google Sheets"
              />
            </TabsContent>
          </Tabs>
        )}
      </div>
    </MainLayout>
  );
};

export default Settings;
