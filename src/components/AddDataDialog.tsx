
import React, { useState } from 'react';
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Plant } from "@/lib/plant-data";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { toast } from "@/components/ui/use-toast";
import { Droplet, Flower2, Camera, FileText } from "lucide-react";

interface AddDataDialogProps {
  isOpen: boolean;
  setIsOpen: (open: boolean) => void;
  plant: Plant;
}

const AddDataDialog = ({ isOpen, setIsOpen, plant }: AddDataDialogProps) => {
  const [activeTab, setActiveTab] = useState("watering");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [waterAmount, setWaterAmount] = useState("");
  const [notes, setNotes] = useState("");
  
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    // Mock adding new data
    setTimeout(() => {
      let message = "";
      switch(activeTab) {
        case "watering":
          message = `Added ${waterAmount}ml of water to ${plant.name}`;
          break;
        case "fertilizing":
          message = `Added fertilizer to ${plant.name}`;
          break;
        case "photo":
          message = `Added new photo of ${plant.name}`;
          break;
        case "note":
          message = `Added note to ${plant.name}`;
          break;
      }

      toast({
        title: "Data recorded",
        description: message,
      });
      setIsSubmitting(false);
      setIsOpen(false);
    }, 1000);
  };

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogContent className="sm:max-w-[500px]">
        <DialogHeader>
          <DialogTitle>Add Data for {plant.name}</DialogTitle>
          <DialogDescription>
            Record new information about your plant.
          </DialogDescription>
        </DialogHeader>
        <Tabs value={activeTab} onValueChange={setActiveTab}>
          <TabsList className="grid grid-cols-4">
            <TabsTrigger value="watering" className="flex flex-col items-center py-2">
              <Droplet className="h-4 w-4 mb-1" />
              <span className="text-xs">Water</span>
            </TabsTrigger>
            <TabsTrigger value="fertilizing" className="flex flex-col items-center py-2">
              <Flower2 className="h-4 w-4 mb-1" />
              <span className="text-xs">Fertilize</span>
            </TabsTrigger>
            <TabsTrigger value="photo" className="flex flex-col items-center py-2">
              <Camera className="h-4 w-4 mb-1" />
              <span className="text-xs">Photo</span>
            </TabsTrigger>
            <TabsTrigger value="note" className="flex flex-col items-center py-2">
              <FileText className="h-4 w-4 mb-1" />
              <span className="text-xs">Note</span>
            </TabsTrigger>
          </TabsList>
          
          <form onSubmit={handleSubmit}>
            <TabsContent value="watering" className="mt-4">
              <div className="grid gap-4">
                <div className="grid gap-2">
                  <Label htmlFor="water-amount">Water Amount (ml)</Label>
                  <Input
                    id="water-amount"
                    type="number"
                    placeholder="e.g., 250"
                    value={waterAmount}
                    onChange={(e) => setWaterAmount(e.target.value)}
                  />
                </div>
                <div className="grid gap-2">
                  <Label htmlFor="water-notes">Notes (Optional)</Label>
                  <Textarea
                    id="water-notes"
                    placeholder="Any additional notes about this watering"
                    value={notes}
                    onChange={(e) => setNotes(e.target.value)}
                  />
                </div>
              </div>
            </TabsContent>
            
            <TabsContent value="fertilizing" className="mt-4">
              <div className="grid gap-4">
                <div className="grid gap-2">
                  <Label htmlFor="fertilizer-type">Fertilizer Type</Label>
                  <Select>
                    <SelectTrigger>
                      <SelectValue placeholder="Select fertilizer type" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="all-purpose">All Purpose</SelectItem>
                      <SelectItem value="nitrogen-rich">Nitrogen Rich</SelectItem>
                      <SelectItem value="bloom-booster">Bloom Booster</SelectItem>
                      <SelectItem value="organic">Organic</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div className="grid gap-2">
                  <Label htmlFor="fertilizer-amount">Amount</Label>
                  <Input
                    id="fertilizer-amount"
                    placeholder="e.g., 5ml diluted in water"
                  />
                </div>
                <div className="grid gap-2">
                  <Label htmlFor="fertilizer-notes">Notes (Optional)</Label>
                  <Textarea
                    id="fertilizer-notes"
                    placeholder="Any additional notes about fertilizing"
                  />
                </div>
              </div>
            </TabsContent>
            
            <TabsContent value="photo" className="mt-4">
              <div className="grid gap-4">
                <div className="grid gap-2">
                  <Label htmlFor="photo-upload">Upload Photo</Label>
                  <div className="border-2 border-dashed rounded-md p-6 text-center cursor-pointer hover:bg-muted/50 transition-colors">
                    <Camera className="h-8 w-8 mx-auto mb-2 text-muted-foreground" />
                    <p className="text-sm text-muted-foreground mb-1">Click to upload or drag and drop</p>
                    <p className="text-xs text-muted-foreground">PNG, JPG or WEBP (max. 5MB)</p>
                    <Input id="photo-upload" type="file" className="hidden" />
                  </div>
                </div>
                <div className="grid gap-2">
                  <Label htmlFor="photo-notes">Caption (Optional)</Label>
                  <Textarea
                    id="photo-notes"
                    placeholder="Add a caption to your photo"
                  />
                </div>
              </div>
            </TabsContent>
            
            <TabsContent value="note" className="mt-4">
              <div className="grid gap-4">
                <div className="grid gap-2">
                  <Label htmlFor="note-title">Title</Label>
                  <Input
                    id="note-title"
                    placeholder="e.g., New leaf unfurling!"
                  />
                </div>
                <div className="grid gap-2">
                  <Label htmlFor="note-content">Note</Label>
                  <Textarea
                    id="note-content"
                    placeholder="What's happening with your plant?"
                    rows={5}
                  />
                </div>
              </div>
            </TabsContent>
            
            <div className="flex justify-end gap-2 mt-4">
              <Button 
                type="button" 
                variant="outline" 
                onClick={() => setIsOpen(false)}
              >
                Cancel
              </Button>
              <Button type="submit" disabled={isSubmitting}>
                {isSubmitting ? "Saving..." : "Save"}
              </Button>
            </div>
          </form>
        </Tabs>
      </DialogContent>
    </Dialog>
  );
};

export default AddDataDialog;
