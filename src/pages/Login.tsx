import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Droplets, Lock, User, Eye, EyeOff } from 'lucide-react';
import { useAuth } from '@/contexts/AuthContext';
import { useToast } from '@/hooks/use-toast';

const Login = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  
  const { login } = useAuth();
  const { toast } = useToast();
  const navigate = useNavigate();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);

    // Simular delay de autenticación
    setTimeout(() => {
      const success = login(username, password);
      
      if (success) {
        toast({
          title: "Acceso exitoso",
          description: "Bienvenido al panel de administración de CitriFlow",
        });
        navigate('/dashboard');
      } else {
        toast({
          title: "Error de acceso",
          description: "Usuario o contraseña incorrectos. Usa: admin / admin123",
          variant: "destructive"
        });
      }
      
      setIsLoading(false);
    }, 1000);
  };

  return (
    <div className="min-h-screen bg-gradient-hero flex items-center justify-center p-4">
      <div className="w-full max-w-md">
        {/* Logo y título */}
        <div className="text-center mb-8">
          <div className="flex justify-center mb-4">
            <div className="bg-primary-foreground/10 p-4 rounded-2xl backdrop-blur-sm">
              <Droplets className="h-12 w-12 text-primary-foreground" />
            </div>
          </div>
          <h1 className="text-3xl font-bold text-primary-foreground mb-2">
            CitriFlow Admin
          </h1>
          <p className="text-primary-foreground/80">
            Panel de Administración del Sistema de Riego
          </p>
        </div>

        {/* Formulario de login */}
        <Card className="shadow-water backdrop-blur-sm bg-card/95">
          <CardHeader>
            <CardTitle className="text-2xl font-bold text-center flex items-center justify-center">
              <Lock className="h-6 w-6 mr-2 text-primary" />
              Iniciar Sesión
            </CardTitle>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="space-y-2">
                <Label htmlFor="username" className="text-foreground">
                  Usuario
                </Label>
                <div className="relative">
                  <User className="h-5 w-5 absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground" />
                  <Input
                    id="username"
                    type="text"
                    value={username}
                    onChange={(e) => setUsername(e.target.value)}
                    placeholder="Introduce tu usuario"
                    className="pl-10 border-border focus:border-primary"
                    required
                  />
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="password" className="text-foreground">
                  Contraseña
                </Label>
                <div className="relative">
                  <Lock className="h-5 w-5 absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground" />
                  <Input
                    id="password"
                    type={showPassword ? 'text' : 'password'}
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    placeholder="Introduce tu contraseña"
                    className="pl-10 pr-10 border-border focus:border-primary"
                    required
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-3 top-1/2 transform -translate-y-1/2 text-muted-foreground hover:text-foreground"
                  >
                    {showPassword ? <EyeOff className="h-5 w-5" /> : <Eye className="h-5 w-5" />}
                  </button>
                </div>
              </div>

              <Button
                type="submit"
                className="w-full bg-gradient-nature hover:opacity-90 text-primary-foreground shadow-natural"
                size="lg"
                disabled={isLoading}
              >
                {isLoading ? (
                  <div className="flex items-center">
                    <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-primary-foreground mr-2"></div>
                    Iniciando sesión...
                  </div>
                ) : (
                  'Iniciar Sesión'
                )}
              </Button>
            </form>

            {/* Credenciales de demo */}
            <div className="mt-6 p-4 bg-muted/50 rounded-lg border border-border">
              <h4 className="font-semibold text-foreground mb-2">
                Credenciales de Demo:
              </h4>
              <div className="text-sm text-muted-foreground space-y-1">
                <div>
                  <strong>Usuario:</strong> admin
                </div>
                <div>
                  <strong>Contraseña:</strong> admin123
                </div>
              </div>
            </div>

            {/* Enlace para volver */}
            <div className="mt-6 text-center">
              <button
                onClick={() => navigate('/')}
                className="text-sm text-primary hover:text-primary/80 transition-colors"
              >
                ← Volver al sitio web
              </button>
            </div>
          </CardContent>
        </Card>

        {/* Información adicional */}
        <div className="mt-8 text-center text-primary-foreground/70 text-sm">
          <p>
            Sistema seguro de administración para el control del riego automatizado
          </p>
        </div>
      </div>
    </div>
  );
};

export default Login;