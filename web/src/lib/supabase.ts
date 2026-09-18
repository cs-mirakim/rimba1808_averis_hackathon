import { createClient } from '@supabase/supabase-js';
import { EmailRecord, DashboardStats } from './types';

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL || '';
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || '';

export const supabase = supabaseUrl && supabaseAnonKey && !supabaseUrl.startsWith('https://your-')
  ? createClient(supabaseUrl, supabaseAnonKey)
  : null;

// Mock data reflecting actual Averis x APRIL Shipping Document Verification scenarios
export const INITIAL_MOCK_EMAILS: EmailRecord[] = [
  {
    email_id: "email_004",
    subject: "Final Shipping Instructions & Draft BL - Shipment 88402",
    category: "BL_COMPARISON",
    status: "MISMATCH",
    has_defect: true,
    defect_fields: ["consignee"],
    created_at: "2026-09-18T23:11:00Z",
    si_fields: {
      shipper: "APRIL FAR EAST (M) SDN BHD",
      consignee: "EAST BRIGHT FZ-LLC",
      notify_party: "SAME AS CONSIGNEE",
      port_of_loading: "NANTONG, CHINA (CNNTG)",
      port_of_discharge: "KARACHI, PAKISTAN (PKKHI)",
      container_count: 6,
      gross_weight_kg: 131058.0
    },
    bl_fields: {
      shipper: "APRIL FAR EAST (M) SDN BHD",
      consignee: "UAB NOVAKOPA",
      notify_party: "SAME AS CONSIGNEE",
      port_of_loading: "NANTONG, CHINA",
      port_of_discharge: "KARACHI, PAKISTAN",
      container_count: 6,
      gross_weight_kg: 131058.0
    }
  },
  {
    email_id: "email_001",
    subject: "Urgent: Draft Bill of Lading for approval - Pelintung Port",
    category: "BL_COMPARISON",
    status: "OK",
    has_defect: false,
    defect_fields: [],
    created_at: "2026-09-18T22:45:00Z",
    si_fields: {
      shipper: "PT RIAU ANDALAN PULP AND PAPER",
      consignee: "ASIA SYMBOL (SHANDONG) PULP & PAPER CO",
      notify_party: "SAME AS CONSIGNEE",
      port_of_loading: "PELINTUNG, INDONESIA",
      port_of_discharge: "QINGDAO, CHINA",
      container_count: 10,
      gross_weight_kg: 260500.0
    },
    bl_fields: {
      shipper: "PT RIAU ANDALAN PULP AND PAPER",
      consignee: "ASIA SYMBOL (SHANDONG) PULP & PAPER CO",
      notify_party: "SAME AS CONSIGNEE",
      port_of_loading: "PELINTUNG, INDONESIA",
      port_of_discharge: "QINGDAO, CHINA",
      container_count: 10,
      gross_weight_kg: 260500.0
    }
  },
  {
    email_id: "email_015",
    subject: "Attached documents for export clearance - Shipment #4920",
    category: "BL_COMPARISON",
    status: "NEEDS_REVIEW",
    review_reason: "wrong_doc_type",
    has_defect: true,
    defect_fields: [],
    created_at: "2026-09-18T21:30:00Z",
    si_fields: {
      shipper: "PT RIAU ANDALAN KERTAS",
      consignee: "PACIFIC MILLS LTD",
      notify_party: "PACIFIC MILLS LTD",
      port_of_loading: "DUMAI, INDONESIA",
      port_of_discharge: "JAKARTA, INDONESIA",
      container_count: 4,
      gross_weight_kg: 98000.0
    },
    bl_fields: {}
  },
  {
    email_id: "email_022",
    subject: "SI Reference vs Draft BL Verification - Container 40HQ",
    category: "BL_COMPARISON",
    status: "MISMATCH",
    has_defect: true,
    defect_fields: ["container_count", "gross_weight_kg"],
    created_at: "2026-09-18T20:15:00Z",
    si_fields: {
      shipper: "APRIL INTERNATIONAL ENTERPRISE",
      consignee: "NIPPON PAPER INDUSTRIES",
      notify_party: "SAME AS CONSIGNEE",
      port_of_loading: "PORT KLANG, MALAYSIA",
      port_of_discharge: "TOKYO, JAPAN",
      container_count: 8,
      gross_weight_kg: 210000.0
    },
    bl_fields: {
      shipper: "APRIL INTERNATIONAL ENTERPRISE",
      consignee: "NIPPON PAPER INDUSTRIES",
      notify_party: "SAME AS CONSIGNEE",
      port_of_loading: "PORT KLANG, MALAYSIA",
      port_of_discharge: "TOKYO, JAPAN",
      container_count: 6,
      gross_weight_kg: 157500.0
    }
  },
  {
    email_id: "email_041",
    subject: "Scan copy of draft BL - blurry document",
    category: "BL_COMPARISON",
    status: "NEEDS_REVIEW",
    review_reason: "unreadable",
    has_defect: true,
    defect_fields: [],
    created_at: "2026-09-18T19:00:00Z",
    si_fields: {
      shipper: "PT RIAU ANDALAN PULP AND PAPER",
      consignee: "SHANDONG TRADING CO",
      notify_party: "UNKNOWN",
      port_of_loading: "PELINTUNG",
      port_of_discharge: "SHANGHAI",
      container_count: 3,
      gross_weight_kg: 75000.0
    },
    bl_fields: {}
  },
  {
    email_id: "email_050",
    subject: "Request for new Shipping Instruction template",
    category: "SI_REQUEST",
    status: "OK",
    has_defect: false,
    defect_fields: [],
    created_at: "2026-09-18T18:40:00Z"
  },
  {
    email_id: "email_053",
    subject: "Invoice query for freight forwarder charges Q3",
    category: "INVOICE_QUERY",
    status: "OK",
    has_defect: false,
    defect_fields: [],
    created_at: "2026-09-18T17:20:00Z"
  },
  {
    email_id: "email_060",
    subject: "Promotion: Freight insurance discounted rates 2026",
    category: "SPAM",
    status: "OK",
    has_defect: false,
    defect_fields: [],
    created_at: "2026-09-18T16:10:00Z"
  }
];

