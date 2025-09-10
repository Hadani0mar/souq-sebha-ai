import { Phone, MapPin, Clock, Star } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";

interface StoreCardProps {
  اسم_النشاط: string;
  النوع: string;
  عنوان: string;
  مدينة: string;
  هاتف: string | null;
  مفعّل: boolean;
}

const StoreCard = ({ 
  اسم_النشاط, 
  النوع, 
  عنوان, 
  مدينة, 
  هاتف, 
  مفعّل 
}: StoreCardProps) => {
  
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
          <div className="flex items-center gap-3">
            <div className="text-2xl">{getStoreTypeIcon(النوع)}</div>
            <div>
              <h3 className="text-lg font-semibold arabic-text text-foreground">
                {اسم_النشاط}
              </h3>
              <Badge className={`text-xs mt-1 ${getStoreTypeColor(النوع)}`}>
                {النوع.replace("_", " ")}
              </Badge>
            </div>
          </div>
          
          <div className="flex items-center gap-1">
            <Badge 
              variant={مفعّل ? "default" : "destructive"} 
              className="text-xs"
            >
              {مفعّل ? "مفتوح" : "مغلق"}
            </Badge>
          </div>
        </div>

        {/* Location */}
        <div className="space-y-2 mb-4">
          <div className="flex items-center gap-2 text-sm text-muted-foreground">
            <MapPin className="h-4 w-4" />
            <span className="arabic-text">{عنوان}</span>
          </div>
          <div className="flex items-center gap-2 text-sm text-muted-foreground">
            <Clock className="h-4 w-4" />
            <span className="arabic-text">{مدينة}</span>
          </div>
        </div>

        {/* Contact & Actions */}
        <div className="flex items-center justify-between">
          {هاتف ? (
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
          ) : (
            <div className="text-sm text-muted-foreground">لا يوجد هاتف</div>
          )}

          <div className="flex gap-2">
            <Button 
              variant="outline" 
              size="sm"
              className="text-xs"
            >
              عرض المنتجات
            </Button>
            
            {هاتف && (
            <Button 
              size="sm"
              variant="libyan"
              className="text-xs"
              asChild
            >
                <a href={`tel:${هاتف}`}>
                  <Phone className="h-3 w-3 ml-1" />
                  اتصل
                </a>
              </Button>
            )}
          </div>
        </div>

        {/* Rating placeholder */}
        <div className="flex items-center gap-1 mt-3 pt-3 border-t">
          <Star className="h-4 w-4 text-yellow-400 fill-current" />
          <Star className="h-4 w-4 text-yellow-400 fill-current" />
          <Star className="h-4 w-4 text-yellow-400 fill-current" />
          <Star className="h-4 w-4 text-yellow-400 fill-current" />
          <Star className="h-4 w-4 text-gray-300" />
          <span className="text-sm text-muted-foreground mr-2">4.0</span>
        </div>
      </CardContent>
    </Card>
  );
};

export default StoreCard;