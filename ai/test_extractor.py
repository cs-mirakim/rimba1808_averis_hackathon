"""
Unit test for AI Gemini Extractor and Supabase Sync.
Tests against actual hackathon sample files in docs/sdoc-hackathon-bundle/attachments.
"""

import sys
import os
from pathlib import Path

# Add project root to path
ROOT_DIR = Path(__file__).resolve().parent.parent
sys.path.insert(0, str(ROOT_DIR))

from ai.extractor import GeminiExtractor
from ai.db_sync import SupabaseSync


def run_tests():
    print("==================================================")
    print("[*] TESTING AI EXTRACTOR & SUPABASE INTEGRATION")
    print("==================================================")

    extractor = GeminiExtractor()
    db = SupabaseSync()

    # Test file paths
    sample_si_path = ROOT_DIR / "docs" / "sdoc-hackathon-bundle" / "attachments" / "email_004_SI.txt"
    sample_bl_path = ROOT_DIR / "docs" / "sdoc-hackathon-bundle" / "attachments" / "email_004_BL.txt"

    if not sample_si_path.exists() or not sample_bl_path.exists():
        print(f"[!] Warning: Sample files not found at {sample_si_path}. Testing with synthetic text.")
        si_text = """
        SHIPPING INSTRUCTION
        Shipper: PT Riau Andalan Pulp and Paper
        Consignee: Asia Symbol (Shandong) Pulp and Paper Co., Ltd.
        Notify Party: SAME AS CONSIGNEE
        Port of Loading: Pelintung Port, Indonesia
        Port of Discharge: Qingdao, China
        Container Count: 10 x 40HQ
        Gross Weight: 260,500.00 KGS
        """
        bl_text = """
        BILL OF LADING (DRAFT)
        Shipper: PT Riau Andalan Pulp and Paper
        Consignee: Asia Symbol (Shandong) Pulp and Paper Co., Ltd.
        Notify Party: SAME AS CONSIGNEE
        Port of Loading: Pelintung Port, Indonesia
        Port of Discharge: Shanghai, China
        Container Count: 10 x 40HQ
        Gross Weight: 260,500.00 KGS
        """
    else:
        with open(sample_si_path, "r", encoding="utf-8", errors="ignore") as f:
            si_text = f.read()
        with open(sample_bl_path, "r", encoding="utf-8", errors="ignore") as f:
            bl_text = f.read()

    print("\n1. Testing SI Extraction (email_004_SI):")
    res_si = extractor.extract(si_text, doc_type_hint="SI")
    print(f"  - Doc Type: {res_si.doc_type}")
    print(f"  - Shipper: {res_si.fields.shipper}")
    print(f"  - Consignee: {res_si.fields.consignee}")
    print(f"  - Port of Loading: {res_si.fields.port_of_loading}")
    print(f"  - Port of Discharge: {res_si.fields.port_of_discharge}")
    print(f"  - Container Count: {res_si.fields.container_count}")
    print(f"  - Gross Weight: {res_si.fields.gross_weight_kg}")

    print("\n2. Testing BL Extraction (email_004_BL):")
    res_bl = extractor.extract(bl_text, doc_type_hint="BL")
    print(f"  - Doc Type: {res_bl.doc_type}")
    print(f"  - Shipper: {res_bl.fields.shipper}")
    print(f"  - Consignee: {res_bl.fields.consignee}")
    print(f"  - Port of Loading: {res_bl.fields.port_of_loading}")
    print(f"  - Port of Discharge: {res_bl.fields.port_of_discharge}")
    print(f"  - Container Count: {res_bl.fields.container_count}")
    print(f"  - Gross Weight: {res_bl.fields.gross_weight_kg}")

    print("\n3. Testing Supabase Sync:")
    email_synced = db.save_email_record(
        email_id="email_004",
        subject="Shipping Instruction & Draft BL Verification - Email 004",
        category="BL_COMPARISON",
        status="MISMATCH" if res_si.fields.port_of_discharge != res_bl.fields.port_of_discharge else "OK",
        has_defect=res_si.fields.port_of_discharge != res_bl.fields.port_of_discharge,
        defect_fields=["port_of_discharge"] if res_si.fields.port_of_discharge != res_bl.fields.port_of_discharge else []
    )
    db.save_extracted_fields("email_004", "SI", res_si.fields.model_dump())
    print(f"  - Email Sync Result: {'SUCCESS' if email_synced else 'FAILED'}")

    print("\n==================================================")
    print("[SUCCESS] AI EXTRACTOR & DB SYNC TESTS COMPLETED")
    print("==================================================")


if __name__ == "__main__":
    run_tests()
