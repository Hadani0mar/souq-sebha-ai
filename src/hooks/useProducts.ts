import { useState, useEffect } from "react";
import { supabase } from "@/integrations/supabase/client";

export interface Product {
  اسم_المنتج: string;
  السعر: number;
  اسم_المتجر: string;
  عنوان_المتجر: string;
  هاتف: string | null;
  نوع_النشاط: string;
  متوفر: boolean;
  العلامة: string | null;
  وصف_المنتج: string | null;
  معرف_المنتج: string;
  معرف_المتجر: string;
}

export interface Store {
  اسم_النشاط: string;
  النوع: string;
  عنوان: string;
  مدينة: string;
  هاتف: string | null;
  مفعّل: boolean;
  المعرف: string;
}

export const useProducts = () => {
  const [products, setProducts] = useState<Product[]>([]);
  const [stores, setStores] = useState<Store[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const fetchProducts = async (searchQuery?: string) => {
    setLoading(true);
    setError(null);
    
    try {
      let query = supabase
        .from('عرض_المنتجات')
        .select('*')
        .eq('متوفر', true);
      
      if (searchQuery) {
        query = query.or(`اسم_المنتج.ilike.%${searchQuery}%,اسم_المتجر.ilike.%${searchQuery}%,العلامة.ilike.%${searchQuery}%`);
      }
      
      const { data, error } = await query.limit(20);
      
      if (error) throw error;
      
      setProducts(data || []);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'حدث خطأ أثناء جلب البيانات');
    } finally {
      setLoading(false);
    }
  };

  const fetchStores = async () => {
    setLoading(true);
    setError(null);
    
    try {
      const { data, error } = await supabase
        .from('المتاجر')
        .select('*')
        .eq('مفعّل', true)
        .limit(20);
      
      if (error) throw error;
      
      setStores(data || []);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'حدث خطأ أثناء جلب بيانات المتاجر');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchProducts();
    fetchStores();
  }, []);

  return {
    products,
    stores,
    loading,
    error,
    searchProducts: fetchProducts,
    refreshStores: fetchStores
  };
};