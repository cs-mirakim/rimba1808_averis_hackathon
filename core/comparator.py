"""
Modul Comparator untuk SDOC Hackathon (Team Rimba)
Enjin perbandingan deterministik 7 canonical fields antara Shipping Instruction (SI) dan Bill of Lading (BL).
"""

import math
from typing import Dict, Any, List, Optional, Tuple

try:
    from rapidfuzz import fuzz
    HAS_RAPIDFUZZ = True
except ImportError:
    import difflib
    HAS_RAPIDFUZZ = False

from core.normalizer import (
    is_missing_value,
    normalize_text,
    normalize_gross_weight,
    normalize_container_count,
)

# 7 Medan Wajib Perbandingan
CANONICAL_FIELDS = [
    "shipper",
    "consignee",
    "notify_party",
    "port_of_loading",
    "port_of_discharge",
    "container_count",
    "gross_weight_kg",
]

# 5 Medan Berasaskan Teks
TEXT_FIELDS = [
    "shipper",
    "consignee",
    "notify_party",
    "port_of_loading",
    "port_of_discharge",
]

# Had toleransi berat (kg)
WEIGHT_TOLERANCE_KG = 1.0

# Nilai ambang perbandingan teks (Fuzzy Matching %)
FUZZY_SIMILARITY_THRESHOLD = 90.0


def calculate_text_similarity(s1: str, s2: str) -> float:
    """
    Mengira peratusan persamaan (0 - 100) antara dua teks.
    Menggunakan RapidFuzz jika ada, atau Difflib sebagai sandaran.
    """
    if not s1 and not s2:
        return 100.0
    if not s1 or not s2:
        return 0.0
    if s1 == s2:
        return 100.0

    if HAS_RAPIDFUZZ:
        # Gunakan token_sort_ratio untuk mengendalikan susunan perkataan yang sedikit berbeza
        return float(fuzz.token_sort_ratio(s1, s2))
    else:
        matcher = difflib.SequenceMatcher(None, s1, s2)
        return float(matcher.ratio() * 100.0)


def compare_text_field(si_val: Any, bl_val: Any, threshold: float = FUZZY_SIMILARITY_THRESHOLD) -> Tuple[bool, float]:
    """
    Membandingkan medan teks. Mengembalikan (is_match, similarity_score).
    """
    norm_si = normalize_text(si_val)
    norm_bl = normalize_text(bl_val)

    if norm_si == norm_bl:
        return True, 100.0

    similarity = calculate_text_similarity(norm_si, norm_bl)
    return similarity >= threshold, similarity


def compare_container_count(si_val: Any, bl_val: Any) -> Tuple[bool, Optional[int], Optional[int]]:
    """
    Membandingkan bilangan kontena secara tepat (integer exact match).
    """
    si_cnt = normalize_container_count(si_val)
    bl_cnt = normalize_container_count(bl_val)

    if si_cnt is None or bl_cnt is None:
        return False, si_cnt, bl_cnt

    return (si_cnt == bl_cnt), si_cnt, bl_cnt


def compare_gross_weight(si_val: Any, bl_val: Any, tolerance: float = WEIGHT_TOLERANCE_KG) -> Tuple[bool, Optional[float], Optional[float]]:
    """
    Membandingkan berat kasar dengan toleransi ralat kecil (< 1.0 kg).
    """
    si_wt = normalize_gross_weight(si_val)
    bl_wt = normalize_gross_weight(bl_val)

    if si_wt is None or bl_wt is None:
        return False, si_wt, bl_wt

    diff = abs(si_wt - bl_wt)
    return (diff < tolerance), si_wt, bl_wt


def compare_documents(
    si_data: Dict[str, Any],
    bl_data: Dict[str, Any],
    fuzzy_threshold: float = FUZZY_SIMILARITY_THRESHOLD,
    weight_tolerance: float = WEIGHT_TOLERANCE_KG,
) -> Dict[str, Any]:
    """
    Membandingkan 7 canonical fields antara SI (Single Source of Truth) dan BL (Draft).

    Menerima:
        si_data: Dictionary mengandungi maklumat SI
        bl_data: Dictionary mengandungi maklumat BL

    Mengembalikan:
        Dict mengikut format submission:
        - Jika sepadan: {"status": "OK", "has_defect": False, "defect_fields": [], "review_reason": None}
        - Jika tidak sepadan: {"status": "MISMATCH", "has_defect": True, "defect_fields": [...], "review_reason": None}
        - Jika data SI tidak lengkap/hilang: {"status": "NEEDS_REVIEW", "has_defect": False, "defect_fields": [], "review_reason": "missing_value"}
    """
    # 1. Semakan Nilai Hilang (Missing Value Check) pada SI
    for field in CANONICAL_FIELDS:
        val = si_data.get(field)
        if is_missing_value(val):
            return {
                "status": "NEEDS_REVIEW",
                "review_reason": "missing_value",
                "has_defect": False,
                "defect_fields": [],
                "details": {
                    "missing_field": field,
                    "reason": f"Medan '{field}' dalam Shipping Instruction bernilai placeholder/hilang."
                }
            }

    defect_fields: List[str] = []
    comparison_details: Dict[str, Any] = {}

    # 2. Perbandingan 5 Medan Teks
    for field in TEXT_FIELDS:
        si_val = si_data.get(field, "")
        bl_val = bl_data.get(field, "")
        is_match, score = compare_text_field(si_val, bl_val, threshold=fuzzy_threshold)
        
        comparison_details[field] = {
            "si_raw": si_val,
            "bl_raw": bl_val,
            "match": is_match,
            "similarity": score,
        }
        
        if not is_match:
            defect_fields.append(field)

    # 3. Perbandingan container_count
    cc_match, si_cnt, bl_cnt = compare_container_count(
        si_data.get("container_count"),
        bl_data.get("container_count")
    )
    comparison_details["container_count"] = {
        "si_raw": si_data.get("container_count"),
        "bl_raw": bl_data.get("container_count"),
        "si_parsed": si_cnt,
        "bl_parsed": bl_cnt,
        "match": cc_match,
    }
    if not cc_match:
        defect_fields.append("container_count")

    # 4. Perbandingan gross_weight_kg
    gw_match, si_wt, bl_wt = compare_gross_weight(
        si_data.get("gross_weight_kg"),
        bl_data.get("gross_weight_kg"),
        tolerance=weight_tolerance,
    )
    comparison_details["gross_weight_kg"] = {
        "si_raw": si_data.get("gross_weight_kg"),
        "bl_raw": bl_data.get("gross_weight_kg"),
        "si_parsed": si_wt,
        "bl_parsed": bl_wt,
        "diff": abs(si_wt - bl_wt) if (si_wt is not None and bl_wt is not None) else None,
        "match": gw_match,
    }
    if not gw_match:
        defect_fields.append("gross_weight_kg")

    # 5. Penentuan Status Akhir
    has_defect = len(defect_fields) > 0
    status = "MISMATCH" if has_defect else "OK"

    return {
        "status": status,
        "has_defect": has_defect,
        "defect_fields": defect_fields,
        "review_reason": None,
        "comparison_details": comparison_details,
    }
