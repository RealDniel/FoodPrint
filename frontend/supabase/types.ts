export interface Database {
  public: {
    Tables: {
      profiles: {
        Row: {
          id: string;
          email: string;
          full_name: string | null;
          avatar_url: string | null;
          created_at: string;
          updated_at: string;
        };
        Insert: {
          id: string;
          email: string;
          full_name?: string | null;
          avatar_url?: string | null;
          created_at?: string;
          updated_at?: string;
        };
        Update: {
          id?: string;
          email?: string;
          full_name?: string | null;
          avatar_url?: string | null;
          created_at?: string;
          updated_at?: string;
        };
      };
      scan_history: {
        Row: {
          id: string;
          user_id: string;
          food_name: string;
          food_category: string;
          carbon_footprint: number;
          water_usage: number;
          sustainability_score: number;
          scan_date: string;
          image_url: string | null;
          notes: string | null;
          created_at: string;
        };
        Insert: {
          id?: string;
          user_id: string;
          food_name: string;
          food_category: string;
          carbon_footprint: number;
          water_usage: number;
          sustainability_score: number;
          scan_date: string;
          image_url?: string | null;
          notes?: string | null;
          created_at?: string;
        };
        Update: {
          id?: string;
          user_id?: string;
          food_name?: string;
          food_category?: string;
          carbon_footprint?: number;
          water_usage?: number;
          sustainability_score?: number;
          scan_date?: string;
          image_url?: string | null;
          notes?: string | null;
          created_at?: string;
        };
      };
    };
    Views: {
      [_ in never]: never;
    };
    Functions: {
      [_ in never]: never;
    };
    Enums: {
      [_ in never]: never;
    };
  };
}

export type Profile = Database['public']['Tables']['profiles']['Row'];
export type ScanHistory = Database['public']['Tables']['scan_history']['Row'];
export type NewProfile = Database['public']['Tables']['profiles']['Insert'];
export type NewScanHistory = Database['public']['Tables']['scan_history']['Insert'];
