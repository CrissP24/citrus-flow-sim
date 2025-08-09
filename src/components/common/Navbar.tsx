import { Link, useLocation } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Droplets, Menu, X } from 'lucide-react';
import { useState } from 'react';
import logoImg from '@/assets/tics.png';

const Navbar = () => {
  const location = useLocation();
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [useFallbackIcon, setUseFallbackIcon] = useState(false);

  const navItems = [
    { href: '/', label: 'Inicio' },
    { href: '/nosotros', label: 'Nosotros' },
    { href: '/contacto', label: 'Contacto' },
  ];

  const isActive = (path: string) => location.pathname === path;

  return (
    <nav className="bg-card/90 backdrop-blur-md border-b border-border sticky top-0 z-50 shadow-natural">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Logo */}
          <Link to="/" className="flex items-center space-x-2 group">
            <div className="rounded-lg shadow-natural group-hover:shadow-glow transition-all duration-300 overflow-hidden h-9 w-9 bg-white flex items-center justify-center">
              {!useFallbackIcon ? (
                <img
                  src={logoImg}
                  alt="SISTEMA DE RIEGO CITRIFLOW"
                  className="h-9 w-9 object-contain"
                  onError={() => setUseFallbackIcon(true)}
                />
              ) : (
                <div className="bg-gradient-nature p-2 rounded-lg">
                  <Droplets className="h-6 w-6 text-primary-foreground" />
                </div>
              )}
            </div>
            <span className="text-xl font-bold bg-gradient-nature bg-clip-text text-transparent">
              SISTEMA DE RIEGO CITRIFLOW
            </span>
          </Link>

          {/* Navigation Desktop */}
          <div className="hidden md:flex items-center space-x-8">
            {navItems.map((item) => (
              <Link
                key={item.href}
                to={item.href}
                className={`text-sm font-medium transition-colors hover:text-primary ${
                  isActive(item.href)
                    ? 'text-primary border-b-2 border-primary'
                    : 'text-muted-foreground'
                }`}
              >
                {item.label}
              </Link>
            ))}
            <Button 
              asChild 
              variant="outline" 
              className="border-primary/30 hover:bg-primary/10 hover:border-primary"
            >
              <Link to="/login">Acceso Admin</Link>
            </Button>
          </div>

          {/* Mobile menu button */}
          <div className="md:hidden">
            <Button
              variant="ghost"
              size="sm"
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="p-2"
            >
              {isMenuOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
            </Button>
          </div>
        </div>

        {/* Mobile Navigation */}
        {isMenuOpen && (
          <div className="md:hidden py-4 border-t border-border">
            <div className="flex flex-col space-y-4">
              {navItems.map((item) => (
                <Link
                  key={item.href}
                  to={item.href}
                  className={`text-sm font-medium px-3 py-2 rounded-md transition-colors ${
                    isActive(item.href)
                      ? 'text-primary bg-primary/10'
                      : 'text-muted-foreground hover:text-primary hover:bg-accent'
                  }`}
                  onClick={() => setIsMenuOpen(false)}
                >
                  {item.label}
                </Link>
              ))}
              <Button 
                asChild 
                variant="outline" 
                className="mx-3 border-primary/30 hover:bg-primary/10"
              >
                <Link to="/login" onClick={() => setIsMenuOpen(false)}>
                  Acceso Admin
                </Link>
              </Button>
            </div>
          </div>
        )}
      </div>
    </nav>
  );
};

export default Navbar;