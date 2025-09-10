import { useLocation } from "react-router-dom";
import { useEffect } from "react";
import { Home, Search } from "lucide-react";
import { Button } from "@/components/ui/button";

const NotFound = () => {
  const location = useLocation();

  useEffect(() => {
    console.error("404 Error: User attempted to access non-existent route:", location.pathname);
  }, [location.pathname]);

  return (
    <div className="flex min-h-screen items-center justify-center bg-background">
      <div className="text-center arabic-text">
        <div className="hero-gradient text-white rounded-2xl p-12 max-w-md mx-auto elegant-shadow">
          <h1 className="mb-4 text-6xl font-bold">404</h1>
          <h2 className="mb-4 text-2xl font-semibold">الصفحة غير موجودة</h2>
          <p className="mb-8 text-lg opacity-90">
            عذراً، لم نتمكن من العثور على الصفحة التي تبحث عنها
          </p>
          
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button asChild variant="outline" className="bg-white/10 text-white border-white/20 hover:bg-white/20">
              <a href="/">
                <Home className="h-4 w-4 ml-2" />
                العودة للرئيسية
              </a>
            </Button>
            
            <Button asChild variant="outline" className="bg-white/10 text-white border-white/20 hover:bg-white/20">
              <a href="/#products">
                <Search className="h-4 w-4 ml-2" />
                تصفح المنتجات
              </a>
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default NotFound;
