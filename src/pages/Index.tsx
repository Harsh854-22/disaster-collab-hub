
import React from 'react';
import Layout from '@/components/Layout';
import Map from '@/components/Map';
import AlertBanner from '@/components/AlertBanner';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { MapPin, Bell, Users, Package, ArrowRight } from 'lucide-react';
import { mockAlerts, mockWeatherAlerts } from '@/utils/mockData';
import { Link } from 'react-router-dom';

const Index = () => {
  const criticalAlerts = mockAlerts.filter(alert => alert.level === 'critical');
  const latestWeatherAlert = mockWeatherAlerts[0];

  return (
    <Layout>
      <div className="space-y-8 animate-fade-in">
        {/* Hero Section */}
        <div className="relative overflow-hidden rounded-2xl bg-primary-700 text-white">
          <div className="absolute inset-0 bg-gradient-to-r from-primary-800 to-primary-600 mix-blend-multiply"></div>
          <div className="relative px-6 py-16 sm:px-12 sm:py-24 lg:py-32">
            <h1 className="text-4xl font-extrabold tracking-tight sm:text-5xl lg:text-6xl">
              Community-Driven<br />Disaster Response
            </h1>
            <p className="mt-6 max-w-lg text-xl sm:text-2xl">
              Connect, coordinate, and contribute during emergencies. Together we can make a difference.
            </p>
            <div className="mt-10 flex flex-wrap gap-4">
              <Button asChild size="lg" variant="default" className="bg-white text-primary-700 hover:bg-gray-100">
                <Link to="/map">
                  <MapPin className="mr-2 h-5 w-5" />
                  View Map
                </Link>
              </Button>
              <Button asChild size="lg" variant="outline" className="bg-transparent text-white border-white hover:bg-white/10">
                <Link to="/volunteer">
                  <Users className="mr-2 h-5 w-5" />
                  Volunteer
                </Link>
              </Button>
            </div>
          </div>
        </div>
        
        {/* Alerts Section */}
        <div className="space-y-4">
          <div className="flex justify-between items-center">
            <h2 className="text-2xl font-bold tracking-tight">Critical Alerts</h2>
            <Button variant="ghost" size="sm" asChild>
              <Link to="/alerts" className="flex items-center">
                View All
                <ArrowRight className="ml-2 h-4 w-4" />
              </Link>
            </Button>
          </div>
          
          <div className="space-y-4">
            {criticalAlerts.length > 0 ? (
              criticalAlerts.map(alert => (
                <AlertBanner
                  key={alert.id}
                  title={alert.title}
                  description={alert.description}
                  level={alert.level}
                />
              ))
            ) : (
              <AlertBanner
                title="No Critical Alerts"
                description="There are currently no critical alerts in your area."
                level="low"
              />
            )}
            
            {latestWeatherAlert && (
              <AlertBanner
                title={latestWeatherAlert.title}
                description={latestWeatherAlert.description}
                level={latestWeatherAlert.severity}
              />
            )}
          </div>
        </div>
        
        {/* Map Preview */}
        <div className="space-y-4">
          <h2 className="text-2xl font-bold tracking-tight">Area Overview</h2>
          <Map className="h-[400px]" />
        </div>
        
        {/* Quick Access Cards */}
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          <Card className="overflow-hidden transition-all hover:shadow-soft animate-slide-in">
            <CardHeader className="bg-primary-500/10 pb-3">
              <CardTitle className="flex items-center text-primary">
                <Bell className="mr-2 h-5 w-5" />
                Emergency Alerts
              </CardTitle>
            </CardHeader>
            <CardContent className="pt-4">
              <p className="text-sm text-muted-foreground mb-4">
                Stay informed with real-time updates about emergency situations in your area.
              </p>
              <Button asChild variant="outline" className="w-full">
                <Link to="/alerts">View Alerts</Link>
              </Button>
            </CardContent>
          </Card>
          
          <Card className="overflow-hidden transition-all hover:shadow-soft animate-slide-in" style={{animationDelay: '0.1s'}}>
            <CardHeader className="bg-primary-500/10 pb-3">
              <CardTitle className="flex items-center text-primary">
                <Package className="mr-2 h-5 w-5" />
                Find Resources
              </CardTitle>
            </CardHeader>
            <CardContent className="pt-4">
              <p className="text-sm text-muted-foreground mb-4">
                Locate essential supplies and services like water, food, shelter and medical assistance.
              </p>
              <Button asChild variant="outline" className="w-full">
                <Link to="/resources">Browse Resources</Link>
              </Button>
            </CardContent>
          </Card>
          
          <Card className="overflow-hidden transition-all hover:shadow-soft animate-slide-in" style={{animationDelay: '0.2s'}}>
            <CardHeader className="bg-primary-500/10 pb-3">
              <CardTitle className="flex items-center text-primary">
                <Users className="mr-2 h-5 w-5" />
                Volunteer
              </CardTitle>
            </CardHeader>
            <CardContent className="pt-4">
              <p className="text-sm text-muted-foreground mb-4">
                Register to help with relief efforts. Your skills and time can make a significant difference.
              </p>
              <Button asChild variant="outline" className="w-full">
                <Link to="/volunteer">Register Now</Link>
              </Button>
            </CardContent>
          </Card>
        </div>
      </div>
    </Layout>
  );
};

export default Index;
