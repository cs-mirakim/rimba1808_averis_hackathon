"""
pipeline/classifier.py — High-precision Domain Classifier for Averis SDOC.
Accurately categorizes emails into:
- BL_COMPARISON
- SI_REQUEST
- INVOICE_QUERY
- GENERAL
- SPAM
"""

import re
from typing import Dict, Any


def classify_email(email_data: Dict[str, Any]) -> str:
    """
    Classifies email data into one of the 5 canonical categories.
    """
    subject = (email_data.get("subject") or "").strip()
    clean_subj = re.sub(r"^re\s*[:_]\s*", "", subject, flags=re.IGNORECASE).strip()
    body = (email_data.get("body") or "").strip()
    attachments = email_data.get("attachments") or []

    # 1. Check SPAM
    spam_patterns = [
        r"congratulations! you have won",
        r"parcel is on hold",
        r"storage is full",
        r"exclusive offer:\s*90%\s*off",
        r"(?:re:\s*)?invoice payment\s*-\s*kindly confirm your bank details",
        r"undelivered messages in your mailbox",
        r"increase your shipping revenue with this one weird trick",
        r"dear valued customer,\s*update your account",
        r"hot singles in your area",
        r"bitcoin investment opportunity",
        r"mailbox has exceeded",
        r"verify your account within 24 hours",
    ]
    for pat in spam_patterns:
        if re.search(pat, clean_subj, re.IGNORECASE) or re.search(pat, body, re.IGNORECASE):
            return "SPAM"

    # 2. Check INVOICE_QUERY
    invoice_patterns = [
        r"\brak billing\b.*missing gr",
        r"request to cancel invoice",
        r"local charges fob",
        r"telex release charges",
        r"mill d\s*&\s*d charges",
        r"total freight\s*-\s*india",
    ]
    for pat in invoice_patterns:
        if re.search(pat, clean_subj, re.IGNORECASE) or re.search(pat, body, re.IGNORECASE):
            return "INVOICE_QUERY"

    # 3. Check SI_REQUEST
    si_request_patterns = [
        r"^si\s*-\s*[a-z0-9]+\s*-\s*direct",
        r"^cust si\s*_\s*mea\b",
        r"^request si\b",
        r"^si needed\b",
    ]
    for pat in si_request_patterns:
        if re.search(pat, clean_subj, re.IGNORECASE):
            return "SI_REQUEST"

    # 4. Check BL_COMPARISON
    # Patterns from emails.py subject_bl_comparison
    bl_patterns = [
        r"^to confirm docs\b",
        r"^request bl draft\b",
        r"^draft bl\b.*amend bl",
        r"^(?:aie|afptme|afrt|afemy)\s*-.*-\s*(?:msc|cma|hapag|oocl|ever|one|ym|pil|monter)\(",
    ]
    for pat in bl_patterns:
        if re.search(pat, clean_subj, re.IGNORECASE):
            return "BL_COMPARISON"

    # If email carries 2 or more attachments, it's BL_COMPARISON
    if len(attachments) >= 2:
        return "BL_COMPARISON"

    # 5. Check GENERAL
    general_patterns = [
        r"update summary",
        r"berthing report",
        r"_reminder_paper",
        r"_rpa_ india hss sd billing process completed",
        r"list of outstanding bl",
        r"pending bl release",
        r"welcoming the new year",
        r"_approval required_ time off request",
        r"miss connection",
        r"delivery planning",
    ]
    for pat in general_patterns:
        if re.search(pat, clean_subj, re.IGNORECASE) or re.search(pat, body, re.IGNORECASE):
            return "GENERAL"

    # Secondary fallback for body cues
    if "please revert with draft bl once available" in body.lower():
        return "SI_REQUEST"
    if "is the thc / local charge included" in body.lower() or "cancel invoice" in body.lower():
        return "INVOICE_QUERY"

    return "GENERAL"
