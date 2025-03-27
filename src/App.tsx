
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { AppProvider } from "@/context/AppContext";
import AuthGuard from "@/components/AuthGuard";
import Index from "./pages/Index";
import MapPage from "./pages/Map";
import ResourcesPage from "./pages/Resources";
import VolunteerPage from "./pages/Volunteer";
import AlertsPage from "./pages/Alerts";
import Login from "./pages/Login";
import NotFound from "./pages/NotFound";

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      refetchOnWindowFocus: false,
      retry: 1,
    },
  },
});

const App = () => (
  <QueryClientProvider client={queryClient}>
    <AppProvider>
      <TooltipProvider>
        <Toaster />
        <Sonner />
        <BrowserRouter>
          <Routes>
            {/* Public routes */}
            <Route element={<AuthGuard requireAuth={false} />}>
              <Route path="/login" element={<Login />} />
            </Route>
            
            {/* Protected routes */}
            <Route element={<AuthGuard requireAuth={true} />}>
              <Route path="/" element={<Index />} />
              <Route path="/map" element={<MapPage />} />
              <Route path="/resources" element={<ResourcesPage />} />
              <Route path="/volunteer" element={<VolunteerPage />} />
              <Route path="/alerts" element={<AlertsPage />} />
            </Route>
            
            {/* Catch-all route */}
            <Route path="*" element={<NotFound />} />
          </Routes>
        </BrowserRouter>
      </TooltipProvider>
    </AppProvider>
  </QueryClientProvider>
);

export default App;
