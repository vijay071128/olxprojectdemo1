import { useState, useEffect, useMemo } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Plus } from "lucide-react";
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

const PropertyListingMore = () => {
  const navigate = useNavigate();

  const initialHouseListings: Property[] = [
    {
      id: 101,
      images: ["/src/assets/apartment-1.jpg", "/src/assets/apartment-2.jpg", "/src/assets/house-1.jpg"],
      price: "₹ 32,00,000",
      title: "4 BHK Modern Apartment",
      description: "Contemporary apartment with smart home features",
      location: "MARATHAHALLI, BANGALORE",
      date: "1 DAY AGO",
      isFeatured: true,
      category: 'apartment' as const,
      type: 'residential',
      contact: {
        name: "Ravi Kumar",
        phoneNumbers: ["9876543234"],
        mapUrl: "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3887.789!2d77.7000!2d12.9900!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3bae14d4d4d4d4d4%3A0x4d4d4d4d4d4d4d4d!2sMarathahalli%2C%20Bangalore!5e0!3m2!1sen!2sin!4v1690000000000!5m2!1sen!2sin"
      }
    },
    {
      id: 102,
      images: ["/src/assets/villa-1.jpg", "/src/assets/villa-2.jpg", "/src/assets/house-2.jpg"],
      price: "₹ 75,00,000",
      title: "5 BHK Luxury Villa",
      description: "Exclusive villa with private garden and pool",
      location: "RAJARHAT, KOLKATA",
      date: "3 DAYS AGO",
      isFeatured: true,
      category: 'villa' as const,
      type: 'luxury',
      contact: {
        name: "Priya Banerjee",
        phoneNumbers: ["9876543235"],
        mapUrl: "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3684.123!2d88.4700!2d22.5800!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x39f8823b3b3b3b3b%3A0x3b3b3b3b3b3b3b3b!2sRajarhat%2C%20Kolkata!5e0!3m2!1sen!2sin!4v1690000000000!5m2!1sen!2sin"
      }
    },
    {
      id: 103,
      images: ["/src/assets/land-1.jpg", "/src/assets/land-2.jpg", "/src/assets/house-3.jpg"],
      price: "₹ 15,00,000",
      title: "2000 sq ft Residential Plot",
      description: "Prime location plot ready for construction",
      location: "INDORE, MADHYA PRADESH",
      date: "2 DAYS AGO",
      isFeatured: false,
      category: 'land' as const,
      type: 'plot',
      contact: {
        name: "Mohan Patel",
        phoneNumbers: ["9876543236"],
        mapUrl: "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3678.456!2d75.8700!2d22.7200!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3962e3e3e3e3e3e3%3A0x3e3e3e3e3e3e3e3e!2sIndore%2C%20Madhya%20Pradesh!5e0!3m2!1sen!2sin!4v1690000000000!5m2!1sen!2sin"
      }
    },
    {
      id: 104,
      images: ["/src/assets/house-4.jpg", "/src/assets/house-5.jpg", "/src/assets/apartment-1.jpg"],
      price: "₹ 42,00,000",
      title: "3 BHK Bungalow",
      description: "Spacious bungalow with modern amenities",
      location: "SALT LAKE, KOLKATA",
      date: "5 DAYS AGO",
      isFeatured: false,
      category: 'house' as const,
      type: 'residential',
      contact: {
        name: "Anita Roy",
        phoneNumbers: ["9876543237"],
        mapUrl: "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3684.789!2d88.4300!2d22.5700!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x39f8822c2c2c2c2c%3A0x2c2c2c2c2c2c2c2c!2sSalt%20Lake%2C%20Kolkata!5e0!3m2!1sen!2sin!4v1690000000000!5m2!1sen!2sin"
      }
    },
    {
      id: 105,
      images: ["/src/assets/apartment-2.jpg", "/src/assets/villa-1.jpg", "/src/assets/house-6.jpg"],
      price: "₹ 55,00,000",
      title: "4 BHK Penthouse",
      description: "Luxury penthouse with panoramic city views",
      location: "ANDHERI, MUMBAI",
      date: "1 WEEK AGO",
      isFeatured: true,
      category: 'apartment' as const,
      type: 'luxury',
      contact: {
        name: "Suresh Nair",
        phoneNumbers: ["9876543238"],
        mapUrl: "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3769.123!2d72.8700!2d19.1200!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3be7c8f8f8f8f8f8%3A0x8f8f8f8f8f8f8f8f!2sAndheri%2C%20Mumbai!5e0!3m2!1sen!2sin!4v1690000000000!5m2!1sen!2sin"
      }
    },
    {
      id: 106,
      images: ["/src/assets/land-2.jpg", "/src/assets/house-1.jpg", "/src/assets/villa-2.jpg"],
      price: "₹ 8,00,000",
      title: "1500 sq ft Commercial Plot",
      description: "Strategic location for business development",
      location: "JAIPUR, RAJASTHAN",
      date: "4 DAYS AGO",
      isFeatured: false,
      category: 'land' as const,
      type: 'commercial',
      contact: {
        name: "Rekha Singh",
        phoneNumbers: ["9876543239"],
        mapUrl: "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3556.789!2d75.7900!2d26.9100!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x396db5db5db5db5d%3A0x5db5db5db5db5db5!2sJaipur%2C%20Rajasthan!5e0!3m2!1sen!2sin!4v1690000000000!5m2!1sen!2sin"
      }
    }
  ];

  const [searchTerm, setSearchTerm] = useState("");
  const [userProperties, setUserProperties] = useState<Property[]>([]);
  const [deletedIds, setDeletedIds] = useState<Set<number>>(new Set());
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

  const allListings = useMemo(() => {
    return [...initialHouseListings, ...userProperties].filter(
      (listing) => !deletedIds.has(listing.id)
    );
  }, [userProperties, deletedIds]);

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

  const handleDeleteProperty = (id: number) => {
    const updatedProperties = userProperties.filter(p => p.id !== id);
    setUserProperties(updatedProperties);
    localStorage.setItem("userProperties", JSON.stringify(updatedProperties));

    // Add deleted id to deletedIds set (no persistence)
    const newDeletedIds = new Set(deletedIds);
    newDeletedIds.add(id);
    setDeletedIds(newDeletedIds);
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
            <div className="flex justify-between items-center mb-2">
              <h1 className="text-3xl md:text-4xl font-bold text-foreground">
                properties for sale
              </h1>
              <Button size="lg" className="rounded-full w-12 h-12 bg-accent hover:bg-accent-light" onClick={handlePlusClick}>
                <Plus className="w-6 h-6" />
              </Button>
            </div>
            <p className="text-muted-foreground">
              Find your dream home,Rent,Villas,Lands from our collection of houses
            </p>
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
            onPlusClick={handlePlusClick}
            onEditClick={handleEditClick}
            onDeleteClick={handleDeleteProperty}
            initialListingIds={new Set(initialHouseListings.map(p => p.id))}
          />

          {/* Buy Properties Section */}
          <div className="text-center mt-12 py-8">
            <Button
              size="lg"
              className="px-8"
              onClick={() => window.location.href = "/more-properties"}
            >
              Buy Properties
            </Button>
          </div>
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

export default PropertyListingMore;
