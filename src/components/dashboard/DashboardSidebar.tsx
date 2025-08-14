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
      ? "bg-gradient-to-r from-green-500 to-green-600 text-white font-semibold shadow-lg border-l-4 border-green-300" 
      : "text-green-700 hover:text-green-800";

  const handleLogout = () => {
    logout();
  };

  return (
    <Sidebar
      className="bg-gradient-to-b from-green-50/80 via-white to-green-50/40 border-r border-green-200/60 backdrop-blur-sm transition-all duration-300"
      collapsible="icon"
    >
      {/* Header */}
      <SidebarHeader className="border-b border-green-100 p-6 bg-gradient-to-r from-green-50 to-white">
        <div className="flex items-center space-x-3">
          <div className="bg-gradient-to-br from-green-500 to-green-600 p-3 rounded-xl shadow-lg hover:shadow-xl transition-all duration-300">
            <Droplets className="h-7 w-7 text-white drop-shadow-sm" />
          </div>
          {!collapsed && (
            <div className="space-y-1">
              <h2 className="text-xl font-bold bg-gradient-to-r from-green-700 via-green-600 to-green-500 bg-clip-text text-transparent tracking-tight">
                CitriFlow
              </h2>
              <p className="text-xs text-green-600/80 font-medium tracking-wide">
                Sistema de Riego Inteligente
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
                        className={`flex items-center w-full px-4 py-3.5 mx-2 rounded-xl transition-all duration-300 group ${getNavCls(active)} ${collapsed ? 'justify-center px-2' : ''} hover:bg-green-50 hover:shadow-md hover:translate-x-1`}
                        title={item.title}
                        tabIndex={0}
                      >
                        <Icon className={`h-5 w-5 ${collapsed ? 'mx-auto' : 'mr-3'} transition-colors duration-200 ${active ? 'text-white' : 'text-green-600 group-hover:text-green-700'}`} />
                        {!collapsed && (
                          <div className="flex-1 min-w-0">
                            <div className={`text-sm font-semibold truncate transition-colors duration-200 ${active ? 'text-white' : 'text-green-800 group-hover:text-green-900'}`}>
                              {item.title}
                            </div>
                            <div className={`text-xs truncate transition-colors duration-200 ${active ? 'text-green-100' : 'text-green-600/70 group-hover:text-green-700'}`}>
                              {item.description}
                            </div>
                          </div>
                        )}
                        {!collapsed && active && (
                          <ChevronRight className="h-4 w-4 text-white" />
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
      <SidebarFooter className="border-t border-green-100 p-4 bg-gradient-to-t from-green-50/50 to-transparent">
        <div className="space-y-4">
          {!collapsed && (
            <div className="bg-green-50/80 rounded-lg p-3 border border-green-200/50">
              <div className="text-xs text-green-800 space-y-1">
                <div className="font-bold flex items-center">
                  <div className="w-2 h-2 bg-green-500 rounded-full mr-2"></div>
                  Usuario: {user}
                </div>
                <div className="text-green-600 pl-4">Administrador del sistema</div>
              </div>
            </div>
          )}
          <Button
            onClick={handleLogout}
            variant="outline"
            size={collapsed ? "sm" : "default"}
            className={`${collapsed ? 'w-10 h-10 p-0' : 'w-full'} border-red-200 text-red-600 hover:bg-red-50 hover:border-red-300 hover:text-red-700 font-semibold transition-all duration-200`}
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