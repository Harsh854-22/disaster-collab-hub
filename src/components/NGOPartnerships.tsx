
import React from 'react';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { ExternalLink, Shield, Users, Globe, CheckCircle } from 'lucide-react';

interface NGO {
  id: string;
  name: string;
  description: string;
  website: string;
  logo: string;
  verified: boolean;
  partnerSince: string;
  volunteersNeeded: number;
  location: string;
}

const mockNGOs: NGO[] = [
  {
    id: "ngo1",
    name: "Global Rescue Initiative",
    description: "International disaster relief organization focused on emergency response and recovery efforts worldwide.",
    website: "https://example.org/gri",
    logo: "/placeholder.svg",
    verified: true,
    partnerSince: "2023-01-15",
    volunteersNeeded: 45,
    location: "Global (HQ: New York)",
  },
  {
    id: "ngo2",
    name: "Coastal Relief Foundation",
    description: "Specializing in tsunami and flood response with a focus on rebuilding communities in coastal regions.",
    website: "https://example.org/crf",
    logo: "/placeholder.svg",
    verified: true,
    partnerSince: "2023-03-22",
    volunteersNeeded: 28,
    location: "Southeast Asia",
  },
  {
    id: "ngo3",
    name: "Emergency Medical Response",
    description: "Medical professionals providing critical care during disasters and training local healthcare workers.",
    website: "https://example.org/emr",
    logo: "/placeholder.svg",
    verified: true,
    partnerSince: "2023-05-10",
    volunteersNeeded: 15,
    location: "International",
  },
];

const NGOPartnerships: React.FC = () => {
  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return new Intl.DateTimeFormat('en-US', { 
      year: 'numeric', 
      month: 'long', 
      day: 'numeric' 
    }).format(date);
  };

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-2xl font-bold tracking-tight">NGO Partnerships</h2>
        <p className="text-muted-foreground mt-1">
          Verified organizations we work with to coordinate disaster response efforts
        </p>
      </div>
      
      <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {mockNGOs.map((ngo) => (
          <Card key={ngo.id} className="overflow-hidden transition-all hover:shadow-soft">
            <CardHeader className="pb-3">
              <div className="flex justify-between items-start">
                <div className="w-12 h-12 bg-muted rounded-md overflow-hidden">
                  <img src={ngo.logo} alt={`${ngo.name} logo`} className="w-full h-full object-cover" />
                </div>
                {ngo.verified && (
                  <Badge variant="secondary" className="flex items-center gap-1">
                    <Shield className="h-3 w-3" />
                    Verified Partner
                  </Badge>
                )}
              </div>
              <CardTitle className="text-lg mt-2">{ngo.name}</CardTitle>
              <CardDescription className="line-clamp-2">{ngo.description}</CardDescription>
            </CardHeader>
            <CardContent className="pb-2">
              <div className="space-y-2 text-sm">
                <div className="flex items-center justify-between text-muted-foreground">
                  <div className="flex items-center">
                    <Globe className="h-4 w-4 mr-2 flex-shrink-0" />
                    <span>{ngo.location}</span>
                  </div>
                </div>
                <div className="flex items-center justify-between text-muted-foreground">
                  <div className="flex items-center">
                    <CheckCircle className="h-4 w-4 mr-2 flex-shrink-0" />
                    <span>Partner since {formatDate(ngo.partnerSince)}</span>
                  </div>
                </div>
                <div className="flex items-center justify-between text-muted-foreground">
                  <div className="flex items-center">
                    <Users className="h-4 w-4 mr-2 flex-shrink-0" />
                    <span>{ngo.volunteersNeeded} volunteers needed</span>
                  </div>
                </div>
              </div>
            </CardContent>
            <CardFooter className="pt-2">
              <Button 
                variant="outline" 
                size="sm" 
                className="w-full" 
                asChild
              >
                <a href={ngo.website} target="_blank" rel="noopener noreferrer">
                  <ExternalLink className="h-4 w-4 mr-2" />
                  Visit Website
                </a>
              </Button>
            </CardFooter>
          </Card>
        ))}
      </div>
    </div>
  );
};

export default NGOPartnerships;
