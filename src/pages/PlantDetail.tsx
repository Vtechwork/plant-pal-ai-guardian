
import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useAuth } from '@/context/AuthContext';
import { getPlantById } from '@/services/PlantDataService';
import { Plant } from '@/lib/plant-data';
import PlantProfileScreen from '@/components/PlantProfileScreen';
import Header from '@/components/Header';

const PlantDetail = () => {
  const { plantId } = useParams<{ plantId: string }>();
  const { user } = useAuth();
  const navigate = useNavigate();
  const [plant, setPlant] = useState<Plant | null>(null);
  const [loading, setLoading] = useState(true);
  
  useEffect(() => {
    if (!user) {
      navigate('/login');
      return;
    }
    
    if (!plantId) {
      navigate('/dashboard');
      return;
    }
    
    // Load plant data
    const plantData = getPlantById(user.id, plantId);
    
    if (!plantData) {
      navigate('/dashboard');
      return;
    }
    
    setPlant(plantData);
    setLoading(false);
  }, [user, plantId, navigate]);
  
  if (loading || !plant) {
    return (
      <div className="min-h-screen bg-background">
        <Header />
        <div className="container py-12 text-center">
          <p>Loading plant details...</p>
        </div>
      </div>
    );
  }
  
  return (
    <div className="min-h-screen bg-background">
      <Header />
      <PlantProfileScreen plant={plant} />
    </div>
  );
};

export default PlantDetail;
