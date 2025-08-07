import { Card, CardContent } from '@/components/ui/card';
import { 
  Droplets, 
  TrendingUp, 
  Clock, 
  Smartphone, 
  BarChart3, 
  Leaf 
} from 'lucide-react';

const BenefitsSection = () => {
  const benefits = [
    {
      icon: Droplets,
      title: 'Eficiencia Hídrica',
      description: 'Reduce el consumo de agua hasta un 40% mediante riego preciso basado en datos reales de humedad del suelo.',
      color: 'text-blue-600'
    },
    {
      icon: TrendingUp,
      title: 'Mayor Productividad',
      description: 'Incrementa la calidad y cantidad de la cosecha con riego optimizado según las necesidades específicas de cada zona.',
      color: 'text-green-600'
    },
    {
      icon: Clock,
      title: 'Automatización 24/7',
      description: 'Sistema completamente autónomo que funciona las 24 horas, garantizando riego oportuno sin intervención manual.',
      color: 'text-orange-600'
    },
    {
      icon: Smartphone,
      title: 'Control Remoto',
      description: 'Monitorea y controla tu sistema desde cualquier lugar a través de nuestro panel de administración intuitivo.',
      color: 'text-purple-600'
    },
    {
      icon: BarChart3,
      title: 'Análisis de Datos',
      description: 'Obtén insights valiosos sobre patrones de riego, consumo de agua y condiciones óptimas de cultivo.',
      color: 'text-indigo-600'
    },
    {
      icon: Leaf,
      title: 'Sostenibilidad',
      description: 'Contribuye al medio ambiente con un uso responsable del agua y prácticas agrícolas sostenibles.',
      color: 'text-teal-600'
    }
  ];

  return (
    <section className="py-20 bg-background">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold text-foreground mb-6">
            Beneficios del Sistema
            <span className="block text-2xl md:text-3xl font-normal text-muted-foreground mt-2">
              CitriFlow
            </span>
          </h2>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
            Descubre cómo nuestro sistema de riego automatizado transforma 
            la gestión de cultivos de cítricos con tecnología de vanguardia.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {benefits.map((benefit, index) => {
            const IconComponent = benefit.icon;
            return (
              <Card 
                key={index} 
                className="group hover:shadow-natural transition-all duration-300 border-border/50 hover:border-primary/30"
              >
                <CardContent className="p-8">
                  <div className="mb-6">
                    <div className="w-14 h-14 bg-gradient-nature rounded-xl flex items-center justify-center mb-4 group-hover:scale-110 transition-transform duration-300">
                      <IconComponent className="w-7 h-7 text-primary-foreground" />
                    </div>
                    <h3 className="text-2xl font-bold text-foreground mb-3">
                      {benefit.title}
                    </h3>
                  </div>
                  <p className="text-muted-foreground leading-relaxed">
                    {benefit.description}
                  </p>
                </CardContent>
              </Card>
            );
          })}
        </div>

        {/* Estadísticas destacadas */}
        <div className="mt-20 bg-gradient-nature rounded-2xl p-8 md:p-12 text-primary-foreground">
          <div className="text-center mb-12">
            <h3 className="text-3xl md:text-4xl font-bold mb-4">
              Resultados Comprobados
            </h3>
            <p className="text-xl text-primary-foreground/90">
              Nuestro sistema ya está transformando cultivos de cítricos
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            <div className="text-center">
              <div className="text-4xl md:text-5xl font-bold mb-2">40%</div>
              <div className="text-primary-foreground/80">Menos consumo de agua</div>
            </div>
            <div className="text-center">
              <div className="text-4xl md:text-5xl font-bold mb-2">25%</div>
              <div className="text-primary-foreground/80">Mayor productividad</div>
            </div>
            <div className="text-center">
              <div className="text-4xl md:text-5xl font-bold mb-2">24/7</div>
              <div className="text-primary-foreground/80">Monitoreo continuo</div>
            </div>
            <div className="text-center">
              <div className="text-4xl md:text-5xl font-bold mb-2">100%</div>
              <div className="text-primary-foreground/80">Automatización</div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default BenefitsSection;