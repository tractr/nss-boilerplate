export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[]

export type Database = {
  public: {
    Tables: {
      agribalyse: {
        Row: {
          "Acidification terrestre et eaux douces": number | null
          "Appauvrissement de la couche d'ozone": number | null
          "Approche emballage": string | null
          "Changement climatique": number | null
          "Changement climatique - émissions biogéniques": number | null
          "Changement climatique - émissions fossiles": number | null
          "Changement climatique - liées à l'affectation des sols":
            | number
            | null
          "Code AGB": string | null
          "code avion": number | null
          "Code CIQUAL": string | null
          "code saison": number | null
          "DQR - Note de qualité de la donnée": number | null
          "Écotoxicité pour écosystèmes aquatiques d'eau douce": number | null
          "Effets toxicologiques non-cancérogènes": number | null
          "Effets toxicologiques substances cancérogènes": number | null
          "Épuisement des ressources eau": number | null
          "Épuisement des ressources énergétiques": number | null
          "Épuisement des ressources minéraux": number | null
          "Eutrophisation eaux douces": number | null
          "Eutrophisation marine": number | null
          "Eutrophisation terrestre": number | null
          "Formation photochimique d'ozone": number | null
          "Groupe d'aliment": string | null
          id: string
          "LCI Name": string | null
          Livraison: string | null
          "Nom du Produit en Français": string | null
          "Particules fines": number | null
          Préparation: string | null
          "Rayonnements ionisants": number | null
          "Score unique EF 3.1": number | null
          "Sous-groupe d'aliment": string | null
          "Utilisation du sol": number | null
        }
        Insert: {
          "Acidification terrestre et eaux douces"?: number | null
          "Appauvrissement de la couche d'ozone"?: number | null
          "Approche emballage"?: string | null
          "Changement climatique"?: number | null
          "Changement climatique - émissions biogéniques"?: number | null
          "Changement climatique - émissions fossiles"?: number | null
          "Changement climatique - liées à l'affectation des sols"?:
            | number
            | null
          "Code AGB"?: string | null
          "code avion"?: number | null
          "Code CIQUAL"?: string | null
          "code saison"?: number | null
          "DQR - Note de qualité de la donnée"?: number | null
          "Écotoxicité pour écosystèmes aquatiques d'eau douce"?: number | null
          "Effets toxicologiques non-cancérogènes"?: number | null
          "Effets toxicologiques substances cancérogènes"?: number | null
          "Épuisement des ressources eau"?: number | null
          "Épuisement des ressources énergétiques"?: number | null
          "Épuisement des ressources minéraux"?: number | null
          "Eutrophisation eaux douces"?: number | null
          "Eutrophisation marine"?: number | null
          "Eutrophisation terrestre"?: number | null
          "Formation photochimique d'ozone"?: number | null
          "Groupe d'aliment"?: string | null
          id?: string
          "LCI Name"?: string | null
          Livraison?: string | null
          "Nom du Produit en Français"?: string | null
          "Particules fines"?: number | null
          Préparation?: string | null
          "Rayonnements ionisants"?: number | null
          "Score unique EF 3.1"?: number | null
          "Sous-groupe d'aliment"?: string | null
          "Utilisation du sol"?: number | null
        }
        Update: {
          "Acidification terrestre et eaux douces"?: number | null
          "Appauvrissement de la couche d'ozone"?: number | null
          "Approche emballage"?: string | null
          "Changement climatique"?: number | null
          "Changement climatique - émissions biogéniques"?: number | null
          "Changement climatique - émissions fossiles"?: number | null
          "Changement climatique - liées à l'affectation des sols"?:
            | number
            | null
          "Code AGB"?: string | null
          "code avion"?: number | null
          "Code CIQUAL"?: string | null
          "code saison"?: number | null
          "DQR - Note de qualité de la donnée"?: number | null
          "Écotoxicité pour écosystèmes aquatiques d'eau douce"?: number | null
          "Effets toxicologiques non-cancérogènes"?: number | null
          "Effets toxicologiques substances cancérogènes"?: number | null
          "Épuisement des ressources eau"?: number | null
          "Épuisement des ressources énergétiques"?: number | null
          "Épuisement des ressources minéraux"?: number | null
          "Eutrophisation eaux douces"?: number | null
          "Eutrophisation marine"?: number | null
          "Eutrophisation terrestre"?: number | null
          "Formation photochimique d'ozone"?: number | null
          "Groupe d'aliment"?: string | null
          id?: string
          "LCI Name"?: string | null
          Livraison?: string | null
          "Nom du Produit en Français"?: string | null
          "Particules fines"?: number | null
          Préparation?: string | null
          "Rayonnements ionisants"?: number | null
          "Score unique EF 3.1"?: number | null
          "Sous-groupe d'aliment"?: string | null
          "Utilisation du sol"?: number | null
        }
        Relationships: []
      }
      configs: {
        Row: {
          key: string
          value: string
        }
        Insert: {
          key: string
          value: string
        }
        Update: {
          key?: string
          value?: string
        }
        Relationships: []
      }
      menus: {
        Row: {
          created_at: string
          file_bucket: string | null
          file_path: string | null
          id: string
          label: string
          owner: string
          updated_date: string | null
          version: number
        }
        Insert: {
          created_at?: string
          file_bucket?: string | null
          file_path?: string | null
          id?: string
          label: string
          owner?: string
          updated_date?: string | null
          version?: number
        }
        Update: {
          created_at?: string
          file_bucket?: string | null
          file_path?: string | null
          id?: string
          label?: string
          owner?: string
          updated_date?: string | null
          version?: number
        }
        Relationships: []
      }
      profiles: {
        Row: {
          first_name: string | null
          id: string
          last_name: string | null
        }
        Insert: {
          first_name?: string | null
          id: string
          last_name?: string | null
        }
        Update: {
          first_name?: string | null
          id?: string
          last_name?: string | null
        }
        Relationships: []
      }
      stream_ai_menu_run_contexts: {
        Row: {
          created_at: string
          id: string
          menu: string
          run: string
          updated_at: string | null
        }
        Insert: {
          created_at?: string
          id?: string
          menu: string
          run: string
          updated_at?: string | null
        }
        Update: {
          created_at?: string
          id?: string
          menu?: string
          run?: string
          updated_at?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "stream_ai_menu_run_context_menu_fkey"
            columns: ["menu"]
            isOneToOne: false
            referencedRelation: "menus"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "stream_ai_menu_run_context_run_fkey"
            columns: ["run"]
            isOneToOne: false
            referencedRelation: "stream_ai_runs"
            referencedColumns: ["id"]
          },
        ]
      }
      stream_ai_run_steps: {
        Row: {
          created_at: string
          error_message: string | null
          finished_at: string | null
          id: string
          input: Json
          output: Json | null
          run: string
          status: Database["public"]["Enums"]["stream_ai_process_status"]
          step: Database["public"]["Enums"]["stream_ai_step"]
        }
        Insert: {
          created_at?: string
          error_message?: string | null
          finished_at?: string | null
          id?: string
          input: Json
          output?: Json | null
          run: string
          status?: Database["public"]["Enums"]["stream_ai_process_status"]
          step: Database["public"]["Enums"]["stream_ai_step"]
        }
        Update: {
          created_at?: string
          error_message?: string | null
          finished_at?: string | null
          id?: string
          input?: Json
          output?: Json | null
          run?: string
          status?: Database["public"]["Enums"]["stream_ai_process_status"]
          step?: Database["public"]["Enums"]["stream_ai_step"]
        }
        Relationships: [
          {
            foreignKeyName: "stream_ai_run_step_run_fkey"
            columns: ["run"]
            isOneToOne: false
            referencedRelation: "stream_ai_runs"
            referencedColumns: ["id"]
          },
        ]
      }
      stream_ai_runs: {
        Row: {
          created_at: string
          current_step: Database["public"]["Enums"]["stream_ai_step"] | null
          error_message: string | null
          id: string
          owner: string
          status: Database["public"]["Enums"]["stream_ai_process_status"]
          type: Database["public"]["Enums"]["stream_ai_type"]
          updated_at: string | null
        }
        Insert: {
          created_at?: string
          current_step?: Database["public"]["Enums"]["stream_ai_step"] | null
          error_message?: string | null
          id?: string
          owner?: string
          status?: Database["public"]["Enums"]["stream_ai_process_status"]
          type: Database["public"]["Enums"]["stream_ai_type"]
          updated_at?: string | null
        }
        Update: {
          created_at?: string
          current_step?: Database["public"]["Enums"]["stream_ai_step"] | null
          error_message?: string | null
          id?: string
          owner?: string
          status?: Database["public"]["Enums"]["stream_ai_process_status"]
          type?: Database["public"]["Enums"]["stream_ai_type"]
          updated_at?: string | null
        }
        Relationships: []
      }
    }
    Views: {
      [_ in never]: never
    }
    Functions: {
      get_run_owner: {
        Args: {
          run: string
        }
        Returns: string
      }
    }
    Enums: {
      stream_ai_process_status:
        | "created"
        | "processing"
        | "step_finished"
        | "fully_finished"
        | "error"
      stream_ai_step:
        | "menu_ocr"
        | "menu_recipe"
        | "menu_environmental_impact"
        | "menu_summary"
      stream_ai_type: "menu" | "sell"
    }
    CompositeTypes: {
      [_ in never]: never
    }
  }
}

