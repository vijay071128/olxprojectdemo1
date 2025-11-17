import { useParams, useNavigate } from "react-router-dom";
import { allProperties } from "@/data/properties";
import { Phone, ArrowLeft } from "lucide-react";
import { Button } from "@/components/ui/button";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { type Property } from "@/data/properties";

const PropertyContact = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();

  const propertyId = Number(id);

  // First check userProperties from localStorage (for updated properties)
  let property: Property | undefined;
  const stored = localStorage.getItem("userProperties");
  if (stored) {
    try {
      const userProperties: Property[] = JSON.parse(stored);
      property = userProperties.find((p) => p.id === propertyId);
      console.log("PropertyContact: Found user property:", property);
    } catch (error) {
      console.error("Error parsing userProperties from localStorage:", error);
    }
  }

  // If not found in userProperties, check allProperties
  if (!property) {
    property = allProperties.find((p) => p.id === propertyId);
  }

  if (!property) {
    return (
      <div className="min-h-screen bg-background">
        <Header />
        <div className="container mx-auto px-4 py-8">
          <div className="text-center">
            <h2 className="text-2xl font-bold mb-4">Property Not Found</h2>
            <p className="text-muted-foreground mb-6">The requested property could not be found.</p>
            <Button onClick={() => navigate(-1)}>
              <ArrowLeft className="w-4 h-4 mr-2" />
              Go Back
            </Button>
          </div>
        </div>
        <Footer />
      </div>
    );
  }

  // Default contact info if property doesn't have contact data
  const defaultContact = {
    name: "Property Manager",
    phoneNumbers: ["+91-98765-43210"],
    mapUrl: "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3503.123!2d77.0266!2d28.4595!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x390d19d582e38859%3A0x2cf5fe8e5c64b1e!2sSector%2021%2C%20Gurugram%2C%20Haryana!5e0!3m2!1sen!2sin!4v1690000000000!5m2!1sen!2sin"
  };

  const contact = property.contact || defaultContact;
  const { name, phoneNumbers, mapUrl } = contact;

  return (
    <div className="min-h-screen bg-background">
      <Header />

      <main className="py-8">
        <div className="container mx-auto px-4">
          {/* Back Button */}
          <Button
            variant="ghost"
            onClick={() => navigate(-1)}
            className="mb-6 hover:bg-muted"
          >
            <ArrowLeft className="w-4 h-4 mr-2" />
            Back to Property
          </Button>

          <div className="max-w-6xl mx-auto">
            <div className="bg-card rounded-lg shadow-lg overflow-hidden">
              {/* Property details */}
              <div className="p-6 md:p-12 text-center border-b">
                <h1 className="text-3xl md:text-4xl font-bold text-foreground mb-4">
                  {property.title}
                </h1>
                <div className="text-2xl font-semibold text-primary mb-4">
                  {property.price}
                </div>
                <p className="text-lg text-muted-foreground mb-6">
                  {property.description}
                </p>
                <h2 className="text-2xl md:text-3xl font-bold text-foreground mb-2">
                  Contact Seller
                </h2>
                <h3 className="text-xl md:text-2xl font-semibold text-primary mb-8">
                  {name}
                </h3>

                {/* Phone numbers - centered and responsive */}
                <div className="flex flex-col items-center gap-4 md:gap-6">
                  {phoneNumbers.map((phone, index) => (
                    <div
                      key={index}
                      className="flex flex-col sm:flex-row items-center gap-3 p-4 bg-muted/50 rounded-lg w-full max-w-md"
                    >
                      <div className="flex items-center gap-3">
                        <Phone className="w-6 h-6 text-primary" />
                        <span className="text-lg md:text-xl font-medium text-foreground mx-4">
                          {phone}
                        </span>
                      </div>
                      <a
                        href={`tel:${phone}`}
                        className="w-full sm:w-auto"
                        aria-label={`Call ${phone}`}
                      >
                        <Button className="w-full sm:w-auto px-6 py-2">
                          <Phone className="w-4 h-4 mr-2" />
                          <span className="mx-2">Call Now</span>
                        </Button>
                      </a>
                    </div>
                  ))}
                </div>
              </div>

              {/* Google Map - responsive */}
              <div className="h-64 sm:h-80 md:h-96 lg:h-[500px]">
                {mapUrl.includes("<iframe") ? (
                  <div
                    dangerouslySetInnerHTML={{
                      __html: mapUrl
                        .replace(/width="[^"]*"/g, 'width="100%"')
                        .replace(/height="[^"]*"/g, 'height="100%"')
                    }}
                    style={{ width: "100%", height: "100%" }}
                  />
                ) : (
                  <iframe
                    src={mapUrl}
                    width="100%"
                    height="100%"
                    style={{ border: 0 }}
                    allowFullScreen
                    loading="lazy"
                    referrerPolicy="no-referrer"
                    title="Property Location Map"
                    className="w-full h-full"
                  ></iframe>
                )}
              </div>
            </div>

            {/* Additional Info */}
            <div className="mt-8 text-center">
              <div className="bg-card rounded-lg p-6 shadow-sm">
                <h4 className="text-lg font-semibold text-foreground mb-2">
                  Property Information
                </h4>
                <p className="text-muted-foreground">
                  {property.title} - {property.location}
                </p>
                <p className="text-sm text-muted-foreground mt-2">
                  Price: {property.price}
                </p>
              </div>
            </div>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
};

export default PropertyContact;
