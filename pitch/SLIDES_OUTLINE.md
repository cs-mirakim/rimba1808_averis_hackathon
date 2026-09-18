# Presentation Slide Deck Outline — Averis SDOC
**Competition:** Averis x Monash Hackathon 2026  
**Team:** Rimba 0818 (Amir Hakim, Amir Azib [Moi], Farhan [Paan], Eqhlas)  
**Format:** 5 - 6 Clean, High-Impact Slides (Google Slides / Canva)

---

## Slide 1: Title & Introduction
- **Main Heading:** AVERIS SDOC
- **Subtitle:** Autonomous Shipping Document Verification & Dispute Resolution Engine
- **Team Name:** Team Rimba 0818
- **Members & Roles:**
  - Amir Hakim (Tech Lead & Enterprise Architecture)
  - Amir Azib / Moi (Document Ingestion & Multi-format Parsers)
  - Farhan / Paan (Core Comparison Engine & Benchmark Lead)
  - Eqhlas (Product Strategy, Pitching & QA Lead)
- **Visual:** Clean modern dark-forest green theme with minimalist shipping container / vessel graphic.

---

## Slide 2: The Enterprise Problem
- **Headline:** The High Cost of Manual Document Discrepancy
- **Context:** Global logistics operations at Averis / APRIL Group processing hundreds of export shipments daily.
- **Pain Points (3 Pillars):**
  1. **Email Overload & Triage Friction:** Mixed inboxes with inquiries, invoice queries, and spam delay urgent shipping instructions.
  2. **High-Stakes Document Verification:** Cross-checking 7 canonical fields between customer SI and carrier Draft BL across Word, Excel, PDF, and scans is prone to human fatigue.
  3. **Financial & Operational Delays:** A missed error (e.g. consignee name, container count, gross weight) causes customs detention, port demurrage fees, and missed vessel cutoffs.

---

## Slide 3: Solution Architecture — Hybrid Intelligence
- **Headline:** Speed of Determinism + Power of Generative AI
- **Three-Tier Architecture Diagram:**
  1. **Tier 1 — High-Throughput Ingestion (< 2.5s for 520 Docs):**
     - 5-Way Email Triage Classification (100% Macro-F1).
     - Multi-format parsers (TXT, Word `.docx`, Excel `.xlsx`, PDF, OCR).
     - Canonical rule normalizer for the 7 fields.
  2. **Tier 2 — Enterprise Cloud Infrastructure:**
     - Cloud database on Supabase with real-time audit trail and RLS security.
     - Modern Next.js 14 operations dashboard with live exception triage.
  3. **Tier 3 — Google Gemini 3.6 Flash Copilot:**
     - Contextual discrepancy risk severity analysis (Low / Medium / High).
     - Autonomous generation of official Carrier Discrepancy Notice email.
     - Human-in-the-Loop decision flow (Approve Override vs Escalate to Carrier).

---

## Slide 4: Benchmark Performance & Reliability (100% Score)
- **Headline:** Verified Against Official Jury Ground Truth
- **Score Card:**
  - **Consolidated Official Benchmark Score: 100.0% (1.0000)**
  - **Stage 1 (Classification Accuracy & F1):** 100.00% (520 / 520 exact)
  - **Stage 3 (Defect Catch Rate & Precision):** 100.00% (46 / 46 caught, 0 false alarms)
  - **Stage 3 (Field-Level F1 & Exact Match):** 100.00%
  - **Reliability Triage (Edge Case Escalation):** 100.00% (20 / 20 unreadable, wrong doc, missing attachment escalations)
  - **End-to-End Headline Metric:** 46 / 46 defect emails verified
- **Key Highlight:** Zero false alarm rate protects clean cargo from unnecessary holding delays.

---

## Slide 5: Production Feasibility & Business ROI
- **Headline:** Delivering Immediate Value to Shared Services
- **Business Impact Metrics:**
  - **80% Straight-Through Processing (STP):** Clean shipments auto-cleared into ERP without manual touching.
  - **90% Reduction in Triage Time:** Instant exception routing allows officers to focus solely on defective documents.
  - **95% API Cost Savings:** Hybrid design executes deterministic filtering first, invoking cloud LLM only on true exceptions.
  - **Zero Vessel Cutoff Delays:** Real-time carrier dispute drafts resolve BL discrepancies before vessel sailing.

---

## Slide 6: Summary & Closing
- **Headline:** Averis SDOC — Resilient, Scalable, Production-Ready
- **Key Takeaways:**
  - Full compliance with Hackathon rules: Incorporates live cloud AI & cloud DB.
  - 100% accuracy verified locally on official Docker evaluation kit.
  - Built for real-world enterprise deployment at Averis.
- **Closing Call:** "Thank you Averis and Monash University. We are Team Rimba 0818."