export async function getDashboardData(): Promise<{ emails: EmailRecord[]; stats: DashboardStats }> {
  let emails = [...INITIAL_MOCK_EMAILS];

  if (supabase) {
    try {
      const { data: dbEmails, error } = await supabase
        .from('emails')
        .select('*')
        .order('created_at', { ascending: false });

      if (!error && dbEmails && dbEmails.length > 0) {
        // Merge Supabase emails
        const mergedMap = new Map<string, EmailRecord>();
        INITIAL_MOCK_EMAILS.forEach(e => mergedMap.set(e.email_id, e));
        dbEmails.forEach(dbItem => {
          const existing = mergedMap.get(dbItem.email_id);
          mergedMap.set(dbItem.email_id, {
            ...existing,
            ...dbItem,
            defect_fields: Array.isArray(dbItem.defect_fields) ? dbItem.defect_fields : []
          });
        });
        emails = Array.from(mergedMap.values());
      }
    } catch (e) {
      console.warn('Supabase fetch fallback to local state:', e);
    }
  }

  const blEmails = emails.filter(e => e.category === 'BL_COMPARISON');
  const cleanMatches = blEmails.filter(e => e.status === 'OK').length;
  const mismatchesDetected = blEmails.filter(e => e.status === 'MISMATCH').length;
  const needsHumanReview = blEmails.filter(e => e.status === 'NEEDS_REVIEW').length;
  const totalBl = blEmails.length || 1;
  const matchRatePercent = Math.round((cleanMatches / totalBl) * 100);

  const stats: DashboardStats = {
    totalProcessed: emails.length,
    cleanMatches,
    mismatchesDetected,
    needsHumanReview,
    matchRatePercent
  };

  return { emails, stats };
}

export async function updateEmailStatus(
  emailId: string,
  newStatus: 'OK' | 'MISMATCH' | 'NEEDS_REVIEW',
  note?: string
): Promise<boolean> {
  if (supabase) {
    try {
      const { error } = await supabase
        .from('emails')
        .update({ status: newStatus, review_reason: note || null })
        .eq('email_id', emailId);
      return !error;
    } catch (e) {
      console.error('Error updating status in Supabase:', e);
    }
  }
  return true;
}
