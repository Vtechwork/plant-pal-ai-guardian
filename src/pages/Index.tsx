
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import PlantProfileScreen from "@/components/PlantProfileScreen";
import MarketingPitch from "@/components/MarketingPitch";
import { samplePlant } from "@/lib/plant-data";
import { Button } from "@/components/ui/button";
import { Moon, Sun } from "lucide-react";
import { useTheme } from "@/components/ThemeProvider";

const Index = () => {
  const { theme, setTheme } = useTheme();
  
  const toggleTheme = () => {
    setTheme(theme === "dark" ? "light" : "dark");
  };
  
  return (
    <div className="min-h-screen bg-background">
      <header className="border-b bg-card py-4">
        <div className="container flex items-center justify-between">
          <h1 className="text-xl font-bold text-plantGreen flex items-center">
            <span className="mr-2">🌿</span>
            Plant Pal AI
          </h1>
          <Button 
            variant="ghost" 
            size="icon" 
            onClick={toggleTheme}
            className="rounded-full"
          >
            {theme === "dark" ? (
              <Sun className="h-5 w-5" />
            ) : (
              <Moon className="h-5 w-5" />
            )}
          </Button>
        </div>
      </header>

      <Tabs defaultValue="demo" className="container pt-4">
        <TabsList className="mb-4">
          <TabsTrigger value="demo">Demo Plant Profile</TabsTrigger>
          <TabsTrigger value="marketing">About Plant Pal AI</TabsTrigger>
        </TabsList>
        
        <TabsContent value="demo" className="p-0">
          <PlantProfileScreen plant={samplePlant} />
        </TabsContent>
        
        <TabsContent value="marketing">
          <MarketingPitch />
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default Index;
