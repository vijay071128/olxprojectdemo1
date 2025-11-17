import Header from "@/components/Header";
import Hero from "@/components/Hero";
import PropertyCategories from "@/components/PropertyCategories";
import PropertyListings from "@/components/PropertyListings";
import Footer from "@/components/Footer";

const Index = () => {
  return (
    <div className="min-h-screen bg-background">
      <Header />
      <main>
        <Hero />
        <PropertyCategories />
        <PropertyListings />
      </main>
      <Footer />
    </div>
  );
};

export default Index;
