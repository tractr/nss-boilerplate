export type Json = string | number | boolean | null | { [key: string]: Json | undefined } | Json[];

export type Database = {
  graphql_public: {
    Tables: {
      [_ in never]: never;
    };
    Views: {
      [_ in never]: never;
    };
    Functions: {
      graphql: {
        Args: {
          operationName?: string;
          query?: string;
          variables?: Json;
          extensions?: Json;
        };
        Returns: Json;
      };
    };
    Enums: {
      [_ in never]: never;
    };
    CompositeTypes: {
      [_ in never]: never;
    };
  };
  public: {
    Tables: {
      agitation: {
        Row: {
          agitation: number;
          file: string;
          time: string;
          valvo: string;
        };
        Insert: {
          agitation: number;
          file: string;
          time: string;
          valvo: string;
        };
        Update: {
          agitation?: number;
          file?: string;
          time?: string;
          valvo?: string;
        };
        Relationships: [
          {
            foreignKeyName: 'agitation_file_fkey';
            columns: ['file'];
            isOneToOne: false;
            referencedRelation: 'file';
            referencedColumns: ['id'];
          },
          {
            foreignKeyName: 'agitation_valvo_fkey';
            columns: ['valvo'];
            isOneToOne: false;
            referencedRelation: 'agitation_indicator';
            referencedColumns: ['valvo_id'];
          },
          {
            foreignKeyName: 'agitation_valvo_fkey';
            columns: ['valvo'];
            isOneToOne: false;
            referencedRelation: 'growth_indicator';
            referencedColumns: ['valvo_id'];
          },
          {
            foreignKeyName: 'agitation_valvo_fkey';
            columns: ['valvo'];
            isOneToOne: false;
            referencedRelation: 'mortality_indicator';
            referencedColumns: ['valvo_id'];
          },
          {
            foreignKeyName: 'agitation_valvo_fkey';
            columns: ['valvo'];
            isOneToOne: false;
            referencedRelation: 'night_and_day_rhythm_indicator';
            referencedColumns: ['valvo_id'];
          },
          {
            foreignKeyName: 'agitation_valvo_fkey';
            columns: ['valvo'];
            isOneToOne: false;
            referencedRelation: 'tidal_rhythm_indicator';
            referencedColumns: ['valvo_id'];
          },
          {
            foreignKeyName: 'agitation_valvo_fkey';
            columns: ['valvo'];
            isOneToOne: false;
            referencedRelation: 'valve_closing_duration_indicator';
            referencedColumns: ['valvo_id'];
          },
          {
            foreignKeyName: 'agitation_valvo_fkey';
            columns: ['valvo'];
            isOneToOne: false;
            referencedRelation: 'valve_opening_amplitude_indicator';
            referencedColumns: ['valvo_id'];
          },
          {
            foreignKeyName: 'agitation_valvo_fkey';
            columns: ['valvo'];
            isOneToOne: false;
            referencedRelation: 'valvo';
            referencedColumns: ['id'];
          }
        ];
      };
      city: {
        Row: {
          created_at: string;
          id: string;
          location: unknown;
          name: string;
        };
        Insert: {
          created_at?: string;
          id?: string;
          location: unknown;
          name: string;
        };
        Update: {
          created_at?: string;
          id?: string;
          location?: unknown;
          name?: string;
        };
        Relationships: [];
      };
      file: {
        Row: {
          created_at: string;
          data_type: Database['public']['Enums']['DataType'];
          filepath: string;
          folder_date: string | null;
          id: string;
          last_digested_at: string | null;
          source: string;
        };
        Insert: {
          created_at?: string;
          data_type: Database['public']['Enums']['DataType'];
          filepath: string;
          folder_date?: string | null;
          id?: string;
          last_digested_at?: string | null;
          source: string;
        };
        Update: {
          created_at?: string;
          data_type?: Database['public']['Enums']['DataType'];
          filepath?: string;
          folder_date?: string | null;
          id?: string;
          last_digested_at?: string | null;
          source?: string;
        };
        Relationships: [
          {
            foreignKeyName: 'file_source_fkey';
            columns: ['source'];
            isOneToOne: false;
            referencedRelation: 'source';
            referencedColumns: ['id'];
          }
        ];
      };
      ftp: {
        Row: {
          created_at: string;
          host: string;
          id: string;
          port: number;
          private_key: string;
          user: string;
        };
        Insert: {
          created_at?: string;
          host: string;
          id?: string;
          port: number;
          private_key: string;
          user: string;
        };
        Update: {
          created_at?: string;
          host?: string;
          id?: string;
          port?: number;
          private_key?: string;
          user?: string;
        };
        Relationships: [];
      };
      growth: {
        Row: {
          file: string;
          growth: number;
          time: string;
          valvo: string;
        };
        Insert: {
          file: string;
          growth: number;
          time: string;
          valvo: string;
        };
        Update: {
          file?: string;
          growth?: number;
          time?: string;
          valvo?: string;
        };
        Relationships: [
          {
            foreignKeyName: 'growth_file_fkey';
            columns: ['file'];
            isOneToOne: false;
            referencedRelation: 'file';
            referencedColumns: ['id'];
          },
          {
            foreignKeyName: 'growth_valvo_fkey';
            columns: ['valvo'];
            isOneToOne: false;
            referencedRelation: 'agitation_indicator';
            referencedColumns: ['valvo_id'];
          },
          {
            foreignKeyName: 'growth_valvo_fkey';
            columns: ['valvo'];
            isOneToOne: false;
            referencedRelation: 'growth_indicator';
            referencedColumns: ['valvo_id'];
          },
          {
            foreignKeyName: 'growth_valvo_fkey';
            columns: ['valvo'];
            isOneToOne: false;
            referencedRelation: 'mortality_indicator';
            referencedColumns: ['valvo_id'];
          },
          {
            foreignKeyName: 'growth_valvo_fkey';
            columns: ['valvo'];
            isOneToOne: false;
            referencedRelation: 'night_and_day_rhythm_indicator';
            referencedColumns: ['valvo_id'];
          },
          {
            foreignKeyName: 'growth_valvo_fkey';
            columns: ['valvo'];
            isOneToOne: false;
            referencedRelation: 'tidal_rhythm_indicator';
            referencedColumns: ['valvo_id'];
          },
          {
            foreignKeyName: 'growth_valvo_fkey';
            columns: ['valvo'];
            isOneToOne: false;
            referencedRelation: 'valve_closing_duration_indicator';
            referencedColumns: ['valvo_id'];
          },
          {
            foreignKeyName: 'growth_valvo_fkey';
            columns: ['valvo'];
            isOneToOne: false;
            referencedRelation: 'valve_opening_amplitude_indicator';
            referencedColumns: ['valvo_id'];
          },
          {
            foreignKeyName: 'growth_valvo_fkey';
            columns: ['valvo'];
            isOneToOne: false;
            referencedRelation: 'valvo';
            referencedColumns: ['id'];
          }
        ];
      };
      job: {
        Row: {
          created_at: string;
          error: Json | null;
          id: number;
          job_id: string;
          job_type: string;
          result: Json | null;
          success: boolean;
        };
        Insert: {
          created_at?: string;
          error?: Json | null;
          id?: number;
          job_id: string;
          job_type: string;
          result?: Json | null;
          success: boolean;
        };
        Update: {
          created_at?: string;
          error?: Json | null;
          id?: number;
          job_id?: string;
          job_type?: string;
          result?: Json | null;
          success?: boolean;
        };
        Relationships: [];
      };
      max_amplitude: {
        Row: {
          file: string;
          max_amplitude: number;
          time: string;
          valvo: string;
        };
        Insert: {
          file: string;
          max_amplitude: number;
          time: string;
          valvo: string;
        };
        Update: {
          file?: string;
          max_amplitude?: number;
          time?: string;
          valvo?: string;
        };
        Relationships: [
          {
            foreignKeyName: 'max_amplitude_file_fkey';
            columns: ['file'];
            isOneToOne: false;
            referencedRelation: 'file';
            referencedColumns: ['id'];
          },
          {
            foreignKeyName: 'max_amplitude_valvo_fkey';
            columns: ['valvo'];
            isOneToOne: false;
            referencedRelation: 'agitation_indicator';
            referencedColumns: ['valvo_id'];
          },
          {
            foreignKeyName: 'max_amplitude_valvo_fkey';
            columns: ['valvo'];
            isOneToOne: false;
            referencedRelation: 'growth_indicator';
            referencedColumns: ['valvo_id'];
          },
          {
            foreignKeyName: 'max_amplitude_valvo_fkey';
            columns: ['valvo'];
            isOneToOne: false;
            referencedRelation: 'mortality_indicator';
            referencedColumns: ['valvo_id'];
          },
          {
            foreignKeyName: 'max_amplitude_valvo_fkey';
            columns: ['valvo'];
            isOneToOne: false;
            referencedRelation: 'night_and_day_rhythm_indicator';
            referencedColumns: ['valvo_id'];
          },
          {
            foreignKeyName: 'max_amplitude_valvo_fkey';
            columns: ['valvo'];
            isOneToOne: false;
            referencedRelation: 'tidal_rhythm_indicator';
            referencedColumns: ['valvo_id'];
          },
          {
            foreignKeyName: 'max_amplitude_valvo_fkey';
            columns: ['valvo'];
            isOneToOne: false;
            referencedRelation: 'valve_closing_duration_indicator';
            referencedColumns: ['valvo_id'];
          },
          {
            foreignKeyName: 'max_amplitude_valvo_fkey';
            columns: ['valvo'];
            isOneToOne: false;
            referencedRelation: 'valve_opening_amplitude_indicator';
            referencedColumns: ['valvo_id'];
          },
          {
            foreignKeyName: 'max_amplitude_valvo_fkey';
            columns: ['valvo'];
            isOneToOne: false;
            referencedRelation: 'valvo';
            referencedColumns: ['id'];
          }
        ];
      };
      mortality: {
        Row: {
          file: string;
          oyster_id: number;
          time: string;
          valvo: string;
        };
        Insert: {
          file: string;
          oyster_id: number;
          time: string;
          valvo: string;
        };
        Update: {
          file?: string;
          oyster_id?: number;
          time?: string;
          valvo?: string;
        };
        Relationships: [
          {
            foreignKeyName: 'mortality_file_fkey';
            columns: ['file'];
            isOneToOne: false;
            referencedRelation: 'file';
            referencedColumns: ['id'];
          },
          {
            foreignKeyName: 'mortality_valvo_fkey';
            columns: ['valvo'];
            isOneToOne: false;
            referencedRelation: 'agitation_indicator';
            referencedColumns: ['valvo_id'];
          },
          {
            foreignKeyName: 'mortality_valvo_fkey';
            columns: ['valvo'];
            isOneToOne: false;
            referencedRelation: 'growth_indicator';
            referencedColumns: ['valvo_id'];
          },
          {
            foreignKeyName: 'mortality_valvo_fkey';
            columns: ['valvo'];
            isOneToOne: false;
            referencedRelation: 'mortality_indicator';
            referencedColumns: ['valvo_id'];
          },
          {
            foreignKeyName: 'mortality_valvo_fkey';
            columns: ['valvo'];
            isOneToOne: false;
            referencedRelation: 'night_and_day_rhythm_indicator';
            referencedColumns: ['valvo_id'];
          },
          {
            foreignKeyName: 'mortality_valvo_fkey';
            columns: ['valvo'];
            isOneToOne: false;
            referencedRelation: 'tidal_rhythm_indicator';
            referencedColumns: ['valvo_id'];
          },
          {
            foreignKeyName: 'mortality_valvo_fkey';
            columns: ['valvo'];
            isOneToOne: false;
            referencedRelation: 'valve_closing_duration_indicator';
            referencedColumns: ['valvo_id'];
          },
          {
            foreignKeyName: 'mortality_valvo_fkey';
            columns: ['valvo'];
            isOneToOne: false;
            referencedRelation: 'valve_opening_amplitude_indicator';
            referencedColumns: ['valvo_id'];
          },
          {
            foreignKeyName: 'mortality_valvo_fkey';
            columns: ['valvo'];
            isOneToOne: false;
            referencedRelation: 'valvo';
            referencedColumns: ['id'];
          }
        ];
      };
      rhythm: {
        Row: {
          file: string;
          night_and_day: number;
          tidal: number;
          time: string;
          valvo: string;
        };
        Insert: {
          file: string;
          night_and_day: number;
          tidal: number;
          time: string;
          valvo: string;
        };
        Update: {
          file?: string;
          night_and_day?: number;
          tidal?: number;
          time?: string;
          valvo?: string;
        };
        Relationships: [
          {
            foreignKeyName: 'rhythm_file_fkey';
            columns: ['file'];
            isOneToOne: false;
            referencedRelation: 'file';
            referencedColumns: ['id'];
          },
          {
            foreignKeyName: 'rhythm_valvo_fkey';
            columns: ['valvo'];
            isOneToOne: false;
            referencedRelation: 'agitation_indicator';
            referencedColumns: ['valvo_id'];
          },
          {
            foreignKeyName: 'rhythm_valvo_fkey';
            columns: ['valvo'];
            isOneToOne: false;
            referencedRelation: 'growth_indicator';
            referencedColumns: ['valvo_id'];
          },
          {
            foreignKeyName: 'rhythm_valvo_fkey';
            columns: ['valvo'];
            isOneToOne: false;
            referencedRelation: 'mortality_indicator';
            referencedColumns: ['valvo_id'];
          },
          {
            foreignKeyName: 'rhythm_valvo_fkey';
            columns: ['valvo'];
            isOneToOne: false;
            referencedRelation: 'night_and_day_rhythm_indicator';
            referencedColumns: ['valvo_id'];
          },
          {
            foreignKeyName: 'rhythm_valvo_fkey';
            columns: ['valvo'];
            isOneToOne: false;
            referencedRelation: 'tidal_rhythm_indicator';
            referencedColumns: ['valvo_id'];
          },
          {
            foreignKeyName: 'rhythm_valvo_fkey';
            columns: ['valvo'];
            isOneToOne: false;
            referencedRelation: 'valve_closing_duration_indicator';
            referencedColumns: ['valvo_id'];
          },
          {
            foreignKeyName: 'rhythm_valvo_fkey';
            columns: ['valvo'];
            isOneToOne: false;
            referencedRelation: 'valve_opening_amplitude_indicator';
            referencedColumns: ['valvo_id'];
          },
          {
            foreignKeyName: 'rhythm_valvo_fkey';
            columns: ['valvo'];
            isOneToOne: false;
            referencedRelation: 'valvo';
            referencedColumns: ['id'];
          }
        ];
      };
      site: {
        Row: {
          created_at: string;
          id: string;
          slug: string;
        };
        Insert: {
          created_at?: string;
          id?: string;
          slug: string;
        };
        Update: {
          created_at?: string;
          id?: string;
          slug?: string;
        };
        Relationships: [];
      };
      site_valvo: {
        Row: {
          created_at: string;
          site: string;
          valvo: string;
        };
        Insert: {
          created_at?: string;
          site: string;
          valvo: string;
        };
        Update: {
          created_at?: string;
          site?: string;
          valvo?: string;
        };
        Relationships: [
          {
            foreignKeyName: 'site_valvo_site_fkey';
            columns: ['site'];
            isOneToOne: false;
            referencedRelation: 'site';
            referencedColumns: ['id'];
          },
          {
            foreignKeyName: 'site_valvo_valvo_fkey';
            columns: ['valvo'];
            isOneToOne: false;
            referencedRelation: 'agitation_indicator';
            referencedColumns: ['valvo_id'];
          },
          {
            foreignKeyName: 'site_valvo_valvo_fkey';
            columns: ['valvo'];
            isOneToOne: false;
            referencedRelation: 'growth_indicator';
            referencedColumns: ['valvo_id'];
          },
          {
            foreignKeyName: 'site_valvo_valvo_fkey';
            columns: ['valvo'];
            isOneToOne: false;
            referencedRelation: 'mortality_indicator';
            referencedColumns: ['valvo_id'];
          },
          {
            foreignKeyName: 'site_valvo_valvo_fkey';
            columns: ['valvo'];
            isOneToOne: false;
            referencedRelation: 'night_and_day_rhythm_indicator';
            referencedColumns: ['valvo_id'];
          },
          {
            foreignKeyName: 'site_valvo_valvo_fkey';
            columns: ['valvo'];
            isOneToOne: false;
            referencedRelation: 'tidal_rhythm_indicator';
            referencedColumns: ['valvo_id'];
          },
          {
            foreignKeyName: 'site_valvo_valvo_fkey';
            columns: ['valvo'];
            isOneToOne: false;
            referencedRelation: 'valve_closing_duration_indicator';
            referencedColumns: ['valvo_id'];
          },
          {
            foreignKeyName: 'site_valvo_valvo_fkey';
            columns: ['valvo'];
            isOneToOne: false;
            referencedRelation: 'valve_opening_amplitude_indicator';
            referencedColumns: ['valvo_id'];
          },
          {
            foreignKeyName: 'site_valvo_valvo_fkey';
            columns: ['valvo'];
            isOneToOne: false;
            referencedRelation: 'valvo';
            referencedColumns: ['id'];
          }
        ];
      };
      source: {
        Row: {
          agitation_path: string;
          created_at: string;
          ftp: string | null;
          growth_path: string;
          id: string;
          max_amplitude_path: string;
          mortality_path: string;
          rhythm_path: string;
          root_path: string;
          spawning_path: string;
          valve_closing_duration_path: string;
          valve_opening_amplitude_path: string;
          valvo: string;
        };
        Insert: {
          agitation_path?: string;
          created_at?: string;
          ftp?: string | null;
          growth_path?: string;
          id?: string;
          max_amplitude_path?: string;
          mortality_path?: string;
          rhythm_path?: string;
          root_path: string;
          spawning_path?: string;
          valve_closing_duration_path?: string;
          valve_opening_amplitude_path?: string;
          valvo: string;
        };
        Update: {
          agitation_path?: string;
          created_at?: string;
          ftp?: string | null;
          growth_path?: string;
          id?: string;
          max_amplitude_path?: string;
          mortality_path?: string;
          rhythm_path?: string;
          root_path?: string;
          spawning_path?: string;
          valve_closing_duration_path?: string;
          valve_opening_amplitude_path?: string;
          valvo?: string;
        };
        Relationships: [
          {
            foreignKeyName: 'source_ftp_fkey';
            columns: ['ftp'];
            isOneToOne: false;
            referencedRelation: 'ftp';
            referencedColumns: ['id'];
          },
          {
            foreignKeyName: 'source_valvo_fkey';
            columns: ['valvo'];
            isOneToOne: false;
            referencedRelation: 'agitation_indicator';
            referencedColumns: ['valvo_id'];
          },
          {
            foreignKeyName: 'source_valvo_fkey';
            columns: ['valvo'];
            isOneToOne: false;
            referencedRelation: 'growth_indicator';
            referencedColumns: ['valvo_id'];
          },
          {
            foreignKeyName: 'source_valvo_fkey';
            columns: ['valvo'];
            isOneToOne: false;
            referencedRelation: 'mortality_indicator';
            referencedColumns: ['valvo_id'];
          },
          {
            foreignKeyName: 'source_valvo_fkey';
            columns: ['valvo'];
            isOneToOne: false;
            referencedRelation: 'night_and_day_rhythm_indicator';
            referencedColumns: ['valvo_id'];
          },
          {
            foreignKeyName: 'source_valvo_fkey';
            columns: ['valvo'];
            isOneToOne: false;
            referencedRelation: 'tidal_rhythm_indicator';
            referencedColumns: ['valvo_id'];
          },
          {
            foreignKeyName: 'source_valvo_fkey';
            columns: ['valvo'];
            isOneToOne: false;
            referencedRelation: 'valve_closing_duration_indicator';
            referencedColumns: ['valvo_id'];
          },
          {
            foreignKeyName: 'source_valvo_fkey';
            columns: ['valvo'];
            isOneToOne: false;
            referencedRelation: 'valve_opening_amplitude_indicator';
            referencedColumns: ['valvo_id'];
          },
          {
            foreignKeyName: 'source_valvo_fkey';
            columns: ['valvo'];
            isOneToOne: false;
            referencedRelation: 'valvo';
            referencedColumns: ['id'];
          }
        ];
      };
      spawning: {
        Row: {
          file: string;
          spawn: number;
          time: string;
          valvo: string;
        };
        Insert: {
          file: string;
          spawn: number;
          time: string;
          valvo: string;
        };
        Update: {
          file?: string;
          spawn?: number;
          time?: string;
          valvo?: string;
        };
        Relationships: [
          {
            foreignKeyName: 'spawning_file_fkey';
            columns: ['file'];
            isOneToOne: false;
            referencedRelation: 'file';
            referencedColumns: ['id'];
          },
          {
            foreignKeyName: 'spawning_valvo_fkey';
            columns: ['valvo'];
            isOneToOne: false;
            referencedRelation: 'agitation_indicator';
            referencedColumns: ['valvo_id'];
          },
          {
            foreignKeyName: 'spawning_valvo_fkey';
            columns: ['valvo'];
            isOneToOne: false;
            referencedRelation: 'growth_indicator';
            referencedColumns: ['valvo_id'];
          },
          {
            foreignKeyName: 'spawning_valvo_fkey';
            columns: ['valvo'];
            isOneToOne: false;
            referencedRelation: 'mortality_indicator';
            referencedColumns: ['valvo_id'];
          },
          {
            foreignKeyName: 'spawning_valvo_fkey';
            columns: ['valvo'];
            isOneToOne: false;
            referencedRelation: 'night_and_day_rhythm_indicator';
            referencedColumns: ['valvo_id'];
          },
          {
            foreignKeyName: 'spawning_valvo_fkey';
            columns: ['valvo'];
            isOneToOne: false;
            referencedRelation: 'tidal_rhythm_indicator';
            referencedColumns: ['valvo_id'];
          },
          {
            foreignKeyName: 'spawning_valvo_fkey';
            columns: ['valvo'];
            isOneToOne: false;
            referencedRelation: 'valve_closing_duration_indicator';
            referencedColumns: ['valvo_id'];
          },
          {
            foreignKeyName: 'spawning_valvo_fkey';
            columns: ['valvo'];
            isOneToOne: false;
            referencedRelation: 'valve_opening_amplitude_indicator';
            referencedColumns: ['valvo_id'];
          },
          {
            foreignKeyName: 'spawning_valvo_fkey';
            columns: ['valvo'];
            isOneToOne: false;
            referencedRelation: 'valvo';
            referencedColumns: ['id'];
          }
        ];
      };
      user: {
        Row: {
          email: string;
          id: string;
          role: Database['public']['Enums']['UserRole'];
        };
        Insert: {
          email: string;
          id: string;
          role?: Database['public']['Enums']['UserRole'];
        };
        Update: {
          email?: string;
          id?: string;
          role?: Database['public']['Enums']['UserRole'];
        };
        Relationships: [
          {
            foreignKeyName: 'user_id_fkey';
            columns: ['id'];
            isOneToOne: true;
            referencedRelation: 'users';
            referencedColumns: ['id'];
          }
        ];
      };
      user_site: {
        Row: {
          created_at: string;
          site: string;
          user: string;
        };
        Insert: {
          created_at?: string;
          site: string;
          user: string;
        };
        Update: {
          created_at?: string;
          site?: string;
          user?: string;
        };
        Relationships: [
          {
            foreignKeyName: 'user_site_site_fkey';
            columns: ['site'];
            isOneToOne: false;
            referencedRelation: 'site';
            referencedColumns: ['id'];
          },
          {
            foreignKeyName: 'user_site_user_fkey';
            columns: ['user'];
            isOneToOne: false;
            referencedRelation: 'user';
            referencedColumns: ['id'];
          }
        ];
      };
      valve_closing_duration: {
        Row: {
          closure_duration: number;
          file: string;
          time: string;
          valvo: string;
          vcd_se: number | null;
        };
        Insert: {
          closure_duration: number;
          file: string;
          time: string;
          valvo: string;
          vcd_se?: number | null;
        };
        Update: {
          closure_duration?: number;
          file?: string;
          time?: string;
          valvo?: string;
          vcd_se?: number | null;
        };
        Relationships: [
          {
            foreignKeyName: 'valve_closing_duration_file_fkey';
            columns: ['file'];
            isOneToOne: false;
            referencedRelation: 'file';
            referencedColumns: ['id'];
          },
          {
            foreignKeyName: 'valve_closing_duration_valvo_fkey';
            columns: ['valvo'];
            isOneToOne: false;
            referencedRelation: 'agitation_indicator';
            referencedColumns: ['valvo_id'];
          },
          {
            foreignKeyName: 'valve_closing_duration_valvo_fkey';
            columns: ['valvo'];
            isOneToOne: false;
            referencedRelation: 'growth_indicator';
            referencedColumns: ['valvo_id'];
          },
          {
            foreignKeyName: 'valve_closing_duration_valvo_fkey';
            columns: ['valvo'];
            isOneToOne: false;
            referencedRelation: 'mortality_indicator';
            referencedColumns: ['valvo_id'];
          },
          {
            foreignKeyName: 'valve_closing_duration_valvo_fkey';
            columns: ['valvo'];
            isOneToOne: false;
            referencedRelation: 'night_and_day_rhythm_indicator';
            referencedColumns: ['valvo_id'];
          },
          {
            foreignKeyName: 'valve_closing_duration_valvo_fkey';
            columns: ['valvo'];
            isOneToOne: false;
            referencedRelation: 'tidal_rhythm_indicator';
            referencedColumns: ['valvo_id'];
          },
          {
            foreignKeyName: 'valve_closing_duration_valvo_fkey';
            columns: ['valvo'];
            isOneToOne: false;
            referencedRelation: 'valve_closing_duration_indicator';
            referencedColumns: ['valvo_id'];
          },
          {
            foreignKeyName: 'valve_closing_duration_valvo_fkey';
            columns: ['valvo'];
            isOneToOne: false;
            referencedRelation: 'valve_opening_amplitude_indicator';
            referencedColumns: ['valvo_id'];
          },
          {
            foreignKeyName: 'valve_closing_duration_valvo_fkey';
            columns: ['valvo'];
            isOneToOne: false;
            referencedRelation: 'valvo';
            referencedColumns: ['id'];
          }
        ];
      };
      valve_opening_amplitude: {
        Row: {
          amplitude: number;
          file: string;
          time: string;
          valvo: string;
          voa_se: number | null;
        };
        Insert: {
          amplitude: number;
          file: string;
          time: string;
          valvo: string;
          voa_se?: number | null;
        };
        Update: {
          amplitude?: number;
          file?: string;
          time?: string;
          valvo?: string;
          voa_se?: number | null;
        };
        Relationships: [
          {
            foreignKeyName: 'valve_opening_amplitude_file_fkey';
            columns: ['file'];
            isOneToOne: false;
            referencedRelation: 'file';
            referencedColumns: ['id'];
          },
          {
            foreignKeyName: 'valve_opening_amplitude_valvo_fkey';
            columns: ['valvo'];
            isOneToOne: false;
            referencedRelation: 'agitation_indicator';
            referencedColumns: ['valvo_id'];
          },
          {
            foreignKeyName: 'valve_opening_amplitude_valvo_fkey';
            columns: ['valvo'];
            isOneToOne: false;
            referencedRelation: 'growth_indicator';
            referencedColumns: ['valvo_id'];
          },
          {
            foreignKeyName: 'valve_opening_amplitude_valvo_fkey';
            columns: ['valvo'];
            isOneToOne: false;
            referencedRelation: 'mortality_indicator';
            referencedColumns: ['valvo_id'];
          },
          {
            foreignKeyName: 'valve_opening_amplitude_valvo_fkey';
            columns: ['valvo'];
            isOneToOne: false;
            referencedRelation: 'night_and_day_rhythm_indicator';
            referencedColumns: ['valvo_id'];
          },
          {
            foreignKeyName: 'valve_opening_amplitude_valvo_fkey';
            columns: ['valvo'];
            isOneToOne: false;
            referencedRelation: 'tidal_rhythm_indicator';
            referencedColumns: ['valvo_id'];
          },
          {
            foreignKeyName: 'valve_opening_amplitude_valvo_fkey';
            columns: ['valvo'];
            isOneToOne: false;
            referencedRelation: 'valve_closing_duration_indicator';
            referencedColumns: ['valvo_id'];
          },
          {
            foreignKeyName: 'valve_opening_amplitude_valvo_fkey';
            columns: ['valvo'];
            isOneToOne: false;
            referencedRelation: 'valve_opening_amplitude_indicator';
            referencedColumns: ['valvo_id'];
          },
          {
            foreignKeyName: 'valve_opening_amplitude_valvo_fkey';
            columns: ['valvo'];
            isOneToOne: false;
            referencedRelation: 'valvo';
            referencedColumns: ['id'];
          }
        ];
      };
      valvo: {
        Row: {
          agitation_during_opening_period_weight: number;
          agitation_green_threshold: number;
          agitation_number_of_exceedences_threshold: number;
          agitation_orange_threshold: number;
          agitation_red_threshold: number;
          agitation_weight: number;
          agitation_yellow_threshold: number;
          city: string | null;
          code: string | null;
          created_at: string;
          description: string | null;
          general_green_threshold: number;
          general_orange_threshold: number;
          general_red_threshold: number;
          general_yellow_threshold: number;
          growth_green_threshold: number;
          growth_orange_threshold: number;
          growth_red_threshold: number;
          growth_threshold: number;
          growth_weight: number;
          growth_yellow_threshold: number;
          id: string;
          location: unknown | null;
          max_amplitude_green_threshold: number;
          max_amplitude_orange_threshold: number;
          max_amplitude_red_threshold: number;
          max_amplitude_threshold: number;
          max_amplitude_weight: number;
          max_amplitude_yellow_threshold: number;
          mortality_green_threshold: number;
          mortality_orange_threshold: number;
          mortality_red_threshold: number;
          mortality_weight: number;
          mortality_yellow_threshold: number;
          name: string;
          night_and_day_rhythm_green_threshold: number;
          night_and_day_rhythm_orange_threshold: number;
          night_and_day_rhythm_red_threshold: number;
          night_and_day_rhythm_weight: number;
          night_and_day_rhythm_yellow_threshold: number;
          public: boolean;
          spawning_pink_threshold: number;
          tidal_rhythm_green_threshold: number;
          tidal_rhythm_orange_threshold: number;
          tidal_rhythm_red_threshold: number;
          tidal_rhythm_weight: number;
          tidal_rhythm_yellow_threshold: number;
          valve_closing_duration_green_threshold: number;
          valve_closing_duration_orange_threshold: number;
          valve_closing_duration_red_threshold: number;
          valve_closing_duration_weight: number;
          valve_closing_duration_yellow_threshold: number;
          valve_during_opening_period_weight: number;
          valve_opening_amplitude_green_threshold: number;
          valve_opening_amplitude_orange_threshold: number;
          valve_opening_amplitude_red_threshold: number;
          valve_opening_amplitude_weight: number;
          valve_opening_amplitude_yellow_threshold: number;
        };
        Insert: {
          agitation_during_opening_period_weight?: number;
          agitation_green_threshold?: number;
          agitation_number_of_exceedences_threshold?: number;
          agitation_orange_threshold?: number;
          agitation_red_threshold?: number;
          agitation_weight?: number;
          agitation_yellow_threshold?: number;
          city?: string | null;
          code?: string | null;
          created_at?: string;
          description?: string | null;
          general_green_threshold?: number;
          general_orange_threshold?: number;
          general_red_threshold?: number;
          general_yellow_threshold?: number;
          growth_green_threshold?: number;
          growth_orange_threshold?: number;
          growth_red_threshold?: number;
          growth_threshold?: number;
          growth_weight?: number;
          growth_yellow_threshold?: number;
          id?: string;
          location?: unknown | null;
          max_amplitude_green_threshold?: number;
          max_amplitude_orange_threshold?: number;
          max_amplitude_red_threshold?: number;
          max_amplitude_threshold?: number;
          max_amplitude_weight?: number;
          max_amplitude_yellow_threshold?: number;
          mortality_green_threshold?: number;
          mortality_orange_threshold?: number;
          mortality_red_threshold?: number;
          mortality_weight?: number;
          mortality_yellow_threshold?: number;
          name?: string;
          night_and_day_rhythm_green_threshold?: number;
          night_and_day_rhythm_orange_threshold?: number;
          night_and_day_rhythm_red_threshold?: number;
          night_and_day_rhythm_weight?: number;
          night_and_day_rhythm_yellow_threshold?: number;
          public?: boolean;
          spawning_pink_threshold?: number;
          tidal_rhythm_green_threshold?: number;
          tidal_rhythm_orange_threshold?: number;
          tidal_rhythm_red_threshold?: number;
          tidal_rhythm_weight?: number;
          tidal_rhythm_yellow_threshold?: number;
          valve_closing_duration_green_threshold?: number;
          valve_closing_duration_orange_threshold?: number;
          valve_closing_duration_red_threshold?: number;
          valve_closing_duration_weight?: number;
          valve_closing_duration_yellow_threshold?: number;
          valve_during_opening_period_weight?: number;
          valve_opening_amplitude_green_threshold?: number;
          valve_opening_amplitude_orange_threshold?: number;
          valve_opening_amplitude_red_threshold?: number;
          valve_opening_amplitude_weight?: number;
          valve_opening_amplitude_yellow_threshold?: number;
        };
        Update: {
          agitation_during_opening_period_weight?: number;
          agitation_green_threshold?: number;
          agitation_number_of_exceedences_threshold?: number;
          agitation_orange_threshold?: number;
          agitation_red_threshold?: number;
          agitation_weight?: number;
          agitation_yellow_threshold?: number;
          city?: string | null;
          code?: string | null;
          created_at?: string;
          description?: string | null;
          general_green_threshold?: number;
          general_orange_threshold?: number;
          general_red_threshold?: number;
          general_yellow_threshold?: number;
          growth_green_threshold?: number;
          growth_orange_threshold?: number;
          growth_red_threshold?: number;
          growth_threshold?: number;
          growth_weight?: number;
          growth_yellow_threshold?: number;
          id?: string;
          location?: unknown | null;
          max_amplitude_green_threshold?: number;
          max_amplitude_orange_threshold?: number;
          max_amplitude_red_threshold?: number;
          max_amplitude_threshold?: number;
          max_amplitude_weight?: number;
          max_amplitude_yellow_threshold?: number;
          mortality_green_threshold?: number;
          mortality_orange_threshold?: number;
          mortality_red_threshold?: number;
          mortality_weight?: number;
          mortality_yellow_threshold?: number;
          name?: string;
          night_and_day_rhythm_green_threshold?: number;
          night_and_day_rhythm_orange_threshold?: number;
          night_and_day_rhythm_red_threshold?: number;
          night_and_day_rhythm_weight?: number;
          night_and_day_rhythm_yellow_threshold?: number;
          public?: boolean;
          spawning_pink_threshold?: number;
          tidal_rhythm_green_threshold?: number;
          tidal_rhythm_orange_threshold?: number;
          tidal_rhythm_red_threshold?: number;
          tidal_rhythm_weight?: number;
          tidal_rhythm_yellow_threshold?: number;
          valve_closing_duration_green_threshold?: number;
          valve_closing_duration_orange_threshold?: number;
          valve_closing_duration_red_threshold?: number;
          valve_closing_duration_weight?: number;
          valve_closing_duration_yellow_threshold?: number;
          valve_during_opening_period_weight?: number;
          valve_opening_amplitude_green_threshold?: number;
          valve_opening_amplitude_orange_threshold?: number;
          valve_opening_amplitude_red_threshold?: number;
          valve_opening_amplitude_weight?: number;
          valve_opening_amplitude_yellow_threshold?: number;
        };
        Relationships: [
          {
            foreignKeyName: 'valvo_city_fkey';
            columns: ['city'];
            isOneToOne: false;
            referencedRelation: 'city';
            referencedColumns: ['id'];
          }
        ];
      };
      valvo_image: {
        Row: {
          created_at: string;
          description: string;
          id: string;
          image_bucket: string;
          image_path: string;
          sort: number | null;
          valvo: string;
        };
        Insert: {
          created_at?: string;
          description: string;
          id?: string;
          image_bucket: string;
          image_path: string;
          sort?: number | null;
          valvo: string;
        };
        Update: {
          created_at?: string;
          description?: string;
          id?: string;
          image_bucket: string;
          image_path: string;
          sort?: number | null;
          valvo?: string;
        };
        Relationships: [
          {
            foreignKeyName: 'public_valvo_image_image_path_image_bucket_fkey';
            columns: ['image_path', 'image_bucket'];
            isOneToOne: false;
            referencedRelation: 'objects';
            referencedColumns: ['id'];
          },
          {
            foreignKeyName: 'valvo_image_valvo_fkey';
            columns: ['valvo'];
            isOneToOne: false;
            referencedRelation: 'agitation_indicator';
            referencedColumns: ['valvo_id'];
          },
          {
            foreignKeyName: 'valvo_image_valvo_fkey';
            columns: ['valvo'];
            isOneToOne: false;
            referencedRelation: 'growth_indicator';
            referencedColumns: ['valvo_id'];
          },
          {
            foreignKeyName: 'valvo_image_valvo_fkey';
            columns: ['valvo'];
            isOneToOne: false;
            referencedRelation: 'mortality_indicator';
            referencedColumns: ['valvo_id'];
          },
          {
            foreignKeyName: 'valvo_image_valvo_fkey';
            columns: ['valvo'];
            isOneToOne: false;
            referencedRelation: 'night_and_day_rhythm_indicator';
            referencedColumns: ['valvo_id'];
          },
          {
            foreignKeyName: 'valvo_image_valvo_fkey';
            columns: ['valvo'];
            isOneToOne: false;
            referencedRelation: 'tidal_rhythm_indicator';
            referencedColumns: ['valvo_id'];
          },
          {
            foreignKeyName: 'valvo_image_valvo_fkey';
            columns: ['valvo'];
            isOneToOne: false;
            referencedRelation: 'valve_closing_duration_indicator';
            referencedColumns: ['valvo_id'];
          },
          {
            foreignKeyName: 'valvo_image_valvo_fkey';
            columns: ['valvo'];
            isOneToOne: false;
            referencedRelation: 'valve_opening_amplitude_indicator';
            referencedColumns: ['valvo_id'];
          },
          {
            foreignKeyName: 'valvo_image_valvo_fkey';
            columns: ['valvo'];
            isOneToOne: false;
            referencedRelation: 'valvo';
            referencedColumns: ['id'];
          }
        ];
      };
    };
    Views: {
      agitation_indicator: {
        Row: {
          day: string | null;
          indicator: number | null;
          indicator_for_general: number | null;
          number_of_exceedences_threshold: number | null;
          total_mt_blue_threshold: number | null;
          total_mt_green_threshold: number | null;
          total_mt_orange_threshold: number | null;
          total_mt_red_threshold: number | null;
          total_mt_yellow_threshold: number | null;
          value: number | null;
          valvo_id: string | null;
          weight: number | null;
        };
        Relationships: [];
      };
      growth_indicator: {
        Row: {
          day: string | null;
          green_threshold: number | null;
          indicator: number | null;
          indicator_for_general: number | null;
          orange_threshold: number | null;
          red_threshold: number | null;
          total_mt_blue_threshold: number | null;
          total_mt_green_threshold: number | null;
          total_mt_orange_threshold: number | null;
          total_mt_red_threshold: number | null;
          total_mt_yellow_threshold: number | null;
          value: number | null;
          valvo_id: string | null;
          weight: number | null;
          yellow_threshold: number | null;
        };
        Relationships: [];
      };
      mortality_indicator: {
        Row: {
          day: string | null;
          green_threshold: number | null;
          indicator: number | null;
          indicator_for_general: number | null;
          orange_threshold: number | null;
          red_threshold: number | null;
          value: number | null;
          valvo_id: string | null;
          weight: number | null;
          yellow_threshold: number | null;
        };
        Relationships: [];
      };
      night_and_day_rhythm_indicator: {
        Row: {
          day: string | null;
          green_threshold: number | null;
          indicator: number | null;
          indicator_for_general: number | null;
          orange_threshold: number | null;
          red_threshold: number | null;
          value: number | null;
          valvo_id: string | null;
          weight: number | null;
          yellow_threshold: number | null;
        };
        Relationships: [];
      };
      tidal_rhythm_indicator: {
        Row: {
          day: string | null;
          green_threshold: number | null;
          indicator: number | null;
          indicator_for_general: number | null;
          orange_threshold: number | null;
          red_threshold: number | null;
          value: number | null;
          valvo_id: string | null;
          weight: number | null;
          yellow_threshold: number | null;
        };
        Relationships: [];
      };
      valve_closing_duration_indicator: {
        Row: {
          day: string | null;
          green_threshold: number | null;
          indicator: number | null;
          indicator_for_general: number | null;
          orange_threshold: number | null;
          red_threshold: number | null;
          value: number | null;
          valvo_id: string | null;
          weight: number | null;
          yellow_threshold: number | null;
        };
        Relationships: [];
      };
      valve_opening_amplitude_indicator: {
        Row: {
          day: string | null;
          green_threshold: number | null;
          indicator: number | null;
          indicator_for_general: number | null;
          orange_threshold: number | null;
          red_threshold: number | null;
          value: number | null;
          valvo_id: string | null;
          weight: number | null;
          yellow_threshold: number | null;
        };
        Relationships: [];
      };
      valvo_geography: {
        Row: {
          feature: Json | null;
          geometry: Json | null;
          id: string | null;
          latitude: number | null;
          location: unknown | null;
          longitude: number | null;
        };
        Relationships: [];
      };
      water_temparature_view: {
        Row: {
          day: string | null;
          valvo_id: string | null;
          water_temperature_max: number | null;
          water_temperature_min: number | null;
        };
        Relationships: [
          {
            foreignKeyName: 'public_water_temperature_valvo_fkey';
            columns: ['valvo_id'];
            isOneToOne: false;
            referencedRelation: 'valvo';
            referencedColumns: ['id'];
          },
          {
            foreignKeyName: 'public_water_temperature_valvo_fkey';
            columns: ['valvo_id'];
            isOneToOne: false;
            referencedRelation: 'agitation_indicator';
            referencedColumns: ['valvo_id'];
          },
          {
            foreignKeyName: 'public_water_temperature_valvo_fkey';
            columns: ['valvo_id'];
            isOneToOne: false;
            referencedRelation: 'growth_indicator';
            referencedColumns: ['valvo_id'];
          },
          {
            foreignKeyName: 'public_water_temperature_valvo_fkey';
            columns: ['valvo_id'];
            isOneToOne: false;
            referencedRelation: 'mortality_indicator';
            referencedColumns: ['valvo_id'];
          },
          {
            foreignKeyName: 'public_water_temperature_valvo_fkey';
            columns: ['valvo_id'];
            isOneToOne: false;
            referencedRelation: 'night_and_day_rhythm_indicator';
            referencedColumns: ['valvo_id'];
          },
          {
            foreignKeyName: 'public_water_temperature_valvo_fkey';
            columns: ['valvo_id'];
            isOneToOne: false;
            referencedRelation: 'tidal_rhythm_indicator';
            referencedColumns: ['valvo_id'];
          },
          {
            foreignKeyName: 'public_water_temperature_valvo_fkey';
            columns: ['valvo_id'];
            isOneToOne: false;
            referencedRelation: 'valve_closing_duration_indicator';
            referencedColumns: ['valvo_id'];
          },
          {
            foreignKeyName: 'public_water_temperature_valvo_fkey';
            columns: ['valvo_id'];
            isOneToOne: false;
            referencedRelation: 'valve_opening_amplitude_indicator';
            referencedColumns: ['valvo_id'];
          }
        ];
      };
      water_temperature_view: {
        Row: {
          day: string | null;
          valvo_id: string | null;
          water_temperature_max: number | null;
          water_temperature_min: number | null;
        };
        Relationships: [
          {
            foreignKeyName: 'public_water_temperature_valvo_fkey';
            columns: ['valvo_id'];
            isOneToOne: false;
            referencedRelation: 'valvo';
            referencedColumns: ['id'];
          },
          {
            foreignKeyName: 'public_water_temperature_valvo_fkey';
            columns: ['valvo_id'];
            isOneToOne: false;
            referencedRelation: 'agitation_indicator';
            referencedColumns: ['valvo_id'];
          },
          {
            foreignKeyName: 'public_water_temperature_valvo_fkey';
            columns: ['valvo_id'];
            isOneToOne: false;
            referencedRelation: 'growth_indicator';
            referencedColumns: ['valvo_id'];
          },
          {
            foreignKeyName: 'public_water_temperature_valvo_fkey';
            columns: ['valvo_id'];
            isOneToOne: false;
            referencedRelation: 'mortality_indicator';
            referencedColumns: ['valvo_id'];
          },
          {
            foreignKeyName: 'public_water_temperature_valvo_fkey';
            columns: ['valvo_id'];
            isOneToOne: false;
            referencedRelation: 'night_and_day_rhythm_indicator';
            referencedColumns: ['valvo_id'];
          },
          {
            foreignKeyName: 'public_water_temperature_valvo_fkey';
            columns: ['valvo_id'];
            isOneToOne: false;
            referencedRelation: 'tidal_rhythm_indicator';
            referencedColumns: ['valvo_id'];
          },
          {
            foreignKeyName: 'public_water_temperature_valvo_fkey';
            columns: ['valvo_id'];
            isOneToOne: false;
            referencedRelation: 'valve_closing_duration_indicator';
            referencedColumns: ['valvo_id'];
          },
          {
            foreignKeyName: 'public_water_temperature_valvo_fkey';
            columns: ['valvo_id'];
            isOneToOne: false;
            referencedRelation: 'valve_opening_amplitude_indicator';
            referencedColumns: ['valvo_id'];
          }
        ];
      };
    };
    Functions: {
      can_read_valvo: {
        Args: {
          id: string;
          valvo_id: string;
        };
        Returns: boolean;
      };
      get_agitation_during_opening_period_indicator: {
        Args: {
          start_date: string;
          period_of_time: number;
          valvo_id: string;
        };
        Returns: {
          day: string;
          value: number;
          total_mt_red_threshold: number;
          total_mt_orange_threshold: number;
          total_mt_yellow_threshold: number;
          total_mt_green_threshold: number;
          total_mt_blue_threshold: number;
          indicator: number;
          agitation_red_threshold: number;
          agitation_orange_threshold: number;
          agitation_yellow_threshold: number;
          agitation_green_threshold: number;
          agitation_number_of_exceedences_threshold: number;
        }[];
      };
      get_agitation_indicator: {
        Args: {
          p_start_date: string;
          p_period_of_time: number;
          p_valvo_id: string;
        };
        Returns: {
          day: string;
          value: number;
          indicator: number;
        }[];
      };
      get_all_user_accessible_valvo: {
        Args: Record<PropertyKey, never>;
        Returns: {
          id: string;
        }[];
      };
      get_city_geography: {
        Args: Record<PropertyKey, never>;
        Returns: {
          id: string;
          name: string;
          location: unknown;
          longitude: number;
          latitude: number;
          geometry: Json;
          feature: Json;
        }[];
      };
      get_current_general_indicator: {
        Args: {
          valvo_id: string;
        };
        Returns: Json;
      };
      get_general_indicator: {
        Args: {
          start_date: string;
          period_of_time: number;
          valvo_id: string;
        };
        Returns: Database['public']['CompositeTypes']['general_indicator'][];
      };
      get_general_indicator_light: {
        Args: {
          start_date: string;
          period_of_time: number;
          valvo_id: string;
        };
        Returns: Database['public']['CompositeTypes']['general_indicator_light'][];
      };
      get_growth_indicator: {
        Args: {
          p_start_date: string;
          p_period_of_time: number;
          p_valvo_id: string;
        };
        Returns: {
          day: string;
          value: number;
          indicator: number;
        }[];
      };
      get_max_amplitude_indicator: {
        Args: {
          start_date: string;
          period_of_time: number;
          valvo_id: string;
        };
        Returns: {
          day: string;
          value: number;
          indicator: number;
          max_amplitude_red_threshold: number;
          max_amplitude_orange_threshold: number;
          max_amplitude_yellow_threshold: number;
          max_amplitude_green_threshold: number;
        }[];
      };
      get_mortality_indicator: {
        Args: {
          p_start_date: string;
          p_period_of_time: number;
          p_valvo_id: string;
        };
        Returns: {
          day: string;
          value: number;
          indicator: number;
        }[];
      };
      get_night_and_day_rhythm_indicator: {
        Args: {
          p_start_date: string;
          p_period_of_time: number;
          p_valvo_id: string;
        };
        Returns: {
          day: string;
          value: number;
          indicator: number;
        }[];
      };
      get_spawning_indicator: {
        Args: {
          start_date: string;
          period_of_time: number;
          valvo_id: string;
        };
        Returns: {
          day: string;
          value: number;
          indicator: number;
          spawning_pink_threshold: number;
        }[];
      };
      get_tidal_rhythm_indicator: {
        Args: {
          p_start_date: string;
          p_period_of_time: number;
          p_valvo_id: string;
        };
        Returns: {
          day: string;
          value: number;
          indicator: number;
        }[];
      };
      get_valve_closing_duration_indicator: {
        Args: {
          p_start_date: string;
          p_period_of_time: number;
          p_valvo_id: string;
        };
        Returns: {
          day: string;
          value: number;
          indicator: number;
        }[];
      };
      get_valve_opening_amplitude_indicator: {
        Args: {
          p_start_date: string;
          p_period_of_time: number;
          p_valvo_id: string;
        };
        Returns: {
          day: string;
          value: number;
          indicator: number;
        }[];
      };
      get_valvo_feature_collection: {
        Args: Record<PropertyKey, never>;
        Returns: Json;
      };
      get_valvo_geography: {
        Args: Record<PropertyKey, never>;
        Returns: {
          id: string;
          location: unknown;
          longitude: number;
          latitude: number;
          geometry: Json;
          feature: Json;
        }[];
      };
      get_water_temperature_view: {
        Args: {
          p_start_date: string;
          p_period_of_time: number;
          p_valvo_id: string;
        };
        Returns: {
          day: string;
          water_temperature_min: number;
          water_temperature_max: number;
        }[];
      };
      is_admin: {
        Args: {
          id: string;
        };
        Returns: boolean;
      };
      is_public_valvo: {
        Args: {
          valvo_id: string;
        };
        Returns: boolean;
      };
      read_secret: {
        Args: {
          secret_name: string;
        };
        Returns: string;
      };
      webhook_api: {
        Args: {
          arg_method: string;
          arg_path: string;
          arg_old_record?: Json;
          arg_record?: Json;
          arg_type?: string;
          arg_table?: string;
          arg_schema?: string;
        };
        Returns: number;
      };
      webhook_search_file: {
        Args: Record<PropertyKey, never>;
        Returns: undefined;
      };
    };
    Enums: {
      DataType:
        | 'mortality'
        | 'agitation'
        | 'valve_opening_amplitude'
        | 'valve_closing_duration'
        | 'rhythm'
        | 'growth'
        | 'max_amplitude'
        | 'spawning';
      UserRole: 'admin' | 'user';
    };
    CompositeTypes: {
      general_indicator: {
        day: string | null;
        general_indicator: number | null;
        general_value: number | null;
        general: Json | null;
        mortality: Json | null;
        agitation: Json | null;
        agitation_during_opening_period: Json | null;
        valve_closing_duration: Json | null;
        valve_opening_amplitude: Json | null;
        night_and_day_rhythm: Json | null;
        tidal_rhythm: Json | null;
        growth: Json | null;
        max_amplitude: Json | null;
        spawning: Json | null;
        water_temperature: Json | null;
      };
      general_indicator_light: {
        day: string | null;
        general_indicator: number | null;
        general_value: number | null;
      };
    };
  };
};

