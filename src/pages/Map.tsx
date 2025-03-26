
import React from 'react';
import Layout from '@/components/Layout';
import Map from '@/components/Map';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { AlertTriangle, Droplets, Package, Users, Info } from 'lucide-react';

const MapPage = () => {
  return (
    <Layout>
      <div className="space-y-6 animate-fade-in">
        <div className="flex flex-col gap-2">
          <h1 className="text-3xl font-bold tracking-tight">Disaster Map</h1>
          <p className="text-muted-foreground">
            View real-time information about alerts, resources, and volunteer locations.
          </p>
        </div>
        
        <Tabs defaultValue="map" className="w-full">
          <TabsList className="grid w-full grid-cols-2 lg:w-auto lg:grid-cols-4">
            <TabsTrigger value="map" className="flex items-center gap-2">
              <Info className="h-4 w-4" />
              <span className="hidden sm:inline">Overview</span>
            </TabsTrigger>
            <TabsTrigger value="alerts" className="flex items-center gap-2">
              <AlertTriangle className="h-4 w-4" />
              <span className="hidden sm:inline">Alerts</span>
            </TabsTrigger>
            <TabsTrigger value="resources" className="flex items-center gap-2">
              <Package className="h-4 w-4" />
              <span className="hidden sm:inline">Resources</span>
            </TabsTrigger>
            <TabsTrigger value="volunteers" className="flex items-center gap-2">
              <Users className="h-4 w-4" />
              <span className="hidden sm:inline">Volunteers</span>
            </TabsTrigger>
          </TabsList>
          
          <TabsContent value="map" className="pt-4">
            <Card>
              <CardHeader className="pb-3">
                <CardTitle>Overview Map</CardTitle>
                <CardDescription>
                  View all disaster-related information on the map. Click on markers for details.
                </CardDescription>
              </CardHeader>
              <CardContent className="p-0">
                <Map />
              </CardContent>
            </Card>
          </TabsContent>
          
          <TabsContent value="alerts" className="pt-4">
            <Card>
              <CardHeader className="pb-3">
                <CardTitle>Alerts Map</CardTitle>
                <CardDescription>
                  View emergency alerts and warnings in your area.
                </CardDescription>
              </CardHeader>
              <CardContent className="p-0">
                <Map />
              </CardContent>
            </Card>
          </TabsContent>
          
          <TabsContent value="resources" className="pt-4">
            <Card>
              <CardHeader className="pb-3">
                <CardTitle>Resources Map</CardTitle>
                <CardDescription>
                  Find water, food, shelter, and other essential resources near you.
                </CardDescription>
              </CardHeader>
              <CardContent className="p-0">
                <Map />
              </CardContent>
            </Card>
          </TabsContent>
          
          <TabsContent value="volunteers" className="pt-4">
            <Card>
              <CardHeader className="pb-3">
                <CardTitle>Volunteers Map</CardTitle>
                <CardDescription>
                  See where volunteers are available and offering assistance.
                </CardDescription>
              </CardHeader>
              <CardContent className="p-0">
                <Map />
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
        
        <div className="grid gap-6 grid-cols-1 lg:grid-cols-3">
          <Card className="col-span-1">
            <CardHeader className="pb-3 flex flex-row items-center space-y-0 gap-2">
              <div className="h-8 w-8 rounded-full bg-emergency-500/10 flex items-center justify-center text-emergency-500">
                <AlertTriangle className="h-4 w-4" />
              </div>
              <div>
                <CardTitle>Alerts</CardTitle>
                <CardDescription>Emergency notifications</CardDescription>
              </div>
            </CardHeader>
            <CardContent>
              <p className="text-sm">
                Red markers indicate emergency alerts from authorities and user reports. Click on the alert to see details and severity.
              </p>
            </CardContent>
          </Card>
          
          <Card className="col-span-1">
            <CardHeader className="pb-3 flex flex-row items-center space-y-0 gap-2">
              <div className="h-8 w-8 rounded-full bg-info-500/10 flex items-center justify-center text-info-500">
                <Package className="h-4 w-4" />
              </div>
              <div>
                <CardTitle>Resources</CardTitle>
                <CardDescription>Essential supplies</CardDescription>
              </div>
            </CardHeader>
            <CardContent>
              <p className="text-sm">
                Blue markers show locations of water, food, shelter, and medical resources. Verified resources are marked with a check badge.
              </p>
            </CardContent>
          </Card>
          
          <Card className="col-span-1">
            <CardHeader className="pb-3 flex flex-row items-center space-y-0 gap-2">
              <div className="h-8 w-8 rounded-full bg-success-500/10 flex items-center justify-center text-success-500">
                <Users className="h-4 w-4" />
              </div>
              <div>
                <CardTitle>Volunteers</CardTitle>
                <CardDescription>Helpers and skilled workers</CardDescription>
              </div>
            </CardHeader>
            <CardContent>
              <p className="text-sm">
                Green markers represent volunteer locations. Click to see their skills and availability for assistance.
              </p>
            </CardContent>
          </Card>
        </div>
      </div>
    </Layout>
  );
};

export default MapPage;
