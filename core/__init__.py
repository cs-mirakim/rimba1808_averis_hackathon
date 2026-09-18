"""
Core Module - Averis SDOC Hackathon
Deterministic comparator, normalizer, and local benchmarking tools.
"""

from core.normalizer import (
    normalize_text,
    normalize_gross_weight,
    normalize_container_count,
    normalize_field,
    normalize_record,
    is_missing_value,
)

from core.comparator import (
    CANONICAL_FIELDS,
    TEXT_FIELDS,
    compare_documents,
    compare_text_field,
    compare_container_count,
    compare_gross_weight,
)

__all__ = [
    "normalize_text",
    "normalize_gross_weight",
    "normalize_container_count",
    "normalize_field",
    "normalize_record",
    "is_missing_value",
    "CANONICAL_FIELDS",
    "TEXT_FIELDS",
    "compare_documents",
    "compare_text_field",
    "compare_container_count",
    "compare_gross_weight",
]
