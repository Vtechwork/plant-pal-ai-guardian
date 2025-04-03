
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { PlantDigitalTwin } from '@/lib/plant-data';
import PlantStatusGauge from './PlantStatusGauge';
import { formatDateTime } from '@/lib/plant-data';
import { cn } from '@/lib/utils';

interface DigitalTwinStatusProps {
  digitalTwin: PlantDigitalTwin;
  idealConditions: {
    minLight: number;
    maxLight: number;
    minMoisture: number;
    maxMoisture: number;
    minTemperature: number;
    maxTemperature: number;
    minHumidity: number;
    maxHumidity: number;
  };
}

const DigitalTwinStatus = ({ digitalTwin, idealConditions }: DigitalTwinStatusProps) => {
  return (
    <Card className="plant-card">
      <CardHeader className="pb-2">
        <CardTitle className="flex items-center justify-between text-lg">
          <span>Digital Twin Status</span>
          <span className="text-xs font-normal text-muted-foreground">
            Updated {formatDateTime(digitalTwin.lastUpdated)}
          </span>
        </CardTitle>
      </CardHeader>
      
      <CardContent className="pb-4">
        <div className="grid grid-cols-2 gap-6 sm:grid-cols-3 md:grid-cols-5 place-items-center">
          <PlantStatusGauge 
            value={digitalTwin.soilMoisture} 
            type="moisture" 
            minValue={idealConditions.minMoisture}
            maxValue={idealConditions.maxMoisture}
          />
          
          <PlantStatusGauge 
            value={digitalTwin.lightExposure} 
            type="light" 
            minValue={idealConditions.minLight}
            maxValue={idealConditions.maxLight}
          />
          
          <PlantStatusGauge 
            value={digitalTwin.temperature} 
            type="temperature" 
            minValue={idealConditions.minTemperature}
            maxValue={idealConditions.maxTemperature}
          />
          
          <PlantStatusGauge 
            value={digitalTwin.humidity} 
            type="humidity" 
            minValue={idealConditions.minHumidity}
            maxValue={idealConditions.maxHumidity}
          />
          
          <div className={cn(
            "flex flex-col items-center gap-1 text-sm",
            digitalTwin.healthIndex > 70 ? "text-plantGreen" : 
            digitalTwin.healthIndex > 40 ? "text-amber-500" : "text-danger"
          )}>
            <span className="text-muted-foreground font-medium">Overall Health</span>
            <div className="text-2xl font-bold flex items-baseline">
              {digitalTwin.healthIndex}
              <span className="text-xs ml-1">/ 100</span>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default DigitalTwinStatus;
