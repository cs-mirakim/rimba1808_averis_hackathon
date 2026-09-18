"""
Gemini Structured Extraction Module for Shipping Documents.
Extracts the 7 canonical fields from shipping document text (SI & BL).
"""

import os
import json
import logging
from typing import Optional, List, Dict, Any
from pathlib import Path
from ai.schema import ShippingDocumentExtraction, ShippingFields

# Configure logging
logging.basicConfig(level=logging.INFO, format="%(asctime)s [%(levelname)s] %(message)s")
logger = logging.getLogger("ai.extractor")

# Load environment variables from .env
env_path = Path(__file__).resolve().parent.parent / ".env"
try:
    from dotenv import load_dotenv
    load_dotenv(dotenv_path=env_path)
except ImportError:
    if env_path.exists():
        with open(env_path, "r", encoding="utf-8", errors="ignore") as f:
            for line in f:
                line = line.strip()
                if line and not line.startswith("#") and "=" in line:
                    k, v = line.split("=", 1)
                    os.environ.setdefault(k.strip(), v.strip())

GEMINI_API_KEY = os.getenv("GEMINI_API_KEY")

EXTRACTION_SYSTEM_INSTRUCTION = """
You are an expert shipping operations documentation specialist at Averis / APRIL.
Your task is to extract exact canonical shipping fields from shipping instructions (SI) or draft bills of lading (BL).

You must extract these 7 canonical fields:
1. shipper: The company or person sending the cargo (e.g. 'PT Riau Andalan Kertas', 'APRIL International').
2. consignee: The company or party receiving the cargo (e.g. 'Shandong Paper Corp', 'Asia Symbol').
3. notify_party: The party to notify upon arrival. If text says 'SAME AS CONSIGNEE' or similar, extract 'SAME AS CONSIGNEE' or the actual party.
4. port_of_loading: Port where cargo is loaded. Synonyms: POL, Load Port, Port of Departure (e.g. 'Pelintung', 'Dumai', 'Port Klang').
5. port_of_discharge: Port where cargo is unloaded. Synonyms: POD, Discharge Port, Destination Port (e.g. 'Qingdao', 'Shanghai', 'Rotterdam').
6. container_count: Total quantity of shipping containers as an integer number. (e.g., '5 x 40HQ' -> 5, '3 FEU' -> 3, '10 Containers' -> 10).
7. gross_weight_kg: Total gross weight in kilograms as a float number (e.g., '25,400.50 KGS' -> 25400.5, '12.5 MT' -> 12500.0). Remove units like KGS, KG, MT.

IMPORTANT INTEGRITY RULES:
- If the document is NOT a shipping document (e.g. it is a commercial invoice, salary slip, payment receipt, general query, or spam), set is_shipping_document=false and doc_type='INVOICE' or 'OTHER'.
- If any required field has placeholder tokens like '???', 'TBA', 'PENDING', 'TO BE ADVISED', or '_______', record has_missing_placeholder=true, list the field name in missing_fields, and keep the field value as that placeholder string or null.
- Do NOT guess or hallucinate data that is not in the text.
"""


