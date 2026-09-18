"""
Database Synchronization Module for Averis Shipping Document Operations.
Saves verification results and extracted fields into Supabase.
Includes REST fallback using standard requests so it works reliably in any environment.
"""

import os
import logging
import requests
from typing import Dict, Any, List, Optional
from pathlib import Path

# Configure logging
logging.basicConfig(level=logging.INFO, format="%(asctime)s [%(levelname)s] %(message)s")
logger = logging.getLogger("ai.db_sync")

# Load .env
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

SUPABASE_URL = os.getenv("NEXT_PUBLIC_SUPABASE_URL", "").rstrip("/")
SUPABASE_KEY = os.getenv("SUPABASE_SERVICE_ROLE_KEY") or os.getenv("NEXT_PUBLIC_SUPABASE_ANON_KEY", "")


class SupabaseSync:
    """Handles pushing processed shipment records and discrepancy data into Supabase."""

    def __init__(self, url: Optional[str] = None, key: Optional[str] = None):
        self.url = (url or SUPABASE_URL).rstrip("/")
        self.key = key or SUPABASE_KEY
        self.is_ready = bool(self.url and self.key and not self.url.startswith("https://your-"))
        
        if self.is_ready:
            self.headers = {
                "apikey": self.key,
                "Authorization": f"Bearer {self.key}",
                "Content-Type": "application/json",
                "Prefer": "resolution=merge-duplicates,return=representation"
            }
            logger.info(f"Supabase client configured for URL: {self.url}")
        else:
            logger.warning("Supabase URL or Key not configured. Running in dry-run / mock mode.")

    def save_email_record(
        self,
        email_id: str,
        subject: str = "",
        category: str = "BL_COMPARISON",
        status: str = "OK",
        review_reason: Optional[str] = None,
        has_defect: bool = False,
        defect_fields: Optional[List[str]] = None
    ) -> bool:
        """Upsert email metadata and discrepancy status into 'emails' table."""
        payload = {
            "email_id": email_id,
            "subject": subject or f"Shipping Document Verification - {email_id}",
            "category": category,
            "status": status,
            "review_reason": review_reason,
            "has_defect": has_defect,
            "defect_fields": defect_fields or []
        }

        if not self.is_ready:
            logger.info(f"[MOCK SUPABASE] Saved email {email_id}: {status} (has_defect={has_defect})")
            return True

        endpoint = f"{self.url}/rest/v1/emails"
        try:
            res = requests.post(endpoint, headers=self.headers, json=payload, timeout=10)
            if res.status_code in [200, 201, 204]:
                logger.info(f"Successfully synced email {email_id} to Supabase.")
                return True
            else:
                logger.error(f"Supabase returned error {res.status_code}: {res.text}")
                return False
        except Exception as e:
            logger.error(f"Network error while posting to Supabase: {e}")
            return False

    def save_extracted_fields(
        self,
        email_id: str,
        doc_type: str,
        fields_dict: Dict[str, Any]
    ) -> bool:
        """Insert extracted 7 canonical fields into 'extracted_fields' table."""
        payload = {
            "email_id": email_id,
            "doc_type": doc_type,
            "shipper": fields_dict.get("shipper"),
            "consignee": fields_dict.get("consignee"),
            "notify_party": fields_dict.get("notify_party"),
            "port_of_loading": fields_dict.get("port_of_loading"),
            "port_of_discharge": fields_dict.get("port_of_discharge"),
            "container_count": fields_dict.get("container_count"),
            "gross_weight_kg": fields_dict.get("gross_weight_kg")
        }

        if not self.is_ready:
            logger.info(f"[MOCK SUPABASE] Saved extracted fields for {email_id} ({doc_type})")
            return True

        endpoint = f"{self.url}/rest/v1/extracted_fields"
        try:
            res = requests.post(endpoint, headers=self.headers, json=payload, timeout=10)
            if res.status_code in [200, 201, 204]:
                return True
            else:
                logger.error(f"Failed to insert extracted fields: {res.status_code} - {res.text}")
                return False
        except Exception as e:
            logger.error(f"Network error inserting extracted fields: {e}")
            return False

    def fetch_all_emails(self) -> List[Dict[str, Any]]:
        """Retrieve all emails from Supabase for frontend dashboard verification."""
        if not self.is_ready:
            return []
        endpoint = f"{self.url}/rest/v1/emails?select=*&order=created_at.desc"
        try:
            res = requests.get(endpoint, headers=self.headers, timeout=10)
            if res.status_code == 200:
                return res.json()
            return []
        except Exception as e:
            logger.error(f"Failed to fetch emails: {e}")
            return []
