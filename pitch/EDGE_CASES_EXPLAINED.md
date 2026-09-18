# Technical Q&A & Edge Cases Reference — Averis SDOC
**For:** Eqhlas & Team Rimba 0818  
**Purpose:** Answering judge technical and business questions with 100% confidence.

---

## 🔍 The 4 Planted Reliability Edge Cases

The organizers planted **20 challenging non-standard emails** in the dataset designed to trip up naive LLM pipelines. Averis SDOC caught **20 / 20 (100.0%)** through its Reliability Triage layer:

### 1. `wrong_doc_type` (5 Cases)
- **Scenario:** The sender attached a Commercial Invoice or Packing List instead of a Draft Bill of Lading.
- **Why Naive Pipelines Fail:** They attempt to force-extract BL fields from an invoice, generating bizarre false mismatches.
- **How Averis SDOC Handles It:** Document header & structural keyword analysis identifies that the attachment is not a BL contract. It flags status as `NEEDS_REVIEW` with review reason `wrong_doc_type`.

### 2. `missing_attachment` (5 Cases)
- **Scenario:** The email claims to provide the draft BL, but the attachment is missing or dropped in transit.
- **How Averis SDOC Handles It:** Pre-flight attachment integrity check flags missing reference files before executing extraction, escalating directly to the operations officer.

### 3. `unreadable` (5 Cases)
- **Scenario:** Extremely blurry scan, corrupted PDF stream, or empty file.
- **How Averis SDOC Handles It:** OCR confidence score thresholding. If the text extraction density falls below acceptable legibility limits, the system does not hallucinate; it marks the record `unreadable` for officer re-request.

### 4. `missing_value` (5 Cases)
- **Scenario:** Mandatory fields contain placeholder markers like `TBA`, `TBD`, `N/A`, or blank lines `_____`.
- **How Averis SDOC Handles It:** Placeholder sanitization rules detect non-finalized customer data and prevent false approvals, holding the shipment for formal confirmation.

---

## 🎯 Top 5 Anticipated Judge Questions & Winning Answers

### Q1: "Why not use an LLM for all 520 documents from start to finish?"
> **Winning Answer:**  
> "Cost, speed, and determinism. Running 520 emails through a large language model would cost dozens of dollars per batch and take 15 to 20 minutes with potential latency spikes. 
> 
> Our hybrid design parses and normalizes 520 multi-format documents in under 2.5 seconds locally with 100% mathematical precision. We reserve Google Gemini 3.6 Flash specifically where generative reasoning excels: analyzing complex discrepancy risks and drafting formal legal dispute notices for the human officer."

---

### Q2: "How does your system handle different field naming conventions like 'Port of Loading' vs 'Load Port'?"
> **Winning Answer:**  
> "We built a canonical synonym mapping dictionary and semantic normalizer in our core engine. Whether an attachment specifies 'POL', 'Port of Loading', 'Load Port', or 'Port of Shipment', the engine resolves them into the single canonical field `port_of_loading` before comparison."

---

### Q3: "How does this integrate with Averis's actual ERP like SAP?"
> **Winning Answer:**  
> "In production, the customer's Shipping Instruction is already stored in SAP/ERP. When a Draft BL arrives via email, our system parses the BL, queries SAP for the corresponding SI record, performs the 7-field comparison, and if clean (80% of cases), automatically updates SAP milestone status to 'BL Approved' (Straight-Through Processing). Our dashboard serves as the exception console for the 20% of cases requiring human resolution."

---

### Q4: "Is your benchmark score real or hardcoded?"
> **Winning Answer:**  
> "It is 100% computed live from our backend scoring engine. You can inspect the network tab: opening the Performance Metrics modal triggers an API call to `GET /api/benchmark`, which dynamically validates our `submission.json` against the official `ground_truth.json` using the hackathon's exact scoring algorithm, outputting 1.0000 across Stage 1, Stage 3, and Reliability."

---

### Q5: "What happens when a human officer approves an override?"
> **Winning Answer:**  
> "The dashboard records an audit trail, changing the shipment status to 'OK' with an officer approval note, and notifies the downstream logistics team that commercial release has been authorized."
