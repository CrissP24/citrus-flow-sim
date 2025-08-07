import { useState, useEffect } from 'react';
import DashboardLayout from '@/components/dashboard/DashboardLayout';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Switch } from '@/components/ui/switch';
import { Label } from '@/components/ui/label';
import { 
  Activity, 
  Wifi, 
  WifiOff, 
  MapPin, 
  Clock,
  Droplets,
  Thermometer,
  RefreshCw,
  Settings as SettingsIcon
} from 'lucide-react';
import { getSystemData, saveSystemData, SensorData, getRealTemperature, getRealHumidity } from '@/utils/dataManager';
import { useToast } from '@/hooks/use-toast';

const Sensors = () => {
  const { toast } = useToast();
  const [sensors, setSensors] = useState<SensorData[]>([]);
  const [isRefreshing, setIsRefreshing] = useState(false);

  useEffect(() => {
    loadSensors();
    const interval = setInterval(loadSensors, 10000); // Actualizar cada 10 segundos
    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    // Intentar obtener valores reales para los sensores activos
    const fetchRealValues = async () => {
      const data = getSystemData();
      const updates: {[id: string]: {value: number, real: boolean}} = {};
      let foundReal = false;
      for (const sensor of data.sensors) {
        if (sensor.status === 'active') {
          if (sensor.type === 'humidity') {
            const realHumidity = await getRealHumidity();
            if (realHumidity !== null && !isNaN(realHumidity)) {
              updates[sensor.id] = { value: Math.round(realHumidity), real: true };
              foundReal = true;
            }
          } else if (sensor.type === 'temperature') {
            const realTemp = await getRealTemperature();
            if (realTemp !== null && !isNaN(realTemp)) {
              updates[sensor.id] = { value: Math.round(realTemp), real: true };
              foundReal = true;
            }
          }
        }
      }
      // setRealValues(updates); // This line is no longer needed as we are not using real values in the UI
      // setSensorError(!foundReal); // This line is no longer needed
    };
    fetchRealValues();
  }, [sensors]);

  if (/* sensorError */ false) { // This block is no longer needed
    return (
      <DashboardLayout>
        <div className="p-8 text-center text-red-600 font-semibold text-lg">
          No se detectaron sensores reales en este dispositivo. Por favor, accede desde un móvil compatible o habilita los permisos de sensores.
        </div>
      </DashboardLayout>
    );
  }

  const loadSensors = () => {
    const data = getSystemData();
    setSensors(data.sensors);
  };

  const handleSensorToggle = (sensorId: string, newStatus: 'active' | 'inactive') => {
    const data = getSystemData();
    data.sensors = data.sensors.map(sensor => 
      sensor.id === sensorId 
        ? { ...sensor, status: newStatus, lastUpdated: new Date().toISOString() }
        : sensor
    );
    
    saveSystemData(data);
    setSensors(data.sensors);
    
    toast({
      title: `Sensor ${newStatus === 'active' ? 'activado' : 'desactivado'}`,
      description: `El sensor ha sido ${newStatus === 'active' ? 'activado' : 'desactivado'} correctamente.`,
    });
  };

  const handleRefresh = async () => {
    setIsRefreshing(true);
    
    // Simular actualización de datos
    setTimeout(() => {
      loadSensors();
      setIsRefreshing(false);
      toast({
        title: "Datos actualizados",
        description: "Los valores de los sensores han sido actualizados.",
      });
    }, 1500);
  };

  const getSensorIcon = (type: string) => {
    switch (type) {
      case 'humidity':
        return Droplets;
      case 'temperature':
        return Thermometer;
      default:
        return Activity;
    }
  };

  const getSensorColor = (type: string, value: number) => {
    if (type === 'humidity') {
      if (value < 25) return 'text-red-500';
      if (value < 35) return 'text-orange-500';
      return 'text-blue-500';
    }
    if (type === 'temperature') {
      if (value < 18 || value > 32) return 'text-orange-500';
      return 'text-green-500';
    }
    return 'text-gray-500';
  };

  const getStatusStats = () => {
    const active = sensors.filter(s => s.status === 'active').length;
    const inactive = sensors.filter(s => s.status === 'inactive').length;
    const humidityAvg = sensors
      .filter(s => s.type === 'humidity' && s.status === 'active')
      .reduce((sum, s) => sum + s.value, 0) / 
      sensors.filter(s => s.type === 'humidity' && s.status === 'active').length || 0;
    
    return { active, inactive, total: sensors.length, humidityAvg: Math.round(humidityAvg) };
  };

  const stats = getStatusStats();

  return (
    <DashboardLayout>
      <div className="space-y-8">
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-center justify-between space-y-4 md:space-y-0">
          <div>
            <h1 className="text-3xl font-bold text-foreground mb-2">Gestión de Sensores</h1>
            <p className="text-muted-foreground">
              Control y monitoreo de sensores IoT del sistema de riego
            </p>
          </div>
          
          <Button 
            onClick={handleRefresh}
            disabled={isRefreshing}
            className="bg-gradient-nature hover:opacity-90 text-primary-foreground"
          >
            <RefreshCw className={`h-5 w-5 mr-2 ${isRefreshing ? 'animate-spin' : ''}`} />
            {isRefreshing ? 'Actualizando...' : 'Actualizar Datos'}
          </Button>
        </div>

        {/* Estadísticas resumen */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
          <Card className="shadow-natural">
            <CardContent className="p-6">
              <div className="flex items-center space-x-4">
                <div className="bg-gradient-nature p-3 rounded-lg">
                  <Activity className="h-6 w-6 text-primary-foreground" />
                </div>
                <div>
                  <p className="text-sm font-medium text-muted-foreground">Total Sensores</p>
                  <p className="text-2xl font-bold">{stats.total}</p>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="shadow-natural">
            <CardContent className="p-6">
              <div className="flex items-center space-x-4">
                <div className="bg-green-500 p-3 rounded-lg">
                  <Wifi className="h-6 w-6 text-white" />
                </div>
                <div>
                  <p className="text-sm font-medium text-muted-foreground">Activos</p>
                  <p className="text-2xl font-bold text-green-600">{stats.active}</p>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="shadow-natural">
            <CardContent className="p-6">
              <div className="flex items-center space-x-4">
                <div className="bg-red-500 p-3 rounded-lg">
                  <WifiOff className="h-6 w-6 text-white" />
                </div>
                <div>
                  <p className="text-sm font-medium text-muted-foreground">Inactivos</p>
                  <p className="text-2xl font-bold text-red-600">{stats.inactive}</p>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="shadow-natural">
            <CardContent className="p-6">
              <div className="flex items-center space-x-4">
                <div className="bg-gradient-water p-3 rounded-lg">
                  <Droplets className="h-6 w-6 text-white" />
                </div>
                <div>
                  <p className="text-sm font-medium text-muted-foreground">Humedad Prom.</p>
                  <p className="text-2xl font-bold text-blue-600">{stats.humidityAvg}%</p>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Lista de sensores */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {sensors.map((sensor) => {
            const SensorIcon = getSensorIcon(sensor.type);
            const valueColor = getSensorColor(sensor.type, sensor.value);
            return (
              <Card key={sensor.id} className="shadow-natural hover:shadow-water transition-all duration-300">
                <CardHeader className="pb-3">
                  <div className="flex items-center justify-between">
                    <CardTitle className="flex items-center space-x-3">
                      <div className={`p-2 rounded-lg ${
                        sensor.status === 'active' 
                          ? 'bg-gradient-nature' 
                          : 'bg-muted'
                      }`}>
                        <SensorIcon className={`h-5 w-5 ${
                          sensor.status === 'active' 
                            ? 'text-primary-foreground' 
                            : 'text-muted-foreground'
                        }`} />
                      </div>
                      <div>
                        <h3 className="text-lg font-semibold">{sensor.name}</h3>
                        <p className="text-sm text-muted-foreground font-normal">
                          {sensor.type === 'humidity' ? 'Sensor de Humedad' : 'Sensor de Temperatura'}
                        </p>
                      </div>
                    </CardTitle>
                    
                    <Badge 
                      variant={sensor.status === 'active' ? 'default' : 'secondary'}
                      className="text-xs"
                    >
                      {sensor.status === 'active' ? '🟢 Activo' : '🔴 Inactivo'}
                    </Badge>
                  </div>
                </CardHeader>
                
                <CardContent className="space-y-4">
                  {/* Valor actual */}
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm text-muted-foreground">Valor Actual</p>
                      <p className={`text-3xl font-bold ${valueColor}`}>
                        {sensor.value}{sensor.unit}
                      </p>
                    </div>
                    
                    {sensor.type === 'humidity' && (
                      <div className="text-right">
                        <p className="text-sm text-muted-foreground">Estado</p>
                        <p className={`text-sm font-medium ${
                          sensor.value < 25 ? 'text-red-600' :
                          sensor.value < 35 ? 'text-orange-600' : 'text-green-600'
                        }`}>
                          {sensor.value < 25 ? 'Crítico' :
                           sensor.value < 35 ? 'Bajo' : 'Óptimo'}
                        </p>
                      </div>
                    )}
                  </div>

                  {/* Información adicional */}
                  <div className="grid grid-cols-2 gap-4 text-sm">
                    <div className="flex items-center space-x-2">
                      <MapPin className="h-4 w-4 text-muted-foreground" />
                      <div>
                        <p className="text-muted-foreground">Ubicación</p>
                        <p className="font-medium">{sensor.location}</p>
                      </div>
                    </div>
                    
                    <div className="flex items-center space-x-2">
                      <Clock className="h-4 w-4 text-muted-foreground" />
                      <div>
                        <p className="text-muted-foreground">Última actualización</p>
                        <p className="font-medium">
                          {new Date(sensor.lastUpdated).toLocaleTimeString('es-ES', {
                            hour: '2-digit',
                            minute: '2-digit'
                          })}
                        </p>
                      </div>
                    </div>
                  </div>

                  {/* Control de estado */}
                  <div className="flex items-center justify-between pt-4 border-t border-border">
                    <div className="flex items-center space-x-3">
                      <Label htmlFor={`sensor-${sensor.id}`} className="text-sm font-medium">
                        Estado del sensor
                      </Label>
                    </div>
                    
                    <div className="flex items-center space-x-3">
                      <span className="text-sm text-muted-foreground">
                        {sensor.status === 'active' ? 'Activo' : 'Inactivo'}
                      </span>
                      <Switch
                        id={`sensor-${sensor.id}`}
                        checked={sensor.status === 'active'}
                        onCheckedChange={(checked) => 
                          handleSensorToggle(sensor.id, checked ? 'active' : 'inactive')
                        }
                      />
                    </div>
                  </div>

                  {/* Botón de configuración */}
                  <Button 
                    variant="outline" 
                    size="sm" 
                    className="w-full"
                    disabled
                  >
                    <SettingsIcon className="h-4 w-4 mr-2" />
                    Configurar Sensor
                    <span className="ml-2 text-xs text-muted-foreground">(Próximamente)</span>
                  </Button>
                </CardContent>
              </Card>
            );
          })}
        </div>
      </div>
    </DashboardLayout>
  );
};

export default Sensors;