import { useState, useEffect } from 'react';
import DashboardLayout from '@/components/dashboard/DashboardLayout';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Switch } from '@/components/ui/switch';
import { Slider } from '@/components/ui/slider';
import { Settings as SettingsIcon, Save, RefreshCw } from 'lucide-react';
import { getSystemData, updateConfig } from '@/utils/dataManager';
import { useToast } from '@/hooks/use-toast';

const Settings = () => {
  const { toast } = useToast();
  const [config, setConfig] = useState({
    humidityThreshold: 30,
    autoIrrigation: true,
    irrigationDuration: 15
  });

  useEffect(() => {
    const data = getSystemData();
    setConfig({
      humidityThreshold: data.config.humidityThreshold,
      autoIrrigation: data.config.autoIrrigation,
      irrigationDuration: 15
    });
  }, []);

  const handleSave = () => {
    updateConfig({
      humidityThreshold: config.humidityThreshold,
      autoIrrigation: config.autoIrrigation
    });
    
    toast({
      title: "Configuración guardada",
      description: "Los cambios han sido aplicados correctamente.",
    });
  };

  return (
    <DashboardLayout>
      <div className="space-y-8">
        <div>
          <h1 className="text-3xl font-bold text-foreground mb-2">Configuración del Sistema</h1>
          <p className="text-muted-foreground">
            Ajusta los parámetros de funcionamiento del sistema de riego automatizado
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          <Card className="shadow-natural">
            <CardHeader>
              <CardTitle className="flex items-center space-x-2">
                <SettingsIcon className="h-5 w-5 text-primary" />
                <span>Configuración de Riego</span>
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="space-y-4">
                <div>
                  <Label htmlFor="threshold">Umbral de Humedad (%)</Label>
                  <div className="mt-2">
                    <Slider
                      id="threshold"
                      min={10}
                      max={50}
                      step={1}
                      value={[config.humidityThreshold]}
                      onValueChange={(value) => setConfig({...config, humidityThreshold: value[0]})}
                      className="w-full"
                    />
                    <div className="flex justify-between text-sm text-muted-foreground mt-1">
                      <span>10%</span>
                      <span className="font-medium">{config.humidityThreshold}%</span>
                      <span>50%</span>
                    </div>
                  </div>
                </div>

                <div className="flex items-center justify-between">
                  <div>
                    <Label htmlFor="auto-mode">Modo Automático</Label>
                    <p className="text-sm text-muted-foreground">
                      Activar riego automático basado en sensores
                    </p>
                  </div>
                  <Switch
                    id="auto-mode"
                    checked={config.autoIrrigation}
                    onCheckedChange={(checked) => setConfig({...config, autoIrrigation: checked})}
                  />
                </div>
              </div>

              <Button onClick={handleSave} className="w-full bg-gradient-nature hover:opacity-90">
                <Save className="h-4 w-4 mr-2" />
                Guardar Configuración
              </Button>
            </CardContent>
          </Card>

          <Card className="shadow-natural">
            <CardHeader>
              <CardTitle>Estado del Sistema</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="bg-muted/50 rounded-lg p-4">
                  <h4 className="font-medium mb-2">Información del Sistema</h4>
                  <div className="space-y-2 text-sm">
                    <div className="flex justify-between">
                      <span>Versión:</span>
                      <span className="font-medium">CitriFlow v1.0.0</span>
                    </div>
                    <div className="flex justify-between">
                      <span>Estado:</span>
                      <span className="font-medium text-green-600">Operativo</span>
                    </div>
                    <div className="flex justify-between">
                      <span>Último reinicio:</span>
                      <span className="font-medium">Hoy 08:00</span>
                    </div>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </DashboardLayout>
  );
};

export default Settings;