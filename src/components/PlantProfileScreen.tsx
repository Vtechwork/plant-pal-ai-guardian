
import React, { useState } from 'react';
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Separator } from "@/components/ui/separator";
import { Plant, formatDate } from "@/lib/plant-data";
import CareTipCard from "./CareTipCard";
import PlantHistoryItem from "./PlantHistoryItem";
import DigitalTwinStatus from "./DigitalTwinStatus";
import { Edit, PlusCircle, ArrowLeftRight, NotebookText, History } from 'lucide-react';

interface PlantProfileScreenProps {
  plant: Plant;
}

const PlantProfileScreen = ({ plant }: PlantProfileScreenProps) => {
  const [activeTab, setActiveTab] = useState("overview");

  return (
    <div className="flex flex-col gap-6 pb-8">
      {/* Header with plant image and basic info */}
      <div className="relative">
        <div className="absolute inset-0 bg-gradient-to-b from-transparent via-transparent to-background z-10"></div>
        <div className="h-40 sm:h-48 md:h-56 w-full overflow-hidden rounded-lg">
          <img
            src={plant.imageUrl}
            alt={plant.name}
            className="w-full h-full object-cover"
          />
        </div>

        <div className="relative z-20 -mt-16 mx-4">
          <Card className="plant-card border-2 shadow-xl">
            <CardContent className="p-5 flex flex-col sm:flex-row gap-4 items-center">
              <div className="flex-shrink-0 rounded-full h-20 w-20 overflow-hidden border-4 border-card">
                <img
                  src={plant.imageUrl}
                  alt={plant.name}
                  className="h-full w-full object-cover"
                />
              </div>

              <div className="text-center sm:text-left flex-1">
                <h1 className="text-2xl font-bold">{plant.name}</h1>
                <p className="text-sm text-muted-foreground">{plant.species}</p>
                
                <div className="flex flex-col sm:flex-row sm:items-center gap-1 sm:gap-3 mt-1">
                  <div className="text-sm">
                    <span className="text-muted-foreground">Location:</span>{" "}
                    <span className="font-medium">{plant.location}</span>
                  </div>
                  <Separator className="hidden sm:block h-4" orientation="vertical" />
                  <div className="text-sm">
                    <span className="text-muted-foreground">Since:</span>{" "}
                    <span className="font-medium">{formatDate(plant.acquiredDate)}</span>
                  </div>
                </div>
              </div>

              <div className="flex gap-2">
                <Button size="sm" variant="outline">
                  <Edit className="h-4 w-4 mr-1" /> Edit
                </Button>
                <Button size="sm">
                  <PlusCircle className="h-4 w-4 mr-1" /> Add Data
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>

      {/* Digital Twin Status */}
      <div className="mx-4">
        <DigitalTwinStatus 
          digitalTwin={plant.digitalTwin} 
          idealConditions={plant.idealConditions}
        />
      </div>

      {/* Tabs for Care Tips and History */}
      <div className="mx-4">
        <Tabs defaultValue="care" className="w-full">
          <TabsList className="grid grid-cols-2">
            <TabsTrigger value="care" className="flex items-center gap-2">
              <NotebookText className="h-4 w-4" />
              <span>Care Tips</span>
            </TabsTrigger>
            <TabsTrigger value="history" className="flex items-center gap-2">
              <History className="h-4 w-4" />
              <span>History</span>
            </TabsTrigger>
          </TabsList>
          
          <TabsContent value="care" className="pt-4">
            <div className="grid gap-4">
              {plant.careTips.map((tip) => (
                <CareTipCard key={tip.id} tip={tip} />
              ))}
            </div>
          </TabsContent>
          
          <TabsContent value="history" className="pt-4">
            <Card>
              <CardContent className="p-4">
                <div className="divide-y">
                  {plant.history.map((item) => (
                    <PlantHistoryItem key={item.id} item={item} />
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>

      <div className="mx-4 text-center">
        <Button variant="outline" className="w-full max-w-md">
          <ArrowLeftRight className="h-4 w-4 mr-2" />
          Ask Plant Pal AI
        </Button>
      </div>
    </div>
  );
};

export default PlantProfileScreen;
