
import MainLayout from '@/components/layout/MainLayout';
import LeadStats from '@/components/dashboard/LeadStats';
import FunnelOverview from '@/components/dashboard/FunnelOverview';
import LeadList from '@/components/dashboard/LeadList';
import ChatInterface from '@/components/chat/ChatInterface';
import { LeadProvider } from '@/contexts/LeadContext';

const Dashboard = () => {
  return (
    <LeadProvider>
      <MainLayout>
        <div className="space-y-6">
          {/* Stats */}
          <LeadStats />
          
          {/* Main content */}
          <div className="grid lg:grid-cols-4 gap-6">
            {/* Left sidebar - lead funnel overview */}
            <div>
              <FunnelOverview />
            </div>
            
            {/* Middle - lead list */}
            <div className="lg:col-span-1 h-[600px]">
              <LeadList />
            </div>
            
            {/* Right - chat interface */}
            <div className="lg:col-span-2 h-[600px]">
              <ChatInterface />
            </div>
          </div>
        </div>
      </MainLayout>
    </LeadProvider>
  );
};

export default Dashboard;
