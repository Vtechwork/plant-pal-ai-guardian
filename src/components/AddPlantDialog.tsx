
import React, { useState } from 'react';
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Plant, PlantDigitalTwin, PlantHistory, CareTip } from "@/lib/plant-data";
import { toast } from "sonner";
import { Camera } from 'lucide-react';

interface AddPlantDialogProps {
  isOpen: boolean;
  setIsOpen: (open: boolean) => void;
  onPlantAdded: (newPlant: Plant) => void;
}

const AddPlantDialog = ({ isOpen, setIsOpen, onPlantAdded }: AddPlantDialogProps) => {
  const [name, setName] = useState('');
  const [species, setSpecies] = useState('');
  const [location, setLocation] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);

  // Default image for new plants
  const defaultImage = "/lovable-uploads/2d33b654-f6c8-43b4-b276-b6f9c4d3666b.png";
  
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    if (!name || !species) {
      toast.error("Please provide a name and species for your plant");
      setIsSubmitting(false);
      return;
    }

    // Create a new plant object with default values
    const newPlant: Plant = {
      id: `plant-${Date.now()}`,
      name,
      species,
      location: location || 'Not specified',
      imageUrl: defaultImage,
      acquiredDate: new Date().toISOString(),
      digitalTwin: {
        soilMoisture: 50,
        lightExposure: 50,
        temperature: 21,
        humidity: 50,
        healthIndex: 80,
        lastUpdated: new Date().toISOString()
      },
      history: [
        {
          id: `hist-${Date.now()}`,
          date: new Date().toISOString(),
          type: "note",
          details: `${name} was added to your plant collection!`
        }
      ],
      careTips: [
        {
          id: `tip-${Date.now()}`,
          title: "Water regularly",
          description: `Remember to water your ${name} based on its specific needs.`,
          isUrgent: false,
          dueIn: 3
        }
      ],
      idealConditions: {
        minLight: 50,
        maxLight: 80,
        minMoisture: 40,
        maxMoisture: 70,
        minTemperature: 18,
        maxTemperature: 30,
        minHumidity: 40,
        maxHumidity: 70
      }
    };

    // Call the onPlantAdded callback with the new plant
    onPlantAdded(newPlant);
    toast.success(`${name} has been added to your collection!`);
    
    // Reset form and close dialog
    setName('');
    setSpecies('');
    setLocation('');
    setIsSubmitting(false);
    setIsOpen(false);
  };

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogContent className="sm:max-w-[500px]">
        <DialogHeader>
          <DialogTitle>Add New Plant</DialogTitle>
          <DialogDescription>
            Enter information about your new plant to add it to your collection.
          </DialogDescription>
        </DialogHeader>
        <form onSubmit={handleSubmit}>
          <div className="grid gap-4 py-4">
            <div className="grid gap-2">
              <Label htmlFor="plant-image" className="text-center">Plant Image</Label>
              <div className="flex justify-center">
                <div className="relative w-40 h-40 border-2 border-dashed rounded-md cursor-pointer hover:bg-muted/50 transition-colors flex items-center justify-center">
                  <Camera className="h-8 w-8 text-muted-foreground" />
                  <Input 
                    id="plant-image" 
                    type="file" 
                    className="absolute inset-0 opacity-0 cursor-pointer"
                    accept="image/*"
                  />
                </div>
              </div>
              <p className="text-xs text-center text-muted-foreground">
                Click to upload an image (optional)
              </p>
            </div>
            
            <div className="grid gap-2">
              <Label htmlFor="name" className="required">Name</Label>
              <Input
                id="name"
                placeholder="e.g., Monty"
                value={name}
                onChange={(e) => setName(e.target.value)}
                required
              />
            </div>
            
            <div className="grid gap-2">
              <Label htmlFor="species" className="required">Species</Label>
              <Input
                id="species"
                placeholder="e.g., Monstera Deliciosa"
                value={species}
                onChange={(e) => setSpecies(e.target.value)}
                required
              />
            </div>
            
            <div className="grid gap-2">
              <Label htmlFor="location">Location</Label>
              <Input
                id="location"
                placeholder="e.g., Living Room - North Window"
                value={location}
                onChange={(e) => setLocation(e.target.value)}
              />
            </div>
          </div>
          <DialogFooter>
            <Button 
              type="button" 
              variant="outline" 
              onClick={() => setIsOpen(false)}
            >
              Cancel
            </Button>
            <Button type="submit" disabled={isSubmitting}>
              {isSubmitting ? "Adding..." : "Add Plant"}
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
};

export default AddPlantDialog;
