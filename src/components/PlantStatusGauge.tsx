
import React from 'react';
import { cn } from '@/lib/utils';

interface PlantStatusGaugeProps {
  value: number;
  type: 'moisture' | 'light' | 'temperature' | 'humidity' | 'health';
  size?: 'sm' | 'md' | 'lg';
  showLabel?: boolean;
  minValue?: number;
  maxValue?: number;
}

const PlantStatusGauge = ({
  value,
  type,
  size = 'md',
  showLabel = true,
  minValue,
  maxValue,
}: PlantStatusGaugeProps) => {
  // Define colors and labels based on gauge type
  const getConfig = () => {
    switch (type) {
      case 'moisture':
        return {
          label: 'Moisture',
          fillColor: 'bg-water',
          icon: '💧',
          isInRange: value >= (minValue || 40) && value <= (maxValue || 70),
        };
      case 'light':
        return {
          label: 'Light',
          fillColor: 'bg-sunlight',
          icon: '☀️',
          isInRange: value >= (minValue || 60) && value <= (maxValue || 80),
        };
      case 'temperature':
        return {
          label: 'Temp',
          fillColor: 'bg-amber-500',
          icon: '🌡️',
          isInRange: value >= (minValue || 18) && value <= (maxValue || 30),
        };
      case 'humidity':
        return {
          label: 'Humidity',
          fillColor: 'bg-blue-300',
          icon: '💨',
          isInRange: value >= (minValue || 50) && value <= (maxValue || 70),
        };
      case 'health':
        return {
          label: 'Health',
          fillColor: value > 70 ? 'bg-plantGreen' : value > 40 ? 'bg-amber-500' : 'bg-danger',
          icon: '❤️',
          isInRange: value >= 70,
        };
      default:
        return {
          label: 'Status',
          fillColor: 'bg-primary',
          icon: '📊',
          isInRange: true,
        };
    }
  };

  const config = getConfig();

  const heightClasses = {
    sm: 'h-12',
    md: 'h-20',
    lg: 'h-32',
  };

  const widthClasses = {
    sm: 'w-3',
    md: 'w-5',
    lg: 'w-8',
  };

  const fontClasses = {
    sm: 'text-xs',
    md: 'text-sm',
    lg: 'text-base',
  };

  return (
    <div className={cn('flex flex-col items-center gap-1', fontClasses[size])}>
      {showLabel && (
        <div className="flex items-center gap-1">
          <span>{config.icon}</span>
          <span className="font-medium text-muted-foreground">{config.label}</span>
        </div>
      )}
      
      <div className="flex items-center gap-2">
        <div className={cn('relative rounded-full overflow-hidden', heightClasses[size], widthClasses[size])}>
          <div className="plant-gauge h-full w-full">
            <div
              className={cn(
                'plant-gauge-fill',
                config.fillColor,
                config.isInRange ? 'opacity-100' : 'opacity-70'
              )}
              style={{ height: `${value}%` }}
            />
          </div>
        </div>
        
        <span className={cn(
          'font-medium',
          config.isInRange ? 'text-foreground' : 'text-danger'
        )}>
          {type === 'temperature' ? `${value}°C` : `${value}%`}
        </span>
      </div>
    </div>
  );
};

export default PlantStatusGauge;
