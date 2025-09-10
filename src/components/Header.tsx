import { ShoppingBag, MapPin } from "lucide-react";

const Header = () => {
  return (
    <header className="bg-card card-shadow sticky top-0 z-50">
      <div className="container mx-auto px-4 py-4">
        <div className="flex items-center justify-between">
          {/* Logo */}
          <div className="flex items-center gap-3">
            <div className="hero-gradient p-3 rounded-full glow-shadow">
              <ShoppingBag className="h-6 w-6 text-white" />
            </div>
            <div>
              <h1 className="text-2xl font-bold arabic-text">سوق سبها</h1>
              <p className="text-sm text-muted-foreground flex items-center gap-1">
                <MapPin className="h-3 w-3" />
                سبها، ليبيا
              </p>
            </div>
          </div>

          {/* Navigation */}
          <nav className="hidden md:flex items-center gap-6">
            <a href="#home" className="text-foreground hover:text-primary smooth-transition font-medium">
              الرئيسية
            </a>
            <a href="#products" className="text-foreground hover:text-primary smooth-transition font-medium">
              المنتجات
            </a>
            <a href="#stores" className="text-foreground hover:text-primary smooth-transition font-medium">
              المتاجر
            </a>
          </nav>
        </div>
      </div>
    </header>
  );
};

export default Header;