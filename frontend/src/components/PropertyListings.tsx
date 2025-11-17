import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Heart, MapPin, Bed, Bath, Square, Eye } from "lucide-react";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

const properties = [
  {
    id: 25,
    title: "Modern Family House",
    price: "$450,000",
    type: "House",
    location: "Beverly Hills, CA",
    images: ["/src/assets/house-2.jpg", "/src/assets/house-1.jpg", "/src/assets/house-3.jpg"],
    beds: 4,
    baths: 3,
    area: "2,500 sq ft",
    featured: true,
    description: "Beautiful modern house with spacious rooms and garden",
    contact: {
      name: "John Smith",
      phoneNumbers: [" 9876543240 "],
      mapUrl: "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3305.123!2d-118.4000!2d34.0900!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x80c2c75ddc27da13%3A0xe22fdf6f254608f4!2sBeverly%20Hills%2C%20CA!5e0!3m2!1sen!2sin!4v1690000000000!5m2!1sen!2sin"
    }
  },
  {
    id: 26,
    title: "Downtown Luxury Apartment",
    price: "$320,000",
    type: "Apartment",
    location: "Manhattan, NY",
    images: ["/src/assets/apartment-1.jpg", "/src/assets/apartment-2.jpg", "/src/assets/house-4.jpg"],
    beds: 2,
    baths: 2,
    area: "1,200 sq ft",
    featured: false,
    description: "Luxury apartment in the heart of the city",
    contact: {
      name: "Sarah Johnson",
      phoneNumbers: [" 9876543241 "],
      mapUrl: "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3022.456!2d-74.0000!2d40.7500!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x89c2588f046ee661%3A0xa0b3281fcecc08c!2sManhattan%2C%20NY!5e0!3m2!1sen!2sin!4v1690000000000!5m2!1sen!2sin"
    }
  },
  {
    id: 27,
    title: "Premium Villa with Pool",
    price: "$1,200,000",
    type: "Villa",
    location: "Miami Beach, FL",
    images: ["/src/assets/villa-1.jpg", "/src/assets/villa-2.jpg", "/src/assets/house-5.jpg"],
    beds: 6,
    baths: 4,
    area: "4,500 sq ft",
    featured: true,
    description: "Stunning villa with swimming pool and ocean view",
    contact: {
      name: "Michael Rodriguez",
      phoneNumbers: [" 9876543242 "],
      mapUrl: "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3593.789!2d-80.1300!2d25.7900!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x88d9b0a20ec8c111%3A0xff96f271ddad4f65!2sMiami%20Beach%2C%20FL!5e0!3m2!1sen!2sin!4v1690000000000!5m2!1sen!2sin"
    }
  },
  {
    id: 28,
    title: "Development Land Plot",
    price: "$180,000",
    type: "Land",
    location: "Austin, TX",
    images: ["/src/assets/land-1.jpg", "/src/assets/land-2.jpg", "/src/assets/house-6.jpg"],
    beds: null,
    baths: null,
    area: "5,000 sq ft",
    featured: false,
    description: "Prime location for residential development",
    contact: {
      name: "David Wilson",
      phoneNumbers: [" 9876543243 "],
      mapUrl: "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3444.123!2d-97.7400!2d30.2700!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x8644b59d6b1d1b1d%3A0x1b1d1b1d1b1d1b1d!2sAustin%2C%20TX!5e0!3m2!1sen!2sin!4v1690000000000!5m2!1sen!2sin"
    }
  },
  {
    id: 29,
    title: "Cozy Suburban House",
    price: "$280,000",
    type: "House",
    location: "Phoenix, AZ",
    images: ["/src/assets/house-2.jpg", "/src/assets/house-3.jpg", "/src/assets/apartment-1.jpg"],
    beds: 3,
    baths: 2,
    area: "1,800 sq ft",
    featured: false,
    description: "Perfect starter home in quiet neighborhood",
    contact: {
      name: "Lisa Anderson",
      phoneNumbers: [" 9876543244 "],
      mapUrl: "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3326.789!2d-112.0700!2d33.4500!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x872b12ed50a998c7%3A0x5aa6d3a7a1c7b8a3!2sPhoenix%2C%20AZ!5e0!3m2!1sen!2sin!4v1690000000000!5m2!1sen!2sin"
    }
  },
  {
    id: 30,
    title: "Penthouse Apartment",
    price: "$850,000",
    type: "Apartment",
    location: "Chicago, IL",
    images: ["/src/assets/apartment-2.jpg", "/src/assets/villa-1.jpg", "/src/assets/house-1.jpg"],
    beds: 3,
    baths: 3,
    area: "2,200 sq ft",
    featured: true,
    description: "Luxury penthouse with city skyline views",
    contact: {
      name: "Robert Davis",
      phoneNumbers: [" 9876543245 "],
      mapUrl: "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d2969.456!2d-87.6300!2d41.8800!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x880e2c3cd0f4cbed%3A0xafe0a6ad09c0c000!2sChicago%2C%20IL!5e0!3m2!1sen!2sin!4v1690000000000!5m2!1sen!2sin"
    }
  }
];

