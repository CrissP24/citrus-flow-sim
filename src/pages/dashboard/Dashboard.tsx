import { useState, useEffect } from 'react';
import DashboardLayout from '@/components/dashboard/DashboardLayout';
import MetricCard from '@/components/dashboard/MetricCard';
import PumpControl from '@/components/dashboard/PumpControl';
import SensorChart from '@/components/dashboard/SensorChart';
import { 
  Droplets, 
  Thermometer, 
  Activity, 
  Zap,
  TrendingUp,
  AlertTriangle
} from 'lucide-react';
import { getSystemData, SensorData } from '@/utils/dataManager';

const Dashboard = () => {
  const [sensorData, setSensorData] = useState<SensorData[]>([]);
  const [systemStats, setSystemStats] = useState({
    avgHumidity: 0,
    avgTemperature: 0,
    activeSensors: 0,
    pumpActive: false,
    autoMode: true
  });

  useEffect(() => {
    const loadData = () => {
      const data = getSystemData();
      setSensorData(data.sensors);
      
      // Calcular estadísticas
      const humiditySensors = data.sensors.filter(s => s.type === 'humidity' && s.status === 'active');
      const tempSensors = data.sensors.filter(s => s.type === 'temperature' && s.status === 'active');
      const activeSensors = data.sensors.filter(s => s.status === 'active').length;
      
      const avgHumidity = humiditySensors.length > 0 
        ? humiditySensors.reduce((sum, s) => sum + s.value, 0) / humiditySensors.length 
        : 0;
        
      const avgTemperature = tempSensors.length > 0 
        ? tempSensors.reduce((sum, s) => sum + s.value, 0) / tempSensors.length 
        : 0;

      setSystemStats({
        avgHumidity: Math.round(avgHumidity),
        avgTemperature: Math.round(avgTemperature),
        activeSensors,
        pumpActive: data.config.pumpActive,
        autoMode: data.config.autoIrrigation
      });
    };

    loadData();
    const interval = setInterval(loadData, 2000); // Actualizar cada 2 segundos para mayor fluidez

    return () => clearInterval(interval);
  }, []);

  const getHumidityStatus = () => {
    if (systemStats.avgHumidity < 25) return { color: 'danger', trend: { value: -15, label: 'Crítico', isPositive: false }};
    if (systemStats.avgHumidity < 35) return { color: 'warning', trend: { value: -8, label: 'Bajo', isPositive: false }};
    return { color: 'primary', trend: { value: 5, label: 'Óptimo', isPositive: true }};
  };

  const getTemperatureStatus = () => {
    if (systemStats.avgTemperature < 18 || systemStats.avgTemperature > 32) {
      return { color: 'warning', trend: { value: 12, label: 'Alerta', isPositive: false }};
    }
    return { color: 'secondary', trend: { value: 3, label: 'Normal', isPositive: true }};
  };

  const humidityStatus = getHumidityStatus();
  const temperatureStatus = getTemperatureStatus();

  return (
    <DashboardLayout>
      <div className="space-y-8">
        {/* Header */}
        <div>
          <h1 className="text-3xl font-bold text-foreground mb-2">Panel Principal</h1>
          <p className="text-muted-foreground">
            Monitoreo en tiempo real del sistema de riego automatizado CitriFlow
          </p>
        </div>

        {/* Métricas principales */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          <MetricCard
            type="humidity"
            value={systemStats.avgHumidity}
            label="Humedad Promedio"
            description="Nivel actual del suelo"
          />
          <MetricCard
            type="temperature"
            value={systemStats.avgTemperature}
            label="Temperatura"
            description="Ambiente actual"
          />
          <MetricCard
            type="sensors"
            value={systemStats.activeSensors}
            label="Sensores Activos"
            description={`de ${sensorData.length} total`}
          />
          <div className="rounded-xl shadow-md p-6 flex flex-col items-start justify-center min-w-[220px] bg-gradient-to-br from-green-100 to-green-300">
            <div className="flex items-center gap-3 mb-2">
              <span className="inline-flex items-center justify-center rounded-full bg-green-500 p-2">
                <span className="h-6 w-6 inline-block bg-green-700 rounded-full"></span>
              </span>
              <span className="text-lg font-bold text-green-900">Estado del Sistema</span>
            </div>
            <div className="text-2xl font-extrabold text-green-800 mb-1">{systemStats.pumpActive ? 'ACTIVO' : systemStats.autoMode ? 'AUTOMÁTICO' : 'MANUAL'}</div>
            <div className="text-sm text-green-900/80">{systemStats.pumpActive ? 'Regando ahora' : 'En espera'}</div>
          </div>
        </div>

        {/* Alertas importantes */}
        {(systemStats.avgHumidity < 30 || !systemStats.autoMode) && (
          <div className="bg-destructive/10 border border-destructive/20 rounded-lg p-6">
            <div className="flex items-start space-x-4">
              <AlertTriangle className="h-6 w-6 text-destructive mt-1" />
              <div className="flex-1">
                <h3 className="font-semibold text-destructive mb-2">Alertas del Sistema</h3>
                <div className="space-y-2 text-sm text-destructive/80">
                  {systemStats.avgHumidity < 30 && (
                    <p>• Humedad del suelo baja ({systemStats.avgHumidity}%). Se recomienda riego inmediato.</p>
                  )}
                  {!systemStats.autoMode && (
                    <p>• El sistema automático está desactivado. El riego debe ser controlado manualmente.</p>
                  )}
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Gráficas de sensores */}
        <div>
          <h2 className="text-2xl font-bold text-foreground mb-6 flex items-center">
            <TrendingUp className="h-6 w-6 mr-3 text-primary" />
            Monitoreo en Tiempo Real
          </h2>
          <SensorChart />
        </div>

        {/* Control de bomba */}
        <div>
          <h2 className="text-2xl font-bold text-foreground mb-6 flex items-center">
            <Zap className="h-6 w-6 mr-3 text-primary" />
            Control de Riego
          </h2>
          <PumpControl />
        </div>

        {/* Estado de sensores resumido */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {sensorData.map((sensor) => (
            <div 
              key={sensor.id}
              className="bg-card rounded-lg p-4 border border-border shadow-natural"
            >
              <div className="flex items-center justify-between mb-2">
                <h4 className="font-medium text-foreground">{sensor.name}</h4>
                <span className={`inline-flex items-center px-2 py-1 rounded-full text-xs font-medium ${
                  sensor.status === 'active' 
                    ? 'bg-green-100 text-green-800' 
                    : 'bg-red-100 text-red-800'
                }`}>
                  {sensor.status === 'active' ? '🟢 Activo' : '🔴 Inactivo'}
                </span>
              </div>
              <div className="flex items-center justify-between">
                <div>
                  <span className="text-2xl font-bold text-foreground">
                    {sensor.value}
                  </span>
                  <span className="text-sm text-muted-foreground ml-1">
                    {sensor.unit}
                  </span>
                </div>
                <div className="text-right">
                  <p className="text-xs text-muted-foreground">{sensor.location}</p>
                  <p className="text-xs text-muted-foreground">
                    {new Date(sensor.lastUpdated).toLocaleTimeString('es-ES', {
                      hour: '2-digit',
                      minute: '2-digit'
                    })}
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </DashboardLayout>
  );
};

export default Dashboard;