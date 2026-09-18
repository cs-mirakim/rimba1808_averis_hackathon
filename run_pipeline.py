#!/usr/bin/env python3
"""
run_pipeline.py — Master End-to-End Pipeline for SDOC Hackathon 2026 (Team Rimba)

Integrates:
- Stage 1: Email Ingestion & 100% Precision Domain Classifier (Moi + Amir)
- Stage 2: Unified Multi-Format Document Parsing (.txt, .docx, .xlsx, .pdf) (Moi)
- Stage 3: Gemini 3.6 Flash / Fast Canonical Field Extraction (Amir)
- Stage 4: Deterministic 7-Field Comparator & Normalizer (Paan)
- Stage 5: Output Generation (submission.json) & Live Supabase Sync (Amir)
"""

import os
import sys
import json
import argparse
import logging
from pathlib import Path
from typing import Dict, Any, List, Optional

# Ensure project root is in sys.path
ROOT_DIR = Path(__file__).resolve().parent
if str(ROOT_DIR) not in sys.path:
    sys.path.insert(0, str(ROOT_DIR))

# Fix Windows console encoding
if sys.platform.startswith("win"):
    try:
        sys.stdout.reconfigure(encoding="utf-8")
        sys.stderr.reconfigure(encoding="utf-8")
    except AttributeError:
        pass

# Import team modules
from pipeline.reader import load_emails
from pipeline.classifier import classify_email
from pipeline.extract_text import safe_extract_text
from ai.extractor import GeminiExtractor
from ai.db_sync import SupabaseSync
from core.comparator import compare_documents

# Setup logging
logging.basicConfig(level=logging.INFO, format="%(asctime)s [%(levelname)s] %(message)s")
logger = logging.getLogger("run_pipeline")


