import { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { 
  LineChart, 
  Line, 
  XAxis, 
  YAxis, 
  CartesianGrid, 
  Tooltip, 
  Legend, 
  ResponsiveContainer,
  AreaChart,
  Area
} from 'recharts';
import { getSystemData } from '@/utils/dataManager';
import { Droplets, Thermometer } from 'lucide-react';

const SensorChart = () => {
  const [chartData, setChartData] = useState<any[]>([]);
  const [currentData, setCurrentData] = useState({
    humidity: 0,
    temperature: 0
  });

  useEffect(() => {
    const updateChartData = () => {
      const data = getSystemData();
      
      // Obtener valores actuales
      const humiditySensors = data.sensors.filter(s => s.type === 'humidity' && s.status === 'active');
      const tempSensors = data.sensors.filter(s => s.type === 'temperature' && s.status === 'active');
      
      const avgHumidity = humiditySensors.reduce((sum, s) => sum + s.value, 0) / humiditySensors.length;
      const avgTemp = tempSensors.reduce((sum, s) => sum + s.value, 0) / tempSensors.length;
      
      setCurrentData({
        humidity: Math.round(avgHumidity),
        temperature: Math.round(avgTemp)
      });

      // Actualizar datos del gráfico
      const now = new Date();
      const timeLabel = now.toLocaleTimeString('es-ES', { 
        hour: '2-digit', 
        minute: '2-digit' 
      });

      setChartData(prev => {
        const newData = [...prev, {
          time: timeLabel,
          humidity: Math.round(avgHumidity),
          temperature: Math.round(avgTemp),
          threshold: data.config.humidityThreshold
        }];
        
        // Mantener solo los últimos 20 puntos
        return newData.slice(-20);
      });
    };

    // Inicializar con datos
    updateChartData();
    
    // Actualizar cada 30 segundos
    const interval = setInterval(updateChartData, 30000);

    return () => clearInterval(interval);
  }, []);

  const CustomTooltip = ({ active, payload, label }: any) => {
    if (active && payload && payload.length) {
      return (
        <div className="bg-card border border-border rounded-lg p-3 shadow-natural">
          <p className="font-medium text-foreground">{`Hora: ${label}`}</p>
          {payload.map((entry: any, index: number) => (
            <p key={index} style={{ color: entry.color }} className="text-sm">
              {entry.name === 'humidity' && `Humedad: ${entry.value}%`}
              {entry.name === 'temperature' && `Temperatura: ${entry.value}°C`}
              {entry.name === 'threshold' && `Umbral: ${entry.value}%`}
            </p>
          ))}
        </div>
      );
    }
    return null;
  };

  return (
    <div className="grid grid-cols-1 xl:grid-cols-2 gap-6">
      {/* Gráfico de Humedad */}
      <Card className="shadow-natural">
        <CardHeader>
          <CardTitle className="flex items-center space-x-2">
            <Droplets className="h-5 w-5 text-blue-500" />
            <span>Humedad del Suelo</span>
            <span className="ml-auto text-2xl font-bold text-blue-500">
              {currentData.humidity}%
            </span>
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="h-64">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={chartData}>
                <CartesianGrid strokeDasharray="3 3" className="opacity-30" />
                <XAxis 
                  dataKey="time" 
                  tick={{ fontSize: 12 }}
                  axisLine={false}
                />
                <YAxis 
                  domain={[0, 100]}
                  tick={{ fontSize: 12 }}
                  axisLine={false}
                />
                <Tooltip content={<CustomTooltip />} />
                <defs>
                  <linearGradient id="humidityGradient" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#3b82f6" stopOpacity={0.3}/>
                    <stop offset="95%" stopColor="#3b82f6" stopOpacity={0}/>
                  </linearGradient>
                </defs>
                <Area
                  type="monotone"
                  dataKey="humidity"
                  stroke="#3b82f6"
                  strokeWidth={2}
                  fill="url(#humidityGradient)"
                  name="humidity"
                />
                <Line
                  type="monotone"
                  dataKey="threshold"
                  stroke="#f59e0b"
                  strokeWidth={2}
                  strokeDasharray="5 5"
                  dot={false}
                  name="threshold"
                />
              </AreaChart>
            </ResponsiveContainer>
          </div>
          
          <div className="mt-4 flex items-center justify-between text-sm">
            <div className="flex items-center space-x-2">
              <div className="w-3 h-3 bg-blue-500 rounded-full"></div>
              <span>Humedad actual</span>
            </div>
            <div className="flex items-center space-x-2">
              <div className="w-3 h-3 border-2 border-yellow-500 border-dashed rounded-full"></div>
              <span>Umbral de riego</span>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Gráfico de Temperatura */}
      <Card className="shadow-natural">
        <CardHeader>
          <CardTitle className="flex items-center space-x-2">
            <Thermometer className="h-5 w-5 text-red-500" />
            <span>Temperatura Ambiente</span>
            <span className="ml-auto text-2xl font-bold text-red-500">
              {currentData.temperature}°C
            </span>
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="h-64">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={chartData}>
                <CartesianGrid strokeDasharray="3 3" className="opacity-30" />
                <XAxis 
                  dataKey="time" 
                  tick={{ fontSize: 12 }}
                  axisLine={false}
                />
                <YAxis 
                  domain={[15, 35]}
                  tick={{ fontSize: 12 }}
                  axisLine={false}
                />
                <Tooltip content={<CustomTooltip />} />
                <Line
                  type="monotone"
                  dataKey="temperature"
                  stroke="#ef4444"
                  strokeWidth={3}
                  dot={{ fill: '#ef4444', strokeWidth: 2, r: 4 }}
                  name="temperature"
                />
              </LineChart>
            </ResponsiveContainer>
          </div>
          
          <div className="mt-4 grid grid-cols-2 gap-4 text-sm">
            <div className="text-center p-2 bg-muted/50 rounded-lg">
              <div className="font-medium text-muted-foreground">Rango Óptimo</div>
              <div className="text-lg font-bold">20-28°C</div>
            </div>
            <div className="text-center p-2 bg-muted/50 rounded-lg">
              <div className="font-medium text-muted-foreground">Estado</div>
              <div className={`text-lg font-bold ${
                currentData.temperature >= 20 && currentData.temperature <= 28
                  ? 'text-green-600' 
                  : 'text-orange-600'
              }`}>
                {currentData.temperature >= 20 && currentData.temperature <= 28 ? 'Óptima' : 'Alerta'}
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default SensorChart;