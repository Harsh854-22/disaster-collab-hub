
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { EmergencyContact } from '@/utils/mockData';
import { Phone, ExternalLink, AlertCircle, Flame, Stethoscope, Heart, Landmark, HelpCircle } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';

interface EmergencyContactsProps {
  contacts: EmergencyContact[];
  className?: string;
}

const EmergencyContacts: React.FC<EmergencyContactsProps> = ({ contacts, className }) => {
  // Get icon based on contact category
  const getCategoryIcon = (category: string) => {
    switch (category) {
      case 'police': return <AlertCircle className="h-5 w-5" />;
      case 'fire': return <Flame className="h-5 w-5" />;
      case 'medical': return <Stethoscope className="h-5 w-5" />;
      case 'ngo': return <Heart className="h-5 w-5" />;
      case 'government': return <Landmark className="h-5 w-5" />;
      default: return <HelpCircle className="h-5 w-5" />;
    }
  };

  const handleCallClick = (phone: string) => {
    window.location.href = `tel:${phone}`;
  };

  return (
    <div className={cn("grid gap-4 md:grid-cols-2 lg:grid-cols-3", className)}>
      {contacts.map((contact) => (
        <Card key={contact.id} className="overflow-hidden transition-transform hover:translate-y-[-4px]">
          <CardHeader className="pb-3 flex flex-row items-center space-x-3 space-y-0 bg-muted/50">
            <div className="h-10 w-10 rounded-full bg-primary/10 flex items-center justify-center text-primary">
              {getCategoryIcon(contact.category)}
            </div>
            <div>
              <CardTitle className="text-base capitalize">{contact.name}</CardTitle>
              <p className="text-xs text-muted-foreground capitalize">{contact.category}</p>
            </div>
          </CardHeader>
          <CardContent className="pt-4">
            {contact.description && (
              <p className="text-sm text-muted-foreground mb-3">{contact.description}</p>
            )}
            
            <div className="flex flex-col gap-3">
              <Button 
                className="w-full justify-start" 
                variant="outline"
                onClick={() => handleCallClick(contact.phone)}
              >
                <Phone className="h-4 w-4 mr-2" />
                {contact.phone}
              </Button>
              
              {contact.website && (
                <Button 
                  className="w-full justify-start" 
                  variant="secondary"
                  onClick={() => window.open(contact.website, '_blank')}
                >
                  <ExternalLink className="h-4 w-4 mr-2" />
                  Visit Website
                </Button>
              )}
            </div>
          </CardContent>
        </Card>
      ))}
    </div>
  );
};

export default EmergencyContacts;
