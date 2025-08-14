// CitriFlow - Sistema de gestión de datos local
// Simula una base de datos usando localStorage y archivos JSON

export interface SensorData {
  id: string;
  name: string;
  type: 'humidity' | 'temperature';
  value: number;
  unit: string;
  status: 'active' | 'inactive';
  lastUpdated: string;
  location: string;
}

export interface IrrigationRecord {
  id: string;
  timestamp: string;
  humidity: number;
  temperature: number;
  pumpStatus: boolean;
  type: 'manual' | 'automatic';
  duration?: number;
}

export interface SystemConfig {
  humidityThreshold: number;
  autoIrrigation: boolean;
  pumpActive: boolean;
  lastUpdate: string;
}

export interface User {
  username: string;
  password: string;
  role: 'admin';
}

export interface SystemData {
  sensors: SensorData[];
  irrigationHistory: IrrigationRecord[];
  config: SystemConfig;
  users: User[];
}

// Datos iniciales del sistema
const initialData: SystemData = {
  sensors: [
    {
      id: 'humid-001',
      name: 'Sensor Humedad Zona A',
      type: 'humidity',
      value: 45,
      unit: '%',
      status: 'active',
      lastUpdated: new Date().toISOString(),
      location: 'Sector Norte'
    },
    {
      id: 'humid-002', 
      name: 'Sensor Humedad Zona B',
      type: 'humidity',
      value: 28,
      unit: '%',
      status: 'active',
      lastUpdated: new Date().toISOString(),
      location: 'Sector Sur'
    },
    {
      id: 'temp-001',
      name: 'Sensor Temperatura',
      type: 'temperature',
      value: 24,
      unit: '°C',
      status: 'active',
      lastUpdated: new Date().toISOString(),
      location: 'Central'
    }
  ],
  irrigationHistory: [
    {
      id: 'irr-001',
      timestamp: new Date(Date.now() - 3600000).toISOString(),
      humidity: 25,
      temperature: 26,
      pumpStatus: true,
      type: 'automatic',
      duration: 15
    }
  ],
  config: {
    humidityThreshold: 30,
    autoIrrigation: true,
    pumpActive: false,
    lastUpdate: new Date().toISOString()
  },
  users: [
    {
      username: 'admin',
      password: 'admin123',
      role: 'admin'
    }
  ]
};

// Clave para localStorage
const STORAGE_KEY = 'citriflow-data';

// Obtener datos del sistema
export const getSystemData = (): SystemData => {
  try {
    const stored = localStorage.getItem(STORAGE_KEY);
    if (stored) {
      return JSON.parse(stored);
    }
  } catch (error) {
    console.error('Error loading system data:', error);
  }
  
  // Si no hay datos o hay error, usar datos iniciales
  saveSystemData(initialData);
  return initialData;
};

// Guardar datos del sistema
export const saveSystemData = (data: SystemData): void => {
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(data));
    console.log('System data saved successfully');
  } catch (error) {
    console.error('Error saving system data:', error);
  }
};

// --- Simulación basada en clima real de Jipijapa ---
// Valores aproximados para Jipijapa, Ecuador
// Temperatura promedio: 22°C (noche) a 32°C (tarde)
// Humedad promedio: 60% (tarde) a 85% (madrugada)

function getJipijapaWeatherSim() {
  const now = new Date();
  const hour = now.getHours();
  // Temperatura: sube desde 22°C (5am) hasta 32°C (15pm), luego baja
  let temp = 22 + 10 * Math.sin(Math.PI * (hour - 5) / 14); // 5am-19pm
  // Humedad: baja desde 85% (5am) hasta 60% (15pm), luego sube
  let humidity = 85 - 25 * Math.sin(Math.PI * (hour - 5) / 14);
  // Añadir pequeñas variaciones aleatorias
  temp += (Math.random() - 0.5) * 2; // +/-1°C
  humidity += (Math.random() - 0.5) * 4; // +/-2%
  return {
    temperature: Math.round(temp),
    humidity: Math.round(humidity)
  };
}

// Función mejorada con sensores reales del dispositivo
export const updateSensorValues = async (): Promise<void> => {
  const data = getSystemData();
  const jipijapa = getJipijapaWeatherSim();
  
  // Intentar obtener datos reales del dispositivo
  const realTemp = await getRealTemperature();
  const realHumidity = await getRealHumidity();
  
  data.sensors.forEach(sensor => {
    if (sensor.status === 'active') {
      if (sensor.type === 'humidity') {
        // Usar humedad real si está disponible, sino simulada
        sensor.value = realHumidity !== null ? Math.round(realHumidity) : jipijapa.humidity;
      } else if (sensor.type === 'temperature') {
        // Usar temperatura real si está disponible, sino simulada
        sensor.value = realTemp !== null ? Math.round(realTemp) : jipijapa.temperature;
      }
      sensor.lastUpdated = new Date().toISOString();
    }
  });
  
  // Auto-riego si humedad promedio está por debajo del umbral
  const humiditySensors = data.sensors.filter(s => s.type === 'humidity' && s.status === 'active');
  const avgHumidity = humiditySensors.reduce((sum, s) => sum + s.value, 0) / humiditySensors.length;
  if (data.config.autoIrrigation && avgHumidity < data.config.humidityThreshold && !data.config.pumpActive) {
    activatePump('automatic', data);
  }
  data.config.lastUpdate = new Date().toISOString();
  saveSystemData(data);
};

