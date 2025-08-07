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
      className={`bg-gradient-to-b from-green-200 via-green-50 to-white border-r border-sidebar-border shadow-lg transition-all duration-300 ${collapsed ? "w-16 min-w-[56px]" : "w-64 min-w-[256px]"} h-screen fixed md:sticky top-0 z-50 flex flex-col`}
    >
      {/* Header */}
      <SidebarHeader className="border-b border-sidebar-border p-4 bg-gradient-to-r from-green-400/30 to-green-100/10">
        <div className="flex items-center space-x-3">
          <div className="bg-gradient-to-tr from-green-400 to-green-600 p-3 rounded-xl shadow-lg">
            <Droplets className="h-8 w-8 text-white" />
          </div>
          {!collapsed && (
            <div>
              <h2 className="text-xl font-extrabold bg-gradient-to-r from-green-700 to-lime-500 bg-clip-text text-transparent tracking-tight">
                CitriFlow
              </h2>
              <p className="text-xs text-sidebar-foreground/70 font-semibold">
                Sistema de Riego
              </p>
            </div>
          )}
        </div>
      </SidebarHeader>

      <SidebarContent className="flex-1 overflow-y-auto py-2">
        <SidebarGroup>
          <SidebarGroupLabel className="text-sidebar-foreground/80 font-bold px-4 pt-2 pb-1 uppercase tracking-wider text-xs">
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
                        className={`flex items-center w-full px-4 py-3 rounded-lg transition-all duration-200 group ${getNavCls(active)} ${collapsed ? 'justify-center' : ''} hover:bg-green-100/80 hover:scale-[1.03]`}
                        title={item.title}
                        tabIndex={0}
                      >
                        <Icon className={`h-6 w-6 ${collapsed ? 'mx-auto' : 'mr-4'} group-hover:text-green-700`} />
                        {!collapsed && (
                          <div className="flex-1">
                            <div className="text-base font-semibold group-hover:text-green-700">{item.title}</div>
                            <div className="text-xs text-sidebar-foreground/60">{item.description}</div>
                          </div>
                        )}
                        {!collapsed && active && (
                          <ChevronRight className="h-4 w-4 text-green-600" />
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
      <SidebarFooter className="border-t border-sidebar-border p-4 bg-gradient-to-t from-green-100/30 to-white/0">
        <div className="space-y-3">
          {!collapsed && (
            <div className="text-xs text-sidebar-foreground/70 font-semibold">
              <div className="font-bold">Usuario: {user}</div>
              <div>Administrador del sistema</div>
            </div>
          )}
          <Button
            onClick={handleLogout}
            variant="outline"
            size={collapsed ? "sm" : "default"}
            className={`${collapsed ? 'w-8 h-8 p-0' : 'w-full'} border-destructive/30 text-destructive hover:bg-destructive/10 hover:border-destructive font-bold`}
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