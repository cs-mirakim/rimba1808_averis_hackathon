"""
Modul Normalizer untuk SDOC Hackathon (Team Rimba)
Membersihkan dan menyeragamkan 7 canonical fields untuk perbandingan dokumen.
"""

import re
from typing import Any, Optional, Dict, Union

# Corak teks yang menandakan nilai hilang / placeholder dalam dokumen
MISSING_VALUE_PATTERNS = [
    r"^\?+$",                     # ???
    r"^_{2,}$",                   # ______, ___
    r"^\-+$",                     # ---
    r"^\.+$",                     # ...
    r"^tba$",                     # TBA (To Be Advised)
    r"^tbd$",                     # TBD (To Be Determined)
    r"^to be advised$",
    r"^to be determined$",
    r"^n/?a$",                    # N/A, NA
    r"^none$",
    r"^null$",
    r"^nil$",
    r"^unknown$",
    r"^pending$",
    r"^as per attached$",
    r"^same as above$",
]

MISSING_REGEX = re.compile("|".join(f"({p})" for p in MISSING_VALUE_PATTERNS), re.IGNORECASE)


def is_missing_value(val: Any) -> bool:
    """
    Menyemak sama ada sesuatu nilai adalah nilai hilang, kosong, atau mengandungi placeholder
    seperti '???', '______', 'TBA', 'N/A'.
    """
    if val is None:
        return True
    
    if isinstance(val, (int, float)):
        return False
        
    s = str(val).strip()
    if not s:
        return True
        
    return bool(MISSING_REGEX.match(s))


def normalize_text(val: Any) -> str:
    """
    Membersihkan teks:
    - Trim whitespace
    - Lowercase untuk perbandingan seragam
    - Padatkan ruang berganda (multiple whitespace) kepada satu ruang
    """
    if val is None:
        return ""
    
    s = str(val).strip()
    if not s:
        return ""
    
    # Padatkan whitespace dan jadikan lowercase
    s = re.sub(r"\s+", " ", s)
    return s.lower()


def normalize_gross_weight(val: Any) -> Optional[float]:
    """
    Membersihkan nilai berat kasar (gross_weight_kg):
    - Membuang perkataan seperti 'KGS', 'KG', 'MT', 'M/T', 'LBS'
    - Membuang tanda koma pemisah ribuan
    - Menukar kepada float
    """
    if val is None or is_missing_value(val):
        return None
    
    if isinstance(val, (int, float)):
        return float(val)
    
    s = str(val).strip().upper()
    
    # Buang unit dan perkataan berkaitan
    s = re.sub(r"\b(KGS|KG|M/T|MT|METRIC TONS?|LBS|TONS?|GROSS WEIGHT|GW|TOTAL)\b", "", s, flags=re.IGNORECASE)
    # Buang karakter selain nombor, titik perpuluhan, dan tolak
    # Perhatikan tanda koma yang bertindak sebagai pemisah ribuan
    s = s.replace(",", "").strip()
    
    # Ekstrak corak nombor float/integer pertama
    match = re.search(r"[-+]?\d*\.?\d+", s)
    if match:
        try:
            return float(match.group(0))
        except ValueError:
            return None
            
    return None


def normalize_container_count(val: Any) -> Optional[int]:
    """
    Membersihkan nilai bilangan kontena (container_count):
    - Mengekstrak integer sahaja (contoh: "3 x 40' HC" -> 3, "3x40HQ" -> 3, "5 Containers" -> 5)
    """
    if val is None or is_missing_value(val):
        return None
        
    if isinstance(val, int):
        return val
    
    if isinstance(val, float):
        return int(val)
        
    s = str(val).strip()
    
    # Cari corak "3 x 40..." atau integer pertama dalam string
    match = re.search(r"^\s*(\d+)", s)
    if match:
        try:
            return int(match.group(1))
        except ValueError:
            pass
            
    # Jika tiada di awal, cari sebarang digit pertama
    match = re.search(r"(\d+)", s)
    if match:
        try:
            return int(match.group(1))
        except ValueError:
            return None
            
    return None


def normalize_field(field_name: str, val: Any) -> Any:
    """
    Menyelaraskan nilai mengikut jenis medan tertentu.
    """
    if field_name == "container_count":
        return normalize_container_count(val)
    elif field_name == "gross_weight_kg":
        return normalize_gross_weight(val)
    else:
        return normalize_text(val)


def normalize_record(record: Dict[str, Any]) -> Dict[str, Any]:
    """
    Membersihkan kesemua 7 medan dalam satu dictionary rekod.
    """
    normalized = {}
    for key, value in record.items():
        normalized[key] = normalize_field(key, value)
    return normalized