type PublicSchema = Database[Extract<keyof Database, 'public'>];

export type Tables<
  PublicTableNameOrOptions extends
    | keyof (PublicSchema['Tables'] & PublicSchema['Views'])
    | { schema: keyof Database },
  TableName extends PublicTableNameOrOptions extends { schema: keyof Database }
    ? keyof (Database[PublicTableNameOrOptions['schema']]['Tables'] &
        Database[PublicTableNameOrOptions['schema']]['Views'])
    : never = never
> = PublicTableNameOrOptions extends { schema: keyof Database }
  ? (Database[PublicTableNameOrOptions['schema']]['Tables'] &
      Database[PublicTableNameOrOptions['schema']]['Views'])[TableName] extends {
      Row: infer R;
    }
    ? R
    : never
  : PublicTableNameOrOptions extends keyof (PublicSchema['Tables'] & PublicSchema['Views'])
  ? (PublicSchema['Tables'] & PublicSchema['Views'])[PublicTableNameOrOptions] extends {
      Row: infer R;
    }
    ? R
    : never
  : never;

export type TablesInsert<
  PublicTableNameOrOptions extends keyof PublicSchema['Tables'] | { schema: keyof Database },
  TableName extends PublicTableNameOrOptions extends { schema: keyof Database }
    ? keyof Database[PublicTableNameOrOptions['schema']]['Tables']
    : never = never
