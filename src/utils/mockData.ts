
// Types for our app
export type EmergencyLevel = 'critical' | 'high' | 'medium' | 'low';
export type DisasterType = 'flood' | 'earthquake' | 'tsunami' | 'fire' | 'hurricane' | 'other';
export type ResourceType = 'water' | 'food' | 'shelter' | 'medical' | 'clothing' | 'transportation' | 'other';
export type VolunteerSkill = 'medical' | 'rescue' | 'transport' | 'cooking' | 'construction' | 'coordination' | 'communication' | 'other';

export interface Alert {
  id: string;
  title: string;
  description: string;
  level: EmergencyLevel;
  disasterType: DisasterType;
  timestamp: Date;
  location: {
    lat: number;
    lng: number;
    address?: string;
  };
  source: 'official' | 'user' | 'system';
}

export interface Resource {
  id: string;
  name: string;
  type: ResourceType;
  description: string;
  quantity?: number;
  location: {
    lat: number;
    lng: number;
    address: string;
  };
  contactName: string;
  contactPhone?: string;
  timestamp: Date;
  verified: boolean;
}

export interface EmergencyContact {
  id: string;
  name: string;
  description?: string;
  phone: string;
  address?: string;
  website?: string;
  category: 'police' | 'fire' | 'medical' | 'ngo' | 'government' | 'other';
}

export interface Volunteer {
  id: string;
  name: string;
  phone: string;
  email?: string;
  skills: VolunteerSkill[];
  availability: {
    startDate: Date;
    endDate?: Date;
    allDay: boolean;
  };
  location?: {
    lat: number;
    lng: number;
    address?: string;
  };
  verified: boolean;
}

export interface WeatherAlert {
  id: string;
  type: 'storm' | 'flood' | 'heat' | 'cold' | 'wind' | 'other';
  severity: EmergencyLevel;
  title: string;
  description: string;
  startTime: Date;
  endTime?: Date;
  affectedArea: {
    name: string;
    center: {
      lat: number;
      lng: number;
    };
    radius?: number; // in kilometers
  };
}

// Mock data
export const mockAlerts: Alert[] = [
  {
    id: '1',
    title: 'Flash Flood Warning',
    description: 'Heavy rainfall causing rapid flooding in low-lying areas. Seek higher ground immediately.',
    level: 'critical',
    disasterType: 'flood',
    timestamp: new Date(Date.now() - 1000 * 60 * 30), // 30 minutes ago
    location: {
      lat: 34.052235,
      lng: -118.243683,
      address: 'Los Angeles, CA'
    },
    source: 'official'
  },
  {
    id: '2',
    title: 'Road Closure',
    description: 'Main Street bridge collapsed due to flooding. Use alternate routes.',
    level: 'high',
    disasterType: 'flood',
    timestamp: new Date(Date.now() - 1000 * 60 * 120), // 2 hours ago
    location: {
      lat: 34.052235,
      lng: -118.243683,
      address: 'Los Angeles, CA'
    },
    source: 'official'
  },
  {
    id: '3',
    title: 'Family Trapped',
    description: 'Family of 4 trapped on roof near River Road and 5th Street. Need boat rescue.',
    level: 'critical',
    disasterType: 'flood',
    timestamp: new Date(Date.now() - 1000 * 60 * 45), // 45 minutes ago
    location: {
      lat: 34.055235,
      lng: -118.253683,
    },
    source: 'user'
  }
];

export const mockResources: Resource[] = [
  {
    id: '1',
    name: 'Drinking Water Distribution',
    type: 'water',
    description: 'Bottled water available for pickup. 2 cases per family.',
    quantity: 200,
    location: {
      lat: 34.052235,
      lng: -118.243683,
      address: 'Community Center, 123 Main St, Los Angeles, CA'
    },
    contactName: 'Relief Coordinator',
    contactPhone: '555-123-4567',
    timestamp: new Date(Date.now() - 1000 * 60 * 60 * 3), // 3 hours ago
    verified: true
  },
  {
    id: '2',
    name: 'Temporary Shelter',
    type: 'shelter',
    description: 'Gymnasium open for emergency shelter. Cots and blankets available.',
    location: {
      lat: 34.055235,
      lng: -118.243683,
      address: 'Central High School, 500 Education Blvd, Los Angeles, CA'
    },
    contactName: 'Shelter Manager',
    contactPhone: '555-987-6543',
    timestamp: new Date(Date.now() - 1000 * 60 * 60 * 5), // 5 hours ago
    verified: true
  },
  {
    id: '3',
    name: 'Medical Station',
    type: 'medical',
    description: 'First aid, medication refills, and basic medical care available.',
    location: {
      lat: 34.056235,
      lng: -118.249683,
      address: 'Urgent Care Clinic, 789 Health Ave, Los Angeles, CA'
    },
    contactName: 'Dr. Rivera',
    contactPhone: '555-111-2222',
    timestamp: new Date(Date.now() - 1000 * 60 * 60 * 2), // 2 hours ago
    verified: true
  }
];

