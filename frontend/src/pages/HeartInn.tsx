import { useState, useEffect } from "react";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import PropertyGrid from "@/components/PropertyGrid";
import { type Property } from "@/data/properties";

const HeartInn = () => {
  const [favorites, setFavorites] = useState<Property[]>([]);

  useEffect(() => {
    // Load favorites from localStorage
    const storedFavorites = localStorage.getItem("favorites");
    if (storedFavorites) {
      try {
        let favoritesArray = JSON.parse(storedFavorites);

        // Migrate old favorites that have 'image' to 'images'
        favoritesArray = favoritesArray.map((fav: any) => {
          if (fav.image && !fav.images) {
            fav.images = [fav.image];
            delete fav.image;
          }
          return fav;
        });

        setFavorites(favoritesArray);
        // Update localStorage with migrated data
        localStorage.setItem("favorites", JSON.stringify(favoritesArray));
      } catch (error) {
        console.error("Error parsing favorites from localStorage:", error);
      }
    }
  }, []);

  const removeFromFavorites = (propertyId: number) => {
    const updatedFavorites = favorites.filter((property) => property.id !== propertyId);
    setFavorites(updatedFavorites);
    localStorage.setItem("favorites", JSON.stringify(updatedFavorites));
  };

  const favoritesSet = new Set(favorites.map(p => p.id));

  return (
    <div className="min-h-screen bg-background">
      <Header />
      <main className="py-8">
        <div className="container mx-auto px-4">
          <div className="mb-8 animate-fade-in">
            <h1 className="text-3xl md:text-4xl font-bold text-foreground mb-2">
              My Favorites
            </h1>
            {favorites.length > 0 ? (
              <p className="text-muted-foreground">
                {favorites.length} saved {favorites.length === 1 ? "property" : "properties"}
              </p>
            ) : (
              <p className="text-muted-foreground">
                No favorites yet. Click the heart icon on properties to save them here.
              </p>
            )}
          </div>

          {favorites.length > 0 && (
            <PropertyGrid
              listings={favorites}
              favorites={favoritesSet}
              onRemoveFavorite={removeFromFavorites}
            />
          )}

          {favorites.length === 0 && (
            <div className="text-center py-16">
              <div className="text-6xl mb-4">❤️</div>
              <h3 className="text-xl font-semibold text-foreground mb-2">
                No favorites yet
              </h3>
              <p className="text-muted-foreground mb-6">
                Start exploring properties and save your favorites by clicking the heart icon.
              </p>
            </div>
          )}
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default HeartInn;
