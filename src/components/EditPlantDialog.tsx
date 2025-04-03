
import React, { useState } from 'react';
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Plant } from "@/lib/plant-data";
import { toast } from "@/components/ui/use-toast";

interface EditPlantDialogProps {
  isOpen: boolean;
  setIsOpen: (open: boolean) => void;
  plant: Plant;
}

const EditPlantDialog = ({ isOpen, setIsOpen, plant }: EditPlantDialogProps) => {
  const [name, setName] = useState(plant.name);
  const [location, setLocation] = useState(plant.location);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    // Mock updating the plant data
    setTimeout(() => {
      // In a real implementation, this would update the backend
      toast({
        title: "Plant updated",
        description: `${name} has been updated successfully.`,
      });
      setIsSubmitting(false);
      setIsOpen(false);
    }, 1000);
  };

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Edit Plant</DialogTitle>
          <DialogDescription>
            Update the details of your plant. Click save when you're done.
          </DialogDescription>
        </DialogHeader>
        <form onSubmit={handleSubmit}>
          <div className="grid gap-4 py-4">
            <div className="grid gap-2">
              <Label htmlFor="name">Name</Label>
              <Input
                id="name"
                value={name}
                onChange={(e) => setName(e.target.value)}
              />
            </div>
            <div className="grid gap-2">
              <Label htmlFor="location">Location</Label>
              <Input
                id="location"
                value={location}
                onChange={(e) => setLocation(e.target.value)}
              />
            </div>
            {/* Additional fields could be added here */}
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
              {isSubmitting ? "Saving..." : "Save changes"}
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
};

export default EditPlantDialog;
