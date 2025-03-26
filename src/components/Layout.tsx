
import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Home, Map, Package, Users, Bell, Menu, X } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useToast } from '@/hooks/use-toast';
import { cn } from '@/lib/utils';

interface LayoutProps {
  children: React.ReactNode;
}

const Layout: React.FC<LayoutProps> = ({ children }) => {
  const [sidebarOpen, setSidebarOpen] = React.useState(false);
  const location = useLocation();
  const { toast } = useToast();
  
  const navigationItems = [
    { name: 'Home', path: '/', icon: Home },
    { name: 'Map', path: '/map', icon: Map },
    { name: 'Resources', path: '/resources', icon: Package },
    { name: 'Volunteer', path: '/volunteer', icon: Users },
    { name: 'Alerts', path: '/alerts', icon: Bell },
  ];

  const toggleSidebar = () => {
    setSidebarOpen(!sidebarOpen);
  };

  React.useEffect(() => {
    // Close sidebar when location changes (mobile)
    setSidebarOpen(false);
  }, [location.pathname]);

  const helpButtonHandler = () => {
    toast({
      title: "Emergency Assistance",
      description: "Connecting you with available help nearby...",
      variant: "destructive",
    });
  };

  return (
    <div className="min-h-screen bg-background flex">
      {/* Mobile sidebar toggle */}
      <Button 
        variant="outline" 
        size="icon" 
        className="lg:hidden fixed top-4 left-4 z-50"
        onClick={toggleSidebar}
      >
        {sidebarOpen ? <X size={20} /> : <Menu size={20} />}
      </Button>
      
      {/* Sidebar */}
      <div 
        className={cn(
          "fixed inset-y-0 left-0 z-40 w-64 transform transition-transform duration-300 ease-in-out bg-card border-r border-border lg:translate-x-0",
          sidebarOpen ? "translate-x-0" : "-translate-x-full"
        )}
      >
        <div className="h-full flex flex-col">
          <div className="px-6 py-6">
            <h1 className="text-2xl font-semibold tracking-tight">DisasterHub</h1>
            <p className="text-sm text-muted-foreground mt-1">Community-driven response</p>
          </div>
          
          <nav className="flex-1 px-3 py-4 space-y-1">
            {navigationItems.map((item) => (
              <Link
                key={item.name}
                to={item.path}
                className={cn(
                  "flex items-center px-3 py-3 text-sm rounded-md transition-colors",
                  location.pathname === item.path 
                    ? "bg-primary text-primary-foreground" 
                    : "text-foreground hover:bg-accent hover:text-accent-foreground"
                )}
              >
                <item.icon className="mr-3 h-5 w-5" />
                {item.name}
              </Link>
            ))}
          </nav>
          
          <div className="p-4">
            <Button 
              variant="destructive" 
              className="w-full animate-pulse-subtle" 
              onClick={helpButtonHandler}
            >
              I Need Help
            </Button>
          </div>
        </div>
      </div>
      
      {/* Main content */}
      <div className="flex-1 w-full lg:pl-64">
        <main className="min-h-screen pt-16 pb-10 px-4 sm:px-6 lg:px-8 md:pt-8">
          <div className="animate-fade-in">
            {children}
          </div>
        </main>
      </div>
    </div>
  );
};

export default Layout;