const PropertyListings = () => {
  const navigate = useNavigate();
  const [favorites, setFavorites] = useState<Set<number>>(() => {
    // Load favorites from localStorage
    const stored = localStorage.getItem("favorites");
    if (stored) {
      try {
        const favoritesArray = JSON.parse(stored);
        return new Set(favoritesArray.map((p: any) => p.id));
      } catch (error) {
        console.error("Error parsing favorites from localStorage:", error);
        return new Set();
      }
    }
    return new Set();
  });

  const [showLoadMore, setShowLoadMore] = useState(true);

  const handleLoadMore = () => {
    setShowLoadMore(false);
    window.location.href = "/more-properties";
  };

  const viewPropertyDetails = (propertyId: number) => {
    navigate(`/property/${propertyId}`);
  };

  const toggleFavorite = (propertyId: number) => {
    const newFavorites = new Set(favorites);
    if (newFavorites.has(propertyId)) {
      newFavorites.delete(propertyId);
    } else {
      newFavorites.add(propertyId);
    }
    setFavorites(newFavorites);

    // Update localStorage
    const stored = localStorage.getItem("favorites");
    let favoritesArray: any[] = [];
    if (stored) {
      try {
        favoritesArray = JSON.parse(stored);
      } catch (error) {
        console.error("Error parsing favorites from localStorage:", error);
      }
    }

    if (newFavorites.has(propertyId)) {
      // Add to favorites
      const property = properties.find(p => p.id === propertyId);
      if (property && !favoritesArray.some(p => p.id === propertyId)) {
        favoritesArray.push(property);
      }
    } else {
      // Remove from favorites
      favoritesArray = favoritesArray.filter(p => p.id !== propertyId);
    }

    localStorage.setItem("favorites", JSON.stringify(favoritesArray));
  };

  return (
    <section className="py-16 bg-background">
      <div className="container mx-auto px-4">
        {/* Section Header */}
        <div className="text-center mb-12 animate-fade-in">
          <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">
            Featured Properties
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Discover our handpicked selection of premium properties
          </p>
        </div>

        {/* Properties Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {properties.map((property, index) => (
            <div
              key={property.id}
              className="properity-card bg-card rounded-2xl overflow-hidden shadow-property animate-scale-in"
              style={{ animationDelay: `${index * 100}ms` }}
            >
              {/* Property Image */}
              <div className="relative">
                <img
                  src={property.images[0]}
                  alt={property.title}
                  className="w-full h-64 object-cover"
                />

                {/* Badges */}
                <div className="absolute top-4 left-4 flex gap-2">
                  {property.featured && (
                    <Badge className="bg-accent text-accent-foreground">
                      Featured
                    </Badge>
                  )}
                  <Badge variant="secondary">
                    {property.type}
                  </Badge>
                </div>

                {/* Favorite Button */}
                <Button
                  variant="ghost"
                  size="sm"
                  className="absolute top-4 right-4 bg-white/90 hover:bg-white"
                  onClick={() => {
                    const isAuthenticated = !!localStorage.getItem("currentUser");
                    if (!isAuthenticated) {
                      navigate("/register");
                      return;
                    }
                    toggleFavorite(property.id);
                  }}
                >
                  <Heart
                    className={`w-4 h-4 ${
                      favorites.has(property.id)
                        ? 'fill-red-500 text-red-500'
                        : 'text-muted-foreground'
                    }`}
                  />
                </Button>
              </div>

              {/* Property Details */}
              <div className="p-6">
                <div className="flex items-start justify-between mb-3">
                  <h3 className="text-xl font-semibold text-foreground group-hover:text-primary transition-colors">
                    {property.title}
                  </h3>
                  <div className="flex items-center gap-2">
                    <span className="text-2xl font-bold text-primary mx-4">
                      {property.price}
                    </span>
                    <Button
                      size="sm"
                      onClick={(e) => {
                        e.stopPropagation();
                        const isAuthenticated = !!localStorage.getItem("currentUser");
                        if (!isAuthenticated) {
                          navigate("/register");
                          return;
                        }
                        navigate(`/property-contact/${property.id}`);
                      }}
                    >
                      Buy
                    </Button>
                  </div>
                </div>

                <div className="flex items-center text-muted-foreground mb-4">
                  <MapPin className="w-4 h-4 mr-1" />
                  <span className="text-sm">{property.location}</span>
                </div>

                <p className="text-muted-foreground text-sm mb-4">
                  {property.description}
                </p>

                {/* Property Features */}
                <div className="flex items-center gap-4 mb-6 text-sm text-muted-foreground">
                  {property.beds && (
                    <div className="flex items-center">
                      <Bed className="w-4 h-4 mr-1" />
                      <span className="mx-2">{property.beds} beds</span>
                    </div>
                  )}
                  {property.baths && (
                    <div className="flex items-center">
                      <Bath className="w-4 h-4 mr-1" />
                      <span className="mx-2">{property.baths} baths</span>
                    </div>
                  )}
                  <div className="flex items-center">
                    <Square className="w-4 h-4 mr-1" />
                    <span className="mx-2">{property.area}</span>
                  </div>
                </div>

                {/* Action Buttons */}
                <div className="flex gap-3">
                  <Button className="flex-1 hero-button" onClick={() => viewPropertyDetails(property.id)}>
                    <Eye className="w-4 h-4 mr-2" />
                    View Details
                  </Button>
                  <Button
                    variant="outline"
                    className="px-6"
                    onClick={() => {
                      const isAuthenticated = !!localStorage.getItem("currentUser");
                      if (!isAuthenticated) {
                        navigate("/register");
                        return;
                      }
                      navigate(`/property-contact/${property.id}`);
                    }}
                  >
                    Contact
                  </Button>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Load More Button */}
        <div className="text-center mt-12">
          {showLoadMore && (
            <Button
              size="lg"
              variant="outline"
              className="px-8"
              onClick={handleLoadMore}
            >
              Load More Properties
            </Button>
          )}
        </div>
      </div>
    </section>
  );
};

export default PropertyListings;
