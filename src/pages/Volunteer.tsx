
import React from 'react';
import Layout from '@/components/Layout';
import VolunteerForm from '@/components/VolunteerForm';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Heart, Shield, Clock, Users, MapPin } from 'lucide-react';

const VolunteerPage = () => {
  return (
    <Layout>
      <div className="space-y-10 animate-fade-in">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Volunteer Registration</h1>
          <p className="text-muted-foreground mt-1">
            Join our community of helpers and make a difference during disasters
          </p>
        </div>
        
        <div className="grid gap-8 lg:grid-cols-3 items-start">
          <div className="lg:col-span-2">
            <VolunteerForm />
          </div>
          
          <div className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center">
                  <Heart className="mr-2 h-5 w-5 text-emergency-600" />
                  Why Volunteer?
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex gap-3">
                  <div className="flex h-8 w-8 items-center justify-center rounded-full bg-primary/10">
                    <Badge className="h-4 w-4 text-primary" />
                  </div>
                  <div>
                    <h3 className="font-medium">Make a Real Impact</h3>
                    <p className="text-sm text-muted-foreground">
                      Your skills and time can save lives during critical situations.
                    </p>
                  </div>
                </div>
                
                <div className="flex gap-3">
                  <div className="flex h-8 w-8 items-center justify-center rounded-full bg-primary/10">
                    <Shield className="h-4 w-4 text-primary" />
                  </div>
                  <div>
                    <h3 className="font-medium">Support Your Community</h3>
                    <p className="text-sm text-muted-foreground">
                      Help neighbors in need and strengthen community resilience.
                    </p>
                  </div>
                </div>
                
                <div className="flex gap-3">
                  <div className="flex h-8 w-8 items-center justify-center rounded-full bg-primary/10">
                    <Clock className="h-4 w-4 text-primary" />
                  </div>
                  <div>
                    <h3 className="font-medium">Flexible Commitment</h3>
                    <p className="text-sm text-muted-foreground">
                      Volunteer according to your schedule and availability.
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>
            
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center">
                  <Users className="mr-2 h-5 w-5 text-info-600" />
                  Volunteer Statistics
                </CardTitle>
                <CardDescription>Current disaster response effort</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex justify-between items-center py-2 border-b">
                  <span className="text-sm">Active Volunteers</span>
                  <Badge variant="outline">126</Badge>
                </div>
                <div className="flex justify-between items-center py-2 border-b">
                  <span className="text-sm">Medical Professionals</span>
                  <Badge variant="outline">43</Badge>
                </div>
                <div className="flex justify-between items-center py-2 border-b">
                  <span className="text-sm">Rescue Teams</span>
                  <Badge variant="outline">18</Badge>
                </div>
                <div className="flex justify-between items-center py-2">
                  <span className="text-sm">Total Hours Contributed</span>
                  <Badge variant="outline">1,240+</Badge>
                </div>
              </CardContent>
            </Card>
            
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center">
                  <MapPin className="mr-2 h-5 w-5 text-success-600" />
                  Areas Needing Help
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-2">
                  <Badge className="w-full justify-start py-1.5 px-3 bg-emergency-50 text-emergency-700 hover:bg-emergency-100 border-emergency-200">Downtown Riverside</Badge>
                  <Badge className="w-full justify-start py-1.5 px-3 bg-warning-50 text-warning-700 hover:bg-warning-100 border-warning-200">East Valley Heights</Badge>
                  <Badge className="w-full justify-start py-1.5 px-3 bg-info-50 text-info-700 hover:bg-info-100 border-info-200">Westside Community</Badge>
                  <Badge className="w-full justify-start py-1.5 px-3 bg-muted hover:bg-muted/80">North County</Badge>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default VolunteerPage;
