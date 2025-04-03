
import React, { useEffect, useState } from 'react';
import { useAuth } from '@/context/AuthContext';
import { getUserPlants, initializeUserWithDemoPlant } from '@/services/PlantDataService';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Plant } from '@/lib/plant-data';
import { Leaf, Plus } from 'lucide-react';
import { Link, useNavigate } from 'react-router-dom';
import Header from '@/components/Header';

const Dashboard = () => {
  const { user } = useAuth();
  const navigate = useNavigate();
  const [plants, setPlants] = useState<Plant[]>([]);
  const [loading, setLoading] = useState(true);
  
  useEffect(() => {
    if (!user) {
      navigate('/login');
      return;
    }
    
    // Initialize new users with demo plant
    initializeUserWithDemoPlant(user.id);
    
    // Load user's plants
    const userPlants = getUserPlants(user.id);
    setPlants(userPlants);
    setLoading(false);
  }, [user, navigate]);
  
  return (
    <div className="min-h-screen bg-background">
      <Header />
      
      <main className="container pt-6 pb-8">
        <div className="flex items-center justify-between mb-6">
          <h1 className="text-2xl font-bold">My Plants</h1>
          
          <Button>
            <Plus className="mr-2 h-4 w-4" /> Add New Plant
          </Button>
        </div>
        
        {loading ? (
          <div className="flex justify-center py-12">
            <p>Loading your plants...</p>
          </div>
        ) : plants.length === 0 ? (
          <div className="text-center py-12">
            <Leaf className="h-12 w-12 mx-auto text-muted-foreground mb-3" />
            <h2 className="text-xl font-medium mb-2">No plants yet</h2>
            <p className="text-muted-foreground mb-6">
              Add your first plant to get started with personalized care
            </p>
            <Button>
              <Plus className="mr-2 h-4 w-4" /> Add Your First Plant
            </Button>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {plants.map(plant => (
              <Link 
                to={`/plants/${plant.id}`} 
                key={plant.id}
                className="block transition-transform hover:scale-[1.01]"
              >
                <Card className="overflow-hidden h-full">
                  <div className="aspect-[4/3] relative">
                    <img 
                      src={plant.imageUrl} 
                      alt={plant.name} 
                      className="w-full h-full object-cover"
                    />
                    <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/70 to-transparent p-4">
                      <h3 className="text-xl font-bold text-white">{plant.name}</h3>
                      <p className="text-white/80 text-sm">{plant.species}</p>
                    </div>
                  </div>
                  
                  <CardContent className="p-4">
                    <div className="flex justify-between items-center">
                      <div>
                        <p className="text-sm text-muted-foreground">Health</p>
                        <div className="flex items-center">
                          <div className="h-2 w-24 bg-background rounded-full overflow-hidden">
                            <div 
                              className={`h-full ${plant.digitalTwin.healthIndex > 80 ? "bg-green-500" : plant.digitalTwin.healthIndex > 50 ? "bg-yellow-500" : "bg-red-500"}`}
                              style={{ width: `${plant.digitalTwin.healthIndex}%` }}
                            />
                          </div>
                          <span className="ml-2 text-sm font-medium">{plant.digitalTwin.healthIndex}%</span>
                        </div>
                      </div>
                      
                      <div className="text-right">
                        <p className="text-sm text-muted-foreground">Water in</p>
                        <p className="font-medium">
                          {plant.careTips.find(tip => tip.title.includes("Water"))?.dueIn ?? "?"} days
                        </p>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </Link>
            ))}
          </div>
        )}
      </main>
    </div>
  );
};

export default Dashboard;
