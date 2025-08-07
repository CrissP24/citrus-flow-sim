import { Card, CardContent } from '@/components/ui/card';
import Navbar from '@/components/common/Navbar';
import Footer from '@/components/common/Footer';
import { Target, Users, Lightbulb, Award, Cpu, Droplets } from 'lucide-react';

const About = () => {
  return (
    <div className="min-h-screen">
      <Navbar />
      
      <main className="pt-20">
        {/* Hero Section */}
        <section className="bg-gradient-hero py-20 text-primary-foreground">
          <div className="container mx-auto px-4">
            <div className="max-w-4xl mx-auto text-center">
              <h1 className="text-5xl md:text-6xl font-bold mb-6">
                Nosotros
              </h1>
              <p className="text-xl md:text-2xl leading-relaxed text-primary-foreground/90">
                Somos pioneros en sistemas de riego automatizado para cítricos, 
                combinando tecnología IoT con inteligencia artificial para revolucionar 
                la agricultura moderna.
              </p>
            </div>
          </div>
        </section>

        {/* Misión y Visión */}
        <section className="py-20 bg-background">
          <div className="container mx-auto px-4">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
              <div>
                <h2 className="text-4xl font-bold text-foreground mb-8">
                  Nuestra Misión
                </h2>
                <p className="text-lg text-muted-foreground leading-relaxed mb-6">
                  Desarrollar y implementar sistemas de riego inteligente que optimicen 
                  el uso del agua en cultivos de cítricos, aumentando la productividad 
                  mientras protegemos el medio ambiente.
                </p>
                <p className="text-lg text-muted-foreground leading-relaxed">
                  Creemos que la tecnología debe servir a la agricultura sostenible, 
                  ayudando a los productores a obtener mejores cosechas con menor 
                  impacto ambiental.
                </p>
              </div>
              
              <div className="space-y-6">
                <Card className="shadow-natural">
                  <CardContent className="p-6 flex items-start space-x-4">
                    <div className="bg-gradient-nature p-3 rounded-lg">
                      <Target className="h-6 w-6 text-primary-foreground" />
                    </div>
                    <div>
                      <h3 className="font-bold text-foreground mb-2">Objetivo Principal</h3>
                      <p className="text-muted-foreground">
                        Reducir el consumo de agua en un 40% mientras aumentamos 
                        la calidad y cantidad de la cosecha.
                      </p>
                    </div>
                  </CardContent>
                </Card>
                
                <Card className="shadow-natural">
                  <CardContent className="p-6 flex items-start space-x-4">
                    <div className="bg-gradient-water p-3 rounded-lg">
                      <Lightbulb className="h-6 w-6 text-white" />
                    </div>
                    <div>
                      <h3 className="font-bold text-foreground mb-2">Innovación</h3>
                      <p className="text-muted-foreground">
                        Aplicamos las últimas tecnologías IoT y AI para crear 
                        soluciones agrícolas de vanguardia.
                      </p>
                    </div>
                  </CardContent>
                </Card>
              </div>
            </div>
          </div>
        </section>

        {/* Tecnología */}
        <section className="py-20 bg-muted/30">
          <div className="container mx-auto px-4">
            <div className="text-center mb-16">
              <h2 className="text-4xl font-bold text-foreground mb-6">
                Tecnología Avanzada
              </h2>
              <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
                Nuestro sistema CitriFlow integra sensores IoT, inteligencia artificial 
                y automatización para crear la solución de riego más eficiente del mercado.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              <Card className="text-center shadow-natural">
                <CardContent className="p-8">
                  <div className="w-16 h-16 bg-gradient-nature rounded-full flex items-center justify-center mx-auto mb-6">
                    <Cpu className="h-8 w-8 text-primary-foreground" />
                  </div>
                  <h3 className="text-2xl font-bold text-foreground mb-4">
                    Sensores IoT
                  </h3>
                  <p className="text-muted-foreground leading-relaxed">
                    Red de sensores inteligentes que monitorizan humedad del suelo, 
                    temperatura ambiente y condiciones meteorológicas en tiempo real.
                  </p>
                </CardContent>
              </Card>

              <Card className="text-center shadow-natural">
                <CardContent className="p-8">
                  <div className="w-16 h-16 bg-gradient-water rounded-full flex items-center justify-center mx-auto mb-6">
                    <Award className="h-8 w-8 text-white" />
                  </div>
                  <h3 className="text-2xl font-bold text-foreground mb-4">
                    Inteligencia Artificial
                  </h3>
                  <p className="text-muted-foreground leading-relaxed">
                    Algoritmos de machine learning que aprenden de los datos históricos 
                    para optimizar automáticamente los patrones de riego.
                  </p>
                </CardContent>
              </Card>

              <Card className="text-center shadow-natural">
                <CardContent className="p-8">
                  <div className="w-16 h-16 bg-gradient-earth rounded-full flex items-center justify-center mx-auto mb-6">
                    <Droplets className="h-8 w-8 text-white" />
                  </div>
                  <h3 className="text-2xl font-bold text-foreground mb-4">
                    Control Automático
                  </h3>
                  <p className="text-muted-foreground leading-relaxed">
                    Sistema de control que activa bombas y válvulas automáticamente 
                    según las necesidades específicas de cada zona del cultivo.
                  </p>
                </CardContent>
              </Card>
            </div>
          </div>
        </section>

        {/* Equipo */}
        <section className="py-20 bg-background">
          <div className="container mx-auto px-4">
            <div className="text-center mb-16">
              <h2 className="text-4xl font-bold text-foreground mb-6">
                Nuestro Equipo
              </h2>
              <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
                Un equipo multidisciplinario de ingenieros agrónomos, desarrolladores 
                de software y especialistas en IoT trabajando juntos por la innovación agrícola.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-5xl mx-auto">
              <Card className="text-center shadow-natural">
                <CardContent className="p-8">
                  <div className="w-20 h-20 bg-gradient-nature rounded-full flex items-center justify-center mx-auto mb-6">
                    <Users className="h-10 w-10 text-primary-foreground" />
                  </div>
                  <h3 className="text-xl font-bold text-foreground mb-2">
                    Ingeniería Agronómica
                  </h3>
                  <p className="text-muted-foreground">
                    Especialistas en cultivos de cítricos y gestión eficiente de recursos hídricos.
                  </p>
                </CardContent>
              </Card>

              <Card className="text-center shadow-natural">
                <CardContent className="p-8">
                  <div className="w-20 h-20 bg-gradient-water rounded-full flex items-center justify-center mx-auto mb-6">
                    <Cpu className="h-10 w-10 text-white" />
                  </div>
                  <h3 className="text-xl font-bold text-foreground mb-2">
                    Desarrollo de Software
                  </h3>
                  <p className="text-muted-foreground">
                    Expertos en IoT, inteligencia artificial y desarrollo de aplicaciones web.
                  </p>
                </CardContent>
              </Card>

              <Card className="text-center shadow-natural">
                <CardContent className="p-8">
                  <div className="w-20 h-20 bg-gradient-earth rounded-full flex items-center justify-center mx-auto mb-6">
                    <Target className="h-10 w-10 text-white" />
                  </div>
                  <h3 className="text-xl font-bold text-foreground mb-2">
                    Investigación y Desarrollo
                  </h3>
                  <p className="text-muted-foreground">
                    Investigadores dedicados a la innovación continua en tecnología agrícola.
                  </p>
                </CardContent>
              </Card>
            </div>
          </div>
        </section>

        {/* Call to Action */}
        <section className="py-20 bg-gradient-nature text-primary-foreground">
          <div className="container mx-auto px-4 text-center">
            <h2 className="text-4xl font-bold mb-6">
              ¿Listo para Revolucionar tu Cultivo?
            </h2>
            <p className="text-xl mb-8 text-primary-foreground/90 max-w-2xl mx-auto">
              Únete a la revolución agrícola con CitriFlow. Contacta con nuestro 
              equipo para conocer cómo podemos transformar tu cultivo de cítricos.
            </p>
          </div>
        </section>
      </main>
      
      <Footer />
    </div>
  );
};

export default About;