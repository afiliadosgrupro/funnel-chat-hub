
import MainLayout from '@/components/layout/MainLayout';
import LeadStats from '@/components/dashboard/LeadStats';
import FunnelChart from '@/components/dashboard/FunnelChart';
import FunnelOverview from '@/components/dashboard/FunnelOverview';
import LeadList from '@/components/dashboard/LeadList';
import ChatInterface from '@/components/chat/ChatInterface';
import { LeadProvider } from '@/contexts/LeadContext';
import { useAuth } from '@/contexts/AuthContext';

const Dashboard = () => {
  const { user } = useAuth();
  
  return (
    <LeadProvider>
      <MainLayout>
        <div className="space-y-6">
          {/* User info */}
          <div className="flex justify-between items-center">
            <h1 className="text-2xl font-bold">Dashboard</h1>
            <div className="bg-whatsapp/10 rounded-lg p-3">
              <div className="text-sm text-gray-600">Usuário: <span className="font-semibold">{user?.name}</span></div>
              <div className="text-sm text-gray-600">Tipo: <span className="font-semibold capitalize">{user?.role}</span></div>
            </div>
          </div>
          
          {/* Stats e Gráfico */}
          <div className="grid lg:grid-cols-4 gap-6">
            {/* Gráfico de leads do dia */}
            <div className="lg:col-span-3">
              <FunnelChart />
            </div>
            
            {/* Stats resumidos */}
            <div className="lg:col-span-1">
              <LeadStats />
            </div>
          </div>
          
          {/* Conteúdo principal */}
          <div className="grid lg:grid-cols-4 gap-6">
            {/* Esquerda - lista de conversas */}
            <div className="lg:col-span-1 h-[600px]">
              <FunnelOverview />
            </div>
            
            {/* Centro - chat interface */}
            <div className="lg:col-span-3 h-[600px]">
              <ChatInterface />
            </div>
          </div>
        </div>
      </MainLayout>
    </LeadProvider>
  );
};

export default Dashboard;
