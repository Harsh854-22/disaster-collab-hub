
import React, { useState } from 'react';
import Layout from '@/components/Layout';
import ResourceCard from '@/components/ResourceCard';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { ResourceType, mockResources } from '@/utils/mockData';
import { Search, Plus, Droplets, Home, Pill, Package, Truck, ShoppingBag } from 'lucide-react';
import { Badge } from '@/components/ui/badge';
import { useToast } from '@/hooks/use-toast';

const ResourcesPage = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedType, setSelectedType] = useState<ResourceType | 'all'>('all');
  const { toast } = useToast();
  
  const resourceTypes: { value: ResourceType | 'all'; label: string; icon: React.ReactNode }[] = [
    { value: 'all', label: 'All', icon: <Package className="h-4 w-4" /> },
    { value: 'water', label: 'Water', icon: <Droplets className="h-4 w-4" /> },
    { value: 'food', label: 'Food', icon: <ShoppingBag className="h-4 w-4" /> },
    { value: 'shelter', label: 'Shelter', icon: <Home className="h-4 w-4" /> },
    { value: 'medical', label: 'Medical', icon: <Pill className="h-4 w-4" /> },
    { value: 'clothing', label: 'Clothing', icon: <ShoppingBag className="h-4 w-4" /> },
    { value: 'transportation', label: 'Transport', icon: <Truck className="h-4 w-4" /> },
  ];

  const filteredResources = mockResources.filter((resource) => {
    // Filter by search term
    const matchesSearch = searchTerm === '' || 
      resource.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      resource.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
      resource.location.address.toLowerCase().includes(searchTerm.toLowerCase());
    
    // Filter by type
    const matchesType = selectedType === 'all' || resource.type === selectedType;
    
    return matchesSearch && matchesType;
  });

  const handleViewLocation = (resource: typeof mockResources[0]) => {
    toast({
      title: "Location Selected",
      description: `Viewing ${resource.name} on map`,
    });
  };

  const handleAddResource = () => {
    toast({
      title: "Add Resource",
      description: "This feature will be available soon!",
    });
  };

  return (
    <Layout>
      <div className="space-y-6 animate-fade-in">
        <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center gap-4">
          <div>
            <h1 className="text-3xl font-bold tracking-tight">Resources</h1>
            <p className="text-muted-foreground mt-1">Find essential supplies and services near you</p>
          </div>
          <Button onClick={handleAddResource} className="sm:self-start">
            <Plus className="mr-2 h-4 w-4" />
            Add Resource
          </Button>
        </div>
        
        <div className="flex flex-col sm:flex-row gap-3">
          <div className="relative flex-1">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground h-4 w-4" />
            <Input
              placeholder="Search resources..."
              className="pl-10"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
        </div>
        
        <Tabs 
          defaultValue="all" 
          value={selectedType} 
          onValueChange={(value) => setSelectedType(value as ResourceType | 'all')}
          className="w-full"
        >
          <div className="overflow-x-auto -mx-4 px-4">
            <TabsList className="flex mb-6 w-auto inline-flex">
              {resourceTypes.map((type) => (
                <TabsTrigger 
                  key={type.value} 
                  value={type.value} 
                  className="flex items-center gap-2 px-4"
                >
                  {type.icon}
                  <span>{type.label}</span>
                </TabsTrigger>
              ))}
            </TabsList>
          </div>
          
          <div className="mt-4">
            {filteredResources.length > 0 ? (
              <div className="grid gap-6 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3">
                {filteredResources.map((resource) => (
                  <ResourceCard 
                    key={resource.id} 
                    resource={resource} 
                    onViewLocation={() => handleViewLocation(resource)}
                  />
                ))}
              </div>
            ) : (
              <div className="text-center py-12">
                <Package className="mx-auto h-12 w-12 text-muted-foreground" />
                <h3 className="mt-4 text-lg font-medium">No resources found</h3>
                <p className="mt-2 text-muted-foreground">
                  Try adjusting your search or filters, or add a new resource to help others.
                </p>
                <Button onClick={handleAddResource} className="mt-6">
                  <Plus className="mr-2 h-4 w-4" />
                  Add Resource
                </Button>
              </div>
            )}
          </div>
        </Tabs>
      </div>
    </Layout>
  );
};

export default ResourcesPage;
