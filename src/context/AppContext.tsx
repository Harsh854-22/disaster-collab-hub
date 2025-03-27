
import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { Alert, Resource, Volunteer } from '@/utils/mockData';
import api from '@/services/api';
import { toast } from '@/hooks/use-toast';

interface AppContextType {
  alerts: Alert[];
  resources: Resource[];
  volunteers: Volunteer[];
  isLoading: boolean;
  error: string | null;
  refreshData: () => Promise<void>;
}

const defaultContext: AppContextType = {
  alerts: [],
  resources: [],
  volunteers: [],
  isLoading: false,
  error: null,
  refreshData: async () => {},
};

const AppContext = createContext<AppContextType>(defaultContext);

export const useAppContext = () => useContext(AppContext);

interface AppProviderProps {
  children: ReactNode;
}

export const AppProvider: React.FC<AppProviderProps> = ({ children }) => {
  const [alerts, setAlerts] = useState<Alert[]>([]);
  const [resources, setResources] = useState<Resource[]>([]);
  const [volunteers, setVolunteers] = useState<Volunteer[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  const fetchData = async () => {
    setIsLoading(true);
    setError(null);
    
    try {
      // Fetch all data in parallel
      const [alertsData, resourcesData, volunteersData] = await Promise.all([
        api.alerts.getAll(),
        api.resources.getAll(),
        api.volunteers.getAll(),
      ]);
      
      setAlerts(alertsData);
      setResources(resourcesData);
      setVolunteers(volunteersData);
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : 'Unknown error occurred';
      setError(errorMessage);
      toast({
        title: 'Error loading data',
        description: errorMessage,
        variant: 'destructive',
      });
    } finally {
      setIsLoading(false);
    }
  };

  // Initial data fetch
  useEffect(() => {
    fetchData();
  }, []);

  return (
    <AppContext.Provider
      value={{
        alerts,
        resources,
        volunteers,
        isLoading,
        error,
        refreshData: fetchData,
      }}
    >
      {children}
    </AppContext.Provider>
  );
};
