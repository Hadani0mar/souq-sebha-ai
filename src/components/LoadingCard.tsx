import { Card, CardContent } from "@/components/ui/card";

const LoadingCard = () => {
  return (
    <Card className="card-shadow overflow-hidden">
      <CardContent className="p-6">
        {/* Header */}
        <div className="flex items-start justify-between mb-4">
          <div className="flex-1">
            <div className="h-6 bg-muted rounded loading-skeleton mb-2"></div>
            <div className="h-4 bg-muted rounded loading-skeleton w-2/3 mb-2"></div>
            <div className="h-4 bg-muted rounded loading-skeleton w-1/2"></div>
          </div>
          
          <div className="text-right ml-4">
            <div className="h-8 w-20 bg-muted rounded loading-skeleton mb-2"></div>
            <div className="h-6 w-16 bg-muted rounded loading-skeleton"></div>
          </div>
        </div>

        {/* Store Info */}
        <div className="bg-muted rounded-lg p-4 mb-4">
          <div className="flex items-center gap-3 mb-2">
            <div className="h-6 w-6 bg-background rounded loading-skeleton"></div>
            <div className="h-5 w-32 bg-background rounded loading-skeleton"></div>
            <div className="h-5 w-20 bg-background rounded loading-skeleton"></div>
          </div>
          
          <div className="h-4 w-48 bg-background rounded loading-skeleton mb-2"></div>
          <div className="h-4 w-32 bg-background rounded loading-skeleton"></div>
        </div>

        {/* Actions */}
        <div className="flex gap-2">
          <div className="flex-1 h-10 bg-muted rounded loading-skeleton"></div>
          <div className="h-10 w-10 bg-muted rounded loading-skeleton"></div>
        </div>
      </CardContent>
    </Card>
  );
};

export default LoadingCard;