import { Button } from '@/components/ui/button';
import { Link } from 'react-router-dom';
import { ChevronRight, Droplets, Gauge, Shield } from 'lucide-react';
import heroImage from '@/assets/hero-citrus.jpg';

const HeroSection = () => {
  return (
    <section className="relative min-h-[90vh] flex items-center overflow-hidden">
      {/* Background Image */}
      <div className="absolute inset-0 z-0">
        <img 
          src={heroImage} 
          alt="Sistema de riego automatizado en cultivos de cítricos"
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-primary/90 via-primary/70 to-transparent"></div>
      </div>

      {/* Content */}
      <div className="container mx-auto px-4 relative z-10">
        <div className="max-w-3xl">
          <div className="mb-6">
            <span className="inline-flex items-center px-4 py-2 rounded-full bg-accent/20 text-accent-foreground text-sm font-medium">
              <Droplets className="w-4 h-4 mr-2" />
              Tecnología Agrícola Avanzada
            </span>
          </div>
          
          <h1 className="text-5xl md:text-7xl font-bold text-primary-foreground mb-6 leading-tight">
            CitriFlow
            <span className="block text-3xl md:text-4xl font-normal text-primary-foreground/90 mt-2">
              Riego Inteligente para Cítricos
            </span>
          </h1>
          
          <p className="text-xl text-primary-foreground/90 mb-8 leading-relaxed max-w-2xl">
            Revoluciona tu cultivo de cítricos con nuestro sistema automatizado de riego. 
            Monitoreo en tiempo real, control preciso de humedad y máxima eficiencia hídrica.
          </p>

          {/* Features destacadas */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
            <div className="flex items-center space-x-3 bg-primary-foreground/10 backdrop-blur-sm rounded-lg p-4">
              <div className="bg-accent p-2 rounded-full">
                <Gauge className="w-5 h-5 text-accent-foreground" />
              </div>
              <div>
                <h3 className="font-semibold text-primary-foreground">Control Automático</h3>
                <p className="text-sm text-primary-foreground/80">Riego inteligente 24/7</p>
              </div>
            </div>
            
            <div className="flex items-center space-x-3 bg-primary-foreground/10 backdrop-blur-sm rounded-lg p-4">
              <div className="bg-secondary p-2 rounded-full">
                <Droplets className="w-5 h-5 text-secondary-foreground" />
              </div>
              <div>
                <h3 className="font-semibold text-primary-foreground">Ahorro de Agua</h3>
                <p className="text-sm text-primary-foreground/80">Hasta 40% menos consumo</p>
              </div>
            </div>
            
            <div className="flex items-center space-x-3 bg-primary-foreground/10 backdrop-blur-sm rounded-lg p-4">
              <div className="bg-accent p-2 rounded-full">
                <Shield className="w-5 h-5 text-accent-foreground" />
              </div>
              <div>
                <h3 className="font-semibold text-primary-foreground">Monitoreo Total</h3>
                <p className="text-sm text-primary-foreground/80">Sensores de última generación</p>
              </div>
            </div>
          </div>

          {/* Call to action */}
          <div className="flex flex-col sm:flex-row gap-4">
            <Button 
              asChild 
              size="lg" 
              className="bg-accent hover:bg-accent/90 text-accent-foreground shadow-water text-lg px-8 py-6"
            >
              <Link to="/nosotros">
                Conocer el Sistema
                <ChevronRight className="ml-2 h-5 w-5" />
              </Link>
            </Button>
            
            <Button 
              asChild 
              variant="outline" 
              size="lg"
              className="border-primary-foreground/30 text-primary-foreground hover:bg-primary-foreground/10 hover:border-primary-foreground text-lg px-8 py-6"
            >
              <Link to="/contacto">Solicitar Demo</Link>
            </Button>
          </div>
        </div>
      </div>

      {/* Scroll indicator */}
      <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 z-10">
        <div className="w-6 h-10 border-2 border-primary-foreground/50 rounded-full flex justify-center">
          <div className="w-1 h-3 bg-primary-foreground/50 rounded-full mt-2 animate-bounce"></div>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;