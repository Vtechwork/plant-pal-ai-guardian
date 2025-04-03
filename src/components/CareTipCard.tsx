
import React from 'react';
import { Card, CardContent } from "@/components/ui/card";
import { CareTip } from '@/lib/plant-data';
import { AlertCircle, Clock } from 'lucide-react';
import { cn } from '@/lib/utils';

interface CareTipCardProps {
  tip: CareTip;
}

const CareTipCard = ({ tip }: CareTipCardProps) => {
  return (
    <Card className={cn(
      'plant-card transition-all duration-300 animate-growth',
      tip.isUrgent ? 'border-danger bg-danger/5' : ''
    )}>
      <CardContent className="p-4">
        <div className="flex items-start gap-3">
          {tip.isUrgent ? (
            <AlertCircle className="mt-1 h-5 w-5 text-danger shrink-0" />
          ) : (
            <div className="mt-1 flex h-5 w-5 items-center justify-center rounded-full bg-plantGreen/20 text-plantGreen shrink-0">
              <Clock className="h-3 w-3" />
            </div>
          )}
          
          <div>
            <h4 className={cn(
              'text-sm font-medium',
              tip.isUrgent ? 'text-danger' : 'text-foreground'
            )}>
              {tip.title}
            </h4>
            <p className="mt-1 text-sm text-muted-foreground">{tip.description}</p>
            
            {tip.dueIn !== undefined && (
              <div className="mt-2 flex items-center gap-1 text-xs">
                <Clock className="h-3 w-3 text-muted-foreground" />
                <span className="text-muted-foreground">
                  Due in {tip.dueIn} {tip.dueIn === 1 ? 'day' : 'days'}
                </span>
              </div>
            )}
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default CareTipCard;
