import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { LucideIcon } from 'lucide-react';

interface MetricCardProps {
  title: string;
  value: string | number;
  unit?: string;
  subtitle?: string;
  icon: LucideIcon;
  trend?: {
    value: number;
    label: string;
    isPositive?: boolean;
  };
  color?: 'default' | 'primary' | 'secondary' | 'accent' | 'warning' | 'danger';
  size?: 'default' | 'large';
}

const MetricCard: React.FC<MetricCardProps> = ({
  title,
  value,
  unit,
  subtitle,
  icon: Icon,
  trend,
  color = 'default',
  size = 'default'
}) => {
  const getColorClasses = () => {
    switch (color) {
      case 'primary':
        return 'bg-gradient-nature text-primary-foreground';
      case 'secondary':
        return 'bg-gradient-water text-white';
      case 'accent':
        return 'bg-gradient-earth text-white';
      case 'warning':
        return 'bg-orange-500 text-white';
      case 'danger':
        return 'bg-destructive text-destructive-foreground';
      default:
        return 'bg-card text-card-foreground';
    }
  };

  const getIconBg = () => {
    switch (color) {
      case 'primary':
        return 'bg-primary-foreground/20';
      case 'secondary':
        return 'bg-white/20';
      case 'accent':
        return 'bg-white/20';
      case 'warning':
        return 'bg-white/20';
      case 'danger':
        return 'bg-destructive-foreground/20';
      default:
        return 'bg-gradient-nature';
    }
  };

  const getIconColor = () => {
    switch (color) {
      case 'default':
        return 'text-primary-foreground';
      default:
        return '';
    }
  };

  return (
    <Card className={`shadow-natural hover:shadow-water transition-all duration-300 ${getColorClasses()}`}>
      <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
        <CardTitle className={`${size === 'large' ? 'text-lg' : 'text-sm'} font-medium`}>
          {title}
        </CardTitle>
        <div className={`${getIconBg()} p-2 rounded-lg`}>
          <Icon className={`h-5 w-5 ${getIconColor()}`} />
        </div>
      </CardHeader>
      
      <CardContent>
        <div className={`${size === 'large' ? 'text-4xl' : 'text-2xl'} font-bold flex items-baseline space-x-1`}>
          <span>{value}</span>
          {unit && <span className={`${size === 'large' ? 'text-xl' : 'text-sm'} font-normal opacity-80`}>{unit}</span>}
        </div>
        
        {subtitle && (
          <p className={`text-xs opacity-80 mt-1`}>
            {subtitle}
          </p>
        )}
        
        {trend && (
          <div className="flex items-center mt-2">
            <span className={`text-xs font-medium ${
              trend.isPositive ? 'text-green-400' : 'text-red-400'
            }`}>
              {trend.isPositive ? '↗' : '↘'} {Math.abs(trend.value)}%
            </span>
            <span className="text-xs opacity-70 ml-2">{trend.label}</span>
          </div>
        )}
      </CardContent>
    </Card>
  );
};

export default MetricCard;