
import React, { useState } from 'react';
import Layout from '@/components/Layout';
import AlertBanner from '@/components/AlertBanner';
import WeatherAlert from '@/components/WeatherAlert';
import EmergencyContacts from '@/components/EmergencyContacts';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { DisasterType, EmergencyLevel, mockAlerts, mockEmergencyContacts, mockWeatherAlerts } from '@/utils/mockData';
import { Search, Bell, CloudRain, Phone, Filter, AlertTriangle, CheckCircle2, Info } from 'lucide-react';
import { Badge } from '@/components/ui/badge';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { useToast } from '@/hooks/use-toast';
import { cn } from '@/lib/utils';

const AlertsPage = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [levelFilter, setLevelFilter] = useState<EmergencyLevel | 'all'>('all');
  const [typeFilter, setTypeFilter] = useState<DisasterType | 'all'>('all');
  const [activeTab, setActiveTab] = useState('emergency');
  const { toast } = useToast();

  // Filter alerts based on search and filters
  const filteredAlerts = mockAlerts.filter((alert) => {
    // Filter by search term
    const matchesSearch = searchTerm === '' || 
      alert.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      alert.description.toLowerCase().includes(searchTerm.toLowerCase());
    
    // Filter by level
    const matchesLevel = levelFilter === 'all' || alert.level === levelFilter;
    
    // Filter by type
    const matchesType = typeFilter === 'all' || alert.disasterType === typeFilter;
    
    return matchesSearch && matchesLevel && matchesType;
  });

  // Filter weather alerts
  const filteredWeatherAlerts = mockWeatherAlerts.filter((alert) => {
    return searchTerm === '' || 
      alert.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      alert.description.toLowerCase().includes(searchTerm.toLowerCase());
  });

  const handleReportAlert = () => {
    toast({
      title: "Report Alert",
      description: "This feature will be available soon!",
    });
  };

  const handleViewOnMap = () => {
    toast({
      title: "View on Map",
      description: "Showing alert on map...",
    });
  };

  // Get severity badge color
  const getSeverityBadge = (level: EmergencyLevel) => {
    switch (level) {
      case 'critical':
        return (
          <Badge className="bg-emergency-50 text-emergency-700 border-emergency-200">
            <AlertTriangle className="mr-1 h-3 w-3" />
            Critical
          </Badge>
        );
      case 'high':
        return (
          <Badge className="bg-warning-50 text-warning-700 border-warning-200">
            <AlertTriangle className="mr-1 h-3 w-3" />
            High
          </Badge>
        );
      case 'medium':
        return (
          <Badge className="bg-info-50 text-info-700 border-info-200">
            <Info className="mr-1 h-3 w-3" />
            Medium
          </Badge>
        );
      case 'low':
        return (
          <Badge className="bg-success-50 text-success-700 border-success-200">
            <CheckCircle2 className="mr-1 h-3 w-3" />
            Low
          </Badge>
        );
      default:
        return <Badge>Unknown</Badge>;
    }
  };

  return (
    <Layout>
      <div className="space-y-6 animate-fade-in">
        <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center gap-4">
          <div>
            <h1 className="text-3xl font-bold tracking-tight">Alerts & Warnings</h1>
            <p className="text-muted-foreground mt-1">Stay informed about emergency situations</p>
          </div>
          <Button onClick={handleReportAlert} className="sm:self-start">
            <Bell className="mr-2 h-4 w-4" />
            Report Alert
          </Button>
        </div>
        
        <div className="flex flex-col sm:flex-row gap-3">
          <div className="relative flex-1">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground h-4 w-4" />
            <Input
              placeholder="Search alerts..."
              className="pl-10"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
          <div className="flex gap-3">
            <Select value={levelFilter} onValueChange={(value) => setLevelFilter(value as EmergencyLevel | 'all')}>
              <SelectTrigger className="w-[140px]">
                <SelectValue placeholder="Severity" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Levels</SelectItem>
                <SelectItem value="critical">Critical</SelectItem>
                <SelectItem value="high">High</SelectItem>
                <SelectItem value="medium">Medium</SelectItem>
                <SelectItem value="low">Low</SelectItem>
              </SelectContent>
            </Select>
            
            <Select value={typeFilter} onValueChange={(value) => setTypeFilter(value as DisasterType | 'all')}>
              <SelectTrigger className="w-[140px]">
                <SelectValue placeholder="Type" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Types</SelectItem>
                <SelectItem value="flood">Flood</SelectItem>
                <SelectItem value="earthquake">Earthquake</SelectItem>
                <SelectItem value="tsunami">Tsunami</SelectItem>
                <SelectItem value="fire">Fire</SelectItem>
                <SelectItem value="hurricane">Hurricane</SelectItem>
                <SelectItem value="other">Other</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>
        
        <Tabs 
          defaultValue="emergency" 
          value={activeTab} 
          onValueChange={setActiveTab}
          className="w-full"
        >
          <TabsList className="grid w-full grid-cols-3">
            <TabsTrigger value="emergency" className="flex items-center gap-2">
              <Bell className="h-4 w-4" />
              <span>Emergency</span>
            </TabsTrigger>
            <TabsTrigger value="weather" className="flex items-center gap-2">
              <CloudRain className="h-4 w-4" />
              <span>Weather</span>
            </TabsTrigger>
            <TabsTrigger value="contacts" className="flex items-center gap-2">
              <Phone className="h-4 w-4" />
              <span>Contacts</span>
            </TabsTrigger>
          </TabsList>
          
          <TabsContent value="emergency" className="pt-6">
            {filteredAlerts.length > 0 ? (
              <div className="space-y-4">
                {filteredAlerts.map((alert) => (
                  <Card key={alert.id} className={cn(
                    "w-full overflow-hidden transition-all",
                    alert.level === 'critical' && "border-emergency-200",
                    alert.level === 'high' && "border-warning-200",
                    alert.level === 'medium' && "border-info-200",
                    alert.level === 'low' && "border-success-200",
                  )}>
                    <CardHeader className="pb-2">
                      <div className="flex justify-between items-start flex-wrap gap-2">
                        {getSeverityBadge(alert.level)}
                        <Badge variant="outline" className="capitalize">
                          {alert.disasterType}
                        </Badge>
                      </div>
                      <CardTitle className="text-lg mt-2">{alert.title}</CardTitle>
                    </CardHeader>
                    <CardContent className="pb-4">
                      <CardDescription className="text-base text-foreground mb-4">
                        {alert.description}
                      </CardDescription>
                      
                      <div className="flex items-center text-sm text-muted-foreground mb-4">
                        <Clock className="mr-2 h-4 w-4" />
                        {new Date(alert.timestamp).toLocaleString()}
                        
                        {alert.location.address && (
                          <>
                            <span className="mx-2">•</span>
                            <MapPin className="mr-1 h-4 w-4" />
                            {alert.location.address}
                          </>
                        )}
                        
                        <span className="mx-2">•</span>
                        <Badge variant="outline" className="capitalize">
                          {alert.source}
                        </Badge>
                      </div>
                      
                      <div className="flex justify-end">
                        <Button variant="outline" size="sm" onClick={handleViewOnMap}>
                          <MapPin className="mr-2 h-4 w-4" />
                          View on Map
                        </Button>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            ) : (
              <div className="text-center py-12">
                <Bell className="mx-auto h-12 w-12 text-muted-foreground" />
                <h3 className="mt-4 text-lg font-medium">No alerts found</h3>
                <p className="mt-2 text-muted-foreground">
                  Try adjusting your search or filters.
                </p>
              </div>
            )}
          </TabsContent>
          
          <TabsContent value="weather" className="pt-6">
            <div className="space-y-4">
              {filteredWeatherAlerts.length > 0 ? (
                filteredWeatherAlerts.map((alert) => (
                  <WeatherAlert 
                    key={alert.id} 
                    alert={alert}
                    onViewOnMap={handleViewOnMap}
                  />
                ))
              ) : (
                <div className="text-center py-12">
                  <CloudRain className="mx-auto h-12 w-12 text-muted-foreground" />
                  <h3 className="mt-4 text-lg font-medium">No weather alerts found</h3>
                  <p className="mt-2 text-muted-foreground">
                    There are currently no weather alerts in your area.
                  </p>
                </div>
              )}
            </div>
          </TabsContent>
          
          <TabsContent value="contacts" className="pt-6">
            <EmergencyContacts contacts={mockEmergencyContacts} />
          </TabsContent>
        </Tabs>
      </div>
    </Layout>
  );
};

// Missing component import
const Clock = ({ className, ...props }: React.ComponentProps<typeof Bell>) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width="24"
    height="24"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
    className={cn('lucide lucide-clock', className)}
    {...props}
  >
    <circle cx="12" cy="12" r="10" />
    <polyline points="12 6 12 12 16 14" />
  </svg>
);

export default AlertsPage;