type PublicSchema = Database[Extract<keyof Database, "public">]

export type Tables<
  PublicTableNameOrOptions extends
    | keyof (PublicSchema["Tables"] & PublicSchema["Views"])
    | { schema: keyof Database },
  TableName extends PublicTableNameOrOptions extends { schema: keyof Database }
    ? keyof (Database[PublicTableNameOrOptions["schema"]]["Tables"] &
        Database[PublicTableNameOrOptions["schema"]]["Views"])
    : never = never,
> = PublicTableNameOrOptions extends { schema: keyof Database }
  ? (Database[PublicTableNameOrOptions["schema"]]["Tables"] &
      Database[PublicTableNameOrOptions["schema"]]["Views"])[TableName] extends {
      Row: infer R
    }
    ? R
    : never
  : PublicTableNameOrOptions extends keyof (PublicSchema["Tables"] &
        PublicSchema["Views"])
    ? (PublicSchema["Tables"] &
        PublicSchema["Views"])[PublicTableNameOrOptions] extends {
        Row: infer R
      }
      ? R
      : never
    : never

export type TablesInsert<
  PublicTableNameOrOptions extends
    | keyof PublicSchema["Tables"]
    | { schema: keyof Database },
  TableName extends PublicTableNameOrOptions extends { schema: keyof Database }
    ? keyof Database[PublicTableNameOrOptions["schema"]]["Tables"]
    : never = never,
