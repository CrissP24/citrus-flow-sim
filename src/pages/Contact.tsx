import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import Navbar from '@/components/common/Navbar';
import Footer from '@/components/common/Footer';
import { MapPin, Phone, Mail, Clock, Send } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';

const Contact = () => {
  const { toast } = useToast();
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    company: '',
    subject: '',
    message: ''
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    // Simular envío del formulario
    toast({
      title: "Mensaje enviado",
      description: "Nos pondremos en contacto contigo pronto. Gracias por tu interés en CitriFlow.",
    });
    
    // Limpiar formulario
    setFormData({
      name: '',
      email: '',
      phone: '',
      company: '',
      subject: '',
      message: ''
    });
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  return (
    <div className="min-h-screen">
      <Navbar />
      
      <main className="pt-20">
        {/* Hero Section */}
        <section className="bg-gradient-hero py-20 text-primary-foreground">
          <div className="container mx-auto px-4">
            <div className="max-w-4xl mx-auto text-center">
              <h1 className="text-5xl md:text-6xl font-bold mb-6">
                Contacto
              </h1>
              <p className="text-xl md:text-2xl leading-relaxed text-primary-foreground/90">
                ¿Tienes preguntas sobre CitriFlow? Nuestro equipo está aquí para 
                ayudarte a encontrar la solución perfecta para tu cultivo de cítricos.
              </p>
            </div>
          </div>
        </section>

        {/* Formulario y información de contacto */}
        <section className="py-20 bg-background">
          <div className="container mx-auto px-4">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
              {/* Formulario */}
              <div>
                <Card className="shadow-natural">
                  <CardHeader>
                    <CardTitle className="text-2xl font-bold text-foreground flex items-center">
                      <Send className="h-6 w-6 mr-3 text-primary" />
                      Envíanos un Mensaje
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <form onSubmit={handleSubmit} className="space-y-6">
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div className="space-y-2">
                          <Label htmlFor="name">Nombre completo *</Label>
                          <Input
                            id="name"
                            name="name"
                            value={formData.name}
                            onChange={handleChange}
                            required
                            placeholder="Tu nombre"
                            className="border-border focus:border-primary"
                          />
                        </div>
                        <div className="space-y-2">
                          <Label htmlFor="email">Email *</Label>
                          <Input
                            id="email"
                            name="email"
                            type="email"
                            value={formData.email}
                            onChange={handleChange}
                            required
                            placeholder="tu@email.com"
                            className="border-border focus:border-primary"
                          />
                        </div>
                      </div>

                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div className="space-y-2">
                          <Label htmlFor="phone">Teléfono</Label>
                          <Input
                            id="phone"
                            name="phone"
                            value={formData.phone}
                            onChange={handleChange}
                            placeholder="+34 XXX XXX XXX"
                            className="border-border focus:border-primary"
                          />
                        </div>
                        <div className="space-y-2">
                          <Label htmlFor="company">Empresa/Finca</Label>
                          <Input
                            id="company"
                            name="company"
                            value={formData.company}
                            onChange={handleChange}
                            placeholder="Nombre de tu empresa"
                            className="border-border focus:border-primary"
                          />
                        </div>
                      </div>

                      <div className="space-y-2">
                        <Label htmlFor="subject">Asunto *</Label>
                        <Input
                          id="subject"
                          name="subject"
                          value={formData.subject}
                          onChange={handleChange}
                          required
                          placeholder="¿En qué podemos ayudarte?"
                          className="border-border focus:border-primary"
                        />
                      </div>

                      <div className="space-y-2">
                        <Label htmlFor="message">Mensaje *</Label>
                        <Textarea
                          id="message"
                          name="message"
                          value={formData.message}
                          onChange={handleChange}
                          required
                          placeholder="Cuéntanos más sobre tu proyecto o consulta..."
                          className="min-h-32 border-border focus:border-primary"
                        />
                      </div>

                      <Button 
                        type="submit" 
                        className="w-full bg-gradient-nature hover:opacity-90 text-primary-foreground shadow-natural"
                        size="lg"
                      >
                        <Send className="h-5 w-5 mr-2" />
                        Enviar Mensaje
                      </Button>
                    </form>
                  </CardContent>
                </Card>
              </div>

              {/* Información de contacto */}
              <div className="space-y-8">
                <div>
                  <h2 className="text-3xl font-bold text-foreground mb-6">
                    Información de Contacto
                  </h2>
                  <p className="text-lg text-muted-foreground">
                    Estamos aquí para responder todas tus preguntas sobre nuestro 
                    sistema de riego automatizado. No dudes en contactarnos.
                  </p>
                </div>

                <div className="space-y-6">
                  <Card className="shadow-natural">
                    <CardContent className="p-6 flex items-start space-x-4">
                      <div className="bg-gradient-nature p-3 rounded-lg">
                        <MapPin className="h-6 w-6 text-primary-foreground" />
                      </div>
                      <div>
                        <h3 className="font-bold text-foreground mb-2">Ubicación</h3>
                        <p className="text-muted-foreground">
                          Zona Agrícola de Valencia<br />
                          Comunidad Valenciana, España<br />
                          CP: 46000
                        </p>
                      </div>
                    </CardContent>
                  </Card>

                  <Card className="shadow-natural">
                    <CardContent className="p-6 flex items-start space-x-4">
                      <div className="bg-gradient-water p-3 rounded-lg">
                        <Phone className="h-6 w-6 text-white" />
                      </div>
                      <div>
                        <h3 className="font-bold text-foreground mb-2">Teléfono</h3>
                        <p className="text-muted-foreground">
                          +34 XXX XXX XXX<br />
                          Lunes a Viernes: 9:00 - 18:00<br />
                          Sábados: 9:00 - 14:00
                        </p>
                      </div>
                    </CardContent>
                  </Card>

                  <Card className="shadow-natural">
                    <CardContent className="p-6 flex items-start space-x-4">
                      <div className="bg-gradient-earth p-3 rounded-lg">
                        <Mail className="h-6 w-6 text-white" />
                      </div>
                      <div>
                        <h3 className="font-bold text-foreground mb-2">Email</h3>
                        <p className="text-muted-foreground">
                          info@citriflow.es<br />
                          soporte@citriflow.es<br />
                          ventas@citriflow.es
                        </p>
                      </div>
                    </CardContent>
                  </Card>

                  <Card className="shadow-natural">
                    <CardContent className="p-6 flex items-start space-x-4">
                      <div className="bg-gradient-nature p-3 rounded-lg">
                        <Clock className="h-6 w-6 text-primary-foreground" />
                      </div>
                      <div>
                        <h3 className="font-bold text-foreground mb-2">Horario de Atención</h3>
                        <p className="text-muted-foreground">
                          Lunes - Viernes: 9:00 - 18:00<br />
                          Sábado: 9:00 - 14:00<br />
                          Domingo: Cerrado
                        </p>
                      </div>
                    </CardContent>
                  </Card>
                </div>

               
              </div>
            </div>
          </div>
        </section>
      </main>
      
      <Footer />
    </div>
  );
};

export default Contact;