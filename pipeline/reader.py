"""
pipeline/reader.py — Ingestion module for reading email JSON and early integrity checking.

Responsibilities:
1. load_emails(inbox_path): Read all email_*.json files and return a list of dicts.
2. check_email_integrity(email_data): Detect missing attachments early.
   - If 0 or 1 attachment: flag NEEDS_REVIEW with review_reason: "missing_attachment".
"""

from __future__ import annotations

import json
from pathlib import Path
from typing import Any, Dict, List, Optional, Union


def load_emails(inbox_path: Union[str, Path]) -> List[Dict[str, Any]]:
    """
    Load all email_*.json files from the specified inbox directory.

    Args:
        inbox_path: Path to the directory containing email_*.json,
                    or parent directory containing an 'inbox/' subfolder.

    Returns:
        List of email records (dicts), sorted naturally by email_id.
    """
    path = Path(inbox_path)

    # Allow passing either root bundle dir (with 'inbox' subdir) or 'inbox' dir directly
    if (path / "inbox").is_dir():
        target_dir = path / "inbox"
    elif path.is_dir():
        target_dir = path
    else:
        raise FileNotFoundError(f"Inbox directory not found at: {inbox_path}")

    email_files = sorted(target_dir.glob("email_*.json"))
    emails: List[Dict[str, Any]] = []

    for email_file in email_files:
        try:
            with open(email_file, "r", encoding="utf-8", errors="replace") as f:
                data = json.load(f)
                emails.append(data)
        except Exception as e:
            # If an email JSON itself is corrupt, record a fallback dict for review
            email_id = email_file.stem
            emails.append({
                "email_id": email_id,
                "file_path": str(email_file),
                "error": f"Failed to parse JSON: {e}",
                "attachments": [],
                "_corrupt_email": True,
            })

    # Sort numerically by email_id if possible (e.g. email_001 -> 1)
    def _sort_key(item: Dict[str, Any]) -> int:
        eid = item.get("email_id", "")
        digits = "".join([c for c in eid if c.isdigit()])
        return int(digits) if digits else 0

    emails.sort(key=_sort_key)
    return emails


def check_email_integrity(email_data: Dict[str, Any]) -> Dict[str, Any]:
    """
    Perform early integrity detection on an email record.

    Rule:
    - If email has no attachment (0) or only 1 attachment:
      Mark as NEEDS_REVIEW with review_reason: "missing_attachment".

    Returns:
        Dict with integrity check results:
        {
            "is_valid": bool,
            "status": "OK" | "NEEDS_REVIEW",
            "review_reason": None | "missing_attachment",
            "has_defect": bool,
            "defect_fields": list,
            "attachment_count": int,
            "attachments": list
        }
    """
    attachments = email_data.get("attachments") or []
    att_count = len(attachments)

    if att_count < 2:
        return {
            "is_valid": False,
            "status": "NEEDS_REVIEW",
            "review_reason": "missing_attachment",
            "has_defect": False,
            "defect_fields": [],
            "attachment_count": att_count,
            "attachments": attachments,
            "email_id": email_data.get("email_id", "")
        }

    return {
        "is_valid": True,
        "status": "OK",
        "review_reason": None,
        "has_defect": False,
        "defect_fields": [],
        "attachment_count": att_count,
        "attachments": attachments,
        "email_id": email_data.get("email_id", "")
    }


def validate_email_attachments(email_data: Dict[str, Any]) -> tuple[bool, Optional[str]]:
    """
    Convenience helper returning (is_valid, review_reason).
    Returns (True, None) if attachments >= 2, else (False, 'missing_attachment').
    """
    check = check_email_integrity(email_data)
    return check["is_valid"], check["review_reason"]


if __name__ == "__main__":
    import sys

    if hasattr(sys.stdout, "reconfigure"):
        sys.stdout.reconfigure(encoding="utf-8")

    inbox_arg = sys.argv[1] if len(sys.argv) > 1 else "docs/sdoc-hackathon-bundle/inbox"
    print(f"\n📬 Membaca email dari: {inbox_arg}")
    emails = load_emails(inbox_arg)
    print(f"✅ Berjaya memuatkan {len(emails)} email.")

    # Ringkasan integriti lampiran
    zero_att = [e for e in emails if len(e.get("attachments", [])) == 0]
    one_att = [e for e in emails if len(e.get("attachments", [])) == 1]
    two_or_more = [e for e in emails if len(e.get("attachments", [])) >= 2]

    print(f"   • 0 Lampiran (Missing)  : {len(zero_att)} (contoh: {zero_att[0]['email_id'] if zero_att else 'tiada'})")
    print(f"   • 1 Lampiran (Missing)  : {len(one_att)} (contoh: {one_att[0]['email_id'] if one_att else 'tiada'})")
    print(f"   • >=2 Lampiran (Lengkap): {len(two_or_more)} (contoh: {two_or_more[0]['email_id'] if two_or_more else 'tiada'})")
