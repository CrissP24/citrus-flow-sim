import { SidebarProvider, SidebarTrigger } from '@/components/ui/sidebar';
import { DashboardSidebar } from './DashboardSidebar';
import { Button } from '@/components/ui/button';
import { Bell, User } from 'lucide-react';
import { useAuth } from '@/contexts/AuthContext';

interface DashboardLayoutProps {
  children: React.ReactNode;
}

const DashboardLayout: React.FC<DashboardLayoutProps> = ({ children }) => {
  const { user } = useAuth();

  return (
    <SidebarProvider>
      <div className="min-h-screen flex w-full bg-background">
        <DashboardSidebar />
        
        <div className="flex-1 flex flex-col">
          {/* Header */}
          <header className="h-16 border-b border-border bg-card/50 backdrop-blur-sm sticky top-0 z-40">
            <div className="flex items-center justify-between h-full px-6">
              <div className="flex items-center space-x-4">
                <SidebarTrigger className="text-muted-foreground hover:text-foreground" />
                <div>
                  <h1 className="font-semibold text-foreground">Panel de Administración</h1>
                  <p className="text-sm text-muted-foreground">CitriFlow - Sistema de Riego</p>
                </div>
              </div>

              <div className="flex items-center space-x-4">
                {/* Notificaciones */}
                <Button variant="ghost" size="sm" className="relative">
                  <Bell className="h-5 w-5" />
                  <span className="absolute -top-1 -right-1 h-3 w-3 bg-destructive rounded-full"></span>
                </Button>

                {/* Usuario */}
                <div className="flex items-center space-x-3 bg-muted/50 rounded-lg px-3 py-2">
                  <div className="bg-gradient-nature p-1 rounded-full">
                    <User className="h-4 w-4 text-primary-foreground" />
                  </div>
                  <div className="text-sm">
                    <div className="font-medium text-foreground">{user}</div>
                    <div className="text-muted-foreground">Administrador</div>
                  </div>
                </div>
              </div>
            </div>
          </header>

          {/* Main Content */}
          <main className="flex-1 p-6 bg-background">
            {children}
          </main>
        </div>
      </div>
    </SidebarProvider>
  );
};

export default DashboardLayout;