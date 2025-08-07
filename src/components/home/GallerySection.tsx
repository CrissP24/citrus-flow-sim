import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { ChevronLeft, ChevronRight, Play } from 'lucide-react';
import sensorImage from '@/assets/sensor-device.jpg';
import irrigationImage from '@/assets/irrigation-system.jpg';
import heroImage from '@/assets/hero-citrus.jpg';

const GallerySection = () => {
  const [currentSlide, setCurrentSlide] = useState(0);

  const slides = [
    {
      image: heroImage,
      title: 'Cultivos de Cítricos Modernos',
      description: 'Naranjos y limoneros equipados con sensores IoT para monitoreo continuo de condiciones del suelo.',
      type: 'image'
    },
    {
      image: sensorImage,
      title: 'Sensores de Humedad Avanzados',
      description: 'Tecnología de última generación para medición precisa de humedad del suelo y temperatura ambiente.',
      type: 'image'
    },
    {
      image: irrigationImage,
      title: 'Sistema de Riego Automatizado',
      description: 'Bombas y aspersores controlados automáticamente para distribuir agua de forma eficiente.',
      type: 'image'
    }
  ];

  const nextSlide = () => {
    setCurrentSlide((prev) => (prev + 1) % slides.length);
  };

  const prevSlide = () => {
    setCurrentSlide((prev) => (prev - 1 + slides.length) % slides.length);
  };

  return (
    <section className="py-20 bg-muted/30">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold text-foreground mb-6">
            Galería del Sistema
          </h2>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
            Explora nuestro sistema de riego automatizado en acción y conoce 
            la tecnología que está revolucionando la agricultura de cítricos.
          </p>
        </div>

        {/* Slider principal */}
        <div className="relative max-w-6xl mx-auto">
          <div className="relative aspect-video rounded-2xl overflow-hidden shadow-water group">
            <img 
              src={slides[currentSlide].image}
              alt={slides[currentSlide].title}
              className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
            />
            
            {/* Overlay de información */}
            <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-transparent">
              <div className="absolute bottom-0 left-0 right-0 p-8">
                <h3 className="text-2xl md:text-3xl font-bold text-white mb-3">
                  {slides[currentSlide].title}
                </h3>
                <p className="text-white/90 text-lg max-w-2xl">
                  {slides[currentSlide].description}
                </p>
              </div>
            </div>

            {/* Botón de play para videos simulados */}
            {slides[currentSlide].type === 'video' && (
              <div className="absolute inset-0 flex items-center justify-center">
                <Button 
                  size="lg" 
                  className="bg-white/20 hover:bg-white/30 backdrop-blur-sm rounded-full p-4"
                >
                  <Play className="h-8 w-8 text-white" />
                </Button>
              </div>
            )}
          </div>

          {/* Controles del slider */}
          <Button
            variant="outline"
            size="lg"
            onClick={prevSlide}
            className="absolute left-4 top-1/2 transform -translate-y-1/2 bg-white/90 hover:bg-white border-white/20 rounded-full p-3"
          >
            <ChevronLeft className="h-6 w-6" />
          </Button>

          <Button
            variant="outline"
            size="lg"
            onClick={nextSlide}
            className="absolute right-4 top-1/2 transform -translate-y-1/2 bg-white/90 hover:bg-white border-white/20 rounded-full p-3"
          >
            <ChevronRight className="h-6 w-6" />
          </Button>

          {/* Indicadores */}
          <div className="flex justify-center mt-8 space-x-3">
            {slides.map((_, index) => (
              <button
                key={index}
                onClick={() => setCurrentSlide(index)}
                className={`w-3 h-3 rounded-full transition-all duration-300 ${
                  index === currentSlide
                    ? 'bg-primary scale-125'
                    : 'bg-muted-foreground/40 hover:bg-muted-foreground/60'
                }`}
              />
            ))}
          </div>
        </div>

        {/* Grid de características técnicas */}
        <div className="mt-20 grid grid-cols-1 md:grid-cols-3 gap-8">
          <div className="text-center p-8 bg-card rounded-xl shadow-natural">
            <div className="w-16 h-16 bg-gradient-water rounded-full flex items-center justify-center mx-auto mb-6">
              <span className="text-2xl font-bold text-white">IoT</span>
            </div>
            <h3 className="text-xl font-bold text-foreground mb-3">
              Sensores IoT
            </h3>
            <p className="text-muted-foreground">
              Red de sensores interconectados que monitorean humedad, temperatura 
              y condiciones del suelo en tiempo real.
            </p>
          </div>

          <div className="text-center p-8 bg-card rounded-xl shadow-natural">
            <div className="w-16 h-16 bg-gradient-nature rounded-full flex items-center justify-center mx-auto mb-6">
              <span className="text-2xl font-bold text-primary-foreground">AI</span>
            </div>
            <h3 className="text-xl font-bold text-foreground mb-3">
              Inteligencia Artificial
            </h3>
            <p className="text-muted-foreground">
              Algoritmos avanzados que aprenden de los datos históricos para 
              optimizar los patrones de riego automáticamente.
            </p>
          </div>

          <div className="text-center p-8 bg-card rounded-xl shadow-natural">
            <div className="w-16 h-16 bg-gradient-earth rounded-full flex items-center justify-center mx-auto mb-6">
              <span className="text-2xl font-bold text-white">24/7</span>
            </div>
            <h3 className="text-xl font-bold text-foreground mb-3">
              Monitoreo Continuo
            </h3>
            <p className="text-muted-foreground">
              Vigilancia constante de las condiciones del cultivo con alertas 
              automáticas y respuesta inmediata a cambios críticos.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default GallerySection;