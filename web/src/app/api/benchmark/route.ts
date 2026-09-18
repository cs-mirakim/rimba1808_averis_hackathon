import { NextResponse } from 'next/server';
import fs from 'fs';
import path from 'path';

export const dynamic = 'force-dynamic';

const CATEGORIES = ['BL_COMPARISON', 'SI_REQUEST', 'INVOICE_QUERY', 'GENERAL', 'SPAM'];

function prf(tp: number, fp: number, fn: number) {
  const p = tp + fp > 0 ? tp / (tp + fp) : 0;
  const r = tp + fn > 0 ? tp / (tp + fn) : 0;
  const f = p + r > 0 ? (2 * p * r) / (p + r) : 0;
  return { p, r, f };
}

export async function GET() {
  try {
    const rootDir = path.resolve(process.cwd(), '..');
    const groundTruthPath = path.join(rootDir, 'docs', 'sdoc-hackathon-docker', 'data_v2', 'ground_truth.json');
    const submissionPath = path.join(rootDir, 'submission.json');

    if (!fs.existsSync(groundTruthPath) || !fs.existsSync(submissionPath)) {
      return NextResponse.json({ error: 'Ground truth or submission file not found' }, { status: 404 });
    }

    const truth = JSON.parse(fs.readFileSync(groundTruthPath, 'utf-8'));
    const sub = JSON.parse(fs.readFileSync(submissionPath, 'utf-8'));

    const eids = Object.keys(truth);
    const nEmails = eids.length;

    // 1. Stage 1: Classification
    const perCat: Record<string, { tp: number; fp: number; fn: number }> = {};
    for (const c of CATEGORIES) perCat[c] = { tp: 0, fp: 0, fn: 0 };

    let s1Correct = 0;
    for (const eid of eids) {
      const actual = truth[eid].category;
      const pred = sub[eid]?.category || 'GENERAL';
      if (pred === actual) {
        s1Correct++;
        if (perCat[actual]) perCat[actual].tp++;
      } else {
        if (perCat[actual]) perCat[actual].fn++;
        if (perCat[pred]) perCat[pred].fp++;
      }
    }

    const s1Accuracy = nEmails > 0 ? s1Correct / nEmails : 0;
    const f1s = CATEGORIES.map((c) => prf(perCat[c].tp, perCat[c].fp, perCat[c].fn).f);
    const s1MacroF1 = f1s.reduce((a, b) => a + b, 0) / CATEGORIES.length;

    // 2. Stage 3: Defect detection (Comparable docs)
    let s3Tp = 0, s3Fp = 0, s3Fn = 0, s3Exact = 0, docTotal = 0;
    for (const eid of eids) {
      const t = truth[eid];
      if (t.category !== 'BL_COMPARISON') continue;
      if (t.status === 'NEEDS_REVIEW') continue;

      docTotal++;
      const s = sub[eid] || {};
      const tHas = Boolean(t.has_defect);
      const sHas = Boolean(s.has_defect);

      if (sHas && tHas) s3Tp++;
      else if (sHas && !tHas) s3Fp++;
      else if (!sHas && tHas) s3Fn++;

      const tFields = new Set(t.defect_fields || []);
      const sFields = new Set(s.defect_fields || []);
      const match = tHas === sHas && tFields.size === sFields.size && Array.from(tFields).every((f) => sFields.has(f));
      if (match) s3Exact++;
    }

    const s3Prf = prf(s3Tp, s3Fp, s3Fn);
    const s3ExactRate = docTotal > 0 ? s3Exact / docTotal : 0;

    // 3. Reliability: Escalation
    let escTp = 0, escFn = 0, escCorrect = 0, predReview = 0, goldReview = 0;
    for (const eid of eids) {
      const t = truth[eid];
      const s = sub[eid] || {};
      const predNeeds = s.status === 'NEEDS_REVIEW';
      const goldNeeds = t.status === 'NEEDS_REVIEW';

      if (predNeeds) {
        predReview++;
        if (goldNeeds) escCorrect++;
      }
      if (goldNeeds) {
        goldReview++;
        if (predNeeds) escTp++;
        else escFn++;
      }
    }

    const escRecall = goldReview > 0 ? escTp / goldReview : 0;
    const escPrecision = predReview > 0 ? escCorrect / predReview : 0;
    const escF1 = escPrecision + escRecall > 0 ? (2 * escPrecision * escRecall) / (escPrecision + escRecall) : 0;

    // 4. End-to-End
    let e2eTotal = 0, e2eSuccess = 0;
    for (const eid of eids) {
      const t = truth[eid];
      if (t.category !== 'BL_COMPARISON' || !t.has_defect) continue;

      e2eTotal++;
      const s = sub[eid] || {};
      const routed = s.category === 'BL_COMPARISON';
      const flagged = Boolean(s.has_defect);
      const tFields = new Set(t.defect_fields || []);
      const sFields = new Set(s.defect_fields || []);
      const fieldsOk = tFields.size === sFields.size && Array.from(tFields).every((f) => sFields.has(f));

      if (routed && flagged && fieldsOk) {
        e2eSuccess++;
      }
    }

    const e2eRate = e2eTotal > 0 ? e2eSuccess / e2eTotal : 0;

    // Final consolidated score
    const finalScore = 0.3 * s1MacroF1 + 0.2 * s3Prf.f + 0.5 * e2eRate;

    return NextResponse.json({
      success: true,
      n_emails: nEmails,
      stage1: {
        accuracy: s1Accuracy,
        macro_f1: s1MacroF1,
        correct_count: s1Correct,
      },
      stage3: {
        defect_precision: s3Prf.p,
        defect_recall: s3Prf.r,
        defect_f1: s3Prf.f,
        exact_match_rate: s3ExactRate,
        discrepancies_caught: s3Tp,
        total_defects: s3Tp + s3Fn,
      },
      reliability: {
        escalation_recall: escRecall,
        escalation_precision: escPrecision,
        escalation_f1: escF1,
        gold_review: goldReview,
        caught: escTp,
      },
      end_to_end: {
        success: e2eSuccess,
        total: e2eTotal,
        rate: e2eRate,
      },
      final_score: finalScore,
      evaluated_at: new Date().toISOString(),
    });
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
