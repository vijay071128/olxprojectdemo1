import { useParams, useNavigate } from "react-router-dom";
import { ArrowLeft, Heart, Share2, MapPin, Calendar, Home, Ruler, Upload, Save, Edit, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Card } from "@/components/ui/card";
import { Textarea } from "@/components/ui/textarea";
import { Input } from "@/components/ui/input";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { allProperties, type Property } from "@/data/properties";
import { useState, useEffect, useRef } from "react";
import { Carousel, CarouselContent, CarouselItem, CarouselNext, CarouselPrevious, type CarouselApi } from "@/components/ui/carousel";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";

const PropertyDetail = () => {
  const { id } = useParams();
  const navigateHook = useNavigate();
  const [property, setProperty] = useState<Property | undefined>(undefined);
  const [carouselApi, setCarouselApi] = useState<CarouselApi>();

  useEffect(() => {
    if (!id) {
      setProperty(undefined);
      return;
    }
    const propId = Number(id);
    let found;
    const stored = localStorage.getItem("userProperties");
    if (stored) {
      try {
        const userProps: Property[] = JSON.parse(stored);
        found = userProps.find((p) => p.id === propId);
        if (found) {
          setIsUserProperty(true);
        }
      } catch (error) {
        console.error("Error parsing userProperties from localStorage:", error);
      }
    }
    if (!found) {
      found = allProperties.find((p) => p.id === propId);
      setIsUserProperty(false);
    }
    setProperty(found);
  }, [id]);

  const navigate = navigateHook;

  const [isFavoritedState, setIsFavoritedState] = useState(false);
  const [shareOpenState, setShareOpenState] = useState(false);
  const [showTimingState, setShowTimingState] = useState(false);
  const [isEditingDescription, setIsEditingDescription] = useState(false);
  const [localDescription, setLocalDescription] = useState("");
  const [localImages, setLocalImages] = useState<string[]>([]);
  const [isEditingVisitTimes, setIsEditingVisitTimes] = useState(false);
  const [localVisitTimes, setLocalVisitTimes] = useState<string[]>([]);
  const [visitTimeInput, setVisitTimeInput] = useState<string>("");
  const [isUserProperty, setIsUserProperty] = useState(false);
  const [isEditingContact, setIsEditingContact] = useState(false);
  const [localContact, setLocalContact] = useState({ name: "", phoneNumbers: [""], mapUrl: "" });
  const [contactPhoneInput, setContactPhoneInput] = useState<string>("");
  const [isCropping, setIsCropping] = useState(false);
  const [cropImageIndex, setCropImageIndex] = useState<number | null>(null);
  const [cropArea, setCropArea] = useState({ x: 0, y: 0, width: 100, height: 100 });
  const isAuthenticated = !!localStorage.getItem("currentUser");

  const timings = localVisitTimes.length > 0 ? localVisitTimes : [
    "10:00 AM - 6:00 PM",
    "11:00 AM - 7:00 PM",
    "12:00 PM - 8:00 PM",
    "1:00 PM - 9:00 PM",
    "2:00 PM - 10:00 PM",
    "3:00 PM - 11:00 PM"
  ];

  const timingIndex = property ? (property.id - 1) % timings.length : 0;

  useEffect(() => {
    if (property) {
      const stored = localStorage.getItem("favorites");
      if (stored) {
        try {
          let favoritesArray = JSON.parse(stored);

          // Migrate old favorites that have 'image' to 'images'
          favoritesArray = favoritesArray.map((fav: any) => {
            if (fav.image && !fav.images) {
              fav.images = [fav.image];
              delete fav.image;
            }
            return fav;
          });

          // Update localStorage with migrated data
          localStorage.setItem("favorites", JSON.stringify(favoritesArray));

          setIsFavoritedState(favoritesArray.some((p: any) => p.id === property.id));
        } catch (error) {
          console.error("Error parsing favorites from localStorage:", error);
        }
      }
      // Initialize local state
      setLocalDescription(property.description);
      setLocalImages([...property.images]);
      setLocalVisitTimes([...(property.visitTimes || [])]);
      setLocalContact(property.contact ? { ...property.contact } : { name: "", phoneNumbers: [""], mapUrl: "" });
    }
  }, [property]);

  if (!property) {
    return (
      <div className="min-h-screen bg-background">
        <Header />
        <div className="container mx-auto px-4 py-8">
          <div className="text-center">
            <h1 className="text-2xl font-bold mb-4">Property not found</h1>
            <Button onClick={() => navigate(-1)}>Go Back</Button>
          </div>
        </div>
        <Footer />
      </div>
    );
  }

  const handleBack = () => {
    navigate(-1);
  };

  const toggleFavorite = () => {
    if (!isAuthenticated) {
      navigate("/register");
      return;
    }
    const newFavorited = !isFavoritedState;
    setIsFavoritedState(newFavorited);

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

    if (newFavorited) {
      // Add to favorites
      if (!favoritesArray.some(p => p.id === property.id)) {
        favoritesArray.push(property);
      }
    } else {
      // Remove from favorites
      favoritesArray = favoritesArray.filter(p => p.id !== property.id);
    }

    localStorage.setItem("favorites", JSON.stringify(favoritesArray));
  };

  const handleImageClick = (event: React.MouseEvent<HTMLDivElement>) => {
    if (!carouselApi) return;
    const rect = event.currentTarget.getBoundingClientRect();
    const x = event.clientX - rect.left;
    const width = rect.width;
    if (x > width / 2) {
      carouselApi.scrollNext();
    } else {
      carouselApi.scrollPrev();
    }
  };

  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (!files) return;
    const remainingSlots = 10 - localImages.length;
    if (remainingSlots <= 0) {
      alert("Maximum 10 images allowed");
      return;
    }
    const filesToProcess = Array.from(files).slice(0, remainingSlots);
    filesToProcess.forEach((file) => {
      const reader = new FileReader();
      reader.onload = (event) => {
        const base64 = event.target?.result as string;
        setLocalImages((prev) => [...prev, base64]);
      };
      reader.readAsDataURL(file);
    });
  };

  const handleRemoveImage = (img: string) => {
    setLocalImages(localImages.filter((i) => i !== img));
  };

  const handleMoveImage = (fromIndex: number, toIndex: number) => {
    const newImages = [...localImages];
    const [movedImage] = newImages.splice(fromIndex, 1);
    newImages.splice(toIndex, 0, movedImage);
    setLocalImages(newImages);
  };

  const handleSaveChanges = () => {
    // Update property in localStorage if it's a user property
    const stored = localStorage.getItem("userProperties");
    if (stored) {
      try {
        const userProps: Property[] = JSON.parse(stored);
        const updatedProps = userProps.map((p) =>
          p.id === property.id
            ? { ...p, description: localDescription, images: localImages, visitTimes: localVisitTimes, contact: localContact }
            : p
        );
        localStorage.setItem("userProperties", JSON.stringify(updatedProps));
        // Update the current property state
        setProperty({ ...property, description: localDescription, images: localImages, visitTimes: localVisitTimes, contact: localContact });
      } catch (error) {
        console.error("Error updating userProperties:", error);
      }
    }
    alert("Images saved");
    setIsEditingDescription(false);
    setIsEditingVisitTimes(false);
    setIsEditingContact(false);
  };

  const handleAddVisitTime = () => {
    if (visitTimeInput.trim() === "") return;
    if (!localVisitTimes.includes(visitTimeInput.trim())) {
      setLocalVisitTimes([...localVisitTimes, visitTimeInput.trim()]);
    }
    setVisitTimeInput("");
  };

  const handleRemoveVisitTime = (time: string) => {
    setLocalVisitTimes(localVisitTimes.filter((t) => t !== time));
  };

  const handleCropImage = () => {
    if (cropImageIndex === null) return;

    const img = new Image();
    img.crossOrigin = 'anonymous';

    img.onload = () => {
      const canvas = document.createElement('canvas');
      const ctx = canvas.getContext('2d');

      if (!ctx) {
        alert('Canvas not supported');
        return;
      }

      // Set canvas size to crop area dimensions
      canvas.width = cropArea.width;
      canvas.height = cropArea.height;

      // Draw the cropped portion directly without scaling issues
      ctx.drawImage(
        img,
        cropArea.x,
        cropArea.y,
        cropArea.width,
        cropArea.height,
        0,
        0,
        cropArea.width,
        cropArea.height
      );

      try {
        const croppedImage = canvas.toDataURL('image/jpeg', 0.9);
        const newImages = [...localImages];
        newImages[cropImageIndex] = croppedImage;
        setLocalImages(newImages);

        setIsCropping(false);
        setCropImageIndex(null);
      } catch (error) {
        console.error('Error cropping image:', error);
        alert('Failed to crop image. Please try again.');
      }
    };

    img.onerror = () => {
      alert('Failed to load image for cropping');
    };

    img.src = localImages[cropImageIndex];
  };

  return (
    <div className="min-h-screen bg-background">
      <Header />

      <main className="py-8">
        <div className="container mx-auto px-4">
          {/* Back Button */}
          <Button
            variant="ghost"
            onClick={handleBack}
            className="mb-6 hover:bg-muted"
          >
            <ArrowLeft className="w-4 h-4 mr-2" />
            Back to Properties
          </Button>

          <div className="grid lg:grid-cols-3 gap-8">
            {/* Property Images */}
            <div className="lg:col-span-2">
              <div className="relative">
                <Carousel className="w-full h-96 rounded-lg shadow-lg relative" setApi={setCarouselApi}>
                  <CarouselContent className="h-96" onClick={handleImageClick}>
                    {localImages.map((img, index) => (
                      <CarouselItem key={index}>
                        <img
                          src={img}
                          alt={`${property.title} image ${index + 1}`}
                          className="w-full h-96 object-cover rounded-lg cursor-pointer"
                        />
                      </CarouselItem>
                    ))}
                  </CarouselContent>
                  <CarouselPrevious className="absolute left-4 top-1/2 -translate-y-1/2 bg-white/80 hover:bg-white border-0 h-10 w-10" />
                  <CarouselNext className="absolute right-4 top-1/2 -translate-y-1/2 bg-white/80 hover:bg-white border-0 h-10 w-10" />
                </Carousel>
                {property.isFeatured && (
                  <Badge className="absolute top-4 left-4 bg-primary text-primary-foreground">
                    Featured
                  </Badge>
                )}
                <div className="absolute top-4 right-4 flex gap-2">
                  <Button
                    size="sm"
                    variant="secondary"
                    onClick={toggleFavorite}
                    className="bg-white/90 hover:bg-white"
                  >
                    <Heart
                      className={`w-4 h-4 ${
                        isFavoritedState ? "fill-red-500 text-red-500" : "text-gray-600"
                      }`}
                    />
                  </Button>
                  <Popover
                    open={shareOpenState}
                    onOpenChange={(open) => {
                      if (!isAuthenticated) {
                        navigate("/register");
                        return;
                      }
                      setShareOpenState(open);
                    }}
                  >
                    <PopoverTrigger asChild>
                      <Button size="sm" variant="secondary" className="bg-white/90 hover:bg-white">
                        <Share2 className="w-4 h-4" />
                      </Button>
                    </PopoverTrigger>
                    <PopoverContent className="w-48">
                      <div className="space-y-2">
                        <Button
                          variant="ghost"
                          className="w-full justify-start"
                          onClick={() => {
                            window.open(`https://wa.me/?text=${encodeURIComponent(window.location.href)}`, '_blank');
                            setShareOpenState(false);
                          }}
                        >
                          WhatsApp
                        </Button>
                        <Button
                          variant="ghost"
                          className="w-full justify-start"
                          onClick={() => {
                            window.open(`https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(window.location.href)}`, '_blank');
                            setShareOpenState(false);
                          }}
                        >
                          Facebook
                        </Button>
                        <Button
                          variant="ghost"
                          className="w-full justify-start"
                          onClick={() => {
                            const message = `Check out this ${property.category}: ${property.title} in ${property.location} for ${property.price}. ${property.description}`;
                            window.open(`https://twitter.com/intent/tweet?text=${encodeURIComponent(message)}&url=${encodeURIComponent(window.location.href)}`, '_blank');
                            setShareOpenState(false);
                          }}
                        >
                          Twitter
                        </Button>
                        <Button
                          variant="ghost"
                          className="w-full justify-start"
                          onClick={() => {
                            navigator.clipboard.writeText(window.location.href);
                            alert('Link copied to clipboard!');
                            setShareOpenState(false);
                          }}
                        >
                          Instagram (Copy Link)
                        </Button>
                      </div>
                    </PopoverContent>
                  </Popover>
                </div>
              </div>

              {/* Image Upload Section */}
              <Card className="mt-6 p-6">
                <h3 className="text-lg font-semibold mb-4">Manage Images (Max 10)</h3>
                <div className="space-y-4">
                  <div>
                    <input
                      type="file"
                      multiple
                      accept="image/*"
                      onChange={handleFileUpload}
                      className="block w-full text-sm text-gray-500 file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-blue-50 file:text-blue-700 hover:file:bg-blue-100"
                    />
                  </div>
                  <div className="flex flex-wrap gap-2">
                    {localImages.map((img, index) => (
                      <div key={index} className="relative group">
                        <img src={img} alt={`property image ${index + 1}`} className="w-24 h-16 object-cover rounded" />
                        <div className="absolute top-0 right-0 flex gap-1">
                          {index > 0 && (
                            <button
                              onClick={() => handleMoveImage(index, index - 1)}
                              className="bg-blue-600 text-white rounded-full w-5 h-5 flex items-center justify-center text-xs opacity-0 group-hover:opacity-100 transition-opacity"
                              aria-label="Move left"
                            >
                              ←
                            </button>
                          )}
                          {index < localImages.length - 1 && (
                            <button
                              onClick={() => handleMoveImage(index, index + 1)}
                              className="bg-blue-600 text-white rounded-full w-5 h-5 flex items-center justify-center text-xs opacity-0 group-hover:opacity-100 transition-opacity"
                              aria-label="Move right"
                            >
                              →
                            </button>
                          )}
                          <button
                            onClick={() => handleRemoveImage(img)}
                            className="bg-red-600 text-white rounded-full w-5 h-5 flex items-center justify-center text-xs opacity-0 group-hover:opacity-100 transition-opacity"
                            aria-label="Remove image"
                          >
                            <X className="w-3 h-3" />
                          </button>
                        </div>
                      </div>
                    ))}
                  </div>
                  <Button onClick={handleSaveChanges} className="w-full">
                    <Save className="w-4 h-4 mr-2" />
                    Save Changes
                  </Button>
                </div>
              </Card>

              {/* Property Details */}
              <Card className="mt-6 p-6">
                <h1 className="text-3xl font-bold text-foreground mb-2">
                  {property.title}
                </h1>

                <div className="flex items-center gap-2 mb-4 text-muted-foreground">
                  <MapPin className="w-4 h-4" />
                  <span className="text-sm uppercase font-medium">
                    {property.location}
                  </span>
                </div>

                <p className="text-lg text-muted-foreground mb-6">
                  {localDescription}
                </p>

                <div className="grid sm:grid-cols-3 gap-4 mb-6">
                  <div className="flex items-center gap-2">
                    <Home className="w-5 h-5 text-primary" />
                    <div>
                      <p className="text-sm font-medium">Type</p>
                      <p className="text-sm text-muted-foreground capitalize">
                        {property.category}
                      </p>
                    </div>
                  </div>

                  <div className="flex items-center gap-2">
                    <Calendar className="w-5 h-5 text-primary" />
                    <div>
                      <p className="text-sm font-medium">Listed</p>
                      <p className="text-sm text-muted-foreground">
                        {property.date}
                      </p>
                    </div>
                  </div>

                  <div className="flex items-center gap-2">
                    <Ruler className="w-5 h-5 text-primary" />
                    <div>
                      <p className="text-sm font-medium">Property ID</p>
                      <p className="text-sm text-muted-foreground mx-2">
                        #{property.id.toString().padStart(4, '0')}
                      </p>
                    </div>
                  </div>
                </div>

                <div className="border-t pt-6">
                  <div className="flex items-center justify-between mb-3">
                    <h3 className="text-lg font-semibold">Description</h3>
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => setIsEditingDescription(!isEditingDescription)}
                    >
                      <Edit className="w-4 h-4 mr-2" />
                      {isEditingDescription ? "Cancel" : "Edit"}
                    </Button>
                  </div>
                  {isEditingDescription ? (
                    <div className="space-y-4">
                      <Textarea
                        value={localDescription}
                        onChange={(e) => setLocalDescription(e.target.value)}
                        placeholder="Enter property description..."
                        className="min-h-32"
                      />
                      <div className="flex gap-2">
                        <Button onClick={handleSaveChanges}>
                          <Save className="w-4 h-4 mr-2" />
                          Save Description
                        </Button>
                        <Button
                          variant="outline"
                          onClick={() => {
                            setLocalDescription(property.description);
                            setIsEditingDescription(false);
                          }}
                        >
                          Cancel
                        </Button>
                      </div>
                    </div>
                  ) : (
                    <p className="text-muted-foreground leading-relaxed">
                      {localDescription || "This property offers excellent value and is perfect for those seeking a quality property. The property features modern amenities and is well-maintained. Located in a prime area with easy access to transportation, shopping, and entertainment facilities."}
                    </p>
                  )}
                </div>
              </Card>
            </div>

            {/* Price and Contact */}
            <div className="lg:col-span-1">
              <Card className="p-6 sticky top-4">
                <div className="text-3xl font-bold text-foreground mb-1 mx-4">
                  {property.price}
                </div>
                <p className="text-sm text-muted-foreground mb-6">
                  {property.type === 'luxury' ? 'Luxury Property' :
                   property.type === 'commercial' ? 'Commercial Property' :
                   property.type === 'plot' ? 'Land Plot' :
                   property.type === 'industrial' ? 'Industrial Land' :
                   property.type === 'agricultural' ? 'Agricultural Land' :
                   'Residential Property'}
                </p>

                <div className="space-y-3 mb-6">
                  <Button
                    className="w-full"
                    size="lg"
                    onClick={() => {
                      if (!isAuthenticated) {
                        navigate("/register");
                        return;
                      }
                      navigate(`/property-contact/${property.id}`);
                    }}
                  >
                    Contact Seller
                  </Button>
                  <Button
                    variant="outline"
                    className="w-full"
                    size="lg"
                    onClick={() => {
                      if (!isAuthenticated) {
                        navigate("/register");
                        return;
                      }
                      if (isUserProperty) {
                        setIsEditingVisitTimes(!isEditingVisitTimes);
                      } else {
                        setShowTimingState(!showTimingState);
                      }
                    }}
                  >
                    {isUserProperty ? (isEditingVisitTimes ? "Cancel Edit" : "Schedule Visit") : (showTimingState ? "Hide Timings" : "Schedule Visit")}
                  </Button>
                </div>

                {showTimingState && !isUserProperty && (
                  <div className="mt-4 space-y-4 animate-fade-in">
                    <h4 className="font-semibold">Available Visit Times</h4>
                    <div className="grid gap-2">
                      {localVisitTimes.length > 0 ? localVisitTimes.map((time, index) => (
                        <div key={index} className="bg-gray-100 px-3 py-2 rounded">
                          <span>{time}</span>
                        </div>
                      )) : (
                        <p className="text-muted-foreground">No visit times available. Please contact the seller.</p>
                      )}
                    </div>
                  </div>
                )}

                {isEditingVisitTimes && isUserProperty && (
                  <div className="mt-4 space-y-4 animate-fade-in">
                    <h4 className="font-semibold">Manage Visit Times</h4>
                    <div className="flex gap-2">
                      <Input
                        placeholder="e.g., 10:00 AM - 6:00 PM"
                        value={visitTimeInput}
                        onChange={(e) => setVisitTimeInput(e.target.value)}
                        onKeyPress={(e) => e.key === 'Enter' && handleAddVisitTime()}
                      />
                      <Button onClick={handleAddVisitTime}>Add</Button>
                    </div>
                    <div className="flex flex-wrap gap-2">
                      {localVisitTimes.map((time, index) => (
                        <div key={index} className="flex items-center gap-2 bg-gray-100 px-3 py-1 rounded">
                          <span>{time}</span>
                          <button
                            onClick={() => handleRemoveVisitTime(time)}
                            className="text-red-600 hover:text-red-800"
                            aria-label="Remove visit time"
                          >
                            &times;
                          </button>
                        </div>
                      ))}
                    </div>
                    <Button onClick={handleSaveChanges} className="w-full">
                      <Save className="w-4 h-4 mr-2" />
                      Save Visit Times
                    </Button>
                  </div>
                )}

                <div className="border-t pt-4">
                  <div className="flex items-center gap-3 mb-4">
                    <div className="w-12 h-12 bg-primary rounded-full flex items-center justify-center text-primary-foreground font-bold">
                      A
                    </div>
                    <div>
                      <p className="font-medium">Property Agent</p>
                      <p className="text-sm text-muted-foreground">Real Estate Expert</p>
                    </div>
                  </div>

                  <div className="text-center text-sm text-muted-foreground">
                    <span className="font-medium">4 items listed</span>
                  </div>
                </div>
              </Card>
            </div>
          </div>
        </div>
      </main>

      <Footer />

      {/* Crop Modal */}
    </div>
  );
};

export default PropertyDetail;
