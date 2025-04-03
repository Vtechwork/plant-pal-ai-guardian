
import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import PlantProfileScreen from "@/components/PlantProfileScreen";
import MarketingPitch from "@/components/MarketingPitch";
import { samplePlant } from "@/lib/plant-data";
import { Button } from "@/components/ui/button";
import { Moon, Sun, LogIn } from "lucide-react";
import { useTheme } from "@/components/ThemeProvider";
import { useAuth } from '@/context/AuthContext';

const Index = () => {
  const { theme, setTheme } = useTheme();
  const { user } = useAuth();
  const navigate = useNavigate();
  
  // Redirect authenticated users to dashboard
  useEffect(() => {
    if (user) {
      navigate('/dashboard');
    }
  }, [user, navigate]);
  
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
          <div className="flex items-center gap-2">
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
            
            <Button onClick={() => navigate('/login')}>
              <LogIn className="mr-2 h-4 w-4" />
              Sign In
            </Button>
          </div>
        </div>
      </header>

      <Tabs defaultValue="marketing" className="container pt-4">
        <TabsList className="mb-4">
          <TabsTrigger value="marketing">About Plant Pal AI</TabsTrigger>
          <TabsTrigger value="demo">Demo Plant Profile</TabsTrigger>
        </TabsList>
        
        <TabsContent value="demo" className="p-0">
          <PlantProfileScreen plant={samplePlant} />
        </TabsContent>
        
        <TabsContent value="marketing">
          <MarketingPitch />
          <div className="text-center mt-8">
            <Button size="lg" onClick={() => navigate('/login')}>
              Get Started
            </Button>
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default Index;
