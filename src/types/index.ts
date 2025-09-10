export interface Product {
  اسم_المنتج: string;
  السعر: number;
  اسم_المتجر: string;
  عنوان_المتجر: string;
  هاتف: string | null;
  نوع_النشاط: "مواد_غذائية" | "صيدلية" | "مطعم" | "أخرى";
  متوفر: boolean;
  العلامة: string | null;
  وصف_المنتج: string | null;
  معرف_المنتج: string;
  معرف_المتجر: string;
  تاريخ_تحديث: string;
  المدينة: string;
  باركود: string | null;
}

export interface Store {
  اسم_النشاط: string;
  النوع: "مواد_غذائية" | "صيدلية" | "مطعم" | "أخرى";
  عنوان: string;
  مدينة: string;
  هاتف: string | null;
  مفعّل: boolean;
  المعرف: string;
  خط_طول: number | null;
  خط_عرض: number | null;
  created_at: string;
}

export interface WebhookRequest {
  message?: string;
  action?: string;
  query?: string;
  timestamp: string;
  source: string;
}

export interface WebhookResponse {
  response?: string;
  message?: string;
  results?: string;
  data?: any;
}