export const mockEmergencyContacts: EmergencyContact[] = [
  {
    id: '1',
    name: 'City Police Department',
    description: 'Emergency police services',
    phone: '911',
    address: '123 Safety Blvd, Los Angeles, CA',
    website: 'https://police.example.gov',
    category: 'police'
  },
  {
    id: '2',
    name: 'Fire & Rescue',
    description: 'Fire and rescue services',
    phone: '911',
    address: '456 Rescue Lane, Los Angeles, CA',
    website: 'https://fire.example.gov',
    category: 'fire'
  },
  {
    id: '3',
    name: 'General Hospital',
    description: '24/7 emergency medical services',
    phone: '555-111-2222',
    address: '789 Health Ave, Los Angeles, CA',
    website: 'https://hospital.example.org',
    category: 'medical'
  },
  {
    id: '4',
    name: 'Red Cross Local Chapter',
    description: 'Disaster relief and assistance',
    phone: '555-333-4444',
    address: '101 Helping Way, Los Angeles, CA',
    website: 'https://redcross.example.org',
    category: 'ngo'
  },
  {
    id: '5',
    name: 'FEMA Regional Office',
    description: 'Federal disaster assistance',
    phone: '555-555-6666',
    address: '202 Federal Blvd, Los Angeles, CA',
    website: 'https://fema.example.gov',
    category: 'government'
  }
];

export const mockWeatherAlerts: WeatherAlert[] = [
  {
    id: '1',
    type: 'flood',
    severity: 'high',
    title: 'Flash Flood Warning',
    description: 'Heavy rainfall expected to continue for next 12 hours. Potential for flash flooding in low-lying areas.',
    startTime: new Date(),
    endTime: new Date(Date.now() + 1000 * 60 * 60 * 12), // 12 hours from now
    affectedArea: {
      name: 'Los Angeles County',
      center: {
        lat: 34.052235,
        lng: -118.243683
      },
      radius: 50
    }
  },
  {
    id: '2',
    type: 'wind',
    severity: 'medium',
    title: 'High Wind Advisory',
    description: 'Winds of 30-40 mph with gusts up to 60 mph expected. Secure loose objects and be cautious when driving.',
    startTime: new Date(),
    endTime: new Date(Date.now() + 1000 * 60 * 60 * 24), // 24 hours from now
    affectedArea: {
      name: 'Coastal Regions',
      center: {
        lat: 34.052235,
        lng: -118.243683
      },
      radius: 30
    }
  }
];

export const mockVolunteers: Volunteer[] = [
  {
    id: '1',
    name: 'Alex Johnson',
    phone: '555-123-4567',
    email: 'alex@example.com',
    skills: ['medical', 'rescue'],
    availability: {
      startDate: new Date(),
      endDate: new Date(Date.now() + 1000 * 60 * 60 * 24 * 7), // 7 days from now
      allDay: true
    },
    location: {
      lat: 34.052235,
      lng: -118.243683,
      address: 'Los Angeles, CA'
    },
    verified: true
  },
  {
    id: '2',
    name: 'Sam Rodriguez',
    phone: '555-987-6543',
    email: 'sam@example.com',
    skills: ['transport', 'construction'],
    availability: {
      startDate: new Date(),
      endDate: new Date(Date.now() + 1000 * 60 * 60 * 24 * 3), // 3 days from now
      allDay: false
    },
    location: {
      lat: 34.058235,
      lng: -118.253683,
      address: 'Pasadena, CA'
    },
    verified: true
  },
  {
    id: '3',
    name: 'Jordan Lee',
    phone: '555-456-7890',
    email: 'jordan@example.com',
    skills: ['cooking', 'coordination'],
    availability: {
      startDate: new Date(),
      endDate: new Date(Date.now() + 1000 * 60 * 60 * 24 * 5), // 5 days from now
      allDay: true
    },
    location: {
      lat: 34.051235,
      lng: -118.263683,
      address: 'Santa Monica, CA'
    },
    verified: false
  }
];
