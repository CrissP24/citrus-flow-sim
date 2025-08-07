import { Droplets, Thermometer, Activity } from 'lucide-react';

interface MetricCardProps {
  type: 'humidity' | 'temperature' | 'sensors';
  value: number;
  label: string;
  description: string;
  color?: string;
  icon?: React.ReactNode;
}

const iconMap = {
  humidity: <Droplets className="h-10 w-10 text-white drop-shadow-lg" />,
  temperature: <Thermometer className="h-10 w-10 text-white drop-shadow-lg" />,
  sensors: <Activity className="h-10 w-10 text-white drop-shadow-lg" />,
};

const bgMap = {
  humidity: 'bg-gradient-to-br from-green-400 to-green-700',
  temperature: 'bg-gradient-to-br from-blue-400 to-blue-700',
  sensors: 'bg-gradient-to-br from-yellow-400 to-yellow-700',
};

const MetricCard: React.FC<MetricCardProps> = ({ type, value, label, description }) => {
  return (
    <div className={`rounded-xl shadow-md p-6 flex items-center gap-4 min-w-[220px] ${bgMap[type]} transition-all duration-300`}> 
      <div className="flex items-center justify-center rounded-full bg-white/20 p-3">
        {iconMap[type]}
      </div>
      <div className="flex-1">
        <div className="text-lg font-bold text-white leading-tight">{label}</div>
        <div className="text-3xl font-extrabold text-white">{value}{type === 'temperature' ? '°C' : type === 'humidity' ? '%' : ''}</div>
        <div className="text-sm text-white/80 mt-1">{description}</div>
      </div>
    </div>
  );
};

export default MetricCard;