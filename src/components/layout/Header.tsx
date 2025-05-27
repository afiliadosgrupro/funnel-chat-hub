
import { Button } from '@/components/ui/button';
import { useAuth } from '@/contexts/AuthContext';
import { useNavigate, useLocation } from 'react-router-dom';
import { LogOut, Users, MessageSquare, BarChart3, Settings, User } from 'lucide-react';
import Logo from '@/components/ui/Logo';
import { toast } from 'sonner';

const Header = () => {
  const { user, logout } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();

  const handleLogout = () => {
    logout();
    toast.success('Logout realizado com sucesso');
    navigate('/login');
  };

  const navItems = [
    {
      path: '/dashboard',
      label: 'Dashboard',
      icon: BarChart3,
      roles: ['dev', 'admin', 'vendedor']
    },
    {
      path: '/conversations',
      label: 'Conversas',
      icon: MessageSquare,
      roles: ['dev', 'admin']
    },
    {
      path: '/user-management',
      label: 'Usuários',
      icon: Users,
      roles: ['dev', 'admin']
    },
    {
      path: '/settings',
      label: 'Configurações',
      icon: Settings,
      roles: ['dev', 'admin', 'vendedor']
    }
  ];

  const filteredNavItems = navItems.filter(item => 
    user && item.roles.includes(user.role)
  );

  return (
    <header className="bg-white border-b border-gray-200 px-6 py-4">
      <div className="flex items-center justify-between">
        <div className="flex items-center space-x-8">
          <Logo />
          
          <nav className="flex space-x-6">
            {filteredNavItems.map(item => {
              const Icon = item.icon;
              const isActive = location.pathname === item.path;
              
              return (
                <button
                  key={item.path}
                  onClick={() => navigate(item.path)}
                  className={`flex items-center space-x-2 px-3 py-2 rounded-md text-sm font-medium transition-colors ${
                    isActive
                      ? 'bg-blue-100 text-blue-700'
                      : 'text-gray-600 hover:text-gray-900 hover:bg-gray-100'
                  }`}
                >
                  <Icon className="h-4 w-4" />
                  <span>{item.label}</span>
                </button>
              );
            })}
          </nav>
        </div>

        <div className="flex items-center space-x-4">
          {user && (
            <>
              <div className="flex items-center space-x-2 text-sm">
                <User className="h-4 w-4 text-gray-500" />
                <span className="text-gray-700">{user.name}</span>
                <span className="text-gray-500">({user.role})</span>
              </div>
              <Button variant="ghost" size="sm" onClick={handleLogout}>
                <LogOut className="h-4 w-4 mr-2" />
                Sair
              </Button>
            </>
          )}
        </div>
      </div>
    </header>
  );
};

export default Header;
