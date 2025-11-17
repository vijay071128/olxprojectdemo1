import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Search, MapPin, Home, Building2 } from "lucide-react";
import heroImage from "@/assets/hero-image.jpg";

const Hero = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [locationQuery, setLocationQuery] = useState("");
  const navigate = useNavigate();

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    const query = [searchQuery.trim(), locationQuery.trim()].filter(Boolean).join(" ");
    if (query) {
      navigate(`/search?q=${encodeURIComponent(query)}`);
      // Reset form after search
      setSearchQuery("");
      setLocationQuery("");
    }
  };

  // Generate or get current user ID
  const getCurrentUserId = () => {
    let userId = localStorage.getItem("currentUserId");
    if (!userId) {
      userId = Date.now().toString();
      localStorage.setItem("currentUserId", userId);
    }
    return userId;
  };

  const currentUserId = getCurrentUserId();

  return (
    <section className="relative min-h-[80vh] flex items-center justify-center overflow-hidden">
      {/* Background Image */}
      <div className="absolute inset-0 z-0">
        <img
          src={heroImage}
          alt="Real estate properties hero image"
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-primary/70 backdrop-blur-[1px]" />
      </div>

      {/* Hero Content */}
      <div className="relative z-10 container mx-auto px-4 text-center">
        <div className="max-w-4xl mx-auto animate-fade-in">
          {/* Main Heading */}
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-6 leading-tight">
            Find Your Perfect
            <span className="block text-accent animate-float">
              Dream Property
            </span>
          </h1>

          {/* Subtitle */}
          <p className="text-lg md:text-xl text-white/90 mb-8 max-w-2xl mx-auto">
            Discover houses, apartments, villas, and lands in prime locations. 
            Your ideal property is just a search away.
          </p>

          {/* Search Bar */}
          <form onSubmit={handleSearch} className="bg-white/95 backdrop-blur rounded-2xl p-6 shadow-2xl mb-8 animate-scale-in">
            <div className="flex flex-col md:flex-row gap-4 items-center">
              <div className="flex-1 relative w-full">
                <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 text-muted-foreground w-5 h-5" />
                <Input
                  placeholder="Search by property type, location..."
                  className="pl-12 h-12 text-lg border-0 bg-transparent focus:ring-2 focus:ring-primary/20"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                />
              </div>
              <div className="flex-1 relative w-full">
                <MapPin className="absolute left-4 top-1/2 transform -translate-y-1/2 text-muted-foreground w-5 h-5" />
                <Input
                  placeholder="Chennai"
                  className="pl-12 h-12 text-lg border-0 bg-transparent focus:ring-2 focus:ring-primary/20"
                  value={locationQuery}
                  onChange={(e) => setLocationQuery(e.target.value)}
                />
              </div>
              <Button type="submit" className="hero-button h-12 px-8 text-lg">
                <Search className="w-5 h-5 mr-2" />
                Search
              </Button>
            </div>
          </form>

          {/* Quick Stats */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 max-w-3xl mx-auto animate-slide-up">
            <div className="text-center">
              <div className="w-12 h-12 bg-white/20 rounded-full flex items-center justify-center mx-auto mb-2">
                <Home className="w-6 h-6 text-white" />
              </div>
              <div className="text-2xl font-bold text-white">500+</div>
              <div className="text-white/80 text-sm">Houses</div>
            </div>
            <div className="text-center">
              <div className="w-12 h-12 bg-white/20 rounded-full flex items-center justify-center mx-auto mb-2">
                <Building2 className="w-6 h-6 text-white" />
              </div>
              <div className="text-2xl font-bold text-white">300+</div>
              <div className="text-white/80 text-sm">Apartments</div>
            </div>
            <div className="text-center">
              <div className="w-12 h-12 bg-white/20 rounded-full flex items-center justify-center mx-auto mb-2">
                <Home className="w-6 h-6 text-white" />
              </div>
              <div className="text-2xl font-bold text-white">150+</div>
              <div className="text-white/80 text-sm">Villas</div>
            </div>
            <div className="text-center">
              <div className="w-12 h-12 bg-white/20 rounded-full flex items-center justify-center mx-auto mb-2">
                <MapPin className="w-6 h-6 text-white" />
              </div>
              <div className="text-2xl font-bold text-white">200+</div>
              <div className="text-white/80 text-sm">Lands</div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;