export interface CareTip {
  id: string;
  title: string;
  description: string;
  isUrgent: boolean;
  dueIn?: number; // days
}

export interface PlantHistory {
  id: string;
  date: string;
  type: "watering" | "fertilizing" | "repotting" | "photo" | "note";
  details: string;
  imageUrl?: string;
}

export interface PlantDigitalTwin {
  soilMoisture: number; // 0-100
  lightExposure: number; // 0-100
  temperature: number; // in Celsius
  humidity: number; // 0-100
  healthIndex: number; // 0-100
  lastUpdated: string;
}

export interface Plant {
  id: string;
  name: string;
  species: string;
  imageUrl: string;
  location: string;
  acquiredDate: string;
  digitalTwin: PlantDigitalTwin;
  history: PlantHistory[];
  careTips: CareTip[];
  idealConditions: {
    minLight: number;
    maxLight: number;
    minMoisture: number;
    maxMoisture: number;
    minTemperature: number;
    maxTemperature: number;
    minHumidity: number;
    maxHumidity: number;
  };
}

// Sample data for our demo
export const samplePlant: Plant = {
  id: "plant-001",
  name: "Monty",
  species: "Monstera Deliciosa",
  imageUrl: "/lovable-uploads/2d33b654-f6c8-43b4-b276-b6f9c4d3666b.png", // Updated with uploaded image
  location: "Living Room - North Window",
  acquiredDate: "2023-08-15",
  digitalTwin: {
    soilMoisture: 42,
    lightExposure: 68,
    temperature: 22,
    humidity: 55,
    healthIndex: 87,
    lastUpdated: "2023-11-12T14:23:00Z"
  },
  history: [
    {
      id: "hist-001",
      date: "2023-11-09T08:15:00Z",
      type: "watering",
      details: "300ml of filtered water"
    },
    {
      id: "hist-002",
      date: "2023-11-04T16:30:00Z",
      type: "fertilizing",
      details: "5ml of liquid fertilizer diluted in water"
    },
    {
      id: "hist-003",
      date: "2023-11-01T10:00:00Z",
      type: "photo",
      imageUrl: "/lovable-uploads/63ec1502-1bc0-43db-b999-2b3bb740fdba.png" // Updated with uploaded image
    },
    {
      id: "hist-004",
      date: "2023-10-25T09:00:00Z",
      type: "watering",
      details: "250ml of filtered water"
    }
  ],
  careTips: [
    {
      id: "tip-001",
      title: "Water soon",
      description: "Soil moisture is getting low. Water with 300ml in the next 2 days.",
      isUrgent: false,
      dueIn: 2
    },
    {
      id: "tip-002",
      title: "Rotate plant",
      description: "To ensure even growth, rotate your Monstera a quarter turn clockwise.",
      isUrgent: false,
      dueIn: 5
    },
    {
      id: "tip-003",
      title: "Increase humidity",
      description: "Monstera would benefit from slightly higher humidity. Consider misting or a small humidifier.",
      isUrgent: false
    }
  ],
  idealConditions: {
    minLight: 60,
    maxLight: 80,
    minMoisture: 40,
    maxMoisture: 70,
    minTemperature: 18,
    maxTemperature: 30,
    minHumidity: 50,
    maxHumidity: 70
  }
};

// Helper function to format date strings
export function formatDate(dateString: string): string {
  const date = new Date(dateString);
  return date.toLocaleDateString('en-US', {
    day: 'numeric',
    month: 'short',
    year: 'numeric'
  });
}

// Helper function to format date with time
export function formatDateTime(dateString: string): string {
  const date = new Date(dateString);
  return date.toLocaleDateString('en-US', {
    day: 'numeric',
    month: 'short',
    year: 'numeric',
    hour: '2-digit',
    minute: '2-digit'
  });
}
