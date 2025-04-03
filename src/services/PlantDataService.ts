
import { Plant, PlantHistory } from "@/lib/plant-data";

// Function to get all plants for a user
export const getUserPlants = (userId: string): Plant[] => {
  const storedPlants = localStorage.getItem(`plant_pal_plants_${userId}`);
  return storedPlants ? JSON.parse(storedPlants) : [];
};

// Function to get a single plant by ID
export const getPlantById = (userId: string, plantId: string): Plant | null => {
  const plants = getUserPlants(userId);
  return plants.find(plant => plant.id === plantId) || null;
};

// Function to save a plant
export const savePlant = (userId: string, plant: Plant): void => {
  const plants = getUserPlants(userId);
  
  const existingPlantIndex = plants.findIndex(p => p.id === plant.id);
  
  if (existingPlantIndex >= 0) {
    // Update existing plant
    plants[existingPlantIndex] = plant;
  } else {
    // Add new plant
    plants.push(plant);
  }
  
  localStorage.setItem(`plant_pal_plants_${userId}`, JSON.stringify(plants));
};

// Function to delete a plant
export const deletePlant = (userId: string, plantId: string): void => {
  const plants = getUserPlants(userId);
  const updatedPlants = plants.filter(plant => plant.id !== plantId);
  localStorage.setItem(`plant_pal_plants_${userId}`, JSON.stringify(plants));
};

// Function to add a history item to a plant
export const addPlantHistoryItem = (
  userId: string, 
  plantId: string, 
  historyItem: PlantHistory
): Plant | null => {
  const plant = getPlantById(userId, plantId);
  
  if (plant) {
    const updatedPlant = {
      ...plant,
      history: [historyItem, ...plant.history]
    };
    
    savePlant(userId, updatedPlant);
    return updatedPlant;
  }
  
  return null;
};

// Function to initialize demo data for a new user
export const initializeUserWithDemoPlant = (userId: string): void => {
  // Check if user already has plants
  const existingPlants = getUserPlants(userId);
  
  if (existingPlants.length === 0) {
    import('@/lib/plant-data').then(({ samplePlant }) => {
      // Create a copy of the sample plant with a unique ID
      const demoPlant = {
        ...samplePlant,
        id: `plant-${Date.now()}`,
        name: "Monty",
        acquiredDate: new Date().toISOString()
      };
      
      savePlant(userId, demoPlant);
    });
  }
};