// Activar bomba de riego
export const activatePump = (type: 'manual' | 'automatic', data?: SystemData): void => {
  const systemData = data || getSystemData();
  
  systemData.config.pumpActive = true;
  
  // Crear registro de riego
  const humiditySensors = systemData.sensors.filter(s => s.type === 'humidity' && s.status === 'active');
  const tempSensors = systemData.sensors.filter(s => s.type === 'temperature' && s.status === 'active');
  
  const avgHumidity = humiditySensors.reduce((sum, s) => sum + s.value, 0) / humiditySensors.length;
  const avgTemp = tempSensors.reduce((sum, s) => sum + s.value, 0) / tempSensors.length;

  const irrigationRecord: IrrigationRecord = {
    id: `irr-${Date.now()}`,
    timestamp: new Date().toISOString(),
    humidity: Math.round(avgHumidity),
    temperature: Math.round(avgTemp),
    pumpStatus: true,
    type,
    duration: type === 'automatic' ? 15 : undefined
  };

  systemData.irrigationHistory.unshift(irrigationRecord);
  
  // Limitar historial a últimos 50 registros
  if (systemData.irrigationHistory.length > 50) {
    systemData.irrigationHistory = systemData.irrigationHistory.slice(0, 50);
  }

  saveSystemData(systemData);

  // Simular duración del riego
  setTimeout(() => {
    deactivatePump();
  }, type === 'automatic' ? 15000 : 30000); // 15s auto, 30s manual
};

// Desactivar bomba
export const deactivatePump = (): void => {
  const data = getSystemData();
  data.config.pumpActive = false;
  data.config.lastUpdate = new Date().toISOString();
  saveSystemData(data);
};

// Actualizar configuración
export const updateConfig = (newConfig: Partial<SystemConfig>): void => {
  const data = getSystemData();
  data.config = { ...data.config, ...newConfig, lastUpdate: new Date().toISOString() };
  saveSystemData(data);
};

// Autenticación
export const authenticateUser = (username: string, password: string): boolean => {
  const data = getSystemData();
  const user = data.users.find(u => u.username === username && u.password === password);
  return !!user;
};

// Inicializar sistema con actualizaciones más frecuentes
export const initializeSystem = (): void => {
  const data = getSystemData();
  
  // Actualizar sensores cada 10 segundos para más fluidez
  setInterval(async () => {
    await updateSensorValues();
  }, 10000);
  
  // Simulación adicional cada 3 segundos para variaciones menores
  setInterval(() => {
    simulateMinorSensorVariations();
  }, 3000);
  
  console.log('CitriFlow system initialized with enhanced real-time monitoring');
};

// Nueva función para pequeñas variaciones realistas
export const simulateMinorSensorVariations = (): void => {
  const data = getSystemData();
  
  data.sensors.forEach(sensor => {
    if (sensor.status === 'active') {
      // Pequeñas variaciones aleatorias ±1
      const variation = (Math.random() - 0.5) * 2;
      
      if (sensor.type === 'humidity') {
        sensor.value = Math.max(0, Math.min(100, sensor.value + variation));
      } else if (sensor.type === 'temperature') {
        sensor.value = Math.max(-10, Math.min(50, sensor.value + variation));
      }
      
      sensor.value = Math.round(sensor.value);
      sensor.lastUpdated = new Date().toISOString();
    }
  });
  
  saveSystemData(data);
};

// Obtener temperatura real del dispositivo (si está disponible)
export const getRealTemperature = (): Promise<number | null> => {
  return new Promise((resolve) => {
    // API de sensores web: AmbientTemperatureSensor (no soportado en la mayoría de navegadores)
    // Fallback: usar DeviceMotionEvent/DeviceOrientationEvent (no da temperatura, solo ejemplo)
    // Por ahora, solo intentamos con AmbientTemperatureSensor si existe
    if ('AmbientTemperatureSensor' in window) {
      try {
        // @ts-ignore
        const sensor = new window.AmbientTemperatureSensor();
        sensor.addEventListener('reading', () => {
          resolve(sensor.temperature);
          sensor.stop();
        });
        sensor.addEventListener('error', () => {
          resolve(null);
        });
        sensor.start();
      } catch {
        resolve(null);
      }
    } else if ('ondevicetemperature' in window) {
      // Algunos navegadores antiguos
      // @ts-ignore
      window.addEventListener('devicetemperature', (event: any) => {
        resolve(event.temperature || null);
      });
    } else {
      resolve(null);
    }
  });
};

// Obtener humedad real del dispositivo (si está disponible)
export const getRealHumidity = (): Promise<number | null> => {
  return new Promise((resolve) => {
    // API de sensores web: RelativeHumiditySensor (no soportado en la mayoría de navegadores)
    if ('RelativeHumiditySensor' in window) {
      try {
        // @ts-ignore
        const sensor = new window.RelativeHumiditySensor();
        sensor.addEventListener('reading', () => {
          resolve(sensor.humidity);
          sensor.stop();
        });
        sensor.addEventListener('error', () => {
          resolve(null);
        });
        sensor.start();
      } catch {
        resolve(null);
      }
    } else {
      resolve(null);
    }
  });
};