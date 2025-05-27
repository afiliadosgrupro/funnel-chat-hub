
import { useAuth } from '@/contexts/AuthContext';
import { Button } from '@/components/ui/button';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { 
  LogOut, 
  Settings, 
  User, 
  BarChart3, 
  MessageSquare, 
  Shield,
  Users
} from 'lucide-react';
import { Link, useLocation } from 'react-router-dom';
import Logo from '@/components/ui/Logo';

const Header = () => {
  const { user, logout, hasPermission } = useAuth();
  const location = useLocation();

  const getInitials = (name: string) => {
    return name
      .split(' ')
      .map(part => part[0])
      .join('')
      .toUpperCase()
      .slice(0, 2);
  };

  const isActivePath = (path: string) => {
    return location.pathname === path;
  };

  return (
    <header className="bg-white border-b border-gray-200 px-6 py-4">
      <div className="flex items-center justify-between">
        <div className="flex items-center space-x-8">
          <Link to="/dashboard">
            <Logo size="md" />
          </Link>
          
          <nav className="hidden md:flex space-x-1">
            <Link to="/dashboard">
              <Button 
                variant={isActivePath('/dashboard') ? 'default' : 'ghost'} 
                size="sm"
                className={isActivePath('/dashboard') ? 'bg-whatsapp hover:bg-whatsapp-dark' : ''}
              >
                Dashboard
              </Button>
            </Link>
            
            {hasPermission('admin') && (
              <>
                <Link to="/analysis">
                  <Button 
                    variant={isActivePath('/analysis') ? 'default' : 'ghost'} 
                    size="sm"
                    className={isActivePath('/analysis') ? 'bg-whatsapp hover:bg-whatsapp-dark' : ''}
                  >
                    <BarChart3 className="w-4 h-4 mr-2" />
                    Análises
                  </Button>
                </Link>
                
                <Link to="/remarketing">
                  <Button 
                    variant={isActivePath('/remarketing') ? 'default' : 'ghost'} 
                    size="sm"
                    className={isActivePath('/remarketing') ? 'bg-whatsapp hover:bg-whatsapp-dark' : ''}
                  >
                    <MessageSquare className="w-4 h-4 mr-2" />
                    Remarketing
                  </Button>
                </Link>
                
                <Link to="/admin">
                  <Button 
                    variant={isActivePath('/admin') ? 'default' : 'ghost'} 
                    size="sm"
                    className={isActivePath('/admin') ? 'bg-whatsapp hover:bg-whatsapp-dark' : ''}
                  >
                    <Shield className="w-4 h-4 mr-2" />
                    Admin
                  </Button>
                </Link>
                
                <Link to="/users">
                  <Button 
                    variant={isActivePath('/users') ? 'default' : 'ghost'} 
                    size="sm"
                    className={isActivePath('/users') ? 'bg-whatsapp hover:bg-whatsapp-dark' : ''}
                  >
                    <Users className="w-4 h-4 mr-2" />
                    Usuários
                  </Button>
                </Link>
              </>
            )}
          </nav>
        </div>

        <div className="flex items-center space-x-4">
          <div className="text-sm text-gray-600">
            <span className="font-medium">{user?.name}</span>
            <span className="ml-2 px-2 py-1 bg-gray-100 rounded-full text-xs">
              {user?.role === 'dev' ? 'Desenvolvedor' : 
               user?.role === 'admin' ? 'Administrador' : 'Vendedor'}
            </span>
          </div>
          
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="ghost" className="relative h-8 w-8 rounded-full">
                <Avatar className="h-8 w-8">
                  <AvatarImage src={user?.avatar} alt={user?.name} />
                  <AvatarFallback>{user ? getInitials(user.name) : 'U'}</AvatarFallback>
                </Avatar>
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent className="w-56" align="end" forceMount>
              <DropdownMenuLabel className="font-normal">
                <div className="flex flex-col space-y-1">
                  <p className="text-sm font-medium leading-none">{user?.name}</p>
                  <p className="text-xs leading-none text-muted-foreground">
                    {user?.email}
                  </p>
                </div>
              </DropdownMenuLabel>
              <DropdownMenuSeparator />
              <DropdownMenuItem asChild>
                <Link to="/settings" className="cursor-pointer">
                  <User className="mr-2 h-4 w-4" />
                  <span>Perfil</span>
                </Link>
              </DropdownMenuItem>
              <DropdownMenuItem asChild>
                <Link to="/settings" className="cursor-pointer">
                  <Settings className="mr-2 h-4 w-4" />
                  <span>Configurações</span>
                </Link>
              </DropdownMenuItem>
              <DropdownMenuSeparator />
              <DropdownMenuItem onClick={logout} className="cursor-pointer">
                <LogOut className="mr-2 h-4 w-4" />
                <span>Sair</span>
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </div>
    </header>
  );
};

export default Header;
