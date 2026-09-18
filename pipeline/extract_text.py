"""
pipeline/extract_text.py — Main unified interface for document text extraction.

Responsibilities:
1. Accept attachment file path.
2. Auto-detect file extension (.txt, .docx, .xlsx, .pdf).
3. Dispatch to the corresponding parser in pipeline/parsers.py.
4. Return clean, unified text content.
5. Provide safe wrappers for human-in-the-loop error detection (unreadable / wrong_doc_type).
"""

from __future__ import annotations

import os
from pathlib import Path
from typing import Any, Dict, Optional, Tuple, Union

try:
    from .parsers import (
        UnreadableFileError,
        parse_docx,
        parse_pdf,
        parse_txt,
        parse_xlsx,
    )
except ImportError:
    from parsers import (
        UnreadableFileError,
        parse_docx,
        parse_pdf,
        parse_txt,
        parse_xlsx,
    )

SUPPORTED_EXTENSIONS = {
    ".txt": parse_txt,
    ".docx": parse_docx,
    ".xlsx": parse_xlsx,
    ".pdf": parse_pdf,
}


def get_document_text(
    file_path: Union[str, Path],
    base_dir: Optional[Union[str, Path]] = None,
) -> str:
    """
    Extract full text from an attachment file based on its extension.

    Args:
        file_path: Absolute or relative path to the attachment.
        base_dir: Optional base directory to resolve relative paths against
                  (e.g., bundle root directory).

    Returns:
        Full text string extracted from the document.

    Raises:
        UnreadableFileError: If file is 0 bytes, corrupted, or cannot be parsed.
    """
    path = Path(file_path)

    # Resolve relative path if base_dir is provided and file does not exist directly
    if not path.is_file() and base_dir is not None:
        candidate = Path(base_dir) / path
        if candidate.is_file():
            path = candidate

    if not path.exists():
        raise UnreadableFileError(f"Attachment file not found: {path}", file_path=path)

    ext = path.suffix.lower()

    if ext not in SUPPORTED_EXTENSIONS:
        # If unsupported document type (e.g. .jpg, .zip, etc.)
        err = UnreadableFileError(
            f"Unsupported document extension '{ext}' for file {path.name}",
            file_path=path,
        )
        err.review_reason = "wrong_doc_type"
        raise err

    parser_func = SUPPORTED_EXTENSIONS[ext]
    return parser_func(path)


# Convenient alias as specified in requirements
extract_text = get_document_text


def safe_extract_text(
    file_path: Union[str, Path],
    base_dir: Optional[Union[str, Path]] = None,
) -> Tuple[Optional[str], Optional[Dict[str, Any]]]:
    """
    Safely extract document text without raising UnreadableFileError.

    Returns:
        A tuple of (extracted_text, review_payload).
        - If extraction succeeds: (text, None)
        - If extraction fails (unreadable, 0-byte, corrupt, wrong type):
          (None, {
              "status": "NEEDS_REVIEW",
              "review_reason": "unreadable" | "wrong_doc_type",
              "has_defect": False,
              "defect_fields": [],
              "error": str(err),
              "file_path": str(path)
          })
    """
    try:
        text = get_document_text(file_path=file_path, base_dir=base_dir)
        return text, None
    except UnreadableFileError as e:
        return None, {
            "status": e.status,
            "review_reason": e.review_reason,
            "has_defect": False,
            "defect_fields": [],
            "error": str(e),
            "file_path": e.file_path,
        }
    except Exception as e:
        return None, {
            "status": "NEEDS_REVIEW",
            "review_reason": "unreadable",
            "has_defect": False,
            "defect_fields": [],
            "error": str(e),
            "file_path": str(file_path),
        }


if __name__ == "__main__":
    import sys

    # Support UTF-8 output on Windows terminal
    if hasattr(sys.stdout, "reconfigure"):
        sys.stdout.reconfigure(encoding="utf-8")

    if len(sys.argv) < 2:
        print("Penggunaan: python pipeline/extract_text.py <laluan_fail>")
        print("Contoh: python pipeline/extract_text.py docs/sdoc-hackathon-bundle/attachments/email_001_BL.txt")
        sys.exit(1)

    file_arg = sys.argv[1]
    print(f"\n📂 Memproses fail: {file_arg}")
    print("-" * 50)

    text, error_info = safe_extract_text(file_arg)
    if error_info:
        print(f"❌ STATUS: {error_info['status']}")
        print(f"   SEBAB REVIEW: {error_info['review_reason']}")
        print(f"   RALAT: {error_info['error']}")
    else:
        print(f"✅ STATUS: BERJAYA EKSTRAK ({len(text)} aksara)\n")
        print("--- KANDUNGAN TEKS (Coretan 500 aksara pertama) ---")
        print(text[:500])
        if len(text) > 500:
            print("\n... [dipotong untuk paparan ringkas] ...")
