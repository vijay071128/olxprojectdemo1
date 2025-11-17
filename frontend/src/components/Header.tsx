import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Search, Menu, X, User, LogIn, LogOut, Heart } from "lucide-react";
import { cn } from "@/lib/utils";
import { useAuth } from "@/contexts/AuthContext";

const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const { user, logout } = useAuth();
  const navigate = useNavigate();

  // Generate or get current user ID
  const getCurrentUserId = () => {
    let userId = localStorage.getItem("currentUserId");
    if (!userId) {
      userId = Date.now().toString();
      localStorage.setItem("currentUserId", userId);
    }
    return userId;
  };

  const currentUserId = getCurrentUserId();

  const toggleMenu = () => setIsMenuOpen(!isMenuOpen);

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      navigate(`/search?q=${encodeURIComponent(searchQuery.trim())}`);
      setSearchQuery("");
      setIsMenuOpen(false);
    }
  };

  const handleHeartClick = () => {
    // Navigate to heartinn page
    window.location.href = "/heartinn";
  };

  const handleAboutClick = () => {
    // Check if we're already on the home page
    if (window.location.pathname === "/") {
      // If on home page, scroll to PropertyCategories section
      const propertyCategoriesSection = document.querySelector('[data-section="property-categories"]');
      if (propertyCategoriesSection) {
        propertyCategoriesSection.scrollIntoView({
          behavior: 'smooth',
          block: 'start'
        });
      }
    } else {
      // If not on home page, navigate to home page
      navigate("/");
    }
    setIsMenuOpen(false);
  };

  const handleLogout = () => {
    if (window.confirm('Are you sure you want to logout?')) {
      logout();
      alert('Logout successful');
      navigate('/');
    }
  };

  return (
    <header className="sticky top-0 z-50 bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60 border-b border-border">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <div className="flex items-center space-x-2">
            <div className="w-8 h-8 bg-primary rounded-lg flex items-center justify-center">
              <span className="text-primary-foreground font-bold text-lg">R</span>
            </div>
            <span className="text-xl font-bold text-primary">RealtyHub</span>
          </div>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center space-x-8">
            <button
              onClick={() => navigate('/more-properties')}
              className="text-foreground hover:text-primary transition-colors bg-transparent border-none cursor-pointer"
            >
              Buy
            </button>
            <button
              onClick={() => navigate('/listings?mode=rent')}
              className="text-foreground hover:text-primary transition-colors bg-transparent border-none cursor-pointer"
            >
              Rent
            </button>
            <button
              onClick={() => navigate('/listings?mode=sale')}
              className="text-foreground hover:text-primary transition-colors bg-transparent border-none cursor-pointer"
            >
              Sell
            </button>
            <button
              onClick={handleAboutClick}
              className="text-foreground hover:text-primary transition-colors bg-transparent border-none cursor-pointer"
            >
              About
            </button>
          </nav>

          {/* Search Bar - Desktop */}
          <div className="hidden lg:flex items-center flex-1 max-w-md mx-8 relative">
            <form onSubmit={handleSearch} className="relative w-full">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground w-4 h-4" />
              <Input
                placeholder="Search house, apartment, villa, land..."
                className="search-input pl-10 pr-10"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
              <button
                type="button"
                onClick={handleHeartClick}
                aria-label="Favorites"
                className="absolute right-2 top-1/2 transform -translate-y-1/2 text-muted-foreground hover:text-primary transition-colors"
              >
                <Heart className="w-5 h-5" />
              </button>
            </form>
          </div>

          {/* Auth Buttons - Desktop */}
          <div className="hidden md:flex items-center space-x-3">
            {user ? (
              <Button variant="ghost" size="sm" onClick={handleLogout}>
                <LogOut className="w-4 h-4 mr-2" />
                Logout
              </Button>
            ) : (
              <>
                <Button variant="ghost" size="sm" className="text-foreground" onClick={() => navigate("/login")}>
                  <LogIn className="w-4 h-4 mr-2" />
                  Login
                </Button>
                <Button size="sm" className="hero-button" onClick={() => navigate("/register")}>
                  <User className="w-4 h-4 mr-2" />
                  Register
                </Button>
              </>
            )}
          </div>

          {/* Mobile Menu Button */}
          <Button
            variant="ghost"
            size="sm"
            className="md:hidden"
            onClick={toggleMenu}
          >
            {isMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </Button>
        </div>

        {/* Mobile Menu */}
        <div className={cn(
          "md:hidden overflow-hidden transition-all duration-300 ease-smooth",
          isMenuOpen ? "max-h-96 opacity-100" : "max-h-0 opacity-0"
        )}>
          <div className="py-4 space-y-4">
            {/* Mobile Search */}
            <form onSubmit={handleSearch} className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground w-4 h-4" />
              <Input
                placeholder="Search house, apartment, villa, land..."
                className="search-input pl-10 pr-10"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
              <button
                type="button"
                onClick={handleHeartClick}
                aria-label="Favorites"
                className="absolute right-2 top-1/2 transform -translate-y-1/2 text-muted-foreground hover:text-primary transition-colors"
              >
                <Heart className="w-5 h-5" />
              </button>
            </form>

            {/* Mobile Navigation */}
            <nav className="flex flex-col space-y-3">
              <button
                onClick={() => { navigate('/more-properties'); setIsMenuOpen(false); }}
                className="text-foreground hover:text-primary transition-colors py-2 bg-transparent border-none cursor-pointer text-left"
              >
                Buy
              </button>
              <button
                onClick={() => { navigate('/listings?mode=rent'); setIsMenuOpen(false); }}
                className="text-foreground hover:text-primary transition-colors py-2 bg-transparent border-none cursor-pointer text-left"
              >
                Rent
              </button>
              <button
                onClick={() => { navigate('/listings?mode=sale'); setIsMenuOpen(false); }}
                className="text-foreground hover:text-primary transition-colors py-2 bg-transparent border-none cursor-pointer text-left"
              >
                Sell
              </button>
              <button
                onClick={() => { handleAboutClick(); setIsMenuOpen(false); }}
                className="text-foreground hover:text-primary transition-colors py-2 bg-transparent border-none cursor-pointer text-left"
              >
                About
              </button>
            </nav>

            {/* Mobile Auth */}
            <div className="flex flex-col space-y-2 pt-4 border-t border-border">
              {user ? (
                <Button variant="ghost" className="justify-start" onClick={() => {
                  handleLogout();
                  setIsMenuOpen(false);
                }}>
                  <LogOut className="w-4 h-4 mr-2" />
                  Logout
                </Button>
              ) : (
                <>
                  <Button variant="ghost" className="justify-start" onClick={() => { navigate("/login"); setIsMenuOpen(false); }}>
                    <LogIn className="w-4 h-4 mr-2" />
                    Login
                  </Button>
                  <Button className="hero-button justify-start" onClick={() => { navigate("/register"); setIsMenuOpen(false); }}>
                    <User className="w-4 h-4 mr-2" />
                    Register
                  </Button>
                </>
              )}
            </div>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;
