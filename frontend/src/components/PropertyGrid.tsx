import { Heart, Plus } from "lucide-react";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { type Property } from "@/data/properties";

interface PropertyGridProps {
  listings: Property[];
  favorites?: Set<number>;
  onToggleFavorite?: (id: number) => void;
  onRemoveFavorite?: (id: number) => void;
  title?: string;
  description?: string;
  searchTerm?: string;
  onSearchChange?: (term: string) => void;
  onPlusClick?: () => void;
  onEditClick?: (property: Property) => void;
  onDeleteClick?: (id: number) => void;
  initialListingIds?: Set<number>;
}

const PropertyGrid = ({
  listings,
  favorites: externalFavorites,
  onToggleFavorite,
  onRemoveFavorite,
  title,
  description,
  onPlusClick,
  onEditClick,
  onDeleteClick,
  initialListingIds,
}: PropertyGridProps) => {
  const [internalFavorites, setInternalFavorites] = useState<Set<number>>(() => {
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
  const navigate = useNavigate();

  const favorites = externalFavorites ?? internalFavorites;
  const toggleFavorite = (id: number) => {
    if (onToggleFavorite) {
      onToggleFavorite(id);
    } else {
      const newFavorites = new Set(internalFavorites);
      if (newFavorites.has(id)) {
        newFavorites.delete(id);
      } else {
        newFavorites.add(id);
      }
      setInternalFavorites(newFavorites);

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

      if (newFavorites.has(id)) {
        // Add to favorites
        const property = listings.find(p => p.id === id);
        if (property && !favoritesArray.some(p => p.id === id)) {
          favoritesArray.push(property);
        }
      } else {
        // Remove from favorites
        favoritesArray = favoritesArray.filter(p => p.id !== id);
      }

      localStorage.setItem("favorites", JSON.stringify(favoritesArray));
    }
  };

  const handlePropertyClick = (id: number) => {
    navigate(`/property/${id}`);
  };

  const handleBuyClick = (e: React.MouseEvent, id: number) => {
    e.stopPropagation();
    const isAuthenticated = !!localStorage.getItem("currentUser");
    if (!isAuthenticated) {
      navigate("/register");
      return;
    }
    navigate(`/property-contact/${id}`);
  };

  // Separate user-added properties from initial listings if initialListingIds provided
  const userAddedListings = initialListingIds
    ? listings.filter(p => !initialListingIds.has(p.id))
    : [];

  const initialListings = initialListingIds
    ? listings.filter(p => initialListingIds.has(p.id))
    : listings;

  // Render initial listings first, then user-added listings
  const combinedListings = initialListingIds ? [...initialListings, ...userAddedListings] : listings;

  return (
    <>
      {title && (
        <div className="mb-8 animate-fade-in">
          <div className="flex justify-between items-center mb-2">
            <h1 className="text-3xl md:text-4xl font-bold text-foreground">
              {title}
            </h1>
            <Button size="lg" className="rounded-full w-12 h-12 bg-accent hover:bg-accent-light" onClick={onPlusClick}>
              <Plus className="w-6 h-6" />
            </Button>
          </div>
          {description && (
            <p className="text-lg text-muted-foreground">
              {description}
            </p>
          )}
        </div>
      )}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 md:gap-6">
        {combinedListings.map((listing, index) => (
          <div
            key={`${listing.id}-${listing.createdBy || 'default'}-${index}`}
            className="bg-card rounded-lg overflow-hidden shadow-sm border border-border hover:shadow-lg transition-all duration-300 hover-scale animate-scale-in cursor-pointer"
            style={{ animationDelay: `${index * 100}ms` }}
            onClick={() => handlePropertyClick(listing.id)}
          >
            <div className="relative">
              <img
                src={listing.images && listing.images.length > 0 ? listing.images[0] : "/src/assets/house-1.jpg"}
                alt={listing.title}
                className="w-full h-48 object-cover"
              />
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  const isAuthenticated = !!localStorage.getItem("currentUser");
                  if (!isAuthenticated) {
                    navigate("/register");
                    return;
                  }
                  if (onRemoveFavorite && favorites.has(listing.id)) {
                    onRemoveFavorite(listing.id);
                  } else {
                    toggleFavorite(listing.id);
                  }
                }}
                className="absolute top-3 right-3 w-8 h-8 bg-white/90 rounded-full flex items-center justify-center hover:bg-white transition-colors shadow-sm"
              >
                <Heart
                  className={`w-4 h-4 transition-colors ${
                    favorites.has(listing.id)
                      ? "fill-red-500 text-red-500"
                      : "text-gray-600"
                  }`}
                />
              </button>
              {listing.isFeatured && (
                <div className="absolute top-3 left-3 bg-primary text-primary-foreground px-2 py-1 rounded text-xs font-medium">
                  Featured
                </div>
              )}
            </div>

            <div className="p-4">
              <div className="flex items-center justify-between mb-1">
                <div className="text-xl font-bold text-foreground mx-4">
                  {listing.price}
                </div>
              </div>
              <div className="flex justify-center mb-2">
                <Button
                  size="sm"
                  variant="outline"
                  onClick={(e) => {
                    e.stopPropagation();
                    if (onEditClick) {
                      onEditClick(listing);
                    }
                  }}
                >
                  Set Changes
                </Button>
                {(!initialListingIds || !initialListingIds.has(listing.id)) && onDeleteClick && (
                <Button
                  size="sm"
                  variant="destructive"
                  className="ml-2"
                  onClick={(e) => {
                    e.stopPropagation();
                    onDeleteClick(listing.id);
                  }}
                >
                  Delete
                </Button>
                )}
              </div>

              <h3 className="font-semibold text-foreground mb-1 line-clamp-1">
                {listing.title}
              </h3>

              <p className="text-sm text-muted-foreground mb-3 line-clamp-1">
                {listing.description}
              </p>

              <div className="flex justify-between items-center text-xs text-muted-foreground">
                <span className="uppercase font-medium truncate mr-2">
                  {listing.location}
                </span>
                <span className="whitespace-nowrap">
                  {listing.date}
                </span>
              </div>
            </div>
          </div>
        ))}
      </div>

    </>
  );
};

export default PropertyGrid;
