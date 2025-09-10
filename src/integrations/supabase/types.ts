export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[]

export type Database = {
  // Allows to automatically instantiate createClient with right options
  // instead of createClient<Database, { PostgrestVersion: 'XX' }>(URL, KEY)
  __InternalSupabase: {
    PostgrestVersion: "13.0.4"
  }
  public: {
    Tables: {
      المتاجر: {
        Row: {
          created_at: string
          اسم_النشاط: string
          المعرف: string
          النوع: Database["public"]["Enums"]["نوع_النشاط"]
          خط_طول: number | null
          خط_عرض: number | null
          عنوان: string
          مدينة: string
          مفعّل: boolean
          هاتف: string | null
        }
        Insert: {
          created_at?: string
          اسم_النشاط: string
          المعرف?: string
          النوع: Database["public"]["Enums"]["نوع_النشاط"]
          خط_طول?: number | null
          خط_عرض?: number | null
          عنوان: string
          مدينة?: string
          مفعّل?: boolean
          هاتف?: string | null
        }
        Update: {
          created_at?: string
          اسم_النشاط?: string
          المعرف?: string
          النوع?: Database["public"]["Enums"]["نوع_النشاط"]
          خط_طول?: number | null
          خط_عرض?: number | null
          عنوان?: string
          مدينة?: string
          مفعّل?: boolean
          هاتف?: string | null
        }
        Relationships: []
      }
      المنتجات: {
        Row: {
          created_at: string
          fts: unknown | null
          الاسم: string
          العلامة_التجارية: string | null
          المعرف: string
          الوصف: string | null
          باركود: string | null
          صورة: string | null
        }
        Insert: {
          created_at?: string
          fts?: unknown | null
          الاسم: string
          العلامة_التجارية?: string | null
          المعرف?: string
          الوصف?: string | null
          باركود?: string | null
          صورة?: string | null
        }
        Update: {
          created_at?: string
          fts?: unknown | null
          الاسم?: string
          العلامة_التجارية?: string | null
          المعرف?: string
          الوصف?: string | null
          باركود?: string | null
          صورة?: string | null
        }
        Relationships: []
      }
      منتجات_المتجر: {
        Row: {
          السعر_الحالي: number
          المتجر: string
          المنتج: string
          تاريخ_تحديث: string
          متوفر: boolean
        }
        Insert: {
          السعر_الحالي: number
          المتجر: string
          المنتج: string
          تاريخ_تحديث?: string
          متوفر?: boolean
        }
        Update: {
          السعر_الحالي?: number
          المتجر?: string
          المنتج?: string
          تاريخ_تحديث?: string
          متوفر?: boolean
        }
        Relationships: [
          {
            foreignKeyName: "منتجات_المتجر_المتجر_fkey"
            columns: ["المتجر"]
            isOneToOne: false
            referencedRelation: "المتاجر"
            referencedColumns: ["المعرف"]
          },
          {
            foreignKeyName: "منتجات_المتجر_المتجر_fkey"
            columns: ["المتجر"]
            isOneToOne: false
            referencedRelation: "عرض_المنتجات"
            referencedColumns: ["معرف_المتجر"]
          },
          {
            foreignKeyName: "منتجات_المتجر_المنتج_fkey"
            columns: ["المنتج"]
            isOneToOne: false
            referencedRelation: "المنتجات"
            referencedColumns: ["المعرف"]
          },
          {
            foreignKeyName: "منتجات_المتجر_المنتج_fkey"
            columns: ["المنتج"]
            isOneToOne: false
            referencedRelation: "عرض_المنتجات"
            referencedColumns: ["معرف_المنتج"]
          },
        ]
      }
    }
    Views: {
      عرض_المنتجات: {
        Row: {
          اسم_المتجر: string | null
          اسم_المنتج: string | null
          السعر: number | null
          العلامة: string | null
          المدينة: string | null
          باركود: string | null
          تاريخ_تحديث: string | null
          عنوان_المتجر: string | null
          متوفر: boolean | null
          معرف_المتجر: string | null
          معرف_المنتج: string | null
          نوع_النشاط: Database["public"]["Enums"]["نوع_النشاط"] | null
          هاتف: string | null
          وصف_المنتج: string | null
        }
        Relationships: []
      }
    }
    Functions: {
      [_ in never]: never
    }
    Enums: {
      نوع_النشاط: "مواد_غذائية" | "صيدلية" | "مطعم" | "أخرى"
    }
    CompositeTypes: {
      [_ in never]: never
    }
  }
}

