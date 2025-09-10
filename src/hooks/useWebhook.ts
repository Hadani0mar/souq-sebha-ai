import { useState } from "react";

const WEBHOOK_URL = "https://n8n.m0usa.ly/webhook-test/540c611b-2cc2-4595-b847-0abece507dde";

export const useWebhook = () => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const sendToWebhook = async (message: string): Promise<string> => {
    setLoading(true);
    setError(null);

    try {
      const response = await fetch(WEBHOOK_URL, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          message: message,
          timestamp: new Date().toISOString(),
          source: 'souq-sebha-web'
        }),
      });

      if (!response.ok) {
        throw new Error(`HTTP ${response.status}: ${response.statusText}`);
      }

      const raw = await response.text();
      if (!raw) return "تم بدء المعالجة ✅";

      try {
        const data = JSON.parse(raw);
        // Handle different response formats
        if (typeof data === 'string') return data;
        if (data.response) return data.response;
        if (data.message) return data.message;
        if (data.results) return typeof data.results === 'string' ? data.results : JSON.stringify(data.results, null, 2);
        return JSON.stringify(data, null, 2);
      } catch {
        // If it's plain text, just return it
        return raw;
      }
      
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : 'حدث خطأ في الاتصال';
      setError(errorMessage);
      
      // Return a fallback response for better UX
      return `عذراً، لم أتمكن من الاتصال بالخدمة حالياً. يرجى المحاولة مرة أخرى لاحقاً.\n\nخطأ تقني: ${errorMessage}`;
    } finally {
      setLoading(false);
    }
  };

  const searchProducts = async (query: string): Promise<string> => {
    setLoading(true);
    setError(null);

    try {
      const response = await fetch(WEBHOOK_URL, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          action: 'search',
          query: query,
          timestamp: new Date().toISOString(),
          source: 'souq-sebha-search'
        }),
      });

      if (!response.ok) {
        throw new Error(`HTTP ${response.status}: ${response.statusText}`);
      }

      const raw = await response.text();
      if (!raw) return "تم بدء البحث ✅";

      try {
        const data = JSON.parse(raw);
        if (typeof data === 'string') return data;
        if (data.results) return typeof data.results === 'string' ? data.results : JSON.stringify(data.results, null, 2);
        if (data.message) return data.message;
        return `تم العثور على النتائج التالية:\n${JSON.stringify(data, null, 2)}`;
      } catch {
        // If it's plain text, just return it
        return raw;
      }
      
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : 'حدث خطأ في البحث';
      setError(errorMessage);
      
      return `عذراً، لم أتمكن من إجراء البحث حالياً. يرجى المحاولة مرة أخرى لاحقاً.\n\nخطأ تقني: ${errorMessage}`;
    } finally {
      setLoading(false);
    }
  };

  return {
    loading,
    error,
    sendToWebhook,
    searchProducts
  };
};