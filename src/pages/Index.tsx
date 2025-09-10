import { useState } from "react";
import Header from "@/components/Header";
import SearchBar from "@/components/SearchBar";
import ProductCard from "@/components/ProductCard";
import ChatBox from "@/components/ChatBox";
import StoreCard from "@/components/StoreCard";
import LoadingCard from "@/components/LoadingCard";
import { useProducts } from "@/hooks/useProducts";
import { useWebhook } from "@/hooks/useWebhook";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { ShoppingBag, Store, MessageCircle, Sparkles } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import heroImage from "@/assets/hero-souq-sebha.jpg";

const Index = () => {
  const { products, stores, loading, searchProducts } = useProducts();
  const { sendToWebhook, searchProducts: webhookSearch } = useWebhook();
  const [activeTab, setActiveTab] = useState("home");
  const { toast } = useToast();

  const handleSearch = async (query: string) => {
    try {
      await searchProducts(query);
      setActiveTab("products");
      toast({
        title: "تم البحث بنجاح",
        description: `تم البحث عن: ${query}`,
      });
    } catch (error) {
      toast({
        title: "خطأ في البحث",
        description: "حدث خطأ أثناء البحث، يرجى المحاولة مرة أخرى",
        variant: "destructive",
      });
    }
  };

  const handleChatMessage = async (message: string): Promise<string> => {
    try {
      const response = await sendToWebhook(message);
      return response;
    } catch (error) {
      return "عذراً، حدث خطأ أثناء معالجة رسالتك. يرجى المحاولة مرة أخرى.";
    }
  };

  return (
    <div className="min-h-screen bg-background">
      <Header />
      
      <main className="container mx-auto px-4 py-8">
        {/* Hero Section */}
        <section className="text-center mb-12">
          <div 
            className="hero-gradient text-white rounded-2xl p-12 mb-8 elegant-shadow relative overflow-hidden"
            style={{
              backgroundImage: `linear-gradient(rgba(0,0,0,0.4), rgba(0,0,0,0.6)), url(${heroImage})`,
              backgroundSize: 'cover',
              backgroundPosition: 'center',
            }}
          >
            <div className="max-w-3xl mx-auto relative z-10">
              <h1 className="text-4xl md:text-5xl font-bold arabic-text mb-6">
                🏬 مرحباً بك في سوق سبها
              </h1>
              <p className="text-xl mb-8 opacity-90 arabic-text">
                منصتك المحلية للبحث عن المنتجات والمتاجر في سبها، ليبيا
              </p>
              <SearchBar onSearch={handleSearch} isLoading={loading} />
            </div>
          </div>
        </section>

        {/* Main Content Tabs */}
        <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
          <TabsList className="grid w-full grid-cols-4 mb-8">
            <TabsTrigger value="home" className="flex items-center gap-2">
              <Sparkles className="h-4 w-4" />
              الرئيسية
            </TabsTrigger>
            <TabsTrigger value="products" className="flex items-center gap-2">
              <ShoppingBag className="h-4 w-4" />
              المنتجات
            </TabsTrigger>
            <TabsTrigger value="stores" className="flex items-center gap-2">
              <Store className="h-4 w-4" />
              المتاجر
            </TabsTrigger>
            <TabsTrigger value="chat" className="flex items-center gap-2">
              <MessageCircle className="h-4 w-4" />
              المساعد الذكي
            </TabsTrigger>
          </TabsList>

          <TabsContent value="home" className="space-y-8">
            {/* Quick Stats */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div className="bg-card p-6 rounded-lg card-shadow text-center">
                <div className="text-3xl font-bold text-primary mb-2">{products.length}+</div>
                <div className="text-muted-foreground">منتج متوفر</div>
              </div>
              <div className="bg-card p-6 rounded-lg card-shadow text-center">
                <div className="text-3xl font-bold text-secondary mb-2">{stores.length}+</div>
                <div className="text-muted-foreground">متجر مشارك</div>
              </div>
              <div className="bg-card p-6 rounded-lg card-shadow text-center">
                <div className="text-3xl font-bold text-accent mb-2">24/7</div>
                <div className="text-muted-foreground">خدمة متاحة</div>
              </div>
            </div>

            {/* Featured Products */}
            <section>
              <h2 className="text-2xl font-bold arabic-text mb-6">منتجات مميزة</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {loading ? (
                // Loading state
                Array.from({ length: 6 }).map((_, index) => (
                  <LoadingCard key={index} />
                ))
              ) : (
                products.slice(0, 6).map((product, index) => (
                  <ProductCard key={index} {...product} />
                ))
              )}
            </div>
              {products.length === 0 && !loading && (
                <div className="text-center py-12 text-muted-foreground">
                  لا توجد منتجات متاحة حالياً
                </div>
              )}
            </section>
          </TabsContent>

          <TabsContent value="products" className="space-y-6">
            <div className="flex items-center justify-between">
              <h2 className="text-2xl font-bold arabic-text">جميع المنتجات</h2>
              <div className="text-sm text-muted-foreground">
                {products.length} منتج متوفر
              </div>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {loading ? (
                // Loading state
                Array.from({ length: 9 }).map((_, index) => (
                  <LoadingCard key={index} />
                ))
              ) : (
                products.map((product, index) => (
                  <ProductCard key={index} {...product} />
                ))
              )}
            </div>
            
            {products.length === 0 && !loading && (
              <div className="text-center py-12">
                <ShoppingBag className="h-16 w-16 text-muted-foreground mx-auto mb-4" />
                <h3 className="text-lg font-semibold mb-2">لا توجد منتجات</h3>
                <p className="text-muted-foreground">جرب البحث عن منتج معين</p>
              </div>
            )}
          </TabsContent>

          <TabsContent value="stores" className="space-y-6">
            <div className="flex items-center justify-between">
              <h2 className="text-2xl font-bold arabic-text">المتاجر المشاركة</h2>
              <div className="text-sm text-muted-foreground">
                {stores.length} متجر مشارك
              </div>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {stores.map((store, index) => (
                <StoreCard key={index} {...store} />
              ))}
            </div>
            
            {stores.length === 0 && !loading && (
              <div className="text-center py-12">
                <Store className="h-16 w-16 text-muted-foreground mx-auto mb-4" />
                <h3 className="text-lg font-semibold mb-2">لا توجد متاجر</h3>
                <p className="text-muted-foreground">المتاجر قيد التحديث</p>
              </div>
            )}
          </TabsContent>

          <TabsContent value="chat" className="space-y-6">
            <div className="text-center mb-6">
              <h2 className="text-2xl font-bold arabic-text mb-2">المساعد الذكي</h2>
              <p className="text-muted-foreground">اسأل عن أي منتج أو متجر في سبها</p>
            </div>
            
            <ChatBox onSendMessage={handleChatMessage} />
          </TabsContent>
        </Tabs>
      </main>

      {/* Footer */}
      <footer className="bg-card mt-16 py-8 border-t">
        <div className="container mx-auto px-4 text-center">
          <div className="flex items-center justify-center gap-3 mb-4">
            <div className="hero-gradient p-2 rounded-full">
              <ShoppingBag className="h-5 w-5 text-white" />
            </div>
            <span className="text-lg font-bold arabic-text">سوق سبها</span>
          </div>
          <p className="text-muted-foreground arabic-text">
            منصة ليبية محلية للبحث عن المنتجات والمتاجر في سبها
          </p>
          <div className="mt-4 text-sm text-muted-foreground">
            © 2024 سوق سبها. جميع الحقوق محفوظة.
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Index;
