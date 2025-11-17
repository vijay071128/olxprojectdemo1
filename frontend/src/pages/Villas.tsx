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

const Villas = () => {
  const navigate = useNavigate();

  const villaListings = [
    {
      id: 9,
      images: ["/src/assets/villa-1.jpg"],
      price: "₹ 85,00,000",
      title: "4 BHK Luxury Villa",
      description: "Premium villa with swimming pool",
      location: "JUBILEE HILLS, HYDERABAD",
      date: "2 DAYS AGO",
      isFeatured: true,
      category: 'villa' as const,
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
      category: 'villa' as const,
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
      category: 'villa' as const,
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
      category: 'villa' as const,
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
      category: 'villa' as const,
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
      category: 'villa' as const,
      type: 'luxury'
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

  const villaUserProperties = userProperties.filter(p => p.category === 'villa');
  const allListings = [...villaListings, ...villaUserProperties];

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
      category: 'villa',
      type: 'luxury',
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
              placeholder="Search villas..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full p-2 mb-6 border border-gray-300 rounded"
            />
          </div>
          <PropertyGrid
            listings={filteredListings}
            title="Luxury Villas for Sale"
            description="Explore premium villas with world-class amenities"
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
            initialListingIds={new Set(villaListings.map(p => p.id))}
          />
          {editingProperty && (
            <PropertyEditModal
              isOpen={isEditModalOpen}
              property={editingProperty}
              onSave={handleSaveProperty}
              onClose={handleCloseModal}
            />
          )}
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default Villas;
