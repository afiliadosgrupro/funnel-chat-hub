
import MainLayout from '@/components/layout/MainLayout';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { useAuth } from '@/contexts/AuthContext';

const Remarketing = () => {
  const { user } = useAuth();
  
  return (
    <MainLayout>
      <div className="space-y-6">
        <div className="flex justify-between items-center">
          <h1 className="text-2xl font-bold">Remarketing</h1>
          <div className="bg-whatsapp/10 rounded-lg p-3">
            <div className="text-sm text-gray-600">Usuário: <span className="font-semibold">{user?.name}</span></div>
            <div className="text-sm text-gray-600">Tipo: <span className="font-semibold capitalize">{user?.role}</span></div>
          </div>
        </div>
        
        <div className="grid md:grid-cols-2 gap-6">
          <Card>
            <CardHeader>
              <CardTitle>Campanhas de Remarketing Ativas</CardTitle>
            </CardHeader>
            <CardContent className="h-72 flex items-center justify-center">
              <p className="text-gray-500">Campanhas de remarketing serão exibidas aqui</p>
            </CardContent>
          </Card>
          
          <Card>
            <CardHeader>
              <CardTitle>Desempenho de Remarketing</CardTitle>
            </CardHeader>
            <CardContent className="h-72 flex items-center justify-center">
              <p className="text-gray-500">Dados de desempenho serão exibidos aqui</p>
            </CardContent>
          </Card>
          
          <Card>
            <CardHeader>
              <CardTitle>Segmentos de Audiência</CardTitle>
            </CardHeader>
            <CardContent className="h-72 flex items-center justify-center">
              <p className="text-gray-500">Segmentos de audiência serão exibidos aqui</p>
            </CardContent>
          </Card>
          
          <Card>
            <CardHeader>
              <CardTitle>Configurar Nova Campanha</CardTitle>
            </CardHeader>
            <CardContent className="h-72 flex items-center justify-center">
              <p className="text-gray-500">Formulário para nova campanha será exibido aqui</p>
            </CardContent>
          </Card>
        </div>
      </div>
    </MainLayout>
  );
};

export default Remarketing;
