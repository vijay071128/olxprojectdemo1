import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
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

const Apartments = () => {
  const navigate = useNavigate();

  const initialApartmentListings: Property[] = [
    {
      id: 5,
      images: ["/src/assets/apartment-1.jpg"],
      price: "₹ 15,00,000",
      title: "2 BHK Apartment",
      description: "Modern apartment with amenities",
      location: "INDIRANAGAR, BANGALORE",
      date: "1 DAY AGO",
      isFeatured: true,
      category: 'apartment' as const,
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
      category: 'apartment' as const,
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
      category: 'apartment' as const,
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
      category: 'apartment' as const,
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
      category: 'apartment' as const,
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
      category: 'apartment' as const,
      type: 'residential'
    }
  ];

  const [searchTerm, setSearchTerm] = useState("");
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

  const apartmentUserProperties = userProperties.filter(p => p.category === 'apartment');
  const allListings = [...initialApartmentListings, ...apartmentUserProperties];

  const filteredListings = allListings.filter((listing) =>
    listing.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
    listing.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
    listing.location.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handlePlusClick = () => {
    const isAuthenticated = !!localStorage.getItem("currentUser");
    if (!isAuthenticated) {
      navigate("/login");
      return;
    }

    const listingMode = (localStorage.getItem('listingMode') as 'rent' | 'sale') ?? 'sale';
    const newId = Math.max(...allListings.map(p => p.id), 0) + 1;
    const newProperty: Property = {
      id: newId,
      images: [],
      price: "",
      title: "",
      description: "",
      location: "",
      date: "JUST ADDED",
      isFeatured: false,
      category: 'apartment',
      type: 'residential',
      listingType: listingMode,
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

  return (
    <div className="min-h-screen bg-background">
      <Header />
      <main className="py-8">
        <div className="container mx-auto px-4">
          <div className="mb-8 animate-fade-in">
            <input
              type="text"
              placeholder="Search apartments..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full p-2 mb-6 border border-gray-300 rounded"
            />
          </div>
          <PropertyGrid
            listings={filteredListings}
            title="Apartments for Sale"
            description="Discover modern apartments in prime locations"
            onPlusClick={handlePlusClick}
            onEditClick={handleEditClick}
            onDeleteClick={(id) => {
              const property = filteredListings.find(p => p.id === id);
              if (property && 'createdBy' in property && property.createdBy === currentUserId) {
                if (window.confirm("Are you sure you want to delete this property?")) {
                  const updatedProperties = userProperties.filter(p => p.id !== id);
                  setUserProperties(updatedProperties);
                  localStorage.setItem("userProperties", JSON.stringify(updatedProperties));
                  toast({
                    title: "Property Deleted",
                    description: "Your property has been deleted successfully."
                  });
                }
              } else {
                toast({
                  title: "Delete Not Allowed",
                  description: "You can only delete properties you created."
                });
              }
            }}
            initialListingIds={new Set(initialApartmentListings.map(p => p.id))}
          />
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

export default Apartments;