def run_full_pipeline(
    data_dir: Path,
    output_path: Path,
    sync_supabase: bool = False,
    max_emails: Optional[int] = None,
    use_gemini: bool = True
) -> Dict[str, Any]:
    """
    Executes the full pipeline on the specified dataset and produces submission.json.
    """
    inbox_dir = data_dir / "inbox"
    attachments_dir = data_dir / "attachments"

    logger.info(f"Loading emails from inbox: {inbox_dir}")
    emails = load_emails(inbox_dir)
    if max_emails:
        emails = emails[:max_emails]

    total_emails = len(emails)
    logger.info(f"Loaded {total_emails} emails for processing.")

    # Initialize AI Extractor & Supabase Client
    extractor = GeminiExtractor(use_gemini=use_gemini)
    db = SupabaseSync() if sync_supabase else None

    submission: Dict[str, Any] = {}
    batch_email_records: List[Dict[str, Any]] = []
    batch_field_records: List[Dict[str, Any]] = []
    stats = {
        "BL_COMPARISON": 0,
        "SI_REQUEST": 0,
        "INVOICE_QUERY": 0,
        "GENERAL": 0,
        "SPAM": 0,
        "OK": 0,
        "MISMATCH": 0,
        "NEEDS_REVIEW": 0,
    }

    print("======================================================================")
    print("🚀 RUNNING AVERIS SDOC MASTER VERIFICATION PIPELINE")
    print(f"   Dataset: {data_dir.name} | Total Emails: {total_emails}")
    print("======================================================================")

    for idx, em in enumerate(emails, 1):
        eid = em.get("email_id", f"email_{idx:03d}")
        category = classify_email(em)
        stats[category] += 1

        # Default result shape
        record_result = {
            "category": category,
            "status": "OK",
            "review_reason": None,
            "has_defect": False,
            "defect_fields": [],
        }

        si_fields_data = {}
        bl_fields_data = {}

        if category == "BL_COMPARISON":
            attachments = em.get("attachments") or []
            body_lower = (em.get("body") or "").lower()

            # Check 1: Missing attachment integrity check
            if any(k in body_lower for k in ["dropped", "still missing", "missing attachment", "not attached"]):
                record_result["status"] = "NEEDS_REVIEW"
                record_result["review_reason"] = "missing_attachment"
                stats["NEEDS_REVIEW"] += 1

            elif len(attachments) < 2:
                # Informational / pending email without files to compare
                record_result["status"] = "OK"
                record_result["has_defect"] = False
                record_result["defect_fields"] = []
                stats["OK"] += 1

            else:
                # Identify SI and BL files
                si_file = None
                bl_file = None
                for att in attachments:
                    att_name = Path(att).name.lower()
                    if "_si." in att_name or "si" in att_name and "bl" not in att_name:
                        si_file = att
                    elif "_bl." in att_name or "bl" in att_name:
                        bl_file = att

                # Fallback if names don't explicitly contain SI/BL
                if not si_file and len(attachments) >= 1:
                    si_file = attachments[0]
                if not bl_file and len(attachments) >= 2:
                    bl_file = attachments[1]

                # Extract Text from SI
                si_text, si_err = safe_extract_text(si_file, base_dir=data_dir)
                bl_text, bl_err = safe_extract_text(bl_file, base_dir=data_dir)

                # Check 2: Unreadable / Corrupt attachments
                if si_err or bl_err:
                    err_payload = si_err or bl_err
                    record_result["status"] = "NEEDS_REVIEW"
                    record_result["review_reason"] = err_payload.get("review_reason", "unreadable")
                    stats["NEEDS_REVIEW"] += 1

                else:
                    # Check 3: Non-shipping document / Wrong Doc Type
                    si_lower = si_text.lower()
                    bl_lower = bl_text.lower()
                    non_shipping = ["commercial invoice", "packing list", "certificate of origin"]
                    is_wrong_doc = any(
                        (ns in si_lower and "shipping instruction" not in si_lower) or
                        (ns in bl_lower and "bill of lading" not in bl_lower)
                        for ns in non_shipping
                    )

                    if is_wrong_doc:
                        record_result["status"] = "NEEDS_REVIEW"
                        record_result["review_reason"] = "wrong_doc_type"
                        stats["NEEDS_REVIEW"] += 1
                    else:
                        # Extract 7 fields from SI and BL
                        si_ext = extractor.extract(si_text, doc_type_hint="SI")
                        bl_ext = extractor.extract(bl_text, doc_type_hint="BL")

                        si_dict = si_ext.fields.model_dump()
                        bl_dict = bl_ext.fields.model_dump()

                        si_fields_data = si_dict
                        bl_fields_data = bl_dict

                        # Compare 7 Canonical Fields using Paan's deterministic comparator
                        comp_res = compare_documents(si_dict, bl_dict)

                        record_result["status"] = comp_res["status"]
                        record_result["has_defect"] = comp_res["has_defect"]
                        record_result["defect_fields"] = comp_res["defect_fields"]
                        record_result["review_reason"] = comp_res.get("review_reason")

                        stats[comp_res["status"]] += 1

        else:
            # Non-comparison categories default to OK with zero defects
            stats["OK"] += 1

        submission[eid] = record_result

        # Buffer for Supabase push
        if db and db.is_ready:
            batch_email_records.append({
                "email_id": eid,
                "subject": em.get("subject", f"Shipping Document Verification - {eid}"),
                "category": category,
                "status": record_result["status"],
                "review_reason": record_result.get("review_reason"),
                "has_defect": record_result["has_defect"],
                "defect_fields": record_result["defect_fields"]
            })
            if si_fields_data:
                batch_field_records.append({
                    "email_id": eid,
                    "doc_type": "SI",
                    **si_fields_data
                })
            if bl_fields_data:
                batch_field_records.append({
                    "email_id": eid,
                    "doc_type": "BL",
                    **bl_fields_data
                })

        if idx % 50 == 0 or idx == total_emails:
            print(f"   Processed {idx}/{total_emails} emails... (OK: {stats['OK']}, Mismatches: {stats['MISMATCH']}, Review: {stats['NEEDS_REVIEW']})")

    # Batch Sync to Supabase
    if db and db.is_ready and batch_email_records:
        print(f"\n🔄 Syncing {len(batch_email_records)} records to Supabase...")
        chunk_size = 100
        for i in range(0, len(batch_email_records), chunk_size):
            db.save_email_records_batch(batch_email_records[i:i + chunk_size])
        for i in range(0, len(batch_field_records), chunk_size):
            db.save_extracted_fields_batch(batch_field_records[i:i + chunk_size])
        print("✅ Supabase sync complete!")

    # Write submission.json
    output_path.parent.mkdir(parents=True, exist_ok=True)
    with open(output_path, "w", encoding="utf-8") as f:
        json.dump(submission, f, indent=2)

    print("======================================================================")
    print(f"✅ PIPELINE COMPLETED! Submission generated: {output_path}")
    print(f"   Summary: OK={stats['OK']} | MISMATCH={stats['MISMATCH']} | REVIEW={stats['NEEDS_REVIEW']}")
    print("======================================================================")

    return submission


if __name__ == "__main__":
    parser = argparse.ArgumentParser(description="Run Averis SDOC Verification Pipeline")
    parser.add_argument(
        "--data-dir",
        type=Path,
        default=ROOT_DIR / "docs" / "sdoc-hackathon-docker" / "data_v2",
        help="Path to dataset directory (containing inbox/ and attachments/)"
    )
    parser.add_argument(
        "--output",
        type=Path,
        default=ROOT_DIR / "submission.json",
        help="Output path for submission.json"
    )
    parser.add_argument(
        "--sync-supabase",
        action="store_true",
        help="Push processed shipment records to Supabase"
    )
    parser.add_argument(
        "--fast",
        action="store_true",
        help="Run high-speed deterministic extraction (bypasses API rate limits)"
    )
    parser.add_argument(
        "--limit",
        type=int,
        default=None,
        help="Process only first N emails for testing"
    )

    args = parser.parse_args()
    run_full_pipeline(
        data_dir=args.data_dir,
        output_path=args.output,
        sync_supabase=args.sync_supabase,
        max_emails=args.limit,
        use_gemini=not args.fast
    )
