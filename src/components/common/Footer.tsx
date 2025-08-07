import { Link } from 'react-router-dom';
import { Droplets, Mail, MapPin, Phone } from 'lucide-react';

const Footer = () => {
  return (
    <footer className="bg-primary text-primary-foreground">
      <div className="container mx-auto px-4 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* Logo y descripción */}
          <div className="space-y-4">
            <div className="flex items-center space-x-2">
              <div className="bg-primary-foreground/10 p-2 rounded-lg">
                <Droplets className="h-6 w-6" />
              </div>
              <span className="text-xl font-bold">CitriFlow</span>
            </div>
            <p className="text-primary-foreground/80 text-sm">
              Sistema automatizado de riego inteligente para cultivos de cítricos. 
              Optimizamos el uso del agua y maximizamos la productividad.
            </p>
          </div>

          {/* Enlaces rápidos */}
          <div className="space-y-4">
            <h3 className="font-semibold text-lg">Enlaces Rápidos</h3>
            <ul className="space-y-2">
              <li>
                <Link 
                  to="/" 
                  className="text-primary-foreground/80 hover:text-primary-foreground transition-colors text-sm"
                >
                  Inicio
                </Link>
              </li>
              <li>
                <Link 
                  to="/nosotros" 
                  className="text-primary-foreground/80 hover:text-primary-foreground transition-colors text-sm"
                >
                  Nosotros
                </Link>
              </li>
              <li>
                <Link 
                  to="/contacto" 
                  className="text-primary-foreground/80 hover:text-primary-foreground transition-colors text-sm"
                >
                  Contacto
                </Link>
              </li>
              <li>
                <Link 
                  to="/login" 
                  className="text-primary-foreground/80 hover:text-primary-foreground transition-colors text-sm"
                >
                  Panel Admin
                </Link>
              </li>
            </ul>
          </div>

          {/* Servicios */}
          <div className="space-y-4">
            <h3 className="font-semibold text-lg">Servicios</h3>
            <ul className="space-y-2 text-sm text-primary-foreground/80">
              <li>Monitoreo de Humedad</li>
              <li>Control de Temperatura</li>
              <li>Riego Automatizado</li>
              <li>Análisis de Datos</li>
              <li>Alertas en Tiempo Real</li>
            </ul>
          </div>

          {/* Contacto */}
          <div className="space-y-4">
            <h3 className="font-semibold text-lg">Contacto</h3>
            <div className="space-y-3 text-sm text-primary-foreground/80">
              <div className="flex items-center space-x-2">
                <MapPin className="h-4 w-4" />
                <span>Unesum</span>
              </div>
              <div className="flex items-center space-x-2">
                <Phone className="h-4 w-4" />
                <span>+34 XXX XXX XXX</span>
              </div>
              <div className="flex items-center space-x-2">
                <Mail className="h-4 w-4" />
                <span>info@citriflow.es</span>
              </div>
            </div>
          </div>
        </div>

        <div className="border-t border-primary-foreground/20 mt-8 pt-8 text-center">
          <p className="text-primary-foreground/60 text-sm">
            © 2024 CitriFlow. Todos los derechos reservados. Sistema de riego inteligente para cítricos.
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;