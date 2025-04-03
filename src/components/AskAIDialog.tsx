
import React, { useState } from 'react';
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Plant } from "@/lib/plant-data";
import { toast } from "@/components/ui/use-toast";
import { SendHorizontal, Bot, Loader2 } from "lucide-react";

interface AskAIDialogProps {
  isOpen: boolean;
  setIsOpen: (open: boolean) => void;
  plant: Plant;
}

const AskAIDialog = ({ isOpen, setIsOpen, plant }: AskAIDialogProps) => {
  const [question, setQuestion] = useState("");
  const [response, setResponse] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!question.trim()) return;
    
    setIsLoading(true);
    setResponse("");
    
    // Mock AI response with a delay
    setTimeout(() => {
      const responses = [
        `Based on my analysis of ${plant.name}'s current conditions, I recommend watering with about 300ml of filtered water in the next 2 days. The soil moisture is currently at ${plant.digitalTwin.soilMoisture}%, which is on the lower side for a Monstera Deliciosa.`,
        `Your ${plant.species} appears to be thriving in its current location. The light levels are good, but you might want to rotate the plant a quarter turn clockwise to ensure even growth on all sides.`,
        `I've noticed that the humidity around ${plant.name} is slightly lower than ideal. Consider misting occasionally or placing a small humidifier nearby to increase humidity levels, which would benefit this tropical species.`,
        `The current temperature of ${plant.digitalTwin.temperature}°C is within the ideal range for your ${plant.species}. Continue maintaining this environment, and your plant should remain healthy.`
      ];
      
      const randomResponse = responses[Math.floor(Math.random() * responses.length)];
      setResponse(randomResponse);
      setIsLoading(false);
    }, 1500);
  };

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogContent className="sm:max-w-[550px]">
        <DialogHeader>
          <DialogTitle>Ask Plant Pal AI</DialogTitle>
          <DialogDescription>
            Ask any question about {plant.name} and our AI assistant will provide personalized advice.
          </DialogDescription>
        </DialogHeader>
        
        <div className="space-y-4">
          <form onSubmit={handleSubmit} className="flex items-end gap-2">
            <div className="flex-1">
              <Textarea 
                placeholder={`E.g., When should I water ${plant.name}?`}
                value={question}
                onChange={(e) => setQuestion(e.target.value)}
                className="h-24"
              />
            </div>
            <Button 
              type="submit" 
              size="icon" 
              className="h-10 w-10"
              disabled={isLoading || !question.trim()}
            >
              {isLoading ? <Loader2 className="h-5 w-5 animate-spin" /> : <SendHorizontal className="h-5 w-5" />}
            </Button>
          </form>
          
          {isLoading && (
            <div className="flex items-center gap-3 p-4 border rounded-md animate-pulse">
              <Loader2 className="h-5 w-5 animate-spin text-muted-foreground" />
              <p className="text-muted-foreground">Analyzing plant data...</p>
            </div>
          )}
          
          {response && (
            <div className="p-4 border rounded-md bg-muted/30">
              <div className="flex items-start gap-3">
                <Bot className="h-5 w-5 mt-0.5 text-plantGreen" />
                <div className="space-y-1">
                  <p className="font-medium text-sm text-plantGreen">Plant Pal AI</p>
                  <p className="text-sm">{response}</p>
                </div>
              </div>
            </div>
          )}
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default AskAIDialog;
