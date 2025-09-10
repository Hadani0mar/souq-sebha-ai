import { Phone, MapPin, Store, ShoppingCart } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";

interface ProductCardProps {
  اسم_المنتج: string;
  السعر: number;
  اسم_المتجر: string;
  عنوان_المتجر: string;
  هاتف: string | null;
  نوع_النشاط: string;
  متوفر: boolean;
  العلامة?: string | null;
  وصف_المنتج?: string | null;
}

const ProductCard = ({ 
  اسم_المنتج, 
  السعر, 
  اسم_المتجر, 
  عنوان_المتجر, 
  هاتف, 
  نوع_النشاط,
  متوفر,
  العلامة,
  وصف_المنتج
}: ProductCardProps) => {
  
  const getStoreTypeColor = (type: string) => {
    switch (type) {
      case "مواد_غذائية": return "bg-green-100 text-green-800";
      case "صيدلية": return "bg-blue-100 text-blue-800";
      case "مطعم": return "bg-orange-100 text-orange-800";
      default: return "bg-gray-100 text-gray-800";
    }
  };

  const getStoreTypeIcon = (type: string) => {
    switch (type) {
      case "مواد_غذائية": return "🛒";
      case "صيدلية": return "⚕️";
      case "مطعم": return "🍽️";
      default: return "🏪";
    }
  };

  return (
    <Card className="card-shadow hover:elegant-shadow smooth-transition hover:scale-[1.02] overflow-hidden">
      <CardContent className="p-6">
        {/* Header */}
        <div className="flex items-start justify-between mb-4">
          <div className="flex-1">
            <h3 className="text-lg font-semibold arabic-text text-foreground mb-1">
              {اسم_المنتج}
            </h3>
            {العلامة && (
              <p className="text-sm text-muted-foreground mb-2">{العلامة}</p>
            )}
            {وصف_المنتج && (
              <p className="text-sm text-muted-foreground mb-3 line-clamp-2">
                {وصف_المنتج}
              </p>
            )}
          </div>
          
          <div className="text-left">
            <div className="text-2xl font-bold text-primary mb-1">
              {السعر.toFixed(2)} د.ل
            </div>
            <Badge 
              variant={متوفر ? "default" : "destructive"} 
              className="text-xs"
            >
              {متوفر ? "متوفر" : "غير متوفر"}
            </Badge>
          </div>
        </div>

        {/* Store Info */}
        <div className="bg-muted rounded-lg p-4 mb-4">
          <div className="flex items-center gap-3 mb-2">
            <div className="flex items-center gap-2">
              <span className="text-lg">{getStoreTypeIcon(نوع_النشاط)}</span>
              <Store className="h-4 w-4 text-primary" />
              <span className="font-medium arabic-text">{اسم_المتجر}</span>
            </div>
            <Badge className={`text-xs ${getStoreTypeColor(نوع_النشاط)}`}>
              {نوع_النشاط.replace("_", " ")}
            </Badge>
          </div>
          
          <div className="flex items-center gap-2 text-sm text-muted-foreground mb-2">
            <MapPin className="h-4 w-4" />
            <span className="arabic-text">{عنوان_المتجر}</span>
          </div>
          
          {هاتف && (
            <div className="flex items-center gap-2 text-sm text-muted-foreground">
              <Phone className="h-4 w-4" />
              <a 
                href={`tel:${هاتف}`}
                className="hover:text-primary smooth-transition"
                dir="ltr"
              >
                {هاتف}
              </a>
            </div>
          )}
        </div>

        {/* Actions */}
        <div className="flex gap-2">
          <Button 
            className="flex-1"
            variant="libyan"
            disabled={!متوفر}
          >
            <ShoppingCart className="h-4 w-4 ml-2" />
            اطلب الآن
          </Button>
          
          {هاتف && (
            <Button 
              variant="outline" 
              size="icon"
              asChild
            >
              <a href={`tel:${هاتف}`}>
                <Phone className="h-4 w-4" />
              </a>
            </Button>
          )}
        </div>
      </CardContent>
    </Card>
  );
};

export default ProductCard;