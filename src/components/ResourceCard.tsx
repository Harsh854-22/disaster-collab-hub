
import React from 'react';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Resource, ResourceType } from '@/utils/mockData';
import { MapPin, Phone, Clock, Shield, Droplets, Home, Pill, ShoppingBag, Truck, HelpCircle } from 'lucide-react';
import { cn } from '@/lib/utils';

interface ResourceCardProps {
  resource: Resource;
  onViewLocation?: (resource: Resource) => void;
  className?: string;
}

const ResourceCard: React.FC<ResourceCardProps> = ({ resource, onViewLocation, className }) => {
  // Format relative time
  const formatRelativeTime = (date: Date) => {
    const now = new Date();
    const diffInMinutes = Math.floor((now.getTime() - date.getTime()) / (1000 * 60));
    
    if (diffInMinutes < 1) return 'Just now';
    if (diffInMinutes < 60) return `${diffInMinutes} minutes ago`;
    
    const diffInHours = Math.floor(diffInMinutes / 60);
    if (diffInHours < 24) return `${diffInHours} hours ago`;
    
    const diffInDays = Math.floor(diffInHours / 24);
    return `${diffInDays} days ago`;
  };

  // Get icon based on resource type
  const getResourceIcon = (type: ResourceType) => {
    switch (type) {
      case 'water': return <Droplets className="h-5 w-5" />;
      case 'shelter': return <Home className="h-5 w-5" />;
      case 'medical': return <Pill className="h-5 w-5" />;
      case 'food': return <ShoppingBag className="h-5 w-5" />;
      case 'clothing': return <ShoppingBag className="h-5 w-5" />;
      case 'transportation': return <Truck className="h-5 w-5" />;
      default: return <HelpCircle className="h-5 w-5" />;
    }
  };

  return (
    <Card className={cn("w-full overflow-hidden transition-all hover:shadow-soft", className)}>
      <CardHeader className="pb-3">
        <div className="flex justify-between items-start">
          <Badge variant="outline" className="capitalize">
            {getResourceIcon(resource.type)}
            <span className="ml-1">{resource.type}</span>
          </Badge>
          {resource.verified && (
            <Badge variant="secondary" className="flex items-center gap-1">
              <Shield className="h-3 w-3" />
              Verified
            </Badge>
          )}
        </div>
        <CardTitle className="text-lg mt-2">{resource.name}</CardTitle>
        <CardDescription className="line-clamp-2">{resource.description}</CardDescription>
      </CardHeader>
      <CardContent className="pb-2">
        <div className="space-y-2 text-sm">
          <div className="flex items-center text-muted-foreground">
            <MapPin className="h-4 w-4 mr-2 flex-shrink-0" />
            <span className="truncate">{resource.location.address}</span>
          </div>
          
          <div className="flex items-center text-muted-foreground">
            <Phone className="h-4 w-4 mr-2 flex-shrink-0" />
            <span>{resource.contactPhone || 'No phone provided'}</span>
          </div>
          
          <div className="flex items-center text-muted-foreground">
            <Clock className="h-4 w-4 mr-2 flex-shrink-0" />
            <span>{formatRelativeTime(resource.timestamp)}</span>
          </div>
        </div>
      </CardContent>
      <CardFooter className="pt-2">
        <Button 
          variant="outline" 
          size="sm" 
          className="w-full" 
          onClick={() => onViewLocation && onViewLocation(resource)}
        >
          <MapPin className="h-4 w-4 mr-2" />
          View on Map
        </Button>
      </CardFooter>
    </Card>
  );
};

export default ResourceCard;