> = PublicTableNameOrOptions extends { schema: keyof Database }
  ? Database[PublicTableNameOrOptions['schema']]['Tables'][TableName] extends {
      Insert: infer I;
    }
    ? I
    : never
  : PublicTableNameOrOptions extends keyof PublicSchema['Tables']
  ? PublicSchema['Tables'][PublicTableNameOrOptions] extends {
      Insert: infer I;
    }
    ? I
    : never
  : never;

export type TablesUpdate<
  PublicTableNameOrOptions extends keyof PublicSchema['Tables'] | { schema: keyof Database },
  TableName extends PublicTableNameOrOptions extends { schema: keyof Database }
    ? keyof Database[PublicTableNameOrOptions['schema']]['Tables']
    : never = never
> = PublicTableNameOrOptions extends { schema: keyof Database }
  ? Database[PublicTableNameOrOptions['schema']]['Tables'][TableName] extends {
      Update: infer U;
    }
    ? U
    : never
  : PublicTableNameOrOptions extends keyof PublicSchema['Tables']
  ? PublicSchema['Tables'][PublicTableNameOrOptions] extends {
      Update: infer U;
    }
    ? U
    : never
  : never;

export type Enums<
  PublicEnumNameOrOptions extends keyof PublicSchema['Enums'] | { schema: keyof Database },
  EnumName extends PublicEnumNameOrOptions extends { schema: keyof Database }
    ? keyof Database[PublicEnumNameOrOptions['schema']]['Enums']
    : never = never
