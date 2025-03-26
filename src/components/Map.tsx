
import React, { useEffect, useRef, useState } from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Badge } from '@/components/ui/badge';
import { Alert, Resource, WeatherAlert } from '@/utils/mockData';
import { Map as MapIcon, Layers, AlertTriangle, Droplets, Home, Package, User, X } from 'lucide-react';
import { cn } from '@/lib/utils';

// This is a mock map component since we can't use real maps without APIs
// In a real app, you would integrate with Google Maps, Mapbox, etc.

interface MapProps {
  className?: string;
  initialCenter?: { lat: number; lng: number };
  initialZoom?: number;
}

interface MapItem {
  id: string;
  type: 'alert' | 'resource' | 'weather' | 'volunteer';
  position: { lat: number; lng: number };
  title: string;
  description?: string;
  icon?: React.ReactNode;
  color?: string;
}

const Map: React.FC<MapProps> = ({ 
  className,
  initialCenter = { lat: 34.052235, lng: -118.243683 },
  initialZoom = 13
}) => {
  const mapRef = useRef<HTMLDivElement>(null);
  const [selectedItem, setSelectedItem] = useState<MapItem | null>(null);
  const [mapItems, setMapItems] = useState<MapItem[]>([]);
  const [activeLayers, setActiveLayers] = useState<string[]>(['alerts', 'resources', 'weather']);
  const [isInfoOpen, setIsInfoOpen] = useState(false);

  // Mock map data generation
  useEffect(() => {
    // In a real app, this would come from your backend or a map API
    const mockMapItems: MapItem[] = [
      // Alerts
      {
        id: 'alert-1',
        type: 'alert',
        position: { lat: 34.052235, lng: -118.243683 },
        title: 'Flash Flood Warning',
        description: 'Heavy rainfall causing rapid flooding in low-lying areas.',
        icon: <AlertTriangle size={18} />,
        color: '#ef4444' // red
      },
      {
        id: 'alert-2',
        type: 'alert',
        position: { lat: 34.055235, lng: -118.253683 },
        title: 'Family Trapped',
        description: 'Family of 4 trapped on roof, needs boat rescue.',
        icon: <AlertTriangle size={18} />,
        color: '#ef4444' // red
      },
      // Resources
      {
        id: 'resource-1',
        type: 'resource',
        position: { lat: 34.052235, lng: -118.243683 },
        title: 'Drinking Water Distribution',
        description: 'Bottled water available for pickup. 2 cases per family.',
        icon: <Droplets size={18} />,
        color: '#3b82f6' // blue
      },
      {
        id: 'resource-2',
        type: 'resource',
        position: { lat: 34.055235, lng: -118.243683 },
        title: 'Temporary Shelter',
        description: 'Gymnasium open for emergency shelter. Cots and blankets available.',
        icon: <Home size={18} />,
        color: '#3b82f6' // blue
      },
      {
        id: 'resource-3',
        type: 'resource',
        position: { lat: 34.056235, lng: -118.249683 },
        title: 'Medical Station',
        description: 'First aid, medication refills, and basic medical care.',
        icon: <Package size={18} />,
        color: '#3b82f6' // blue
      },
      // Weather alerts
      {
        id: 'weather-1',
        type: 'weather',
        position: { lat: 34.052235, lng: -118.243683 },
        title: 'Flash Flood Warning',
        description: 'Heavy rainfall expected to continue for next 12 hours.',
        icon: <Droplets size={18} />,
        color: '#f59e0b' // amber
      },
      // Volunteers
      {
        id: 'volunteer-1',
        type: 'volunteer',
        position: { lat: 34.052235, lng: -118.243683 },
        title: 'Alex Johnson',
        description: 'Medical, Rescue',
        icon: <User size={18} />,
        color: '#22c55e' // green
      },
      {
        id: 'volunteer-2',
        type: 'volunteer',
        position: { lat: 34.058235, lng: -118.253683 },
        title: 'Sam Rodriguez',
        description: 'Transport, Construction',
        icon: <User size={18} />,
        color: '#22c55e' // green
      },
    ];

    setMapItems(mockMapItems);
  }, []);

  const filteredMapItems = mapItems.filter(item => {
    if (item.type === 'alert' && activeLayers.includes('alerts')) return true;
    if (item.type === 'resource' && activeLayers.includes('resources')) return true;
    if (item.type === 'weather' && activeLayers.includes('weather')) return true;
    if (item.type === 'volunteer' && activeLayers.includes('volunteers')) return true;
    return false;
  });

  const toggleLayer = (layer: string) => {
    if (activeLayers.includes(layer)) {
      setActiveLayers(activeLayers.filter(l => l !== layer));
    } else {
      setActiveLayers([...activeLayers, layer]);
    }
  };

  const handleMarkerClick = (item: MapItem) => {
    setSelectedItem(item);
    setIsInfoOpen(true);
  };

  const closeInfo = () => {
    setIsInfoOpen(false);
    setSelectedItem(null);
  };

  // This would be replaced with actual map rendering logic
  return (
    <div className={cn("relative w-full h-[70vh] lg:h-[80vh] rounded-lg overflow-hidden bg-accent", className)}>
      {/* Mock Map */}
      <div ref={mapRef} className="w-full h-full bg-[#f8f8f8] relative">
        {/* Map UI would go here in a real implementation */}
        <div className="absolute inset-0 bg-[url('https://developers.google.com/static/maps/documentation/places/web-service/overview/images/maps.png')] bg-cover bg-center opacity-40"></div>
        
        {/* Mock Markers */}
        <div className="absolute inset-0 pointer-events-none">
          {filteredMapItems.map((item) => (
            <div 
              key={item.id}
              className="absolute transform -translate-x-1/2 -translate-y-1/2 cursor-pointer pointer-events-auto"
              style={{ 
                left: `${Math.random() * 80 + 10}%`, 
                top: `${Math.random() * 80 + 10}%` 
              }}
              onClick={() => handleMarkerClick(item)}
            >
              <div 
                className={cn(
                  "flex items-center justify-center w-8 h-8 rounded-full text-white animate-pulse-subtle",
                )}
                style={{ backgroundColor: item.color }}
              >
                {item.icon}
              </div>
            </div>
          ))}
        </div>
        
        {/* Map Controls */}
        <div className="absolute top-4 right-4 z-10 flex flex-col gap-2">
          <Card className="w-auto bg-card/80 backdrop-blur-sm border-border/50">
            <CardContent className="p-2">
              <div className="flex gap-2">
                <Button 
                  size="icon" 
                  variant={activeLayers.includes('alerts') ? "default" : "outline"} 
                  onClick={() => toggleLayer('alerts')}
                  className="w-8 h-8"
                >
                  <AlertTriangle size={16} />
                </Button>
                <Button 
                  size="icon" 
                  variant={activeLayers.includes('resources') ? "default" : "outline"} 
                  onClick={() => toggleLayer('resources')}
                  className="w-8 h-8"
                >
                  <Package size={16} />
                </Button>
                <Button 
                  size="icon" 
                  variant={activeLayers.includes('weather') ? "default" : "outline"} 
                  onClick={() => toggleLayer('weather')}
                  className="w-8 h-8"
                >
                  <Droplets size={16} />
                </Button>
                <Button 
                  size="icon" 
                  variant={activeLayers.includes('volunteers') ? "default" : "outline"} 
                  onClick={() => toggleLayer('volunteers')}
                  className="w-8 h-8"
                >
                  <User size={16} />
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>
        
        {/* Info Panel */}
        <div 
          className={cn(
            "absolute bottom-0 left-0 right-0 max-h-1/2 transform transition-transform duration-300 ease-in-out z-20",
            isInfoOpen ? "translate-y-0" : "translate-y-full"
          )}
        >
          <Card className="rounded-b-none rounded-t-lg bg-card/90 backdrop-blur-sm border-t border-x border-border/50">
            <div className="flex justify-between items-center p-4 border-b">
              <div className="flex items-center">
                {selectedItem && (
                  <>
                    <div 
                      className="w-8 h-8 rounded-full flex items-center justify-center text-white mr-3"
                      style={{ backgroundColor: selectedItem.color }}
                    >
                      {selectedItem.icon}
                    </div>
                    <h3 className="font-medium">{selectedItem.title}</h3>
                  </>
                )}
              </div>
              <Button variant="ghost" size="icon" onClick={closeInfo}>
                <X size={18} />
              </Button>
            </div>
            <CardContent className="p-4">
              {selectedItem && (
                <div>
                  <Badge className="mb-2 capitalize">{selectedItem.type}</Badge>
                  <p className="text-sm text-muted-foreground">{selectedItem.description}</p>
                  
                  <div className="mt-4 flex justify-end gap-2">
                    <Button size="sm" variant="outline">Get Directions</Button>
                    <Button size="sm">More Details</Button>
                  </div>
                </div>
              )}
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default Map;