class GeminiExtractor:
    """Class to interact with Gemini API for structured shipping document extraction."""

    def __init__(self, api_key: Optional[str] = None, model_name: str = "gemini-3.6-flash", use_gemini: bool = True):
        self.api_key = api_key or os.getenv("GEMINI_API_KEY")
        self.model_name = model_name
        self.client_configured = False
        self.use_gemini = use_gemini
        self.quota_exceeded = False
        
        if self.use_gemini and self.api_key and not self.api_key.startswith("your_"):
            try:
                import google.generativeai as genai
                genai.configure(api_key=self.api_key)
                self.client_configured = True
                logger.info(f"Gemini API successfully configured with model: {self.model_name}")
            except Exception as e:
                logger.warning(f"Could not configure Gemini client: {e}")
        else:
            if not self.use_gemini:
                logger.info("Fast mode enabled (using deterministic domain synonym extractor).")
            else:
                logger.warning("GEMINI_API_KEY is not set or is still the default placeholder in .env")

    def extract(self, document_text: str, doc_type_hint: Optional[str] = None) -> ShippingDocumentExtraction:
        """
        Extract 7 canonical fields from text using Gemini API with Structured JSON Output.
        Falls back to rule-based parser if API key is not available or quota is exceeded.
        """
        if not document_text or not document_text.strip():
            return ShippingDocumentExtraction(
                is_shipping_document=False,
                doc_type="UNREADABLE",
                confidence_notes="Empty document text provided."
            )

        if self.client_configured and not self.quota_exceeded:
            try:
                import google.generativeai as genai
                
                model = genai.GenerativeModel(
                    model_name=self.model_name,
                    system_instruction=EXTRACTION_SYSTEM_INSTRUCTION,
                    generation_config={
                        "response_mime_type": "application/json",
                        "temperature": 0.0,
                    }
                )

                prompt = f"""
Extract shipping document data into this exact JSON structure:
{{
  "is_shipping_document": true,
  "doc_type": "{doc_type_hint or 'SI'}",
  "has_missing_placeholder": false,
  "missing_fields": [],
  "fields": {{
    "shipper": "company name string or null",
    "consignee": "company name string or null",
    "notify_party": "party string or null",
    "port_of_loading": "port name string or null",
    "port_of_discharge": "port name string or null",
    "container_count": 0,
    "gross_weight_kg": 0.0
  }},
  "confidence_notes": "optional note"
}}

--- DOCUMENT TEXT TO ANALYZE ---
{document_text}
--- END DOCUMENT TEXT ---
"""
                response = model.generate_content(prompt)
                extracted_data = json.loads(response.text)
                return ShippingDocumentExtraction(**extracted_data)

            except Exception as e:
                err_str = str(e)
                if "429" in err_str or "quota" in err_str.lower() or "resourceexhausted" in err_str.lower():
                    logger.warning(f"Gemini API quota reached. Tripping circuit-breaker to instantaneous deterministic parser: {e}")
                    self.quota_exceeded = True
                else:
                    logger.error(f"Gemini API call failed: {e}. Falling back to deterministic regex parser.")

        # Deterministic / Fallback Parser
        return self._fallback_regex_extract(document_text, doc_type_hint)

    def _fallback_regex_extract(self, text: str, doc_type_hint: Optional[str]) -> ShippingDocumentExtraction:
        """High-precision deterministic extraction covering all known domain synonym variations."""
        import re

        fields = ShippingFields()
        missing_fields = []
        has_placeholder = False

        # Check for non-shipping doc
        lower_text = text.lower()
        if (
            "commercial invoice" in lower_text or
            "packing list only" in lower_text or
            "certificate of origin" in lower_text
        ) and "bill of lading" not in lower_text and "shipping instruction" not in lower_text:
            return ShippingDocumentExtraction(
                is_shipping_document=False,
                doc_type="INVOICE",
                confidence_notes="Detected Non-shipping document header."
            )

        def _get_val(patterns: List[str]) -> Optional[str]:
            for pat in patterns:
                m = re.search(pat, text, re.IGNORECASE)
                if m:
                    v = m.group(1) or (m.group(2) if len(m.groups()) >= 2 else None)
                    if v and v.strip():
                        return v.strip()
            return None

        # 1. Shipper
        if re.search(r'(?:Shipper|Exporter)[^\n\r:|]*[:|]\s*[\r\n]+(?=[A-Z])', text, re.IGNORECASE):
            fields.shipper = None
            has_placeholder = True
            missing_fields.append("shipper")
        else:
            fields.shipper = _get_val([
                r'(?:Shipper|Exporter|\bFrom\b)[^\n\r:|]*\s*(?:[:|]\s*([^\n\r|]+)|\n\s*([^\n\r|]+))'
            ])

        # 2. Consignee
        if re.search(r'(?:Consignee)[^\n\r:|]*[:|]\s*[\r\n]+(?=[A-Z])', text, re.IGNORECASE):
            fields.consignee = None
            has_placeholder = True
            missing_fields.append("consignee")
        else:
            fields.consignee = _get_val([
                r'(?:Consignee|To\s*the\s*Order\s*of|Buyer|\bTo\b)[^\n\r:|]*\s*(?:[:|]\s*([^\n\r|]+)|\n\s*([^\n\r|]+))'
            ])
            if fields.consignee and any(p in fields.consignee.lower() for p in ["???", "tba", "___", "pending", "to be advised", "n/a"]):
                has_placeholder = True
                missing_fields.append("consignee")

        # 3. Notify Party
        fields.notify_party = _get_val([
            r'(?:Notify\s*Party|Intermediate\s*Consignee|\bNotify\b)[^\n\r:|]*\s*(?:[:|]\s*([^\n\r|]+)|\n\s*([^\n\r|]+))'
        ])

        # 4. Port of Loading
        fields.port_of_loading = _get_val([
            r'(?:Port\s*of\s*Loading|Load\s*Port|\bPOL\b)[^\n\r:|]*\s*(?:[:|]\s*([^\n\r|]+)|\n\s*([^\n\r|]+))'
        ])
        if fields.port_of_loading and any(p in fields.port_of_loading.lower() for p in ["???", "tba", "___", "pending", "n/a"]):
            has_placeholder = True
            missing_fields.append("port_of_loading")

        # 5. Port of Discharge
        fields.port_of_discharge = _get_val([
            r'(?:Port\s*of\s*Discharge|Discharge\s*Port|\bPOD\b)[^\n\r:|]*\s*(?:[:|]\s*([^\n\r|]+)|\n\s*([^\n\r|]+))'
        ])
        if fields.port_of_discharge and any(p in fields.port_of_discharge.lower() for p in ["???", "tba", "___", "pending", "n/a"]):
            has_placeholder = True
            missing_fields.append("port_of_discharge")

        # 6. Container Count
        cnt_val = _get_val([
            r'(?:No\.\s*of\s*Containers|Total\s*Containers|Container\s*Count|Containers?)[^\n\r:|]*\s*[:|]\s*(\d+)'
        ])
        if not cnt_val:
            m_c = re.search(r'(\d+)\s*[xX]\s*(?:20|40)', text)
            if m_c:
                cnt_val = m_c.group(1)
        if cnt_val and cnt_val.isdigit():
            fields.container_count = int(cnt_val)
        else:
            fields.container_count = None

        # 7. Gross Weight
        m_wt_ph = re.search(r'(?:Gross\s*Weight|Gross\s*Wt)[^\n\r:|]*[:|]\s*([^\n\r|]+)', text, re.IGNORECASE)
        if m_wt_ph and any(ph in m_wt_ph.group(1).lower() for ph in ['n/a', '___', '???', 'tba']):
            fields.gross_weight_kg = None
            has_placeholder = True
            missing_fields.append("gross_weight_kg")
        else:
            wt_val = _get_val([
                r'(?:Gross\s*Weight|Gross\s*Wt|G\.?W\.?|Weight)[^\n\r:|]*\s*(?:[:|]\s*([0-9,.]+)\s*(?:KG|KGS|MT|MTS)?|\n\s*([0-9,.]+))'
            ])
            if wt_val:
                try:
                    fields.gross_weight_kg = float(wt_val.replace(',', '').strip())
                except ValueError:
                    fields.gross_weight_kg = None
            else:
                fields.gross_weight_kg = None

        return ShippingDocumentExtraction(
            is_shipping_document=True,
            doc_type=doc_type_hint or "SHIPPING_DOC",
            has_missing_placeholder=has_placeholder,
            missing_fields=missing_fields,
            fields=fields,
            confidence_notes="Extracted using deterministic domain synonym matcher."
        )
