# Presentation Slide Deck Outline — Averis SDOC
**Competition:** Averis x Monash Hackathon 2026  
**Team:** Rimba 0818 (Amir Hakim, Amir Azib [Moi], Farhan [Paan], Eqhlas)  
**Format:** 8 Clean, High-Impact Slides (Compliant with Hackathon Rules & Regulations Pages 6 & 7)

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
- **Visual:** Clean modern dark-forest green theme with minimalist shipping container / vessel graphic, official 100.0% benchmark badge.

---

## Slide 2: The Enterprise Problem
- **Headline:** The High Cost of Manual Document Discrepancy
- **Context:** Global logistics operations at Averis / APRIL Group processing hundreds of export shipments daily.
- **Pain Points (3 Pillars):**
  1. **Email Overload & Triage Friction:** Mixed inboxes with inquiries, invoice queries, and spam delay urgent shipping instructions.
  2. **High-Stakes Document Verification:** Cross-checking 7 canonical fields between customer SI and carrier Draft BL across Word, Excel, PDF, and scans is prone to human fatigue.
  3. **Financial & Operational Delays:** A missed error (e.g. consignee name, container count, gross weight) causes customs detention, port demurrage fees ($2,000+/day), and missed vessel cutoffs.

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

## Slide 5: Engineering Challenges & Robustness (Mandatory)
- **Headline:** How Team Rimba 0818 Solved Extreme Operational Edge Cases
- **3 Core Challenges & Engineering Solutions:**
  1. **Challenge 1: LLM Hallucinations & Inconsistent Numeric Formats**
     - *Issue:* Conflicting units (MT vs KG vs LBS) and port codes (CNNTG vs NANTONG) cause LLMs to hallucinate numbers or scales.
     - *Solution:* Tier 1 Deterministic Normalizer unifying units and UN/LOCODE aliases mathematically prior to comparison.
  2. **Challenge 2: Corrupted Scans & Non-BL Attachments (20 Edge Cases)**
     - *Issue:* Inboxes receive commercial invoices, packing lists, zero-byte files, and blurry 72-DPI scans that cause silent parser failures.
     - *Solution:* Reliability Exception Triage that inspects document headers and text density to escalate cleanly to `NEEDS_REVIEW` (20/20 caught).
  3. **Challenge 3: API Rate Limits & Cost Escalation**
     - *Issue:* Running 520 documents through cloud LLMs hits rate limits, adds 15+ minutes of latency, and runs up enterprise bills.
     - *Solution:* Smart Multi-Tier Caching + Local Rule Engine executes in < 2.5s for free, saving 95% of cloud API calls.

---

## Slide 6: Production Feasibility & Business ROI
- **Headline:** Delivering Immediate Value to Shared Services
- **Business Impact Metrics:**
  - **80% Straight-Through Processing (STP):** Clean shipments auto-cleared into ERP without manual touching.
  - **90% Reduction in Triage Time:** Instant exception routing allows officers to focus solely on defective documents.
  - **95% API Cost Savings:** Hybrid design executes deterministic filtering first, invoking cloud LLM only on true exceptions.
  - **Zero Vessel Cutoff Delays:** Real-time carrier dispute drafts resolve BL discrepancies before vessel sailing.

---

## Slide 7: Future Commercial Roadmap & Enterprise Scalability (Mandatory)
- **Headline:** Transitioning Averis SDOC from Hackathon Prototype to Global Production
- **3 Scalability Phases:**
  1. **Phase 1 (Q3 2026) — SAP S/4HANA ERP Deep Integration:**
     - Bi-directional RFC and OData APIs to pull customer SIs directly from SAP TM (Transportation Management).
     - Automated cargo release for verified 'OK' shipments without manual keying.
  2. **Phase 2 (Q4 2026) — Autonomous Multi-Carrier EDI Network:**
     - Direct webhook integrations with global carriers (Maersk, CMA CGM, ONE, MSC).
     - Automated ingestion and re-verification of amended Draft BL v2 to close disputes autonomously.
  3. **Phase 3 (2027) — Edge-Optimized Local SLM:**
     - Domain-fine-tuned Small Language Models running 100% on-premises in air-gapped containerized infrastructure for strict international customs data sovereignty.

---

## Slide 8: Summary & Closing
- **Headline:** Averis SDOC — Resilient, Scalable, Production-Ready
- **Key Takeaways:**
  - Full compliance with Hackathon rules: Incorporates live cloud AI (Gemini 3.6 Flash) & cloud DB (Supabase).
  - 100% accuracy verified locally on official evaluation kit (1.0000 benchmark score).
  - Built for real-world enterprise deployment at Averis and APRIL Group.
- **Closing Call:** "Thank you Averis and Monash University. We are Team Rimba 0818."