> = PublicEnumNameOrOptions extends { schema: keyof Database }
  ? Database[PublicEnumNameOrOptions['schema']]['Enums'][EnumName]
  : PublicEnumNameOrOptions extends keyof PublicSchema['Enums']
  ? PublicSchema['Enums'][PublicEnumNameOrOptions]
  : never;

export type CompositeTypes<
  PublicCompositeTypeNameOrOptions extends
    | keyof PublicSchema['CompositeTypes']
    | { schema: keyof Database },
  CompositeTypeName extends PublicCompositeTypeNameOrOptions extends {
    schema: keyof Database;
  }
    ? keyof Database[PublicCompositeTypeNameOrOptions['schema']]['CompositeTypes']
    : never = never
> = PublicCompositeTypeNameOrOptions extends { schema: keyof Database }
  ? Database[PublicCompositeTypeNameOrOptions['schema']]['CompositeTypes'][CompositeTypeName]
  : PublicCompositeTypeNameOrOptions extends keyof PublicSchema['CompositeTypes']
  ? PublicSchema['CompositeTypes'][PublicCompositeTypeNameOrOptions]
  : never;

// Types pour les indicateurs

interface Indicator {
  reason?: string;
  value?: number;
  indicator?: number;
}

interface WaterTemperature {
  day?: string;
  water_temperature_min?: number;
  water_temperature_max?: number;
  indicator?: number;
  reason?: string;
}

