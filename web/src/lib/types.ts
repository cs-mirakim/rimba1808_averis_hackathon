export type EmailCategory = 'BL_COMPARISON' | 'SI_REQUEST' | 'INVOICE_QUERY' | 'SPAM' | 'GENERAL';

export type VerificationStatus = 'OK' | 'MISMATCH' | 'NEEDS_REVIEW';

export type ReviewReason = 'wrong_doc_type' | 'missing_attachment' | 'unreadable' | 'missing_value' | string;

export interface ShippingFieldsData {
  shipper?: string | null;
  consignee?: string | null;
  notify_party?: string | null;
  port_of_loading?: string | null;
  port_of_discharge?: string | null;
  container_count?: number | null;
  gross_weight_kg?: number | null;
}

export interface EmailRecord {
  email_id: string;
  subject: string;
  category: EmailCategory;
  status: VerificationStatus;
  review_reason?: ReviewReason | null;
  has_defect: boolean;
  defect_fields: string[];
  created_at?: string;
  si_fields?: ShippingFieldsData;
  bl_fields?: ShippingFieldsData;
}

export interface DashboardStats {
  totalProcessed: number;
  cleanMatches: number;
  mismatchesDetected: number;
  needsHumanReview: number;
  matchRatePercent: number;
}
