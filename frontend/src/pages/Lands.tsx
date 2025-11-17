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

const Lands = () => {
  const navigate = useNavigate();

  const initialLandListings: Property[] = [
    {
      id: 12,
      images: ["/src/assets/land-1.jpg"],
      price: "₹ 45,00,000",
      title: "5000 sq ft Residential Plot",
      description: "Prime residential plot for construction",
      location: "SECTOR 45, NOIDA",
      date: "1 DAY AGO",
      isFeatured: true,
      category: 'land' as const,
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
      category: 'land' as const,
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
      category: 'land' as const,
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
      category: 'land' as const,
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
      category: 'land' as const,
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
      category: 'land' as const,
      type: 'industrial'
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

  const landUserProperties = userProperties.filter(p => p.category === 'land');
  const allListings = [...initialLandListings, ...landUserProperties];

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
      category: 'land',
      type: 'plot',
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
              placeholder="Search lands..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full p-2 mb-6 border border-gray-300 rounded"
            />
          </div>
          <PropertyGrid
            listings={filteredListings}
            title="Land & Plots for Sale"
            description="Find prime plots and land for your dream project"
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
            initialListingIds={new Set(initialLandListings.map(p => p.id))}
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

export default Lands;
