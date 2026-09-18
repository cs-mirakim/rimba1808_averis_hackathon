import { NextResponse } from 'next/server';
import fs from 'fs';
import path from 'path';

export const dynamic = 'force-dynamic';

const SUPABASE_URL = process.env.NEXT_PUBLIC_SUPABASE_URL || 'https://soqanyoziihtkiigratn.supabase.co';
const SUPABASE_KEY = process.env.SUPABASE_SERVICE_ROLE_KEY || process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || '';

// Server-side in-memory cache to prevent downloading static extracted_fields & disk reads repeatedly
let cachedFieldsMap: Record<string, { si?: any; bl?: any }> | null = null;
let cachedSubjectMap: Record<string, string> | null = null;

export async function GET() {
  try {
    let emailsData: any[] = [];

    // 1. Try fetching live from Supabase using Service Role Key (bypasses RLS)
    if (SUPABASE_KEY && !SUPABASE_KEY.startsWith('your_')) {
      try {
        const headers = {
          apikey: SUPABASE_KEY,
          Authorization: `Bearer ${SUPABASE_KEY}`,
          'Content-Type': 'application/json',
        };

        // Only fetch static extracted_fields once, then cache in memory
        const fetchPromises: Promise<any>[] = [
          fetch(`${SUPABASE_URL}/rest/v1/emails?select=*&order=created_at.desc`, { headers, cache: 'no-store' })
        ];

        if (!cachedFieldsMap) {
          fetchPromises.push(
            fetch(`${SUPABASE_URL}/rest/v1/extracted_fields?select=*`, { headers, cache: 'no-store' })
          );
        }

        const [emailsRes, fieldsRes] = await Promise.all(fetchPromises);

        if (emailsRes && emailsRes.ok) {
          emailsData = await emailsRes.json();
        }

        if (fieldsRes && fieldsRes.ok) {
          const fieldsList = await fieldsRes.json();
          cachedFieldsMap = {};
          for (const f of fieldsList) {
            const eid = f.email_id;
            if (!cachedFieldsMap[eid]) cachedFieldsMap[eid] = {};
            if (f.doc_type === 'SI') cachedFieldsMap[eid].si = f;
            if (f.doc_type === 'BL') cachedFieldsMap[eid].bl = f;
          }
        }
      } catch (err) {
        console.warn('Supabase fetch failed in API route:', err);
      }
    }

    // 2. Fallback to submission.json & local inbox if Supabase returned 0 or failed
    if (emailsData.length === 0) {
      const rootDir = path.resolve(process.cwd(), '..');
      const subPath = path.join(rootDir, 'submission.json');
      const inboxDir = path.join(rootDir, 'docs', 'sdoc-hackathon-docker', 'data_v2', 'inbox');

      if (fs.existsSync(subPath)) {
        const subContent = JSON.parse(fs.readFileSync(subPath, 'utf-8'));

        if (!cachedSubjectMap) {
          cachedSubjectMap = {};
          if (fs.existsSync(inboxDir)) {
            const fileNames = fs.readdirSync(inboxDir);
            for (const fname of fileNames) {
              if (fname.endsWith('.json')) {
                try {
                  const em = JSON.parse(fs.readFileSync(path.join(inboxDir, fname), 'utf-8'));
                  cachedSubjectMap[em.email_id] = em.subject || fname;
                } catch {}
              }
            }
          }
        }

        emailsData = Object.entries(subContent).map(([eid, rec]: [string, any]) => ({
          email_id: eid,
          subject: (cachedSubjectMap && cachedSubjectMap[eid]) || `Shipping Verification - ${eid}`,
          category: rec.category || 'BL_COMPARISON',
          status: rec.status || 'OK',
          review_reason: rec.review_reason || null,
          has_defect: rec.has_defect || false,
          defect_fields: rec.defect_fields || [],
          created_at: new Date().toISOString()
        }));
      }
    }

    // Connect extracted fields
    const fMap = cachedFieldsMap || {};
    const formattedEmails = emailsData.map((e) => {
      const f = fMap[e.email_id];
      return {
        ...e,
        defect_fields: Array.isArray(e.defect_fields) ? e.defect_fields : [],
        si_fields: f?.si ? {
          shipper: f.si.shipper,
          consignee: f.si.consignee,
          notify_party: f.si.notify_party,
          port_of_loading: f.si.port_of_loading,
          port_of_discharge: f.si.port_of_discharge,
          container_count: f.si.container_count,
          gross_weight_kg: f.si.gross_weight_kg,
        } : undefined,
        bl_fields: f?.bl ? {
          shipper: f.bl.shipper,
          consignee: f.bl.consignee,
          notify_party: f.bl.notify_party,
          port_of_loading: f.bl.port_of_loading,
          port_of_discharge: f.bl.port_of_discharge,
          container_count: f.bl.container_count,
          gross_weight_kg: f.bl.gross_weight_kg,
        } : undefined,
      };
    });

    // Compute live stats
    const blEmails = formattedEmails.filter((e) => e.category === 'BL_COMPARISON');
    const cleanMatches = blEmails.filter((e) => e.status === 'OK').length;
    const mismatchesDetected = blEmails.filter((e) => e.status === 'MISMATCH').length;
    const needsHumanReview = blEmails.filter((e) => e.status === 'NEEDS_REVIEW').length;
    const matchRatePercent = blEmails.length > 0 ? Math.round((cleanMatches / blEmails.length) * 100) : 0;

    return NextResponse.json({
      emails: formattedEmails,
      stats: {
        totalProcessed: formattedEmails.length,
        cleanMatches,
        mismatchesDetected,
        needsHumanReview,
        matchRatePercent,
      }
    });

  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}

export async function POST(req: Request) {
  try {
    const body = await req.json();

    // Handle Reset to Benchmark Baseline (Sandbox Reset)
    if (body.action === 'reset') {
      const rootDir = path.resolve(process.cwd(), '..');
      const subPath = path.join(rootDir, 'submission.json');
      const inboxDir = path.join(rootDir, 'docs', 'sdoc-hackathon-docker', 'data_v2', 'inbox');

      if (fs.existsSync(subPath)) {
        const subContent = JSON.parse(fs.readFileSync(subPath, 'utf-8'));
        const subjectMap: Record<string, string> = {};
        if (fs.existsSync(inboxDir)) {
          for (const fname of fs.readdirSync(inboxDir)) {
            if (fname.endsWith('.json')) {
              try {
                const em = JSON.parse(fs.readFileSync(path.join(inboxDir, fname), 'utf-8'));
                subjectMap[em.email_id] = em.subject || fname;
              } catch {}
            }
          }
        }

        const resetBatch = Object.entries(subContent).map(([eid, rec]: [string, any]) => ({
          email_id: eid,
          subject: subjectMap[eid] || `Shipping Verification - ${eid}`,
          category: rec.category || 'BL_COMPARISON',
          status: rec.status || 'OK',
          review_reason: rec.review_reason || null,
          has_defect: rec.has_defect || false,
          defect_fields: rec.defect_fields || []
        }));

        if (SUPABASE_KEY) {
          const headers = {
            apikey: SUPABASE_KEY,
            Authorization: `Bearer ${SUPABASE_KEY}`,
            'Content-Type': 'application/json',
            Prefer: 'resolution=merge-duplicates,return=representation'
          };

          // Batch upsert in chunks of 100
          for (let i = 0; i < resetBatch.length; i += 100) {
            await fetch(`${SUPABASE_URL}/rest/v1/emails`, {
              method: 'POST',
              headers,
              body: JSON.stringify(resetBatch.slice(i, i + 100))
            });
          }
        }

        return NextResponse.json({ success: true, count: resetBatch.length });
      }
    }

    const { email_id, status, review_reason } = body;

    if (!email_id || !status) {
      return NextResponse.json({ error: 'Missing email_id or status' }, { status: 400 });
    }

    if (SUPABASE_KEY) {
      const headers = {
        apikey: SUPABASE_KEY,
        Authorization: `Bearer ${SUPABASE_KEY}`,
        'Content-Type': 'application/json',
        Prefer: 'return=representation'
      };

      const payload = {
        status,
        review_reason: review_reason || null,
        has_defect: status === 'MISMATCH'
      };

      await fetch(`${SUPABASE_URL}/rest/v1/emails?email_id=eq.${email_id}`, {
        method: 'PATCH',
        headers,
        body: JSON.stringify(payload)
      });
    }

    return NextResponse.json({ success: true, email_id, status, review_reason });
  } catch (err: any) {
    return NextResponse.json({ error: err.message }, { status: 500 });
  }
}
