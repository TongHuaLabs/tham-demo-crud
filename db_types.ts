export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json }
  | Json[]

export interface Database {
  public: {
    Tables: {
      business_types: {
        Row: {
          created_at: string | null
          id: number
          name: string | null
        }
        Insert: {
          created_at?: string | null
          id?: number
          name?: string | null
        }
        Update: {
          created_at?: string | null
          id?: number
          name?: string | null
        }
      }
      customers: {
        Row: {
          address_details: string | null
          business_types_id: number | null
          city: string | null
          date_of_birth: string | null
          first_name: string | null
          gener_id: number | null
          home_types_id: number | null
          id: number
          last_name: string | null
          marital_status_id: number | null
          national_id: number | null
          occupation_types_id: number | null
          province: string | null
          salary: number | null
          tel_no: string | null
          zip_code: number | null
        }
        Insert: {
          address_details?: string | null
          business_types_id?: number | null
          city?: string | null
          date_of_birth?: string | null
          first_name?: string | null
          gener_id?: number | null
          home_types_id?: number | null
          id?: number
          last_name?: string | null
          marital_status_id?: number | null
          national_id?: number | null
          occupation_types_id?: number | null
          province?: string | null
          salary?: number | null
          tel_no?: string | null
          zip_code?: number | null
        }
        Update: {
          address_details?: string | null
          business_types_id?: number | null
          city?: string | null
          date_of_birth?: string | null
          first_name?: string | null
          gener_id?: number | null
          home_types_id?: number | null
          id?: number
          last_name?: string | null
          marital_status_id?: number | null
          national_id?: number | null
          occupation_types_id?: number | null
          province?: string | null
          salary?: number | null
          tel_no?: string | null
          zip_code?: number | null
        }
      }
      gender: {
        Row: {
          created_at: string | null
          id: number
          name: string | null
        }
        Insert: {
          created_at?: string | null
          id?: number
          name?: string | null
        }
        Update: {
          created_at?: string | null
          id?: number
          name?: string | null
        }
      }
      home_types: {
        Row: {
          created_at: string | null
          id: number
          name: string | null
        }
        Insert: {
          created_at?: string | null
          id?: number
          name?: string | null
        }
        Update: {
          created_at?: string | null
          id?: number
          name?: string | null
        }
      }
      marital_status: {
        Row: {
          created_at: string | null
          id: number
          name: string | null
        }
        Insert: {
          created_at?: string | null
          id?: number
          name?: string | null
        }
        Update: {
          created_at?: string | null
          id?: number
          name?: string | null
        }
      }
      occupation_types: {
        Row: {
          created_at: string | null
          id: number
          name: string | null
        }
        Insert: {
          created_at?: string | null
          id?: number
          name?: string | null
        }
        Update: {
          created_at?: string | null
          id?: number
          name?: string | null
        }
      }
      profiles: {
        Row: {
          created_at: string
          email: string
          id: string
        }
        Insert: {
          created_at?: string
          email: string
          id: string
        }
        Update: {
          created_at?: string
          email?: string
          id?: string
        }
      }
    }
    Views: {
      [_ in never]: never
    }
    Functions: {
      [_ in never]: never
    }
    Enums: {
      [_ in never]: never
    }
    CompositeTypes: {
      [_ in never]: never
    }
  }
}
