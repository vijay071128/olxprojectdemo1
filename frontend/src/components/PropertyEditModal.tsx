import React, { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Crop, X } from "lucide-react";
import { type Property } from "@/data/properties";

interface PropertyEditModalProps {
  isOpen: boolean;
  property: Property | null;
  onSave: (property: Property) => void;
  onClose: () => void;
}

const PropertyEditModal = ({ isOpen, property, onSave, onClose }: PropertyEditModalProps) => {
  const [localProperty, setLocalProperty] = useState<Property | null>(null);
  const [imageInput, setImageInput] = useState<string>("");
  const [visitTimeInput, setVisitTimeInput] = useState<string>("");

  useEffect(() => {
    if (property) {
      const prop = { ...property, price: property.price.replace(/^₹\s*/, '') };
      if (!prop.listingType) {
        prop.listingType = 'sale';
      }
      setLocalProperty(prop);
    } else {
      setLocalProperty(null);
    }
    setImageInput("");
  }, [property]);



  if (!isOpen || !localProperty) return null;

  const handleChange = (field: keyof Property, value: any) => {
    if (field === 'listingType') {
      const prefix = value === 'rent' ? 'For Rent: ' : 'For Sale: ';
      const cleanTitle = localProperty.title.replace(/^(For Rent: |For Sale: )/, '');
      setLocalProperty({ ...localProperty, [field]: value, title: prefix + cleanTitle });
    } else {
      setLocalProperty({ ...localProperty, [field]: value });
    }
  };

  const handleContactChange = (field: keyof Property["contact"], value: any) => {
    if (!localProperty.contact) {
      localProperty.contact = { name: "", phoneNumbers: [""], mapUrl: "" };
    }
    setLocalProperty({
      ...localProperty,
      contact: { ...localProperty.contact, [field]: value },
    });
  };

  const handleAddImage = () => {
    if (imageInput.trim() === "") return;
    if (!localProperty.images) localProperty.images = [];
    if (localProperty.images.length >= 10) {
      alert("Maximum 10 images allowed");
      return;
    }
    if (!localProperty.images.includes(imageInput.trim())) {
      setLocalProperty({
        ...localProperty,
        images: [...localProperty.images, imageInput.trim()],
      });
    }
    setImageInput("");
  };

  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (!files) return;
    if (!localProperty.images) localProperty.images = [];
    const remainingSlots = 10 - localProperty.images.length;
    if (remainingSlots <= 0) {
      alert("Maximum 10 images allowed");
      return;
    }
    const filesToProcess = Array.from(files).slice(0, remainingSlots);
    filesToProcess.forEach((file) => {
      const reader = new FileReader();
      reader.onload = (event) => {
        const base64 = event.target?.result as string;
        setLocalProperty((prev) => {
          if (!prev) return prev;
          return {
            ...prev,
            images: [...(prev.images || []), base64],
          };
        });
      };
      reader.readAsDataURL(file);
    });
  };

  const handleRemoveImage = (img: string) => {
    if (!localProperty.images) return;
    setLocalProperty({
      ...localProperty,
      images: localProperty.images.filter((i) => i !== img),
    });
  };

  const handleMoveImage = (fromIndex: number, toIndex: number) => {
    if (!localProperty.images) return;
    const newImages = [...localProperty.images];
    const [movedImage] = newImages.splice(fromIndex, 1);
    newImages.splice(toIndex, 0, movedImage);
    setLocalProperty({
      ...localProperty,
      images: newImages,
    });
  };

  const handlePhoneNumberChange = (index: number, value: string) => {
    if (!localProperty.contact) return;
    const newPhones = [...localProperty.contact.phoneNumbers];
    newPhones[index] = value;
    handleContactChange("phoneNumbers", newPhones);
  };

  const handleAddPhoneNumber = () => {
    if (!localProperty.contact) return;
    handleContactChange("phoneNumbers", [...localProperty.contact.phoneNumbers, ""]);
  };

  const handleRemovePhoneNumber = (index: number) => {
    if (!localProperty.contact) return;
    const newPhones = localProperty.contact.phoneNumbers.filter((_, i) => i !== index);
    handleContactChange("phoneNumbers", newPhones);
  };

  const handleAddVisitTime = () => {
    if (visitTimeInput.trim() === "") return;
    if (!localProperty.visitTimes) localProperty.visitTimes = [];
    if (!localProperty.visitTimes.includes(visitTimeInput.trim())) {
      setLocalProperty({
        ...localProperty,
        visitTimes: [...localProperty.visitTimes, visitTimeInput.trim()],
      });
    }
    setVisitTimeInput("");
  };

  const handleRemoveVisitTime = (time: string) => {
    if (!localProperty.visitTimes) return;
    setLocalProperty({
      ...localProperty,
      visitTimes: localProperty.visitTimes.filter((t) => t !== time),
    });
  };

  const handleSave = () => {
    if (localProperty.title.trim() === "") {
      alert("Title is required");
      return;
    }
    if (localProperty.description.trim() === "") {
      alert("Description is required");
      return;
    }
    if (localProperty.price.trim() === "") {
      alert("Price is required");
      return;
    }
    if (localProperty.location.trim() === "") {
      alert("Location is required");
      return;
    }
    if (!localProperty.images || localProperty.images.length === 0) {
      alert("At least one image is required");
      return;
    }
    if (!localProperty.contact?.name || localProperty.contact.name.trim() === "") {
      alert("Contact name is required");
      return;
    }
    // Validate phone numbers
    const phoneNumbers = localProperty.contact?.phoneNumbers || [];
    for (const phone of phoneNumbers) {
      if (phone.trim() === "") continue;
      const digits = phone.replace(/\D/g, '');
      if (digits.length !== 10) {
        alert(`You put only ${digits.length} number`);
        return;
      }
    }
    if (!localProperty.contact?.phoneNumbers || !localProperty.contact.phoneNumbers.some(p => p.trim() !== "")) {
      alert("At least one phone number is required");
      return;
    }
    if (!localProperty.contact?.mapUrl || localProperty.contact.mapUrl.trim() === "") {
      alert("Google Map URL is required");
      return;
    }
    const propertyToSave = { ...localProperty, price: '₹ ' + localProperty.price };
    onSave(propertyToSave);
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
      <div className="bg-white p-6 rounded-lg max-w-3xl w-full max-h-full overflow-y-auto">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-2xl font-bold">Edit Property</h2>
          <button
            onClick={onClose}
            className="text-gray-500 hover:text-gray-700 transition-colors"
            aria-label="Close modal"
          >
            <X className="w-6 h-6" />
          </button>
        </div>
        <div className="space-y-4">
          <div>
            <label className="block mb-1 font-semibold">Title <span className="text-red-500">*</span></label>
            <Input
              placeholder="Title"
              value={localProperty.title}
              onChange={(e) => handleChange("title", e.target.value)}
            />
          </div>
          <div>
            <label className="block mb-1 font-semibold">Description <span className="text-red-500">*</span></label>
            <Textarea
              placeholder="Description"
              value={localProperty.description}
              onChange={(e) => handleChange("description", e.target.value)}
            />
          </div>
          <div>
            <label className="block mb-1 font-semibold">Price <span className="text-red-500">*</span></label>
            <div className="relative">
              <span className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground">₹</span>
              <Input
                placeholder="Price"
                value={localProperty.price}
                onChange={(e) => handleChange("price", e.target.value)}
                className="pl-8"
              />
            </div>
          </div>
          <div>
            <label className="block mb-1 font-semibold">Location <span className="text-red-500">*</span></label>
            <Input
              placeholder="Location"
              value={localProperty.location}
              onChange={(e) => handleChange("location", e.target.value)}
            />
          </div>
          <div>
            <label className="block mb-1 font-semibold">Category <span className="text-red-500">*</span></label>
            <Select value={localProperty.category} onValueChange={(value) => handleChange("category", value)}>
              <SelectTrigger>
                <SelectValue placeholder="Select category" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="house">House</SelectItem>
                <SelectItem value="apartment">Apartment</SelectItem>
                <SelectItem value="villa">Villa</SelectItem>
                <SelectItem value="land">Land</SelectItem>
              </SelectContent>
            </Select>
          </div>
          <div>
            <label className="block mb-1 font-semibold">Listing Type <span className="text-red-500">*</span></label>
            <Select value={localProperty.listingType} onValueChange={(value) => handleChange("listingType", value)}>
              <SelectTrigger>
                <SelectValue placeholder="Select type" />
              </SelectTrigger>
              <SelectContent>
                
                <SelectItem value="sale">For Sale</SelectItem>
                <SelectItem value="rent">For Rent</SelectItem>
                
              </SelectContent>
            </Select>
          </div>
          <div>
            <label className="block mb-1 font-semibold">Images <span className="text-red-500">*</span></label>
            <div className="flex gap-2 mb-2">
              <Input
                placeholder="Image URL"
                value={imageInput}
                onChange={(e) => setImageInput(e.target.value)}
              />
              <Button onClick={handleAddImage}>Add URL</Button>
            </div>
            <div className="mb-2">
              <input
                type="file"
                multiple
                accept="image/*"
                onChange={handleFileUpload}
                className="block w-full text-sm text-gray-500 file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-blue-50 file:text-blue-700 hover:file:bg-blue-100"
              />
            </div>
            <div className="flex flex-wrap gap-2">
              {localProperty.images && localProperty.images.map((img, index) => (
                <div key={img} className="relative group">
                  <img src={img} alt="property" className="w-24 h-16 object-cover rounded" />
                  <div className="absolute top-0 right-0 flex gap-1">
                    <button
                      onClick={() => alert('Crop functionality would be implemented here')}
                      className="bg-green-600 text-white rounded-full w-5 h-5 flex items-center justify-center text-xs opacity-0 group-hover:opacity-100 transition-opacity"
                      aria-label="Crop image"
                    >
                      <Crop className="w-3 h-3" />
                    </button>
                    {index > 0 && (
                      <button
                        onClick={() => handleMoveImage(index, index - 1)}
                        className="bg-blue-600 text-white rounded-full w-5 h-5 flex items-center justify-center text-xs opacity-0 group-hover:opacity-100 transition-opacity"
                        aria-label="Move left"
                      >
                        ←
                      </button>
                    )}
                    {index < localProperty.images!.length - 1 && (
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
                      &times;
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
          <div>
            <label className="block mb-1 font-semibold">Contact Name <span className="text-red-500">*</span></label>
            <Input
              placeholder="Contact Name"
              value={localProperty.contact?.name || ""}
              onChange={(e) => handleContactChange("name", e.target.value)}
            />
          </div>
          <div>
            <label className="block mb-1 font-semibold">Phone Numbers <span className="text-red-500">*</span></label>
            {localProperty.contact?.phoneNumbers.map((phone, index) => (
              <div key={index} className="flex items-center gap-2 mb-2">
                <Input
                  placeholder="Phone Number"
                  value={phone}
                  onChange={(e) => handlePhoneNumberChange(index, e.target.value)}
                />
                <Button variant="destructive" size="sm" onClick={() => handleRemovePhoneNumber(index)}>
                  Remove
                </Button>
              </div>
            ))}
            <Button onClick={handleAddPhoneNumber}>Add Phone Number</Button>
          </div>
          <div>
            <label className="block mb-1 font-semibold">Google Map Embed URL <span className="text-red-500">*</span></label>
            <Input
              placeholder="Google Map Embed URL"
              value={localProperty.contact?.mapUrl || ""}
              onChange={(e) => handleContactChange("mapUrl", e.target.value)}
            />
          </div>
          <div>
            <label className="block mb-1 font-semibold">Visit Times</label>
            <div className="flex gap-2 mb-2">
              <Input
                placeholder="e.g., 10:00 AM - 6:00 PM"
                value={visitTimeInput}
                onChange={(e) => setVisitTimeInput(e.target.value)}
              />
              <Button onClick={handleAddVisitTime}>Add</Button>
            </div>
            <div className="flex flex-wrap gap-2">
              {localProperty.visitTimes && localProperty.visitTimes.map((time) => (
                <div key={time} className="flex items-center gap-2 bg-gray-100 px-3 py-1 rounded">
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
          </div>
        </div>
        <div className="flex justify-end gap-2 mt-4">
          <Button variant="outline" onClick={onClose}>Cancel</Button>
          <Button onClick={handleSave}>Save</Button>
        </div>
      </div>
    </div>
  );
};

export default PropertyEditModal;
