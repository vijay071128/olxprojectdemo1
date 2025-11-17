import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { AuthProvider } from "./contexts/AuthContext";
import Index from "./pages/Index";
import Houses from "./pages/Houses";
import Apartments from "./pages/Apartments";
import Villas from "./pages/Villas";
import Lands from "./pages/Lands";
import Search from "./pages/Search";
import PropertyDetail from "./pages/PropertyDetail";
import HeartInn from "./pages/HeartInn";
import Listings from "./pages/Listings";
import PropertyListingMore from "./pages/PropertyListingMore";
import PropertyContact from "./pages/PropertyContact";
import Login from "./pages/Login";
import Register from "./pages/Register";
import ForgotPassword from "./pages/ForgotPassword";
import NotFound from "./pages/NotFound";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <AuthProvider>
      <TooltipProvider>
        <Toaster />
        <Sonner />
        <BrowserRouter basename={import.meta.env.BASE_URL} future={{ v7_startTransition: true, v7_relativeSplatPath: true }}>
          <Routes>
            <Route path="/" element={<Index />} />
            <Route path="/houses" element={<Houses />} />
            <Route path="/apartments" element={<Apartments />} />
            <Route path="/villas" element={<Villas />} />
            <Route path="/lands" element={<Lands />} />
            <Route path="/search" element={<Search />} />
            <Route path="/property/:id" element={<PropertyDetail />} />
            <Route path="/property-contact/:id" element={<PropertyContact />} />
            <Route path="/heartinn" element={<HeartInn />} />
            <Route path="/listings" element={<Listings />} />
            <Route path="/more-properties" element={<PropertyListingMore />} />
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />
            <Route path="/forgot-password" element={<ForgotPassword />} />
            {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
            <Route path="*" element={<NotFound />} />
          </Routes>
        </BrowserRouter>
      </TooltipProvider>
    </AuthProvider>
  </QueryClientProvider>
);

export default App;
