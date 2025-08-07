import { useState } from 'react';
import { NavLink, useLocation } from 'react-router-dom';
import { 
  LayoutDashboard, 
  Activity, 
  History, 
  Settings, 
  Droplets,
  LogOut,
  ChevronRight
} from 'lucide-react';
import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarTrigger,
  useSidebar,
  SidebarHeader,
  SidebarFooter
} from '@/components/ui/sidebar';
import { Button } from '@/components/ui/button';
import { useAuth } from '@/contexts/AuthContext';

const navigationItems = [
  {
    title: 'Panel Principal',
    url: '/dashboard',
    icon: LayoutDashboard,
    description: 'Vista general del sistema'
  },
  {
    title: 'Sensores',
    url: '/dashboard/sensores',
    icon: Activity,
    description: 'Estado y configuración de sensores'
  },
  {
    title: 'Historial',
    url: '/dashboard/historial',
    icon: History,
    description: 'Registro de riegos y eventos'
  },
  {
    title: 'Configuración',
    url: '/dashboard/configuracion',
    icon: Settings,
    description: 'Ajustes del sistema'
  }
];

export function DashboardSidebar() {
  const { state } = useSidebar();
  const collapsed = state === 'collapsed';
  const location = useLocation();
  const { logout, user } = useAuth();
  const currentPath = location.pathname;

  const isActive = (path: string) => {
    if (path === '/dashboard') {
      return currentPath === '/dashboard';
    }
    return currentPath.startsWith(path);
  };

  const isExpanded = navigationItems.some((item) => isActive(item.url));

  const getNavCls = (active: boolean) =>
    active 
      ? "bg-sidebar-accent text-sidebar-primary-foreground font-medium border-r-2 border-primary" 
      : "hover:bg-sidebar-accent/50 text-sidebar-foreground";

  const handleLogout = () => {
    logout();
  };

  return (
    <Sidebar
      className={`border-r border-sidebar-border bg-sidebar ${collapsed ? "w-14" : "w-64"}`}
    >
      {/* Header */}
      <SidebarHeader className="border-b border-sidebar-border p-4">
        <div className="flex items-center space-x-3">
          <div className="bg-gradient-nature p-2 rounded-lg shadow-natural">
            <Droplets className="h-6 w-6 text-primary-foreground" />
          </div>
          {!collapsed && (
            <div>
              <h2 className="text-lg font-bold bg-gradient-nature bg-clip-text text-transparent">
                CitriFlow
              </h2>
              <p className="text-xs text-sidebar-foreground/70">
                Sistema de Riego
              </p>
            </div>
          )}
        </div>
      </SidebarHeader>

      <SidebarContent>
        <SidebarGroup>
          <SidebarGroupLabel className="text-sidebar-foreground/80 font-medium">
            {!collapsed ? 'Navegación' : ''}
          </SidebarGroupLabel>
          
          <SidebarGroupContent>
            <SidebarMenu>
              {navigationItems.map((item) => {
                const Icon = item.icon;
                const active = isActive(item.url);
                
                return (
                  <SidebarMenuItem key={item.title}>
                    <SidebarMenuButton asChild>
                      <NavLink 
                        to={item.url} 
                        className={`flex items-center w-full p-3 rounded-lg transition-all duration-200 ${getNavCls(active)}`}
                        title={collapsed ? item.title : ''}
                      >
                        <Icon className={`h-5 w-5 ${collapsed ? 'mx-auto' : 'mr-3'}`} />
                        {!collapsed && (
                          <div className="flex-1">
                            <div className="text-sm font-medium">{item.title}</div>
                            <div className="text-xs text-sidebar-foreground/60">{item.description}</div>
                          </div>
                        )}
                        {!collapsed && active && (
                          <ChevronRight className="h-4 w-4 text-sidebar-primary" />
                        )}
                      </NavLink>
                    </SidebarMenuButton>
                  </SidebarMenuItem>
                );
              })}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>

      {/* Footer */}
      <SidebarFooter className="border-t border-sidebar-border p-4">
        <div className="space-y-3">
          {!collapsed && (
            <div className="text-xs text-sidebar-foreground/70">
              <div className="font-medium">Usuario: {user}</div>
              <div>Administrador del sistema</div>
            </div>
          )}
          
          <Button
            onClick={handleLogout}
            variant="outline"
            size={collapsed ? "sm" : "default"}
            className={`${collapsed ? 'w-8 h-8 p-0' : 'w-full'} border-destructive/30 text-destructive hover:bg-destructive/10 hover:border-destructive`}
            title={collapsed ? 'Cerrar Sesión' : ''}
          >
            <LogOut className={`h-4 w-4 ${collapsed ? '' : 'mr-2'}`} />
            {!collapsed && 'Cerrar Sesión'}
          </Button>
        </div>
      </SidebarFooter>
    </Sidebar>
  );
}