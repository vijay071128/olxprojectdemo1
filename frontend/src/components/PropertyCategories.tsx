import { Home, Building2, Castle, TreePine } from "lucide-react";
import { Button } from "@/components/ui/button";

const categories = [
  {
    id: 1,
    name: "Houses",
    icon: Home,
    count: "500+ Properties",
    description: "Family homes in great neighborhoods",
    color: "text-blue-600",
    bgColor: "bg-blue-50 dark:bg-blue-950/20"
  },
  {
    id: 2,
    name: "Apartments",
    icon: Building2,
    count: "300+ Properties",
    description: "Modern living spaces in the city",
    color: "text-green-600",
    bgColor: "bg-green-50 dark:bg-green-950/20"
  },
  {
    id: 3,
    name: "Villas", 
    icon: Castle,
    count: "150+ Properties",
    description: "Luxury villas with premium amenities",
    color: "text-purple-600",
    bgColor: "bg-purple-50 dark:bg-purple-950/20"
  },
  {
    id: 4,
    name: "Lands",
    icon: TreePine,
    count: "200+ Properties", 
    description: "Prime plots for development",
    color: "text-amber-600",
    bgColor: "bg-amber-50 dark:bg-amber-950/20"
  }
];

const PropertyCategories = () => {
  return (
    <section className="py-16 bg-secondary/30" data-section="property-categories">
      <div className="container mx-auto px-4">
        {/* Section Header */}
        <div className="text-center mb-12 animate-fade-in">
          <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">
            Browse by Property Type
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Explore our diverse range of properties to find exactly what you're looking for
          </p>
        </div>

        {/* Categories Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {categories.map((category, index) => {
            const IconComponent = category.icon;
            return (
              <div
                key={category.id}
                className="category-card group animate-scale-in"
                style={{ animationDelay: `${index * 100}ms` }}
              >
                <div className={`w-16 h-16 ${category.bgColor} rounded-2xl flex items-center justify-center mb-4 group-hover:scale-110 transition-transform duration-300`}>
                  <IconComponent className={`w-8 h-8 ${category.color}`} />
                </div>
                
                <h3 className="text-xl font-semibold text-foreground mb-2 group-hover:text-primary transition-colors">
                  {category.name}
                </h3>
                
                <p className="text-sm text-muted-foreground mb-3">
                  {category.description}
                </p>
                
                <div className="text-sm font-medium text-primary mb-4">
                  {category.count}
                </div>
                
                <Button
                  asChild
                  size="sm"
                  className="w-full group-hover:bg-primary group-hover:text-primary-foreground transition-colors"
                >
                  <a href={`/${category.name.toLowerCase()}`}>
                    View More
                  </a>
                </Button>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default PropertyCategories;