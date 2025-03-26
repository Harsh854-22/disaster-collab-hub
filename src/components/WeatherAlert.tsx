
import React from 'react';
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { WeatherAlert as WeatherAlertType } from '@/utils/mockData';
import { CloudRain, Wind, Thermometer, Snowflake, AlertCircle, Clock, MapPin } from 'lucide-react';
import { cn } from '@/lib/utils';

interface WeatherAlertProps {
  alert: WeatherAlertType;
  onViewOnMap?: (alert: WeatherAlertType) => void;
  className?: string;
}

const WeatherAlert: React.FC<WeatherAlertProps> = ({ alert, onViewOnMap, className }) => {
  const formatDate = (date: Date) => {
    return new Intl.DateTimeFormat('en-US', {
      month: 'short',
      day: 'numeric',
      hour: 'numeric',
      minute: 'numeric',
      hour12: true
    }).format(date);
  };

  const getTimeRemaining = () => {
    if (!alert.endTime) return 'Ongoing';
    
    const now = new Date();
    const endTime = new Date(alert.endTime);
    const diffMs = endTime.getTime() - now.getTime();
    
    if (diffMs <= 0) return 'Ended';
    
    const diffHours = Math.floor(diffMs / (1000 * 60 * 60));
    if (diffHours < 1) {
      const diffMinutes = Math.floor(diffMs / (1000 * 60));
      return `${diffMinutes} min remaining`;
    }
    if (diffHours < 24) {
      return `${diffHours} hr remaining`;
    }
    const diffDays = Math.floor(diffHours / 24);
    return `${diffDays} days remaining`;
  };

  const getTypeIcon = () => {
    switch (alert.type) {
      case 'flood': return <CloudRain className="h-5 w-5" />;
      case 'wind': return <Wind className="h-5 w-5" />;
      case 'heat': return <Thermometer className="h-5 w-5" />;
      case 'cold': return <Snowflake className="h-5 w-5" />;
      default: return <AlertCircle className="h-5 w-5" />;
    }
  };

  const getSeverityColor = () => {
    switch (alert.severity) {
      case 'critical': return 'bg-emergency-50 text-emergency-700 border-emergency-200';
      case 'high': return 'bg-warning-50 text-warning-700 border-warning-200';
      case 'medium': return 'bg-info-50 text-info-700 border-info-200';
      case 'low': return 'bg-success-50 text-success-700 border-success-200';
      default: return 'bg-muted text-muted-foreground';
    }
  };

  return (
    <Card className={cn("w-full overflow-hidden border", getSeverityColor(), className)}>
      <CardHeader className="pb-2">
        <div className="flex justify-between items-start">
          <Badge variant="outline" className={cn("capitalize flex items-center gap-1", getSeverityColor())}>
            {getTypeIcon()}
            <span>{alert.type} Alert</span>
          </Badge>
          <Badge variant="secondary" className="flex items-center gap-1">
            <Clock className="h-3 w-3" />
            {getTimeRemaining()}
          </Badge>
        </div>
        <CardTitle className="text-lg mt-2">{alert.title}</CardTitle>
      </CardHeader>
      <CardContent className="pb-2">
        <p className="text-sm mb-4">{alert.description}</p>
        <div className="space-y-2 text-sm">
          <div className="flex items-center text-muted-foreground">
            <MapPin className="h-4 w-4 mr-2 flex-shrink-0" />
            <span>{alert.affectedArea.name}</span>
          </div>
          <div className="flex items-center text-muted-foreground">
            <Clock className="h-4 w-4 mr-2 flex-shrink-0" />
            <span>
              {formatDate(alert.startTime)}
              {alert.endTime && ` - ${formatDate(alert.endTime)}`}
            </span>
          </div>
        </div>
      </CardContent>
      {onViewOnMap && (
        <CardFooter className="pt-0">
          <Button 
            variant="outline" 
            size="sm" 
            className="w-full" 
            onClick={() => onViewOnMap(alert)}
          >
            <MapPin className="h-4 w-4 mr-2" />
            View Affected Area
          </Button>
        </CardFooter>
      )}
    </Card>
  );
};

export default WeatherAlert;
