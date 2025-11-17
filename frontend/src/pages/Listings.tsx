import { useState, useEffect } from "react";
import { useSearchParams, useNavigate } from "react-router-dom";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import PropertyGrid from "@/components/PropertyGrid";
import PropertyEditModal from "@/components/PropertyEditModal";
import { type Property } from "@/data/properties";
import { toast } from "@/hooks/use-toast";

// Generate or get current user ID
const getCurrentUserId = () => {
  let userId = localStorage.getItem("currentUserId");
  if (!userId) {
    userId = Date.now().toString();
    localStorage.setItem("currentUserId", userId);
  }
  return userId;
};

const Listings = () => {
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  const mode = searchParams.get("mode") as "rent" | "sale" | null;
  const [userProperties, setUserProperties] = useState<Property[]>([]);
  const [editingProperty, setEditingProperty] = useState<Property | null>(null);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);

  const currentUserId = getCurrentUserId();

  useEffect(() => {
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
      }
    }
  }, [currentUserId]);

  const filteredListings = userProperties.filter(p => p.listingType === mode);

  const handlePlusClick = () => {
    const isAuthenticated = !!localStorage.getItem("currentUser");
    if (!isAuthenticated) {
      navigate("/login");
      return;
    }

    const newId = Math.max(...userProperties.map(p => p.id), 0) + 1;
    const newProperty: Property = {
      id: newId,
      images: [],
      price: "",
      title: "",
      description: "",
      location: "",
      date: "JUST ADDED",
      isFeatured: false,
      category: 'house',
      type: 'residential',
      listingType: mode || 'sale',
      contact: {
        name: "",
        phoneNumbers: [""],
        mapUrl: ""
      }
    };
    setEditingProperty(newProperty);
    setIsEditModalOpen(true);
  };

  const handleEditClick = (property: Property) => {
    setEditingProperty(property);
    setIsEditModalOpen(true);
  };

  const handleSaveProperty = (property: Property) => {
    const isExisting = userProperties.some(p => p.id === property.id);
    let updatedProperties;
    if (isExisting) {
      updatedProperties = userProperties.map(p => p.id === property.id ? property : p);
    } else {
      updatedProperties = [...userProperties, property];
    }
    setUserProperties(updatedProperties);
    localStorage.setItem("userProperties", JSON.stringify(updatedProperties));
    setIsEditModalOpen(false);
    setEditingProperty(null);
    toast({
      title: "Property Saved",
      description: "Your property has been saved successfully."
    });
  };

  const handleCloseModal = () => {
    setIsEditModalOpen(false);
    setEditingProperty(null);
  };

  const getTitle = () => {
    if (mode === 'rent') return "For Rent";
    if (mode === 'sale') return "For Sale";
    return "My Listings";
  };

  const getDescription = () => {
    if (mode === 'rent') return "Properties available for rent";
    if (mode === 'sale') return "Properties available for sale";
    return "All your listed properties";
  };

  return (
    <div className="min-h-screen bg-background">
      <Header />
      <main className="py-8">
        <div className="container mx-auto px-4">
          <div className="mb-8 animate-fade-in">
            <h1 className="text-3xl md:text-4xl font-bold text-foreground mb-2">
              {getTitle()}
            </h1>
            <p className="text-muted-foreground">
              {filteredListings.length > 0
                ? `${filteredListings.length} ${filteredListings.length === 1 ? "property" : "properties"}`
                : getDescription()
              }
            </p>
          </div>

          <PropertyGrid
            listings={filteredListings}
            title=""
            description=""
            onPlusClick={handlePlusClick}
            onEditClick={handleEditClick}
            onDeleteClick={(id) => {
              if (window.confirm("Are you sure you want to delete this property?")) {
                const updatedProperties = userProperties.filter(p => p.id !== id);
                setUserProperties(updatedProperties);
                localStorage.setItem("userProperties", JSON.stringify(updatedProperties));
                toast({
                  title: "Property Deleted",
                  description: "Your property has been deleted successfully."
                });
              }
            }}
            initialListingIds={new Set()}
          />

          {filteredListings.length === 0 && (
            <div className="text-center py-16">
              <div className="text-6xl mb-4">🏠</div>
              <h3 className="text-xl font-semibold text-foreground mb-2">
                No {mode} listings yet
              </h3>
              <p className="text-muted-foreground mb-6">
                Click the + button to add your first {mode} property.
              </p>
            </div>
          )}
        </div>
      </main>
      <Footer />
      {editingProperty && (
        <PropertyEditModal
          isOpen={isEditModalOpen}
          property={editingProperty}
          onSave={handleSaveProperty}
          onClose={handleCloseModal}
        />
      )}
    </div>
  );
};

export default Listings;
