
import React from 'react';
import { PlantHistory, formatDateTime } from '@/lib/plant-data';
import { Droplet, Camera, FlowerIcon, Shovel, FileText } from 'lucide-react';
import { cn } from '@/lib/utils';

interface PlantHistoryItemProps {
  item: PlantHistory;
}

const PlantHistoryItem = ({ item }: PlantHistoryItemProps) => {
  const getIcon = () => {
    switch (item.type) {
      case 'watering':
        return <Droplet className="h-4 w-4 text-water" />;
      case 'fertilizing':
        return <FlowerIcon className="h-4 w-4 text-plantGreen" />;
      case 'repotting':
        return <Shovel className="h-4 w-4 text-soil" />;
      case 'photo':
        return <Camera className="h-4 w-4 text-blue-400" />;
      case 'note':
        return <FileText className="h-4 w-4 text-muted-foreground" />;
      default:
        return <FileText className="h-4 w-4 text-muted-foreground" />;
    }
  };

  return (
    <div className="flex items-start gap-3 py-3">
      <div className="mt-1 flex h-7 w-7 items-center justify-center rounded-full bg-muted shrink-0">
        {getIcon()}
      </div>
      
      <div className="flex-1">
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between">
          <p className="font-medium capitalize text-sm">
            {item.type}
          </p>
          <p className="text-xs text-muted-foreground">
            {formatDateTime(item.date)}
          </p>
        </div>
        
        {item.details && (
          <p className="mt-1 text-sm text-muted-foreground">{item.details}</p>
        )}
        
        {item.imageUrl && (
          <div className="mt-3 rounded-md overflow-hidden border">
            <img 
              src={item.imageUrl}
              alt={`Plant on ${formatDateTime(item.date)}`}
              className="w-full h-32 object-cover"
            />
          </div>
        )}
      </div>
    </div>
  );
};

export default PlantHistoryItem;
