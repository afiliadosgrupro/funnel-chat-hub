
import MainLayout from '@/components/layout/MainLayout';
import LeadStats from '@/components/dashboard/LeadStats';
import FunnelChart from '@/components/dashboard/FunnelChart';
import FunnelOverview from '@/components/dashboard/FunnelOverview';
import LeadList from '@/components/dashboard/LeadList';
import ChatInterface from '@/components/chat/ChatInterface';
import { LeadProvider } from '@/contexts/LeadContext';

const Dashboard = () => {
  return (
    <LeadProvider>
      <MainLayout>
        <div className="space-y-6">
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
