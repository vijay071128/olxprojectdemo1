import { useSearchParams } from "react-router-dom";
import { useEffect, useState } from "react";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import PropertyGrid from "@/components/PropertyGrid";
import { searchProperties, type Property } from "@/data/properties";

// Generate or get current user ID
const getCurrentUserId = () => {
  let userId = localStorage.getItem("currentUserId");
  if (!userId) {
    userId = Date.now().toString();
    localStorage.setItem("currentUserId", userId);
  }
  return userId;
};

const Search = () => {
  const [searchParams] = useSearchParams();
  const query = searchParams.get('q') || '';
  const [results, setResults] = useState<Property[]>([]);
  const [loading, setLoading] = useState(true);
  const [userProperties, setUserProperties] = useState<Property[]>([]);
  const [initialListingIds, setInitialListingIds] = useState<Set<number>>(new Set());

  const currentUserId = getCurrentUserId();

  // Load user properties on mount
  useEffect(() => {
    const loadUserProperties = () => {
      const stored = localStorage.getItem("userProperties");
      if (stored) {
        try {
          const parsed = JSON.parse(stored);
          // Add createdBy to existing properties if missing
          const updatedProperties = parsed.map((property: Property) => ({
            ...property,
            createdBy: property.createdBy || currentUserId
          }));
          setUserProperties(updatedProperties);
          // Update localStorage with the corrected data
          localStorage.setItem("userProperties", JSON.stringify(updatedProperties));
        } catch (error) {
          console.error("Error parsing userProperties from localStorage:", error);
          setUserProperties([]);
        }
      } else {
        setUserProperties([]);
      }
    };

    loadUserProperties();

    // Listen for storage changes
    const handleStorageChange = (e: StorageEvent) => {
      if (e.key === "userProperties") {
        loadUserProperties();
      }
    };

    window.addEventListener("storage", handleStorageChange);
    return () => window.removeEventListener("storage", handleStorageChange);
  }, [currentUserId]);

  // Category-specific listings (matching the 6 listings in each category page)
  const getCategoryListings = (category: string) => {
    const categoryData: { [key: string]: Property[] } = {
      house: [
        {
          id: 1,
          images: ["/src/assets/house-1.jpg"],
          price: "₹ 25,00,000",
          title: "3 BHK Independent House",
          description: "Spacious family home with garden",
          location: "SECTOR 21, GURGAON",
          date: "2 DAYS AGO",
          isFeatured: true,
          category: 'house',
          type: 'residential'
        },
        {
          id: 2,
          images: ["/src/assets/house-2.jpg"],
          price: "₹ 18,50,000",
          title: "2 BHK Row House",
          description: "Modern design with parking",
          location: "DWARKA, NEW DELHI",
          date: "4 DAYS AGO",
          isFeatured: false,
          category: 'house',
          type: 'residential'
        },
        {
          id: 3,
          images: ["/src/assets/house-3.jpg"],
          price: "₹ 35,00,000",
          title: "4 BHK Duplex House",
          description: "Luxury duplex with terrace",
          location: "BANJARA HILLS, HYDERABAD",
          date: "1 WEEK AGO",
          isFeatured: true,
          category: 'house',
          type: 'residential'
        },
        {
          id: 4,
          images: ["/src/assets/house-4.jpg"],
          price: "₹ 22,00,000",
          title: "3 BHK Villa Style",
          description: "Villa style independent house",
          location: "KORAMANGALA, BANGALORE",
          date: "3 DAYS AGO",
          isFeatured: false,
          category: 'house',
          type: 'residential'
        },
        {
          id: 16,
          images: ["/src/assets/house-5.jpg"],
          price: "₹ 28,00,000",
          title: "2 BHK Cottage Style",
          description: "Beautiful cottage with garden",
          location: "JUBILEE HILLS, HYDERABAD",
          date: "5 DAYS AGO",
          isFeatured: false,
          category: 'house',
          type: 'residential'
        },
        {
          id: 17,
          images: ["/src/assets/house-6.jpg"],
          price: "₹ 45,00,000",
          title: "5 BHK Luxury House",
          description: "Premium luxury independent house",
          location: "DEFENSE COLONY, NEW DELHI",
          date: "1 DAY AGO",
          isFeatured: true,
          category: 'house',
          type: 'residential'
        }
      ],
      apartment: [
        {
          id: 5,
          images: ["/src/assets/apartment-1.jpg"],
          price: "₹ 15,00,000",
          title: "2 BHK Apartment",
          description: "Modern apartment with amenities",
          location: "INDIRANAGAR, BANGALORE",
          date: "1 DAY AGO",
          isFeatured: true,
          category: 'apartment',
          type: 'residential'
        },
        {
          id: 6,
          images: ["/src/assets/apartment-2.jpg"],
          price: "₹ 12,50,000",
          title: "1 BHK Studio Apartment",
          description: "Compact and well-designed studio",
          location: "POWAI, MUMBAI",
          date: "3 DAYS AGO",
          isFeatured: false,
          category: 'apartment',
          type: 'residential'
        },
        {
          id: 7,
          images: ["/src/assets/house-1.jpg"],
          price: "₹ 22,00,000",
          title: "3 BHK Premium Apartment",
          description: "Luxury apartment with city view",
          location: "CYBER CITY, GURGAON",
          date: "2 DAYS AGO",
          isFeatured: true,
          category: 'apartment',
          type: 'residential'
        },
        {
          id: 8,
          images: ["/src/assets/house-2.jpg"],
          price: "₹ 18,00,000",
          title: "2 BHK Furnished Apartment",
          description: "Fully furnished ready to move",
          location: "HITECH CITY, HYDERABAD",
          date: "4 DAYS AGO",
          isFeatured: false,
          category: 'apartment',
          type: 'residential'
        },
        {
          id: 18,
          images: ["/src/assets/house-3.jpg"],
          price: "₹ 35,00,000",
          title: "4 BHK Penthouse",
          description: "Luxury penthouse with terrace",
          location: "WORLI, MUMBAI",
          date: "1 WEEK AGO",
          isFeatured: true,
          category: 'apartment',
          type: 'residential'
        },
        {
          id: 19,
          images: ["/src/assets/house-4.jpg"],
          price: "₹ 8,50,000",
          title: "1 BHK Compact Apartment",
          description: "Affordable compact living space",
          location: "WHITEFIELD, BANGALORE",
          date: "6 DAYS AGO",
          isFeatured: false,
          category: 'apartment',
          type: 'residential'
        }
      ],
      villa: [
        {
          id: 9,
          images: ["/src/assets/villa-1.jpg"],
          price: "₹ 85,00,000",
          title: "4 BHK Luxury Villa",
          description: "Premium villa with swimming pool",
          location: "JUBILEE HILLS, HYDERABAD",
          date: "2 DAYS AGO",
          isFeatured: true,
          category: 'villa',
          type: 'luxury'
        },
        {
          id: 10,
          images: ["/src/assets/villa-2.jpg"],
          price: "₹ 65,00,000",
          title: "3 BHK Garden Villa",
          description: "Beautiful villa with landscaped garden",
          location: "WHITEFIELD, BANGALORE",
          date: "1 DAY AGO",
          isFeatured: true,
          category: 'villa',
          type: 'luxury'
        },
        {
          id: 11,
          images: ["/src/assets/house-1.jpg"],
          price: "₹ 1,20,00,000",
          title: "5 BHK Premium Villa",
          description: "Ultra-luxury villa with all amenities",
          location: "BANDRA, MUMBAI",
          date: "4 DAYS AGO",
          isFeatured: true,
          category: 'villa',
          type: 'luxury'
        },
        {
          id: 20,
          images: ["/src/assets/house-2.jpg"],
          price: "₹ 95,00,000",
          title: "4 BHK Modern Villa",
          description: "Contemporary design with smart features",
          location: "DLF PHASE 3, GURGAON",
          date: "3 DAYS AGO",
          isFeatured: false,
          category: 'villa',
          type: 'luxury'
        },
        {
          id: 21,
          images: ["/src/assets/house-3.jpg"],
          price: "₹ 75,00,000",
          title: "3 BHK Pool Villa",
          description: "Villa with private swimming pool",
          location: "ECR, CHENNAI",
          date: "5 DAYS AGO",
          isFeatured: false,
          category: 'villa',
          type: 'luxury'
        },
        {
          id: 22,
          images: ["/src/assets/house-4.jpg"],
          price: "₹ 2,00,00,000",
          title: "6 BHK Luxury Villa",
          description: "Grand villa with multiple amenities",
          location: "GOLF COURSE ROAD, GURGAON",
          date: "1 WEEK AGO",
          isFeatured: true,
          category: 'villa',
          type: 'luxury'
        }
      ],
      land: [
        {
          id: 12,
          images: ["/src/assets/land-1.jpg"],
          price: "₹ 45,00,000",
          title: "5000 sq ft Residential Plot",
          description: "Prime residential plot for construction",
          location: "SECTOR 45, NOIDA",
          date: "1 DAY AGO",
          isFeatured: true,
          category: 'land',
          type: 'plot'
        },
        {
          id: 13,
          images: ["/src/assets/land-2.jpg"],
          price: "₹ 25,00,000",
          title: "3000 sq ft Plot",
          description: "Ready to construct residential plot",
          location: "ELECTRONIC CITY, BANGALORE",
          date: "3 DAYS AGO",
          isFeatured: false,
          category: 'land',
          type: 'plot'
        },
        {
          id: 14,
          images: ["/src/assets/house-1.jpg"],
          price: "₹ 80,00,000",
          title: "8000 sq ft Commercial Land",
          description: "Prime commercial plot near highway",
          location: "NH8, GURGAON",
          date: "2 DAYS AGO",
          isFeatured: true,
          category: 'land',
          type: 'commercial'
        },
        {
          id: 15,
          images: ["/src/assets/house-2.jpg"],
          price: "₹ 1,20,00,000",
          title: "1 Acre Farm Land",
          description: "Agricultural land with water facility",
          location: "OUTSKIRTS, PUNE",
          date: "1 WEEK AGO",
          isFeatured: true,
          category: 'land',
          type: 'agricultural'
        },
        {
          id: 23,
          images: ["/src/assets/house-3.jpg"],
          price: "₹ 35,00,000",
          title: "4000 sq ft Corner Plot",
          description: "Corner plot with good connectivity",
          location: "KOMPALLY, HYDERABAD",
          date: "4 DAYS AGO",
          isFeatured: false,
          category: 'land',
          type: 'plot'
        },
        {
          id: 24,
          images: ["/src/assets/house-4.jpg"],
          price: "₹ 60,00,000",
          title: "6000 sq ft Industrial Plot",
          description: "Industrial plot in developed area",
          location: "OKHLA, NEW DELHI",
          date: "5 DAYS AGO",
          isFeatured: false,
          category: 'land',
          type: 'industrial'
        }
      ]
    };
    return categoryData[category] || [];
  };

  useEffect(() => {
    setLoading(true);
    // Simulate search delay for better UX
    const timer = setTimeout(() => {
      const searchTerm = query.toLowerCase().trim();

      // Check if search term matches category keywords - show only the 6 custom listings plus user-created ones
      const categoryKeywords = {
        house: 'house',
        houses: 'house',
        apartment: 'apartment',
        apartments: 'apartment',
        flat: 'apartment',
        flats: 'apartment',
        villa: 'villa',
        villas: 'villa',
        land: 'land',
        lands: 'land',
        plot: 'land',
        plots: 'land'
      };

      // Handle special keywords
      const specialKeywords = {
        bhk: () => [...getCategoryListings('house'), ...getCategoryListings('apartment')],
        luxury: () => searchProperties('luxury')
      };

      if (categoryKeywords[searchTerm]) {
        // Only show user-created properties for category searches
        const userCategoryProperties = userProperties.filter(p => p.category === categoryKeywords[searchTerm]);
        setResults(userCategoryProperties);
        // No initial listing IDs since we're only showing user-created properties
        setInitialListingIds(new Set());
      } else if (specialKeywords[searchTerm]) {
        const specialResults = specialKeywords[searchTerm]();
        setResults(specialResults);
        setInitialListingIds(new Set());
      } else {
        // For other search terms, use global search plus user properties
        const searchResults = searchProperties(query);
        const userSearchResults = userProperties.filter(p =>
          p.title.toLowerCase().includes(searchTerm) ||
          p.description.toLowerCase().includes(searchTerm) ||
          p.location.toLowerCase().includes(searchTerm)
        );
        setResults([...searchResults, ...userSearchResults]);
        setInitialListingIds(new Set());
      }

      setLoading(false);
    }, 300);

    return () => clearTimeout(timer);
  }, [query, userProperties]);

  const formatCategory = (category: string) => {
    const categoryMap: { [key: string]: string } = {
      house: 'Houses',
      apartment: 'Apartments', 
      villa: 'Villas',
      land: 'Lands'
    };
    return categoryMap[category] || category;
  };

  const getCategoryStats = () => {
    const stats: { [key: string]: number } = {};
    results.forEach(property => {
      const category = formatCategory(property.category);
      stats[category] = (stats[category] || 0) + 1;
    });
    return stats;
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-background">
        <Header />
        <main className="py-8">
          <div className="container mx-auto px-4">
            <div className="flex items-center justify-center h-64">
              <div className="animate-pulse text-muted-foreground">
                Searching properties...
              </div>
            </div>
          </div>
        </main>
        <Footer />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background">
      <Header />
      <main className="py-8">
        <div className="container mx-auto px-4">
          <div className="mb-8 animate-fade-in">
            <h1 className="text-3xl md:text-4xl font-bold text-foreground mb-2">
              {query ? `Search Results for "${query}"` : 'All Properties'}
            </h1>
            
            {results.length > 0 ? (
              <div className="flex flex-wrap gap-4 text-muted-foreground mb-4">
                <span>{results.length} properties found</span>
                {Object.entries(getCategoryStats()).map(([category, count]) => (
                  <span key={category} className="bg-secondary px-3 py-1 rounded-full text-sm">
                    {category}: {count}
                  </span>
                ))}
              </div>
            ) : (
              <p className="text-muted-foreground">
                No properties found matching "{query}". Try searching for "house", "apartment", "villa", or "land".
              </p>
            )}
          </div>

          {results.length > 0 && (
            <PropertyGrid
              listings={results}
              onEditClick={(property) => {
                // Handle edit click - could navigate to edit page or open modal
                console.log('Edit property:', property);
              }}
              onDeleteClick={(id) => {
                // Handle delete click - only allow if user created this property
                const property = results.find(p => p.id === id);
                if (property && 'createdBy' in property && property.createdBy === currentUserId) {
                  if (window.confirm("Are you sure you want to delete this property?")) {
                    const updatedProperties = userProperties.filter(p => p.id !== id);
                    setUserProperties(updatedProperties);
                    localStorage.setItem("userProperties", JSON.stringify(updatedProperties));
                    // Update results to reflect the deletion
                    setResults(prevResults => prevResults.filter(p => p.id !== id));
                  }
                } else {
                  alert("You can only delete properties you created.");
                }
              }}
              initialListingIds={initialListingIds}
            />
          )}

          {results.length === 0 && query && (
            <div className="text-center py-16">
              <div className="text-6xl mb-4">🔍</div>
              <h3 className="text-xl font-semibold text-foreground mb-2">
                No properties found
              </h3>
              <p className="text-muted-foreground mb-6">
                Try searching with different keywords like:
              </p>
              <div className="flex flex-wrap justify-center gap-2">
                {['house', 'apartment', 'villa', 'land', 'BHK', 'luxury', 'plot'].map((suggestion) => (
                  <a
                    key={suggestion}
                    href={`/search?q=${suggestion}`}
                    className="bg-primary/10 text-primary px-4 py-2 rounded-lg hover:bg-primary/20 transition-colors"
                  >
                    {suggestion}
                  </a>
                ))}
              </div>
            </div>
          )}
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default Search;