export interface GeneralIndicator {
  day: string | null;
  general_indicator: number | null;
  general_value: number | null;
  general: Indicator | null;
  mortality: Indicator | null;
  agitation: Indicator | null;
  agitation_during_opening_period: Indicator | null;
  valve_closing_duration: Indicator | null;
  valve_opening_amplitude: Indicator | null;
  night_and_day_rhythm: Indicator | null;
  tidal_rhythm: Indicator | null;
  growth: Indicator | null;
  max_amplitude: Indicator | null;
  spawning: Indicator | null;
  water_temperature: WaterTemperature | null;
}

export interface GeneralIndicatorLight {
  day: string | null;
  general_indicator: number | null;
  general_value: number | null;
}

// Types pour les résultats des fonctions
export interface AgitationIndicator {
  day: string;
  value: number;
  total_mt_red_threshold: number;
  total_mt_orange_threshold: number;
  total_mt_yellow_threshold: number;
  total_mt_green_threshold: number;
  total_mt_blue_threshold: number;
  indicator: number;
  agitation_red_threshold: number;
  agitation_orange_threshold: number;
  agitation_yellow_threshold: number;
  agitation_green_threshold: number;
  agitation_number_of_exceedences_threshold: number;
}

export interface GrowthIndicator {
  day: string;
  value: number;
  indicator: number;
  growth_red_threshold: number;
  growth_orange_threshold: number;
  growth_yellow_threshold: number;
  growth_green_threshold: number;
}

