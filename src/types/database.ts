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
      _RefExpenseAccountSubType: {
        Row: {
          created_at: string;
          description_en: string | null;
          description_fr: string | null;
          id: string;
          label_en: string;
          label_fr: string;
          name: string;
          type_id: string;
        };
        Insert: {
          created_at?: string;
          description_en?: string | null;
          description_fr?: string | null;
          id?: string;
          label_en: string;
          label_fr: string;
          name: string;
          type_id: string;
        };
        Update: {
          created_at?: string;
          description_en?: string | null;
          description_fr?: string | null;
          id?: string;
          label_en?: string;
          label_fr?: string;
          name?: string;
          type_id?: string;
        };
        Relationships: [
          {
            foreignKeyName: '_RefExpenseAccountSubType_type_id_fkey';
            columns: ['type_id'];
            isOneToOne: false;
            referencedRelation: '_RefExpenseAccountType';
            referencedColumns: ['id'];
          },
        ];
      };
      _RefExpenseAccountType: {
        Row: {
          created_at: string;
          description_en: string | null;
          description_fr: string | null;
          id: string;
          label_en: string;
          label_fr: string;
          name: string;
        };
        Insert: {
          created_at?: string;
          description_en?: string | null;
          description_fr?: string | null;
          id?: string;
          label_en: string;
          label_fr: string;
          name: string;
        };
        Update: {
          created_at?: string;
          description_en?: string | null;
          description_fr?: string | null;
          id?: string;
          label_en?: string;
          label_fr?: string;
          name?: string;
        };
        Relationships: [];
      };
      _RefExpenseCategorySubType: {
        Row: {
          category_id: string | null;
          created_at: string;
          description_en: string | null;
          description_fr: string | null;
          id: string;
          is_home_related: boolean | null;
          label_en: string;
          label_fr: string;
          name: string;
        };
        Insert: {
          category_id?: string | null;
          created_at?: string;
          description_en?: string | null;
          description_fr?: string | null;
          id?: string;
          is_home_related?: boolean | null;
          label_en: string;
          label_fr: string;
          name: string;
        };
        Update: {
          category_id?: string | null;
          created_at?: string;
          description_en?: string | null;
          description_fr?: string | null;
          id?: string;
          is_home_related?: boolean | null;
          label_en?: string;
          label_fr?: string;
          name?: string;
        };
        Relationships: [
          {
            foreignKeyName: '_RefExpenseCategorySubType_category_id_fkey';
            columns: ['category_id'];
            isOneToOne: false;
            referencedRelation: '_RefExpenseCategoryType';
            referencedColumns: ['id'];
          },
        ];
      };
      _RefExpenseCategoryType: {
        Row: {
          created_at: string;
          icon_url: string | null;
          id: string;
          is_home_related: boolean | null;
          label_en: string;
          label_fr: string;
          name: string;
        };
        Insert: {
          created_at?: string;
          icon_url?: string | null;
          id?: string;
          is_home_related?: boolean | null;
          label_en: string;
          label_fr: string;
          name: string;
        };
        Update: {
          created_at?: string;
          icon_url?: string | null;
          id?: string;
          is_home_related?: boolean | null;
          label_en?: string;
          label_fr?: string;
          name?: string;
        };
        Relationships: [];
      };
      DueDate: {
        Row: {
          amount_due_for_due_date: number | null;
          computed_due_date: string | null;
          conditions_for_due_date: string | null;
          created_at: string;
          currency_type_for_due_date: string | null;
          exact_due_date: string | null;
          grace_period_for_due_date: number | null;
          id: string;
          is_sync: boolean | null;
          organizer_id: string | null;
          payment_frequency_for_due_date: Database['public']['Enums']['DueDateFrequency'];
          payment_method_for_due_date: string | null;
          penalty_dates_for_due_date: string | null;
          possible_extensions_for_due_date: string | null;
          property_id: string | null;
          reference_number_or_invoice_number_for_due_date: string | null;
          sent_reminder: string;
          status: Database['public']['Enums']['DueDateStatus'] | null;
          summary: string;
          title: string;
          type: Database['public']['Enums']['DueDateType'] | null;
          updated_at: string;
        };
        Insert: {
          amount_due_for_due_date?: number | null;
          computed_due_date?: string | null;
          conditions_for_due_date?: string | null;
          created_at?: string;
          currency_type_for_due_date?: string | null;
          exact_due_date?: string | null;
          grace_period_for_due_date?: number | null;
          id?: string;
          is_sync?: boolean | null;
          organizer_id?: string | null;
          payment_frequency_for_due_date?: Database['public']['Enums']['DueDateFrequency'];
          payment_method_for_due_date?: string | null;
          penalty_dates_for_due_date?: string | null;
          possible_extensions_for_due_date?: string | null;
          property_id?: string | null;
          reference_number_or_invoice_number_for_due_date?: string | null;
          sent_reminder?: string;
          status?: Database['public']['Enums']['DueDateStatus'] | null;
          summary: string;
          title: string;
          type?: Database['public']['Enums']['DueDateType'] | null;
          updated_at?: string;
        };
        Update: {
          amount_due_for_due_date?: number | null;
          computed_due_date?: string | null;
          conditions_for_due_date?: string | null;
          created_at?: string;
          currency_type_for_due_date?: string | null;
          exact_due_date?: string | null;
          grace_period_for_due_date?: number | null;
          id?: string;
          is_sync?: boolean | null;
          organizer_id?: string | null;
          payment_frequency_for_due_date?: Database['public']['Enums']['DueDateFrequency'];
          payment_method_for_due_date?: string | null;
          penalty_dates_for_due_date?: string | null;
          possible_extensions_for_due_date?: string | null;
          property_id?: string | null;
          reference_number_or_invoice_number_for_due_date?: string | null;
          sent_reminder?: string;
          status?: Database['public']['Enums']['DueDateStatus'] | null;
          summary?: string;
          title?: string;
          type?: Database['public']['Enums']['DueDateType'] | null;
          updated_at?: string;
        };
        Relationships: [
          {
            foreignKeyName: 'DueDate_organizer_id_fkey';
            columns: ['organizer_id'];
            isOneToOne: false;
            referencedRelation: 'Organizer';
            referencedColumns: ['id'];
          },
          {
            foreignKeyName: 'DueDate_property_id_fkey';
            columns: ['property_id'];
            isOneToOne: false;
            referencedRelation: 'Property';
            referencedColumns: ['id'];
          },
        ];
      };
      Env: {
        Row: {
          description: string | null;
          id: number;
          name: string;
          value: string | null;
        };
        Insert: {
          description?: string | null;
          id?: number;
          name: string;
          value?: string | null;
        };
        Update: {
          description?: string | null;
          id?: number;
          name?: string;
          value?: string | null;
        };
        Relationships: [];
      };
      Expense: {
        Row: {
          account_id: string | null;
          amount: number;
          created_at: string;
          currency: string | null;
          date: string | null;
          expense_plaid_issuer_id: string | null;
          expense_stream_id: string | null;
          id: number;
          name: string | null;
          organizer_id: string | null;
          payment_method: Database['public']['Enums']['ExpensePaymentMethod'] | null;
          property_id: string;
          status: Database['public']['Enums']['DueDateStatus'];
          sub_type: string | null;
        };
        Insert: {
          account_id?: string | null;
          amount: number;
          created_at?: string;
          currency?: string | null;
          date?: string | null;
          expense_plaid_issuer_id?: string | null;
          expense_stream_id?: string | null;
          id?: number;
          name?: string | null;
          organizer_id?: string | null;
          payment_method?: Database['public']['Enums']['ExpensePaymentMethod'] | null;
          property_id: string;
          status?: Database['public']['Enums']['DueDateStatus'];
          sub_type?: string | null;
        };
        Update: {
          account_id?: string | null;
          amount?: number;
          created_at?: string;
          currency?: string | null;
          date?: string | null;
          expense_plaid_issuer_id?: string | null;
          expense_stream_id?: string | null;
          id?: number;
          name?: string | null;
          organizer_id?: string | null;
          payment_method?: Database['public']['Enums']['ExpensePaymentMethod'] | null;
          property_id?: string;
          status?: Database['public']['Enums']['DueDateStatus'];
          sub_type?: string | null;
        };
        Relationships: [
          {
            foreignKeyName: 'Expense_organizer_id_fkey';
            columns: ['organizer_id'];
            isOneToOne: false;
            referencedRelation: 'Organizer';
            referencedColumns: ['id'];
          },
          {
            foreignKeyName: 'Expense_property_id_fkey';
            columns: ['property_id'];
            isOneToOne: false;
            referencedRelation: 'Property';
            referencedColumns: ['id'];
          },
          {
            foreignKeyName: 'Expense_sub_type_fkey';
            columns: ['sub_type'];
            isOneToOne: false;
            referencedRelation: '_RefExpenseCategorySubType';
            referencedColumns: ['id'];
          },
          {
            foreignKeyName: 'public_Expense_account_id_fkey';
            columns: ['account_id'];
            isOneToOne: false;
            referencedRelation: 'ExpenseAccount';
            referencedColumns: ['id'];
          },
          {
            foreignKeyName: 'public_Expense_expense_plaid_issuer_id_fkey';
            columns: ['expense_plaid_issuer_id'];
            isOneToOne: false;
            referencedRelation: 'ExpensePlaidIssuer';
            referencedColumns: ['id'];
          },
          {
            foreignKeyName: 'public_Expense_expense_stream_id_fkey';
            columns: ['expense_stream_id'];
            isOneToOne: false;
            referencedRelation: 'ExpenseStream';
            referencedColumns: ['id'];
          },
        ];
      };
      ExpenseAccount: {
        Row: {
          created_at: string;
          id: string;
          name: string;
          sub_type: string | null;
          type: string | null;
          user_id: string;
        };
        Insert: {
          created_at?: string;
          id?: string;
          name: string;
          sub_type?: string | null;
          type?: string | null;
          user_id: string;
        };
        Update: {
          created_at?: string;
          id?: string;
          name?: string;
          sub_type?: string | null;
          type?: string | null;
          user_id?: string;
        };
        Relationships: [
          {
            foreignKeyName: 'ExpenseAccount_sub_type_fkey';
            columns: ['sub_type'];
            isOneToOne: false;
            referencedRelation: '_RefExpenseAccountSubType';
            referencedColumns: ['id'];
          },
          {
            foreignKeyName: 'ExpenseAccount_type_fkey';
            columns: ['type'];
            isOneToOne: false;
            referencedRelation: '_RefExpenseAccountType';
            referencedColumns: ['id'];
          },
          {
            foreignKeyName: 'ExpenseAccount_user_id_fkey';
            columns: ['user_id'];
            isOneToOne: false;
            referencedRelation: 'User';
            referencedColumns: ['id'];
          },
        ];
      };
      ExpensePlaidIssuer: {
        Row: {
          confidence: Database['public']['Enums']['ConfidenceLevel'] | null;
          counterparty_plaid_id: string | null;
          created_at: string;
          id: string;
          issuer_id: string | null;
          logo_url: string | null;
          name: string;
          rejected: boolean | null;
          user_id: string;
          website_url: string | null;
        };
        Insert: {
          confidence?: Database['public']['Enums']['ConfidenceLevel'] | null;
          counterparty_plaid_id?: string | null;
          created_at?: string;
          id?: string;
          issuer_id?: string | null;
          logo_url?: string | null;
          name: string;
          rejected?: boolean | null;
          user_id: string;
          website_url?: string | null;
        };
        Update: {
          confidence?: Database['public']['Enums']['ConfidenceLevel'] | null;
          counterparty_plaid_id?: string | null;
          created_at?: string;
          id?: string;
          issuer_id?: string | null;
          logo_url?: string | null;
          name?: string;
          rejected?: boolean | null;
          user_id?: string;
          website_url?: string | null;
        };
        Relationships: [
          {
            foreignKeyName: 'ExpensePlaidIssuer_issuer_id_fkey';
            columns: ['issuer_id'];
            isOneToOne: false;
            referencedRelation: 'Issuer';
            referencedColumns: ['id'];
          },
          {
            foreignKeyName: 'ExpensePlaidIssuer_user_id_fkey';
            columns: ['user_id'];
            isOneToOne: false;
            referencedRelation: 'User';
            referencedColumns: ['id'];
          },
        ];
      };
      ExpenseStream: {
        Row: {
          account_id: string;
          average_amount: number | null;
          created_at: string;
          description: string | null;
          first_date: string | null;
          frequency: Database['public']['Enums']['ExpenseStreamFrequency'] | null;
          id: string;
          is_active: boolean | null;
          last_date: string | null;
          status: Database['public']['Enums']['ExpenseStreamStatus'] | null;
          sub_type: string | null;
          type: string | null;
          user_id: string;
        };
        Insert: {
          account_id: string;
          average_amount?: number | null;
          created_at?: string;
          description?: string | null;
          first_date?: string | null;
          frequency?: Database['public']['Enums']['ExpenseStreamFrequency'] | null;
          id?: string;
          is_active?: boolean | null;
          last_date?: string | null;
          status?: Database['public']['Enums']['ExpenseStreamStatus'] | null;
          sub_type?: string | null;
          type?: string | null;
          user_id: string;
        };
        Update: {
          account_id?: string;
          average_amount?: number | null;
          created_at?: string;
          description?: string | null;
          first_date?: string | null;
          frequency?: Database['public']['Enums']['ExpenseStreamFrequency'] | null;
          id?: string;
          is_active?: boolean | null;
          last_date?: string | null;
          status?: Database['public']['Enums']['ExpenseStreamStatus'] | null;
          sub_type?: string | null;
          type?: string | null;
          user_id?: string;
        };
        Relationships: [
          {
            foreignKeyName: 'ExpenseStream_account_id_fkey';
            columns: ['account_id'];
            isOneToOne: false;
            referencedRelation: 'ExpenseAccount';
            referencedColumns: ['id'];
          },
          {
            foreignKeyName: 'ExpenseStream_sub_type_fkey';
            columns: ['sub_type'];
            isOneToOne: false;
            referencedRelation: '_RefExpenseCategorySubType';
            referencedColumns: ['id'];
          },
          {
            foreignKeyName: 'ExpenseStream_type_fkey';
            columns: ['type'];
            isOneToOne: false;
            referencedRelation: '_RefExpenseCategoryType';
            referencedColumns: ['id'];
          },
          {
            foreignKeyName: 'ExpenseStream_user_id_fkey';
            columns: ['user_id'];
            isOneToOne: false;
            referencedRelation: 'User';
            referencedColumns: ['id'];
          },
        ];
      };
      File: {
        Row: {
          account_number: string | null;
          ai_doc_done: boolean | null;
          ai_duedates_done: boolean | null;
          ai_expenses_done: boolean | null;
          ai_issuer_done: boolean;
          ai_launched: boolean;
          ai_ocr_done: boolean | null;
          content: string | null;
          contract_duration_start: string | null;
          contract_purpose: string | null;
          created_at: string;
          currency: string | null;
          customer_number: string | null;
          document_date: string | null;
          document_id: string;
          document_path: string | null;
          documents: Json[] | null;
          end_date: string | null;
          financial_terms: string | null;
          folder: Database['public']['Enums']['FolderType'] | null;
          general_terms: string | null;
          gst_amount: number | null;
          id: string;
          invoice_date: string | null;
          invoice_number: string | null;
          is_classification_reviewed: boolean | null;
          isSynced: boolean | null;
          mimetype: string | null;
          payment_method: string | null;
          payment_status: string | null;
          payment_terms: string | null;
          penalties_for_non_compliance: string | null;
          price_without_tax: number | null;
          product_warranty_details: string | null;
          property_id: string;
          qst_amount: number | null;
          reach_page_quota: boolean;
          reach_word_quota: boolean;
          receiver_address: string | null;
          receiver_name: string | null;
          s3_path: string | null;
          source: Database['public']['Enums']['sourceType'] | null;
          start_date: string | null;
          status: Database['public']['Enums']['FileStatus'];
          summary: string | null;
          title: string | null;
          token_usage_id: string | null;
          total_price_including_tax: number | null;
          total_tax_amount: number | null;
          type: Database['public']['Enums']['DocumentType'] | null;
          updated_at: string;
          uploaded_with_ai: boolean;
          uploaded_with_folder: boolean;
          uploaded_with_issuer: boolean;
          warranty_terms: string | null;
        };
        Insert: {
          account_number?: string | null;
          ai_doc_done?: boolean | null;
          ai_duedates_done?: boolean | null;
          ai_expenses_done?: boolean | null;
          ai_issuer_done?: boolean;
          ai_launched?: boolean;
          ai_ocr_done?: boolean | null;
          content?: string | null;
          contract_duration_start?: string | null;
          contract_purpose?: string | null;
          created_at?: string;
          currency?: string | null;
          customer_number?: string | null;
          document_date?: string | null;
          document_id: string;
          document_path?: string | null;
          documents?: Json[] | null;
          end_date?: string | null;
          financial_terms?: string | null;
          folder?: Database['public']['Enums']['FolderType'] | null;
          general_terms?: string | null;
          gst_amount?: number | null;
          id?: string;
          invoice_date?: string | null;
          invoice_number?: string | null;
          is_classification_reviewed?: boolean | null;
          isSynced?: boolean | null;
          mimetype?: string | null;
          payment_method?: string | null;
          payment_status?: string | null;
          payment_terms?: string | null;
          penalties_for_non_compliance?: string | null;
          price_without_tax?: number | null;
          product_warranty_details?: string | null;
          property_id: string;
          qst_amount?: number | null;
          reach_page_quota?: boolean;
          reach_word_quota?: boolean;
          receiver_address?: string | null;
          receiver_name?: string | null;
          s3_path?: string | null;
          source?: Database['public']['Enums']['sourceType'] | null;
          start_date?: string | null;
          status?: Database['public']['Enums']['FileStatus'];
          summary?: string | null;
          title?: string | null;
          token_usage_id?: string | null;
          total_price_including_tax?: number | null;
          total_tax_amount?: number | null;
          type?: Database['public']['Enums']['DocumentType'] | null;
          updated_at?: string;
          uploaded_with_ai?: boolean;
          uploaded_with_folder?: boolean;
          uploaded_with_issuer?: boolean;
          warranty_terms?: string | null;
        };
        Update: {
          account_number?: string | null;
          ai_doc_done?: boolean | null;
          ai_duedates_done?: boolean | null;
          ai_expenses_done?: boolean | null;
          ai_issuer_done?: boolean;
          ai_launched?: boolean;
          ai_ocr_done?: boolean | null;
          content?: string | null;
          contract_duration_start?: string | null;
          contract_purpose?: string | null;
          created_at?: string;
          currency?: string | null;
          customer_number?: string | null;
          document_date?: string | null;
          document_id?: string;
          document_path?: string | null;
          documents?: Json[] | null;
          end_date?: string | null;
          financial_terms?: string | null;
          folder?: Database['public']['Enums']['FolderType'] | null;
          general_terms?: string | null;
          gst_amount?: number | null;
          id?: string;
          invoice_date?: string | null;
          invoice_number?: string | null;
          is_classification_reviewed?: boolean | null;
          isSynced?: boolean | null;
          mimetype?: string | null;
          payment_method?: string | null;
          payment_status?: string | null;
          payment_terms?: string | null;
          penalties_for_non_compliance?: string | null;
          price_without_tax?: number | null;
          product_warranty_details?: string | null;
          property_id?: string;
          qst_amount?: number | null;
          reach_page_quota?: boolean;
          reach_word_quota?: boolean;
          receiver_address?: string | null;
          receiver_name?: string | null;
          s3_path?: string | null;
          source?: Database['public']['Enums']['sourceType'] | null;
          start_date?: string | null;
          status?: Database['public']['Enums']['FileStatus'];
          summary?: string | null;
          title?: string | null;
          token_usage_id?: string | null;
          total_price_including_tax?: number | null;
          total_tax_amount?: number | null;
          type?: Database['public']['Enums']['DocumentType'] | null;
          updated_at?: string;
          uploaded_with_ai?: boolean;
          uploaded_with_folder?: boolean;
          uploaded_with_issuer?: boolean;
          warranty_terms?: string | null;
        };
        Relationships: [
          {
            foreignKeyName: 'File_property_id_fkey';
            columns: ['property_id'];
            isOneToOne: false;
            referencedRelation: 'Property';
            referencedColumns: ['id'];
          },
          {
            foreignKeyName: 'File_token_usage_id_fkey';
            columns: ['token_usage_id'];
            isOneToOne: false;
            referencedRelation: 'TokenUsage';
            referencedColumns: ['id'];
          },
        ];
      };
      Issuer: {
        Row: {
          address: string | null;
          created_at: string;
          email: string | null;
          id: string;
          is_default: boolean | null;
          name: string;
          phone: string | null;
          property_id: string;
          type: Database['public']['Enums']['IssuerType'];
          updated_at: string;
          url: string | null;
        };
        Insert: {
          address?: string | null;
          created_at?: string;
          email?: string | null;
          id?: string;
          is_default?: boolean | null;
          name: string;
          phone?: string | null;
          property_id: string;
          type: Database['public']['Enums']['IssuerType'];
          updated_at?: string;
          url?: string | null;
        };
        Update: {
          address?: string | null;
          created_at?: string;
          email?: string | null;
          id?: string;
          is_default?: boolean | null;
          name?: string;
          phone?: string | null;
          property_id?: string;
          type?: Database['public']['Enums']['IssuerType'];
          updated_at?: string;
          url?: string | null;
        };
        Relationships: [
          {
            foreignKeyName: 'Issuer_property_id_fkey';
            columns: ['property_id'];
            isOneToOne: false;
            referencedRelation: 'Property';
            referencedColumns: ['id'];
          },
        ];
      };
      Job: {
        Row: {
          created_at: string;
          duration: number | null;
          error: Json | null;
          file_id: string;
          id: string;
          open_ai: Json | null;
          payload: Json;
          result: Json | null;
          status: Database['public']['Enums']['JobStatus'];
          type: string;
          updated_at: string;
          usage_id: string | null;
        };
        Insert: {
          created_at?: string;
          duration?: number | null;
          error?: Json | null;
          file_id: string;
          id?: string;
          open_ai?: Json | null;
          payload: Json;
          result?: Json | null;
          status: Database['public']['Enums']['JobStatus'];
          type: string;
          updated_at?: string;
          usage_id?: string | null;
        };
        Update: {
          created_at?: string;
          duration?: number | null;
          error?: Json | null;
          file_id?: string;
          id?: string;
          open_ai?: Json | null;
          payload?: Json;
          result?: Json | null;
          status?: Database['public']['Enums']['JobStatus'];
          type?: string;
          updated_at?: string;
          usage_id?: string | null;
        };
        Relationships: [
          {
            foreignKeyName: 'Job_file_id_fkey';
            columns: ['file_id'];
            isOneToOne: false;
            referencedRelation: 'File';
            referencedColumns: ['id'];
          },
          {
            foreignKeyName: 'Job_file_id_fkey';
            columns: ['file_id'];
            isOneToOne: false;
            referencedRelation: 'file_computed_status_view';
            referencedColumns: ['id'];
          },
          {
            foreignKeyName: 'Job_usage_id_fkey';
            columns: ['usage_id'];
            isOneToOne: false;
            referencedRelation: 'TokenUsage';
            referencedColumns: ['id'];
          },
        ];
      };
      Membership: {
        Row: {
          created_at: string;
          id: string;
          property_id: string;
          role: Database['public']['Enums']['MembershipRole'];
          status: Database['public']['Enums']['MembershipStatus'];
          user_email: string | null;
          user_id: string | null;
        };
        Insert: {
          created_at?: string;
          id?: string;
          property_id: string;
          role?: Database['public']['Enums']['MembershipRole'];
          status?: Database['public']['Enums']['MembershipStatus'];
          user_email?: string | null;
          user_id?: string | null;
        };
        Update: {
          created_at?: string;
          id?: string;
          property_id?: string;
          role?: Database['public']['Enums']['MembershipRole'];
          status?: Database['public']['Enums']['MembershipStatus'];
          user_email?: string | null;
          user_id?: string | null;
        };
        Relationships: [
          {
            foreignKeyName: 'Membership_property_id_fkey';
            columns: ['property_id'];
            isOneToOne: false;
            referencedRelation: 'Property';
            referencedColumns: ['id'];
          },
          {
            foreignKeyName: 'Membership_user_id_fkey';
            columns: ['user_id'];
            isOneToOne: false;
            referencedRelation: 'User';
            referencedColumns: ['id'];
          },
        ];
      };
      Notification: {
        Row: {
          created_at: string;
          due_date_id: string | null;
          file_id: string | null;
          id: string;
          issuer_id: string | null;
          property_id: string | null;
          status: Database['public']['Enums']['NotificationStatus'];
          type: Database['public']['Enums']['NotificationType'];
          updated_at: string;
          user_id: string;
        };
        Insert: {
          created_at?: string;
          due_date_id?: string | null;
          file_id?: string | null;
          id?: string;
          issuer_id?: string | null;
          property_id?: string | null;
          status?: Database['public']['Enums']['NotificationStatus'];
          type: Database['public']['Enums']['NotificationType'];
          updated_at?: string;
          user_id: string;
        };
        Update: {
          created_at?: string;
          due_date_id?: string | null;
          file_id?: string | null;
          id?: string;
          issuer_id?: string | null;
          property_id?: string | null;
          status?: Database['public']['Enums']['NotificationStatus'];
          type?: Database['public']['Enums']['NotificationType'];
          updated_at?: string;
          user_id?: string;
        };
        Relationships: [
          {
            foreignKeyName: 'Notification_due_date_id_fkey';
            columns: ['due_date_id'];
            isOneToOne: false;
            referencedRelation: 'DueDate';
            referencedColumns: ['id'];
          },
          {
            foreignKeyName: 'Notification_file_id_fkey';
            columns: ['file_id'];
            isOneToOne: false;
            referencedRelation: 'File';
            referencedColumns: ['id'];
          },
          {
            foreignKeyName: 'Notification_file_id_fkey';
            columns: ['file_id'];
            isOneToOne: false;
            referencedRelation: 'file_computed_status_view';
            referencedColumns: ['id'];
          },
          {
            foreignKeyName: 'Notification_issuer_id_fkey';
            columns: ['issuer_id'];
            isOneToOne: false;
            referencedRelation: 'Issuer';
            referencedColumns: ['id'];
          },
          {
            foreignKeyName: 'Notification_property_id_fkey';
            columns: ['property_id'];
            isOneToOne: false;
            referencedRelation: 'Property';
            referencedColumns: ['id'];
          },
          {
            foreignKeyName: 'public_Notification_user_id_fkey';
            columns: ['user_id'];
            isOneToOne: false;
            referencedRelation: 'User';
            referencedColumns: ['id'];
          },
        ];
      };
      Organizer: {
        Row: {
          created_at: string;
          file_id: string | null;
          id: string;
          is_due_dates_reviewed: boolean;
          is_expenses_reviewed: boolean;
          is_issuer_reviewed: boolean | null;
          is_organizer_reviewed: boolean | null;
          issuer_id: string | null;
          property_id: string;
        };
        Insert: {
          created_at?: string;
          file_id?: string | null;
          id?: string;
          is_due_dates_reviewed?: boolean;
          is_expenses_reviewed?: boolean;
          is_issuer_reviewed?: boolean | null;
          is_organizer_reviewed?: boolean | null;
          issuer_id?: string | null;
          property_id: string;
        };
        Update: {
          created_at?: string;
          file_id?: string | null;
          id?: string;
          is_due_dates_reviewed?: boolean;
          is_expenses_reviewed?: boolean;
          is_issuer_reviewed?: boolean | null;
          is_organizer_reviewed?: boolean | null;
          issuer_id?: string | null;
          property_id?: string;
        };
        Relationships: [
          {
            foreignKeyName: 'Organizer_file_id_fkey';
            columns: ['file_id'];
            isOneToOne: false;
            referencedRelation: 'File';
            referencedColumns: ['id'];
          },
          {
            foreignKeyName: 'Organizer_file_id_fkey';
            columns: ['file_id'];
            isOneToOne: false;
            referencedRelation: 'file_computed_status_view';
            referencedColumns: ['id'];
          },
          {
            foreignKeyName: 'Organizer_issuer_id_fkey';
            columns: ['issuer_id'];
            isOneToOne: false;
            referencedRelation: 'Issuer';
            referencedColumns: ['id'];
          },
          {
            foreignKeyName: 'Organizer_property_id_fkey';
            columns: ['property_id'];
            isOneToOne: false;
            referencedRelation: 'Property';
            referencedColumns: ['id'];
          },
        ];
      };
      Plan: {
        Row: {
          consumption_period_days: number;
          consumption_resets: boolean;
          created_at: string;
          id: string;
          json_description: Json | null;
          max_storage: number | null;
          members_max: number;
          name: string;
          period_ai_extraction: number;
          period_documents: number | null;
          properties_max: number;
          stripe_price_id: string | null;
        };
        Insert: {
          consumption_period_days?: number;
          consumption_resets?: boolean;
          created_at?: string;
          id?: string;
          json_description?: Json | null;
          max_storage?: number | null;
          members_max?: number;
          name: string;
          period_ai_extraction?: number;
          period_documents?: number | null;
          properties_max?: number;
          stripe_price_id?: string | null;
        };
        Update: {
          consumption_period_days?: number;
          consumption_resets?: boolean;
          created_at?: string;
          id?: string;
          json_description?: Json | null;
          max_storage?: number | null;
          members_max?: number;
          name?: string;
          period_ai_extraction?: number;
          period_documents?: number | null;
          properties_max?: number;
          stripe_price_id?: string | null;
        };
        Relationships: [];
      };
      Property: {
        Row: {
          additional_heating_systems: string | null;
          address: string | null;
          created_at: string;
          detached_structures: string | null;
          exterior_siding_types: string | null;
          go_to_email_address: string | null;
          go_to_email_prefix: string | null;
          google_address_obj: Json | null;
          hot_water_tank_year: string | null;
          id: string;
          is_there_basement: string | null;
          is_there_garage: string | null;
          is_there_pool_pump: string | null;
          is_there_septic_tank: string | null;
          is_there_spa: string | null;
          is_there_sump_pump: string | null;
          is_there_swimming_pool: string | null;
          main_heating_system: string | null;
          name: string | null;
          nb_notif: number | null;
          onboarding_property_done: boolean;
          other_type: string | null;
          pool_heater_type: string | null;
          postal_code: string | null;
          roof_year: string | null;
          roofing_type: string | null;
          security_features: string | null;
          size: Database['public']['Enums']['SizeType'] | null;
          type: Database['public']['Enums']['PropertyType'] | null;
          unit_of_mesure: Database['public']['Enums']['UnitOfMesureType'] | null;
          updated_at: string;
          user_relationship: string | null;
          year_built: string | null;
        };
        Insert: {
          additional_heating_systems?: string | null;
          address?: string | null;
          created_at?: string;
          detached_structures?: string | null;
          exterior_siding_types?: string | null;
          go_to_email_address?: string | null;
          go_to_email_prefix?: string | null;
          google_address_obj?: Json | null;
          hot_water_tank_year?: string | null;
          id?: string;
          is_there_basement?: string | null;
          is_there_garage?: string | null;
          is_there_pool_pump?: string | null;
          is_there_septic_tank?: string | null;
          is_there_spa?: string | null;
          is_there_sump_pump?: string | null;
          is_there_swimming_pool?: string | null;
          main_heating_system?: string | null;
          name?: string | null;
          nb_notif?: number | null;
          onboarding_property_done?: boolean;
          other_type?: string | null;
          pool_heater_type?: string | null;
          postal_code?: string | null;
          roof_year?: string | null;
          roofing_type?: string | null;
          security_features?: string | null;
          size?: Database['public']['Enums']['SizeType'] | null;
          type?: Database['public']['Enums']['PropertyType'] | null;
          unit_of_mesure?: Database['public']['Enums']['UnitOfMesureType'] | null;
          updated_at?: string;
          user_relationship?: string | null;
          year_built?: string | null;
        };
        Update: {
          additional_heating_systems?: string | null;
          address?: string | null;
          created_at?: string;
          detached_structures?: string | null;
          exterior_siding_types?: string | null;
          go_to_email_address?: string | null;
          go_to_email_prefix?: string | null;
          google_address_obj?: Json | null;
          hot_water_tank_year?: string | null;
          id?: string;
          is_there_basement?: string | null;
          is_there_garage?: string | null;
          is_there_pool_pump?: string | null;
          is_there_septic_tank?: string | null;
          is_there_spa?: string | null;
          is_there_sump_pump?: string | null;
          is_there_swimming_pool?: string | null;
          main_heating_system?: string | null;
          name?: string | null;
          nb_notif?: number | null;
          onboarding_property_done?: boolean;
          other_type?: string | null;
          pool_heater_type?: string | null;
          postal_code?: string | null;
          roof_year?: string | null;
          roofing_type?: string | null;
          security_features?: string | null;
          size?: Database['public']['Enums']['SizeType'] | null;
          type?: Database['public']['Enums']['PropertyType'] | null;
          unit_of_mesure?: Database['public']['Enums']['UnitOfMesureType'] | null;
          updated_at?: string;
          user_relationship?: string | null;
          year_built?: string | null;
        };
        Relationships: [];
      };
      PropertyTransfer: {
        Row: {
          created_at: string;
          id: number;
          invited_by_user_id: string;
          membership_id: string;
          property_id: string;
          status: Database['public']['Enums']['PropertyTransferStatus'];
        };
        Insert: {
          created_at?: string;
          id?: number;
          invited_by_user_id: string;
          membership_id: string;
          property_id: string;
          status?: Database['public']['Enums']['PropertyTransferStatus'];
        };
        Update: {
          created_at?: string;
          id?: number;
          invited_by_user_id?: string;
          membership_id?: string;
          property_id?: string;
          status?: Database['public']['Enums']['PropertyTransferStatus'];
        };
        Relationships: [
          {
            foreignKeyName: 'PropertyTransfer_invited_by_user_id_fkey';
            columns: ['invited_by_user_id'];
            isOneToOne: false;
            referencedRelation: 'User';
            referencedColumns: ['id'];
          },
          {
            foreignKeyName: 'PropertyTransfer_membership_id_fkey';
            columns: ['membership_id'];
            isOneToOne: false;
            referencedRelation: 'Membership';
            referencedColumns: ['id'];
          },
          {
            foreignKeyName: 'PropertyTransfer_property_id_fkey';
            columns: ['property_id'];
            isOneToOne: false;
            referencedRelation: 'Property';
            referencedColumns: ['id'];
          },
        ];
      };
      Subscription: {
        Row: {
          activation_date: string | null;
          cancel_date: string | null;
          consumption_period_end_date: string | null;
          consumption_period_start_date: string | null;
          created_at: string;
          description: string | null;
          id: string;
          is_active: boolean;
          last_reset_date: string | null;
          period_ai_extraction: number;
          period_doc_consumption: number;
          plan_id: string;
          storage_consumption: number;
          stripe_subscription_id: string;
          user_id: string;
        };
        Insert: {
          activation_date?: string | null;
          cancel_date?: string | null;
          consumption_period_end_date?: string | null;
          consumption_period_start_date?: string | null;
          created_at?: string;
          description?: string | null;
          id?: string;
          is_active?: boolean;
          last_reset_date?: string | null;
          period_ai_extraction?: number;
          period_doc_consumption?: number;
          plan_id: string;
          storage_consumption?: number;
          stripe_subscription_id: string;
          user_id: string;
        };
        Update: {
          activation_date?: string | null;
          cancel_date?: string | null;
          consumption_period_end_date?: string | null;
          consumption_period_start_date?: string | null;
          created_at?: string;
          description?: string | null;
          id?: string;
          is_active?: boolean;
          last_reset_date?: string | null;
          period_ai_extraction?: number;
          period_doc_consumption?: number;
          plan_id?: string;
          storage_consumption?: number;
          stripe_subscription_id?: string;
          user_id?: string;
        };
        Relationships: [
          {
            foreignKeyName: 'public_Subscription_user_id_fkey';
            columns: ['user_id'];
            isOneToOne: false;
            referencedRelation: 'User';
            referencedColumns: ['id'];
          },
          {
            foreignKeyName: 'Subscription_plan_id_fkey';
            columns: ['plan_id'];
            isOneToOne: false;
            referencedRelation: 'Plan';
            referencedColumns: ['id'];
          },
        ];
      };
      TokenUsage: {
        Row: {
          completion: number;
          created_at: string;
          id: string;
          prompt: number;
          total: number;
          updated_at: string;
        };
        Insert: {
          completion?: number;
          created_at?: string;
          id?: string;
          prompt?: number;
          total?: number;
          updated_at?: string;
        };
        Update: {
          completion?: number;
          created_at?: string;
          id?: string;
          prompt?: number;
          total?: number;
          updated_at?: string;
        };
        Relationships: [];
      };
      User: {
        Row: {
          active_calendar_provider: Database['public']['Enums']['ProviderType'] | null;
          active_storage_provider: string | null;
          apple_provider: Json | null;
          config_calendar_default_sync: boolean;
          config_dismiss_area: boolean | null;
          config_drive_sync: boolean;
          config_hide_explore: boolean;
          config_setup_doc_reviewed: boolean;
          created_at: string;
          default_currency: string;
          email: string;
          firstname: string | null;
          go_to_email_address: string | null;
          go_to_email_feature_used: boolean;
          go_to_email_prefix: string | null;
          google_provider: Json | null;
          id: string;
          isActive: boolean;
          language: string;
          last_cancel_feedback: string | null;
          lastname: string | null;
          microsoft_provider: Json | null;
          nb_notif: number;
          onboarding_completed: boolean;
          onboarding_current_part: number;
          onboarding_current_step: number;
          onboarding_init_done: boolean;
          partner_id: string | null;
          phone_number: string | null;
          preferences_edwix_communication: string | null;
          preferences_file_frequency: string | null;
          preferences_interests: string | null;
          preferences_reminder_frequency: string | null;
          preferences_store_documents: string | null;
          preferences_track_deadlines: string | null;
          preferences_track_expenses: string | null;
          recovery_code: string | null;
          stripe_customer_id: string | null;
        };
        Insert: {
          active_calendar_provider?: Database['public']['Enums']['ProviderType'] | null;
          active_storage_provider?: string | null;
          apple_provider?: Json | null;
          config_calendar_default_sync?: boolean;
          config_dismiss_area?: boolean | null;
          config_drive_sync?: boolean;
          config_hide_explore?: boolean;
          config_setup_doc_reviewed?: boolean;
          created_at?: string;
          default_currency?: string;
          email: string;
          firstname?: string | null;
          go_to_email_address?: string | null;
          go_to_email_feature_used?: boolean;
          go_to_email_prefix?: string | null;
          google_provider?: Json | null;
          id: string;
          isActive?: boolean;
          language?: string;
          last_cancel_feedback?: string | null;
          lastname?: string | null;
          microsoft_provider?: Json | null;
          nb_notif?: number;
          onboarding_completed?: boolean;
          onboarding_current_part?: number;
          onboarding_current_step?: number;
          onboarding_init_done?: boolean;
          partner_id?: string | null;
          phone_number?: string | null;
          preferences_edwix_communication?: string | null;
          preferences_file_frequency?: string | null;
          preferences_interests?: string | null;
          preferences_reminder_frequency?: string | null;
          preferences_store_documents?: string | null;
          preferences_track_deadlines?: string | null;
          preferences_track_expenses?: string | null;
          recovery_code?: string | null;
          stripe_customer_id?: string | null;
        };
        Update: {
          active_calendar_provider?: Database['public']['Enums']['ProviderType'] | null;
          active_storage_provider?: string | null;
          apple_provider?: Json | null;
          config_calendar_default_sync?: boolean;
          config_dismiss_area?: boolean | null;
          config_drive_sync?: boolean;
          config_hide_explore?: boolean;
          config_setup_doc_reviewed?: boolean;
          created_at?: string;
          default_currency?: string;
          email?: string;
          firstname?: string | null;
          go_to_email_address?: string | null;
          go_to_email_feature_used?: boolean;
          go_to_email_prefix?: string | null;
          google_provider?: Json | null;
          id?: string;
          isActive?: boolean;
          language?: string;
          last_cancel_feedback?: string | null;
          lastname?: string | null;
          microsoft_provider?: Json | null;
          nb_notif?: number;
          onboarding_completed?: boolean;
          onboarding_current_part?: number;
          onboarding_current_step?: number;
          onboarding_init_done?: boolean;
          partner_id?: string | null;
          phone_number?: string | null;
          preferences_edwix_communication?: string | null;
          preferences_file_frequency?: string | null;
          preferences_interests?: string | null;
          preferences_reminder_frequency?: string | null;
          preferences_store_documents?: string | null;
          preferences_track_deadlines?: string | null;
          preferences_track_expenses?: string | null;
          recovery_code?: string | null;
          stripe_customer_id?: string | null;
        };
        Relationships: [];
      };
    };
    Views: {
      file_computed_status_view: {
        Row: {
          account_number: string | null;
          ai_doc_done: boolean | null;
          ai_duedates_done: boolean | null;
          ai_expenses_done: boolean | null;
          ai_issuer_done: boolean | null;
          ai_launched: boolean | null;
          ai_ocr_done: boolean | null;
          computed_status: Database['public']['Enums']['FileStatus'] | null;
          content: string | null;
          contract_duration_start: string | null;
          contract_purpose: string | null;
          created_at: string | null;
          currency: string | null;
          customer_number: string | null;
          document_date: string | null;
          document_id: string | null;
          document_path: string | null;
          documents: Json[] | null;
          end_date: string | null;
          financial_terms: string | null;
          folder: Database['public']['Enums']['FolderType'] | null;
          general_terms: string | null;
          gst_amount: number | null;
          id: string | null;
          invoice_date: string | null;
          invoice_number: string | null;
          is_classification_reviewed: boolean | null;
          isSynced: boolean | null;
          mimetype: string | null;
          Organizer: Json | null;
          payment_method: string | null;
          payment_status: string | null;
          payment_terms: string | null;
          penalties_for_non_compliance: string | null;
          price_without_tax: number | null;
          product_warranty_details: string | null;
          property_id: string | null;
          qst_amount: number | null;
          reach_page_quota: boolean | null;
          reach_word_quota: boolean | null;
          receiver_address: string | null;
          receiver_name: string | null;
          s3_path: string | null;
          source: Database['public']['Enums']['sourceType'] | null;
          start_date: string | null;
          status: Database['public']['Enums']['FileStatus'] | null;
          summary: string | null;
          title: string | null;
          token_usage_id: string | null;
          total_price_including_tax: number | null;
          total_tax_amount: number | null;
          type: Database['public']['Enums']['DocumentType'] | null;
          updated_at: string | null;
          uploaded_with_ai: boolean | null;
          uploaded_with_folder: boolean | null;
          uploaded_with_issuer: boolean | null;
          warranty_terms: string | null;
        };
        Relationships: [
          {
            foreignKeyName: 'File_property_id_fkey';
            columns: ['property_id'];
            isOneToOne: false;
            referencedRelation: 'Property';
            referencedColumns: ['id'];
          },
          {
            foreignKeyName: 'File_token_usage_id_fkey';
            columns: ['token_usage_id'];
            isOneToOne: false;
            referencedRelation: 'TokenUsage';
            referencedColumns: ['id'];
          },
        ];
      };
    };
    Functions: {
      authenticated_http_call_to_api: {
        Args: {
          arg_record: Json;
          arg_type: string;
          arg_table: string;
          arg_path: string;
          arg_method: string;
        };
        Returns: undefined;
      };
      calculateTotalExpenseByCategory: {
        Args: Record<PropertyKey, never>;
        Returns: {
          type_fr: string;
          type_en: string;
          sub_type_fr: string;
          sub_type_en: string;
          total_expense: number;
        }[];
      };
      calculateTotalExpenseByCategoryForProperty: {
        Args: {
          input_property_id: string;
        };
        Returns: {
          type_fr: string;
          type_en: string;
          sub_type_fr: string;
          sub_type_en: string;
          total_expense: number;
        }[];
      };
      calculateTotalExpenseByIssuer: {
        Args: Record<PropertyKey, never>;
        Returns: {
          name: string;
          total_expense: number;
        }[];
      };
      calculateTotalExpenseByIssuerForProperty: {
        Args: {
          input_property_id: string;
        };
        Returns: {
          name: string;
          total_expense: number;
        }[];
      };
      check_user_membership:
        | {
            Args: {
              input_property_id: string;
            };
            Returns: boolean;
          }
        | {
            Args: {
              input_property_id: string;
              auth_user_id: string;
            };
            Returns: boolean;
          };
      check_user_owner_membership: {
        Args: {
          input_property_id: string;
        };
        Returns: boolean;
      };
      checkIfNewFileWillReachQuotas: {
        Args: {
          newfilesize: number;
          userid: string;
          nbaiextraction: number;
        };
        Returns: boolean;
      };
      checkSubscriptionQuotasExceeded: {
        Args: Record<PropertyKey, never>;
        Returns: boolean;
      };
      generate_random_string: {
        Args: {
          length: number;
        };
        Returns: string;
      };
      get_due_dates_for_userss: {
        Args: {
          user_id_arg: string;
        };
        Returns: {
          due_date_id: string;
        }[];
      };
      has_mfa_enabled: {
        Args: Record<PropertyKey, never>;
        Returns: boolean;
      };
      incrementQuotas: {
        Args: {
          subscription_id: string;
        };
        Returns: undefined;
      };
    };
    Enums: {
      ConfidenceLevel: 'LOW' | 'MEDIUM' | 'HIGH' | 'VERY_HIGH' | 'UNKNOWN';
      DocumentType:
        | 'Invoice'
        | 'TaxBillNotice'
        | 'Statement'
        | 'PurchaseReceipt'
        | 'PaymentReceipt'
        | 'SubscriptionReceipt'
        | 'Permit'
        | 'Contract'
        | 'Deed'
        | 'Certificate'
        | 'Will'
        | 'InsurancePolicy'
        | 'Minutes'
        | 'Correspondence'
        | 'Report'
        | 'Regulation'
        | 'UserManual'
        | 'Warranty'
        | 'BlueprintPlan'
        | 'OtherType'
        | 'PurchaseOrder'
        | 'Quote';
      DueDateFrequency:
        | 'one-time'
        | 'daily'
        | 'weekly'
        | 'bi-weekly'
        | 'semi-monthly'
        | 'monthly'
        | 'annually'
        | 'quarterly'
        | 'half-yearly'
        | 'bi-annual'
        | 'bi-monthly'
        | 'semi-annually'
        | 'bi-annually'
        | 'unknowwn';
      DueDateStatus: 'new' | 'reviewed' | 'rejected' | 'synced';
      DueDateType:
        | 'MortgagePaymentDate'
        | 'PropertyTaxDeadline'
        | 'UtilityBillDueDate'
        | 'ServiceBillDueDate'
        | 'HOAFeeDeadline'
        | 'LoanRepaymentDate'
        | 'RefinancingDeadline'
        | 'HomeInsuranceRenewal'
        | 'WarrantyExpiryDate'
        | 'MaintenanceServiceDate'
        | 'SurveyOrInspectionDate'
        | 'ContractCompletionDate'
        | 'DisputeResolutionDate'
        | 'DocumentSubmissionDate'
        | 'AppealSubmissionDeadline'
        | 'FinalNoticeDate'
        | 'PermitExpirationDate'
        | 'LeaseRenewal'
        | 'RentCollectionDate'
        | 'BillDueDate';
      ExpensePaymentMethod:
        | 'CreditCard'
        | 'DebitCard'
        | 'BankTransfer'
        | 'PreAuthorization'
        | 'Cash'
        | 'Checks'
        | 'Unknown';
      ExpenseStreamFrequency:
        | 'UNKNOWN'
        | 'WEEKLY'
        | 'BIWEEKLY'
        | 'SEMI_MONTHLY'
        | 'MONTHLY'
        | 'ANNUALLY';
      ExpenseStreamStatus: 'UNKNOWN' | 'MATURE' | 'EARLY_DETECTION' | 'TOMBSTONED';
      ExpenseStreamType: 'INFLOW' | 'OUTFLOW';
      FileStatus: 'uploaded' | 'processing' | 'qualified' | 'reviewed' | 'error' | 'uploaded_no_ai';
      FolderType:
        | 'TaxesAndAssessments'
        | 'LocalRegulations'
        | 'PublicUtilities'
        | 'PermitsAndLicenses'
        | 'PurchaseSaleAgreements'
        | 'RealEstateAppraisals'
        | 'CorrespondenceOffersNegotiations'
        | 'MortgagesAndLoans'
        | 'BankStatements'
        | 'InsurancesOfferedByTheBank'
        | 'HomeownersInsurancePolicies'
        | 'ClaimsIncidents'
        | 'AppraisalsExpertEvaluations'
        | 'GoodsAndServicesInvoices'
        | 'PurchaseReceipts'
        | 'ServiceAgreements'
        | 'Warranties'
        | 'UserManuals'
        | 'PlansDesigns'
        | 'Certificates'
        | 'Reports'
        | 'LegalAgreements'
        | 'DeedOfSale'
        | 'MortgageDeed'
        | 'ServitudeDeed'
        | 'DeedOfDonation'
        | 'IndivisionAgreement'
        | 'CondominiumDeclaration'
        | 'Receipt'
        | 'WillsSuccessionsRelatedToProperty'
        | 'AssociationBylaws'
        | 'MeetingMinutes'
        | 'AssociationDuesAssessments'
        | 'RentalAgreements'
        | 'ReceiptsPayments'
        | 'CorrespondenceRequests'
        | 'OtherFolder'
        | 'InsurancePolicies'
        | 'InsuranceClaimsAndIncidents'
        | 'AppraisalsAndExpertEvaluations'
        | 'PropertyTitlesAndAgreements'
        | 'Quittance'
        | 'Appraisals'
        | 'CoPropertyInfos'
        | 'Invoices'
        | 'ServiceAgreementsAndContracts'
        | 'PlansAndDesigns'
        | 'HomeownersAssociations'
        | 'TenantsDocuments'
        | 'OtherType'
        | 'Insurance';
      HistoryType: 'Agent' | 'Document' | 'Architecture' | 'Contacts' | 'Agenda';
      IssuerType:
        | 'GovernmentalAgencies'
        | 'RealEstateAgentsAndBrokers'
        | 'BanksAndFinancialInstitutions'
        | 'InsuranceCompanies'
        | 'ConstructionAndRenovationServices'
        | 'TelecommunicationServices'
        | 'AlarmAndSecurityServices'
        | 'PropertyManagementServices'
        | 'CleaningServices'
        | 'LandscapingAndGardeningServices'
        | 'MovingServices'
        | 'PlumbingServices'
        | 'ElectricalServices'
        | 'HeatingAndAirConditioningServices'
        | 'PoolServices'
        | 'PestControlServices'
        | 'ConciergeServices'
        | 'OtherHomeServices'
        | 'NotariesAndLawyers'
        | 'HomeownersAssociations'
        | 'Tenants'
        | 'OtherOriginatorType'
        | 'Utility'
        | 'ApplianceAndElectronicsStores'
        | 'FurnitureStores'
        | 'HomeHardwareAndImprovementStores'
        | 'OnlineMarketplace'
        | 'OtherRetailAndOnlineStores'
        | 'GasAndElectricity'
        | 'InternetAndCable'
        | 'Telephone'
        | 'SewageAndWasteManagement'
        | 'Water';
      JobStatus: 'completed' | 'failed';
      JobType:
        | 'processFile'
        | 'extractContent'
        | 'qualification'
        | 'extractFolder'
        | 'extractTitleAndSummary'
        | 'extractDueDates'
        | 'extractIssuers'
        | 'extractVariousAttributes'
        | 'syncMongoDBPinecone'
        | 'syncMongoDBXano';
      MembershipRole: 'owner' | 'admin';
      MembershipStatus: 'active' | 'pending';
      NotificationStatus: 'New' | 'Read';
      NotificationType:
        | 'NewDocumentToReview'
        | 'NewDueDateToReview'
        | 'NewIssuerToReview'
        | 'NewEmailForwarded';
      PropertyTransferStatus: 'pending' | 'accepted' | 'declined';
      PropertyType:
        | 'Apartment'
        | 'SingleFamilyHouse'
        | 'Townhouse'
        | 'Duplex'
        | 'Villa'
        | 'Condo'
        | 'SemiDetached'
        | 'OtherType'
        | 'Farm';
      ProviderType: 'apple' | 'google' | 'microsoft';
      SizeType:
        | 'Between0To500'
        | 'Between501To1000'
        | 'Between1001To1500'
        | 'Between1501To2000'
        | 'Between2001To2500'
        | 'Between2501To3000'
        | 'Over3000';
      sourceType: 'email' | 'upload' | 'manual' | 'ai';
      UnitOfMesureType: 'sqFt' | 'm2';
    };
    CompositeTypes: {
      [_ in never]: never;
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
    : never = never,
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
    : never = never,
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
    : never = never,
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
    : never = never,
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
    : never = never,
> = PublicCompositeTypeNameOrOptions extends { schema: keyof Database }
  ? Database[PublicCompositeTypeNameOrOptions['schema']]['CompositeTypes'][CompositeTypeName]
  : PublicCompositeTypeNameOrOptions extends keyof PublicSchema['CompositeTypes']
    ? PublicSchema['CompositeTypes'][PublicCompositeTypeNameOrOptions]
    : never;