> = PublicTableNameOrOptions extends { schema: keyof Database }
  ? Database[PublicTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Insert: infer I
    }
    ? I
    : never
  : PublicTableNameOrOptions extends keyof PublicSchema["Tables"]
    ? PublicSchema["Tables"][PublicTableNameOrOptions] extends {
        Insert: infer I
      }
      ? I
      : never
    : never

export type TablesUpdate<
  PublicTableNameOrOptions extends
    | keyof PublicSchema["Tables"]
    | { schema: keyof Database },
  TableName extends PublicTableNameOrOptions extends { schema: keyof Database }
    ? keyof Database[PublicTableNameOrOptions["schema"]]["Tables"]
    : never = never,
> = PublicTableNameOrOptions extends { schema: keyof Database }
  ? Database[PublicTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Update: infer U
    }
    ? U
    : never
  : PublicTableNameOrOptions extends keyof PublicSchema["Tables"]
    ? PublicSchema["Tables"][PublicTableNameOrOptions] extends {
        Update: infer U
      }
      ? U
      : never
    : never

export type Enums<
  PublicEnumNameOrOptions extends
    | keyof PublicSchema["Enums"]
    | { schema: keyof Database },
  EnumName extends PublicEnumNameOrOptions extends { schema: keyof Database }
    ? keyof Database[PublicEnumNameOrOptions["schema"]]["Enums"]
    : never = never,
> = PublicEnumNameOrOptions extends { schema: keyof Database }
  ? Database[PublicEnumNameOrOptions["schema"]]["Enums"][EnumName]
  : PublicEnumNameOrOptions extends keyof PublicSchema["Enums"]
    ? PublicSchema["Enums"][PublicEnumNameOrOptions]
    : never

export type CompositeTypes<
  PublicCompositeTypeNameOrOptions extends
    | keyof PublicSchema["CompositeTypes"]
    | { schema: keyof Database },
  CompositeTypeName extends PublicCompositeTypeNameOrOptions extends {
    schema: keyof Database
  }
    ? keyof Database[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"]
    : never = never,
> = PublicCompositeTypeNameOrOptions extends { schema: keyof Database }
  ? Database[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"][CompositeTypeName]
  : PublicCompositeTypeNameOrOptions extends keyof PublicSchema["CompositeTypes"]
    ? PublicSchema["CompositeTypes"][PublicCompositeTypeNameOrOptions]
    : never
