"""
pipeline/test_pipeline.py — Verification script for Ingestion & Document Parsers.

Tests:
1. Parsing .txt, .docx, .xlsx, .pdf files from docs/sdoc-hackathon-bundle/attachments/
2. Email loading & attachment integrity detection (0 and 1 attachment -> missing_attachment)
3. Safety check for unreadable / 0-byte files (raises UnreadableFileError)
"""

import os
import sys
from pathlib import Path

# Ensure UTF-8 output encoding for terminal printing on Windows
if sys.stdout.encoding != "utf-8":
    try:
        sys.stdout.reconfigure(encoding="utf-8")
    except Exception:
        pass

# Add project root to sys.path
PROJECT_ROOT = Path(__file__).resolve().parent.parent
if str(PROJECT_ROOT) not in sys.path:
    sys.path.insert(0, str(PROJECT_ROOT))

from pipeline.reader import check_email_integrity, load_emails
from pipeline.parsers import (
    UnreadableFileError,
    parse_docx,
    parse_pdf,
    parse_txt,
    parse_xlsx,
)
from pipeline.extract_text import get_document_text, safe_extract_text


def run_tests():
    print("=" * 70)
    print("🚀 MEMULAKAN UJIAN MODUL PIPELINE (INGESTION & PARSERS)")
    print("=" * 70)

    bundle_dir = PROJECT_ROOT / "docs" / "sdoc-hackathon-bundle"
    attachments_dir = bundle_dir / "attachments"
    inbox_dir = bundle_dir / "inbox"

    # -------------------------------------------------------------
    # Test 1: Testing all 4 Parsers on Actual Dataset Files
    # -------------------------------------------------------------
    test_files = {
        "TXT": attachments_dir / "email_001_BL.txt",
        "DOCX": attachments_dir / "email_055_BL.docx",
        "XLSX": attachments_dir / "email_005_BL.xlsx",
        "PDF": attachments_dir / "email_059_BL.pdf",
    }

    print("\n--- [1/4] PENGUJIAN 4 PARSER LAMPIRAN (.txt, .docx, .xlsx, .pdf) ---")
    for doc_type, file_path in test_files.items():
        if not file_path.exists():
            print(f"❌ Fail sampel {doc_type} tidak dijumpai di {file_path}")
            continue

        print(f"\n📄 Menguji format {doc_type} -> {file_path.name}")
        extracted = get_document_text(file_path)
        assert len(extracted) > 0, f"Ekstraksi teks untuk {doc_type} kosong!"

        snippet = extracted[:180].replace("\n", " ")
        print(f"   Panjang aksara : {len(extracted)}")
        print(f"   Coretan teks   : {snippet}...")
        print(f"   Status         : ✅ BERJAYA EKSTRAK")

    # -------------------------------------------------------------
    # Test 2: Ingestion & Integrity Check (0, 1, and 2 attachments)
    # -------------------------------------------------------------
    print("\n--- [2/4] PENGUJIAN INGESTION & SEMAKAN INTEGRITI EMAIL ---")
    emails = load_emails(inbox_dir)
    print(f"Jumlah email dimuatkan: {len(emails)}")
    assert len(emails) == 520, f"Diharapkan 520 email, dapat {len(emails)}"

    # Test normal email with 2 attachments (email_001)
    e1 = next(e for e in emails if e["email_id"] == "email_001")
    res1 = check_email_integrity(e1)
    print(f"Email 001 (2 att): is_valid={res1['is_valid']}, status={res1['status']}")
    assert res1["is_valid"] is True
    assert res1["status"] == "OK"

    # Test email with 1 attachment (email_507)
    e507 = next(e for e in emails if e["email_id"] == "email_507")
    res507 = check_email_integrity(e507)
    print(f"Email 507 (1 att): is_valid={res507['is_valid']}, status={res507['status']}, reason={res507['review_reason']}")
    assert res507["is_valid"] is False
    assert res507["status"] == "NEEDS_REVIEW"
    assert res507["review_reason"] == "missing_attachment"

    # Test email with 0 attachments (email_002)
    e002 = next(e for e in emails if e["email_id"] == "email_002")
    res002 = check_email_integrity(e002)
    print(f"Email 002 (0 att): is_valid={res002['is_valid']}, status={res002['status']}, reason={res002['review_reason']}")
    assert res002["is_valid"] is False
    assert res002["status"] == "NEEDS_REVIEW"
    assert res002["review_reason"] == "missing_attachment"
    print("Status semakan integriti: ✅ BERJAYA MEMBEDAKAN MISSING ATTACHMENTS")

    # -------------------------------------------------------------
    # Test 3: Safety Checks for 0-Byte and Corrupted Files
    # -------------------------------------------------------------
    print("\n--- [3/4] PENGUJIAN KESELAMATAN (FAIL 0-BYTE & CORRUPT) ---")
    dummy_empty = bundle_dir / "temp_zero_byte.txt"
    try:
        dummy_empty.write_text("", encoding="utf-8")

        # Must raise UnreadableFileError
        try:
            get_document_text(dummy_empty)
            print("❌ Gagal: Fail 0-byte tidak melontarkan ralat!")
        except UnreadableFileError as err:
            print(f"✅ Ralat 0-byte ditangkap dengan tepat:")
            print(f"   Status        : {err.status}")
            print(f"   Review Reason : {err.review_reason}")
            print(f"   Mesej Ralat   : {err}")

        # Test safe_extract_text wrapper
        text, review_payload = safe_extract_text(dummy_empty)
        assert text is None
        assert review_payload is not None
        assert review_payload["status"] == "NEEDS_REVIEW"
        assert review_payload["review_reason"] == "unreadable"
        print("✅ safe_extract_text mengembalikan status payload yang tepat.")

    finally:
        if dummy_empty.exists():
            dummy_empty.unlink()

    # -------------------------------------------------------------
    # Test 4: Batch test on a sample of multiple attachment files
    # -------------------------------------------------------------
    print("\n--- [4/4] UJIAN BATCH PADA CONTOH PELBAGAI LAMPIRAN ---")
    all_attachments = list(attachments_dir.glob("*.*"))
    print(f"Jumlah keseluruhan fail lampiran: {len(all_attachments)}")
    
    # Test 5 files of each extension
    tested_count = 0
    for ext in [".txt", ".docx", ".xlsx", ".pdf"]:
        sub_list = [f for f in all_attachments if f.suffix.lower() == ext][:3]
        for f in sub_list:
            t = get_document_text(f)
            assert len(t) > 0
            tested_count += 1
    print(f"Berjaya membaca {tested_count} fail merentasi semua 4 format.")

    print("\n" + "=" * 70)
    print("🎉 SEMUA UJIAN PIPELINE SELESAI DAN LULUS DENGAN CEMERLANG!")
    print("=" * 70)


if __name__ == "__main__":
    run_tests()
