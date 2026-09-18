"""
Schema definitions for Shipping Document AI extraction using Pydantic.
These models guarantee clean, structured output from the Google Gemini API.
"""

from typing import Optional, List
from pydantic import BaseModel, Field


class ShippingFields(BaseModel):
    """The 7 canonical shipping fields evaluated by the hackathon scoring engine."""
    shipper: Optional[str] = Field(
        default=None,
        description="Name/entity of the shipper or sender company (e.g. PT Riau Andalan Pulp & Paper)."
    )
    consignee: Optional[str] = Field(
        default=None,
        description="Name/entity of the consignee or receiving company (e.g. Asia Symbol Ltd)."
    )
    notify_party: Optional[str] = Field(
        default=None,
        description="Party to be notified upon cargo arrival. Often 'SAME AS CONSIGNEE' or an agent."
    )
    port_of_loading: Optional[str] = Field(
        default=None,
        description="Port of loading/departure, also known as POL or Load Port (e.g. Port Klang, Pelintung, Dumai)."
    )
    port_of_discharge: Optional[str] = Field(
        default=None,
        description="Port of discharge/destination, also known as POD or Discharge Port (e.g. Qingdao, Shanghai)."
    )
    container_count: Optional[int] = Field(
        default=None,
        description="Total quantity of shipping containers as an integer number (e.g. 5)."
    )
    gross_weight_kg: Optional[float] = Field(
        default=None,
        description="Total gross weight in kilograms (float/number, e.g. 24500.50). Converted from MT/LBS if necessary."
    )


class ShippingDocumentExtraction(BaseModel):
    """Full extraction result including document classification and integrity flags."""
    is_shipping_document: bool = Field(
        default=True,
        description="True if the document is a Shipping Instruction (SI) or Bill of Lading (BL). False if it is an invoice, receipt, spam, or non-shipping document."
    )
    doc_type: Optional[str] = Field(
        default=None,
        description="Detected document type: 'SI', 'BL', 'INVOICE', or 'OTHER'."
    )
    has_missing_placeholder: bool = Field(
        default=False,
        description="True if any field has placeholder text like '???', 'TBA', 'PENDING', or '______'."
    )
    missing_fields: List[str] = Field(
        default_factory=list,
        description="List of fields that were explicitly missing or placeholder values in the source text."
    )
    fields: ShippingFields = Field(
        default_factory=ShippingFields,
        description="The 7 extracted canonical fields."
    )
    confidence_notes: Optional[str] = Field(
        default=None,
        description="Optional brief observation on data quality or ambiguities."
    )
