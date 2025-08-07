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

// Simulación de actualización de sensores
export const updateSensorValues = (): void => {
  const data = getSystemData();
  
  data.sensors.forEach(sensor => {
    if (sensor.status === 'active') {
      if (sensor.type === 'humidity') {
        // Humedad varía entre 20-60%
        sensor.value = Math.round(20 + Math.random() * 40);
      } else if (sensor.type === 'temperature') {
        // Temperatura varía entre 18-32°C
        sensor.value = Math.round(18 + Math.random() * 14);
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

// Inicializar sistema
export const initializeSystem = (): void => {
  const data = getSystemData();
  
  // Actualizar sensores cada 30 segundos
  setInterval(updateSensorValues, 30000);
  
  console.log('CitriFlow system initialized');
};