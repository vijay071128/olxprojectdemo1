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

const Houses = () => {
  const navigate = useNavigate();

  const initialHouseListings: Property[] = [
    {
      id: 1,
      images: ["/src/assets/house-1.jpg"],
      price: "₹ 25,00,000",
      title: "3 BHK Independent House",
      description: "Spacious family home with garden",
      location: "SECTOR 21, GURGAON",
      date: "2 DAYS AGO",
      isFeatured: true,
      category: 'house' as const,
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
      category: 'house' as const,
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
      category: 'house' as const,
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
      category: 'house' as const,
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
      category: 'house' as const,
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
      category: 'house' as const,
      type: 'residential'
    }
  ];

  const [userProperties, setUserProperties] = useState<Property[]>([]);
  const [searchTerm, setSearchTerm] = useState("");
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

  const houseUserProperties = userProperties.filter(p => p.category === 'house');
  const allListings = [...initialHouseListings, ...houseUserProperties];

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
      category: 'house',
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
              placeholder="Search houses..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full p-2 mb-6 border border-gray-300 rounded"
            />
          </div>
          <PropertyGrid
            listings={filteredListings}
            title="Houses for Sale"
            description="Find your dream home from our collection of houses"
            onPlusClick={handlePlusClick}
            onEditClick={handleEditClick}
            onDeleteClick={(id) => {
              // Only allow delete if createdBy matches current user
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
            initialListingIds={new Set(initialHouseListings.map(p => p.id))}
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

export default Houses;
