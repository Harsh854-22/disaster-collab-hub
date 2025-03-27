
import { Alert, Resource, EmergencyContact, Volunteer, WeatherAlert } from '@/utils/mockData';

// Base API URL for our backend - would be configured based on environment
const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:3000/api';

// Type for API response
interface ApiResponse<T> {
  data: T;
  status: number;
  message?: string;
}

// Error handler
const handleApiError = async (response: Response) => {
  const errorData = await response.json();
  throw new Error(errorData.message || 'An unknown error occurred');
};

// Generic fetch function
const fetchApi = async <T>(endpoint: string, options?: RequestInit): Promise<ApiResponse<T>> => {
  try {
    const response = await fetch(`${API_URL}${endpoint}`, {
      ...options,
      headers: {
        'Content-Type': 'application/json',
        ...options?.headers,
      },
    });

    if (!response.ok) {
      return handleApiError(response);
    }

    const data = await response.json();
    return { data, status: response.status };
  } catch (error) {
    console.error('API Error:', error);
    throw error;
  }
};

// API functions for resources
export const resourcesApi = {
  getAll: async (): Promise<Resource[]> => {
    // For now, return mock data
    return Promise.resolve(await import('@/utils/mockData').then(m => m.mockResources));
    // When backend is ready:
    // const response = await fetchApi<Resource[]>('/resources');
    // return response.data;
  },
  
  getById: async (id: string): Promise<Resource> => {
    // For now, look up in mock data
    const resources = await import('@/utils/mockData').then(m => m.mockResources);
    const resource = resources.find(r => r.id === id);
    if (!resource) throw new Error('Resource not found');
    return Promise.resolve(resource);
    // When backend is ready:
    // const response = await fetchApi<Resource>(`/resources/${id}`);
    // return response.data;
  },
  
  create: async (resource: Omit<Resource, 'id'>): Promise<Resource> => {
    // For now, just mock a response
    return Promise.resolve({
      ...resource,
      id: Math.random().toString(36).substring(2, 9),
    } as Resource);
    // When backend is ready:
    // const response = await fetchApi<Resource>('/resources', {
    //   method: 'POST',
    //   body: JSON.stringify(resource),
    // });
    // return response.data;
  },
  
  update: async (id: string, resource: Partial<Resource>): Promise<Resource> => {
    // For now, mock update
    return Promise.resolve({
      ...resource,
      id,
    } as Resource);
    // When backend is ready:
    // const response = await fetchApi<Resource>(`/resources/${id}`, {
    //   method: 'PUT',
    //   body: JSON.stringify(resource),
    // });
    // return response.data;
  },
  
  delete: async (id: string): Promise<void> => {
    // For now, do nothing
    return Promise.resolve();
    // When backend is ready:
    // await fetchApi(`/resources/${id}`, {
    //   method: 'DELETE',
    // });
  },
};

// Similar API functions for alerts
export const alertsApi = {
  getAll: async (): Promise<Alert[]> => {
    return Promise.resolve(await import('@/utils/mockData').then(m => m.mockAlerts));
  },
  
  getById: async (id: string): Promise<Alert> => {
    const alerts = await import('@/utils/mockData').then(m => m.mockAlerts);
    const alert = alerts.find(a => a.id === id);
    if (!alert) throw new Error('Alert not found');
    return Promise.resolve(alert);
  },
  
  create: async (alert: Omit<Alert, 'id'>): Promise<Alert> => {
    return Promise.resolve({
      ...alert,
      id: Math.random().toString(36).substring(2, 9),
    } as Alert);
  },
  
  update: async (id: string, alert: Partial<Alert>): Promise<Alert> => {
    return Promise.resolve({
      ...alert,
      id,
    } as Alert);
  },
  
  delete: async (id: string): Promise<void> => {
    return Promise.resolve();
  },
};

// API functions for volunteers
export const volunteersApi = {
  getAll: async (): Promise<Volunteer[]> => {
    return Promise.resolve(await import('@/utils/mockData').then(m => m.mockVolunteers));
  },
  
  register: async (volunteer: Omit<Volunteer, 'id' | 'verified'>): Promise<Volunteer> => {
    return Promise.resolve({
      ...volunteer,
      id: Math.random().toString(36).substring(2, 9),
      verified: false,
    } as Volunteer);
  },
};

// API functions for emergency contacts
export const contactsApi = {
  getAll: async (): Promise<EmergencyContact[]> => {
    return Promise.resolve(await import('@/utils/mockData').then(m => m.mockEmergencyContacts));
  },
};

// API functions for weather alerts
export const weatherApi = {
  getAlerts: async (): Promise<WeatherAlert[]> => {
    return Promise.resolve(await import('@/utils/mockData').then(m => m.mockWeatherAlerts));
  },
};

export default {
  resources: resourcesApi,
  alerts: alertsApi,
  volunteers: volunteersApi,
  contacts: contactsApi,
  weather: weatherApi,
};