export interface MaxAmplitudeIndicator {
  day: string;
  value: number;
  indicator: number;
  max_amplitude_red_threshold: number;
  max_amplitude_orange_threshold: number;
  max_amplitude_yellow_threshold: number;
  max_amplitude_green_threshold: number;
}

export interface MortalityIndicator {
  day: string;
  total_oysters_dead: number;
  indicator: number;
}

export interface RhythmIndicator {
  day: string;
  average_night_and_day: number;
  indicator: number;
  night_and_day_rhythm_red_threshold: number;
  night_and_day_rhythm_orange_threshold: number;
  night_and_day_rhythm_yellow_threshold: number;
  night_and_day_rhythm_green_threshold: number;
}

export interface SpawningIndicator {
  day: string;
  value: number;
  indicator: number;
  spawning_pink_threshold: number;
}

export interface ValveClosingDurationIndicator {
  day: string;
  value: number;
  indicator: number;
  valve_closing_duration_red_threshold: number;
  valve_closing_duration_orange_threshold: number;
  valve_closing_duration_yellow_threshold: number;
  valve_closing_duration_green_threshold: number;
}

export interface ValveOpeningAmplitudeIndicator {
  day: string;
  value: number;
  indicator: number;
  valve_opening_amplitude_red_threshold: number;
  valve_opening_amplitude_orange_threshold: number;
  valve_opening_amplitude_yellow_threshold: number;
  valve_opening_amplitude_green_threshold: number;
}

export interface Geometry {
  type: string;
  coordinates: number[][];
}

export interface Properties {
  public: boolean;
  created_at: Date;
}

export interface Feature {
  geometry: Geometry;
  id: string;
  properties: Properties;
  type: string;
}

export type PostGISGeography = {
  type: string;
  coordinates: number[];
  crs: {
    type: string;
    properties: {
      name: string;
    };
  };
};

export interface CityGeography {
  id: string;
  name: string;
  location: PostGISGeography;
  longitude: number;
  latitude: number;
  geometry: Geometry;
  feature: Feature;
}

export interface ValvoGeography {
  id: string;
  location: PostGISGeography;
  longitude: number;
  latitude: number;
  geometry: Geometry;
  feature: Feature;
}
