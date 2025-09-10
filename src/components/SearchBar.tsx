import { useState } from "react";
import { Search, Loader2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

interface SearchBarProps {
  onSearch: (query: string) => void;
  isLoading?: boolean;
}

const SearchBar = ({ onSearch, isLoading = false }: SearchBarProps) => {
  const [query, setQuery] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (query.trim()) {
      onSearch(query.trim());
    }
  };

  return (
    <div className="w-full max-w-2xl mx-auto">
      <form onSubmit={handleSubmit} className="flex gap-3">
        <div className="relative flex-1">
          <Input
            type="text"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="ابحث عن منتج، متجر، أو كلمة مفتاحية..."
            className="pl-12 pr-4 py-3 text-lg arabic-text text-right"
            disabled={isLoading}
          />
          <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 h-5 w-5 text-muted-foreground" />
        </div>
        
        <Button 
          type="submit" 
          size="lg"
          variant="libyan"  
          className="font-semibold px-8 disabled:opacity-50"
          disabled={isLoading || !query.trim()}
        >
          {isLoading ? (
            <Loader2 className="h-5 w-5 animate-spin ml-2" />
          ) : (
            <Search className="h-5 w-5 ml-2" />
          )}
          بحث
        </Button>
      </form>
      
      {/* Quick search suggestions */}
      <div className="mt-4 flex flex-wrap gap-2 justify-center">
        {["بانادول", "خبز", "شاي", "مطعم", "صيدلية"].map((suggestion) => (
          <button
            key={suggestion}
            onClick={() => setQuery(suggestion)}
            className="px-3 py-1 text-sm bg-muted hover:bg-primary hover:text-primary-foreground rounded-full smooth-transition"
          >
            {suggestion}
          </button>
        ))}
      </div>
    </div>
  );
};

export default SearchBar;