"""
pipeline package — Data Ingestion and Document Parsing Module (Moi).

Exposes:
- reader: load_emails, check_email_integrity, validate_email_attachments
- parsers: parse_txt, parse_docx, parse_xlsx, parse_pdf, UnreadableFileError
- extract_text: get_document_text, extract_text, safe_extract_text
"""

from .reader import (
    check_email_integrity,
    load_emails,
    validate_email_attachments,
)
from .parsers import (
    UnreadableFileError,
    parse_docx,
    parse_pdf,
    parse_txt,
    parse_xlsx,
)
from .extract_text import (
    extract_text,
    get_document_text,
    safe_extract_text,
)

__all__ = [
    "load_emails",
    "check_email_integrity",
    "validate_email_attachments",
    "parse_txt",
    "parse_docx",
    "parse_xlsx",
    "parse_pdf",
    "UnreadableFileError",
    "get_document_text",
    "extract_text",
    "safe_extract_text",
]
