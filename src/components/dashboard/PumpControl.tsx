import { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Switch } from '@/components/ui/switch';
import { Label } from '@/components/ui/label';
import { Power, Droplets, AlertTriangle } from 'lucide-react';
import { getSystemData, activatePump, deactivatePump, updateConfig } from '@/utils/dataManager';
import { useToast } from '@/hooks/use-toast';

const PumpControl = () => {
  const { toast } = useToast();
  const [pumpActive, setPumpActive] = useState(false);
  const [autoIrrigation, setAutoIrrigation] = useState(true);
  const [avgHumidity, setAvgHumidity] = useState(0);
  const [humidityThreshold, setHumidityThreshold] = useState(30);

  useEffect(() => {
    const loadData = () => {
      const data = getSystemData();
      setPumpActive(data.config.pumpActive);
      setAutoIrrigation(data.config.autoIrrigation);
      setHumidityThreshold(data.config.humidityThreshold);
      
      // Calcular humedad promedio
      const humiditySensors = data.sensors.filter(s => s.type === 'humidity' && s.status === 'active');
      const avg = humiditySensors.reduce((sum, s) => sum + s.value, 0) / humiditySensors.length;
      setAvgHumidity(Math.round(avg));
    };

    loadData();
    const interval = setInterval(loadData, 5000); // Actualizar cada 5 segundos

    return () => clearInterval(interval);
  }, []);

  const handleManualPump = () => {
    if (pumpActive) {
      deactivatePump();
      toast({
        title: "Bomba desactivada",
        description: "La bomba de riego ha sido desactivada manualmente.",
      });
    } else {
      activatePump('manual');
      toast({
        title: "Bomba activada",
        description: "La bomba de riego ha sido activada manualmente por 30 segundos.",
      });
    }
  };

  const handleAutoIrrigationToggle = (enabled: boolean) => {
    setAutoIrrigation(enabled);
    updateConfig({ autoIrrigation: enabled });
    
    toast({
      title: enabled ? "Riego automático activado" : "Riego automático desactivado",
      description: enabled 
        ? "El sistema controlará automáticamente el riego según los niveles de humedad."
        : "El riego automático ha sido deshabilitado. Solo funcionará en modo manual.",
    });
  };

  const isLowHumidity = avgHumidity < humidityThreshold;

  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
      {/* Control Manual de Bomba */}
      <Card className="shadow-natural">
        <CardHeader>
          <CardTitle className="flex items-center space-x-2">
            <Power className="h-5 w-5 text-primary" />
            <span>Control Manual de Bomba</span>
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-6">
          {/* Estado actual */}
          <div className="text-center">
            <div className={`inline-flex items-center justify-center w-20 h-20 rounded-full mb-4 ${
              pumpActive 
                ? 'bg-gradient-water shadow-glow' 
                : 'bg-muted'
            }`}>
              <Droplets className={`h-10 w-10 ${
                pumpActive ? 'text-white animate-pulse' : 'text-muted-foreground'
              }`} />
            </div>
            <h3 className="text-2xl font-bold mb-2">
              Estado: {pumpActive ? 'ACTIVA' : 'INACTIVA'}
            </h3>
            <p className="text-muted-foreground">
              {pumpActive 
                ? 'La bomba está funcionando y regando el cultivo' 
                : 'La bomba está detenida'
              }
            </p>
          </div>

          {/* Botón de control */}
          <Button
            onClick={handleManualPump}
            size="lg"
            className={`w-full ${
              pumpActive
                ? 'bg-destructive hover:bg-destructive/90 text-destructive-foreground'
                : 'bg-gradient-water hover:opacity-90 text-white'
            }`}
          >
            <Power className="h-5 w-5 mr-2" />
            {pumpActive ? 'Desactivar Bomba' : 'Activar Bomba'}
          </Button>

          <p className="text-xs text-muted-foreground text-center">
            {pumpActive 
              ? 'La bomba se desactivará automáticamente en 30 segundos'
              : 'Activación manual por 30 segundos'
            }
          </p>
        </CardContent>
      </Card>

      {/* Control Automático */}
      <Card className="shadow-natural">
        <CardHeader>
          <CardTitle className="flex items-center space-x-2">
            <Droplets className="h-5 w-5 text-primary" />
            <span>Sistema Automático</span>
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-6">
          {/* Toggle de riego automático */}
          <div className="flex items-center justify-between">
            <div>
              <Label htmlFor="auto-irrigation" className="text-base font-medium">
                Riego Automático
              </Label>
              <p className="text-sm text-muted-foreground">
                Activar riego cuando la humedad sea baja
              </p>
            </div>
            <Switch
              id="auto-irrigation"
              checked={autoIrrigation}
              onCheckedChange={handleAutoIrrigationToggle}
            />
          </div>

          {/* Estado actual de humedad */}
          <div className="space-y-3">
            <div className="flex justify-between items-center">
              <span className="text-sm font-medium">Humedad Promedio:</span>
              <span className={`text-lg font-bold ${
                isLowHumidity ? 'text-destructive' : 'text-primary'
              }`}>
                {avgHumidity}%
              </span>
            </div>
            
            <div className="flex justify-between items-center">
              <span className="text-sm font-medium">Umbral Configurado:</span>
              <span className="text-lg font-bold text-muted-foreground">
                {humidityThreshold}%
              </span>
            </div>

            {/* Barra de progreso visual */}
            <div className="relative">
              <div className="w-full bg-muted rounded-full h-3">
                <div 
                  className={`h-3 rounded-full transition-all duration-500 ${
                    isLowHumidity ? 'bg-destructive' : 'bg-gradient-nature'
                  }`}
                  style={{ width: `${Math.min(avgHumidity, 100)}%` }}
                ></div>
              </div>
              <div 
                className="absolute top-0 w-1 h-3 bg-orange-500"
                style={{ left: `${humidityThreshold}%` }}
              ></div>
            </div>
          </div>

          {/* Alerta de humedad baja */}
          {isLowHumidity && autoIrrigation && (
            <div className="bg-destructive/10 border border-destructive/20 rounded-lg p-4">
              <div className="flex items-start space-x-3">
                <AlertTriangle className="h-5 w-5 text-destructive mt-0.5" />
                <div>
                  <h4 className="font-medium text-destructive">Humedad Baja Detectada</h4>
                  <p className="text-sm text-destructive/80">
                    La humedad promedio ({avgHumidity}%) está por debajo del umbral ({humidityThreshold}%).
                    {pumpActive ? ' Sistema activado automáticamente.' : ' El sistema activará el riego pronto.'}
                  </p>
                </div>
              </div>
            </div>
          )}

          {/* Estado del sistema automático */}
          <div className="text-center">
            <div className={`inline-flex items-center px-3 py-2 rounded-full text-sm font-medium ${
              autoIrrigation
                ? 'bg-primary/10 text-primary'
                : 'bg-muted text-muted-foreground'
            }`}>
              {autoIrrigation ? '🤖 Sistema Automático Activo' : '⏸️ Sistema Automático Pausado'}
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default PumpControl;