type DatabaseWithoutInternals = Omit<Database, "__InternalSupabase">

type DefaultSchema = DatabaseWithoutInternals[Extract<keyof Database, "public">]

export type Tables<
  DefaultSchemaTableNameOrOptions extends
    | keyof (DefaultSchema["Tables"] & DefaultSchema["Views"])
    | { schema: keyof DatabaseWithoutInternals },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof (DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"] &
        DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Views"])
    : never = never,
> = DefaultSchemaTableNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? (DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"] &
      DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Views"])[TableName] extends {
      Row: infer R
    }
    ? R
    : never
  : DefaultSchemaTableNameOrOptions extends keyof (DefaultSchema["Tables"] &
        DefaultSchema["Views"])
    ? (DefaultSchema["Tables"] &
        DefaultSchema["Views"])[DefaultSchemaTableNameOrOptions] extends {
        Row: infer R
      }
      ? R
      : never
    : never

export type TablesInsert<
  DefaultSchemaTableNameOrOptions extends
    | keyof DefaultSchema["Tables"]
    | { schema: keyof DatabaseWithoutInternals },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"]
    : never = never,
> = DefaultSchemaTableNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Insert: infer I
    }
    ? I
    : never
  : DefaultSchemaTableNameOrOptions extends keyof DefaultSchema["Tables"]
    ? DefaultSchema["Tables"][DefaultSchemaTableNameOrOptions] extends {
        Insert: infer I
      }
      ? I
      : never
    : never

export type TablesUpdate<
  DefaultSchemaTableNameOrOptions extends
    | keyof DefaultSchema["Tables"]
    | { schema: keyof DatabaseWithoutInternals },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"]
    : never = never,
> = DefaultSchemaTableNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Update: infer U
    }
    ? U
    : never
  : DefaultSchemaTableNameOrOptions extends keyof DefaultSchema["Tables"]
    ? DefaultSchema["Tables"][DefaultSchemaTableNameOrOptions] extends {
        Update: infer U
      }
      ? U
      : never
    : never

export type Enums<
  DefaultSchemaEnumNameOrOptions extends
    | keyof DefaultSchema["Enums"]
    | { schema: keyof DatabaseWithoutInternals },
  EnumName extends DefaultSchemaEnumNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[DefaultSchemaEnumNameOrOptions["schema"]]["Enums"]
    : never = never,
> = DefaultSchemaEnumNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[DefaultSchemaEnumNameOrOptions["schema"]]["Enums"][EnumName]
  : DefaultSchemaEnumNameOrOptions extends keyof DefaultSchema["Enums"]
    ? DefaultSchema["Enums"][DefaultSchemaEnumNameOrOptions]
    : never

export type CompositeTypes<
  PublicCompositeTypeNameOrOptions extends
    | keyof DefaultSchema["CompositeTypes"]
    | { schema: keyof DatabaseWithoutInternals },
  CompositeTypeName extends PublicCompositeTypeNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"]
    : never = never,
> = PublicCompositeTypeNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"][CompositeTypeName]
  : PublicCompositeTypeNameOrOptions extends keyof DefaultSchema["CompositeTypes"]
    ? DefaultSchema["CompositeTypes"][PublicCompositeTypeNameOrOptions]
    : never

export const Constants = {
  public: {
    Enums: {
      نوع_النشاط: ["مواد_غذائية", "صيدلية", "مطعم", "أخرى"],
    },
  },
} as const
