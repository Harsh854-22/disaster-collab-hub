
import React from 'react';
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert';
import { AlertCircle, AlertTriangle, Info, CheckCircle2 } from 'lucide-react';
import { cn } from '@/lib/utils';
import { EmergencyLevel } from '@/utils/mockData';

interface AlertBannerProps {
  title: string;
  description: string;
  level?: EmergencyLevel;
  onClose?: () => void;
  className?: string;
}

const AlertBanner: React.FC<AlertBannerProps> = ({
  title,
  description,
  level = 'medium',
  onClose,
  className,
}) => {
  const [isVisible, setIsVisible] = React.useState(true);

  if (!isVisible) return null;

  const handleClose = () => {
    setIsVisible(false);
    if (onClose) onClose();
  };

  const getAlertStyles = () => {
    switch (level) {
      case 'critical':
        return {
          icon: AlertCircle,
          className: 'border-emergency-600 bg-emergency-50 text-emergency-700'
        };
      case 'high':
        return {
          icon: AlertTriangle,
          className: 'border-warning-600 bg-warning-50 text-warning-700'
        };
      case 'medium':
        return {
          icon: Info,
          className: 'border-info-600 bg-info-50 text-info-700'
        };
      case 'low':
        return {
          icon: CheckCircle2,
          className: 'border-success-600 bg-success-50 text-success-700'
        };
      default:
        return {
          icon: Info,
          className: 'border-info-600 bg-info-50 text-info-700'
        };
    }
  };

  const { icon: Icon, className: alertClassName } = getAlertStyles();

  return (
    <Alert className={cn('animate-slide-in', alertClassName, className)}>
      <Icon className="h-5 w-5" />
      <div className="ml-3 flex-1">
        <AlertTitle className="text-sm font-medium">{title}</AlertTitle>
        <AlertDescription className="mt-1 text-sm">{description}</AlertDescription>
      </div>
      {onClose && (
        <button
          onClick={handleClose}
          className="ml-auto flex-shrink-0 -mx-1.5 -my-1.5 rounded-md p-1.5 inline-flex focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-transparent"
        >
          <span className="sr-only">Dismiss</span>
          <svg className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
            <path
              fillRule="evenodd"
              d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z"
              clipRule="evenodd"
            />
          </svg>
        </button>
      )}
    </Alert>
  );
};

export default AlertBanner;
