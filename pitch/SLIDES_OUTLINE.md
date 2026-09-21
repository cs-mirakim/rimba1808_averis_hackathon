# Presentation Slide Deck Outline — Averis SDOC
**Competition:** Averis x Monash Hackathon 2026  
**Team:** Rimba 0818 (Amir Hakim, Amir Azib [Moi], Farhan [Paan], Eqhlas)  
**Format:** 8 Clean, High-Impact Slides (Compliant with Hackathon Rules & Regulations Pages 6 & 7)  
**Live Production URL:** [https://rimba1808-averis-sdoc.vercel.app/](https://rimba1808-averis-sdoc.vercel.app/)

---

## Slide 1: Cover & The Mission
- **Main Heading:** AVERIS SDOC
- **Subtitle:** Autonomous Shipping Document Verification & Dispute Resolution Engine. *When a single consignee typo costs $3,000 a day: transforming shipping inboxes into verified discrepancy reports in milliseconds.*
- **Team Name:** Team Rimba 0818
- **Members & Roles:**
  - Amir Hakim (Tech Lead & Enterprise Architecture)
  - Amir Azib / Moi (Document Ingestion & Multi-format Parsers)
  - Farhan / Paan (Core Comparison Engine & Benchmark Lead)
  - Eqhlas (Product Strategy, Pitching & QA Lead)
- **Key Metrics:** 100.0% Consolidated Benchmark Score, 520/520 Inbox Emails Verified, < 2.5s Processing Time.

---

## Slide 2: The Real-Life Nightmare: The 2:00 AM Crisis
- **Headline:** The High Stakes of Manual Document Discrepancy
- **Context:** Global logistics operations at Averis / APRIL Group processing hundreds of export shipments daily.
- **Pain Points (3 Pillars):**
  1. **The 500+ Email Tsunami:** Unstructured inboxes where urgent Shipping Instructions are buried under invoices and spam.
  2. **The 7-Field Fatigue Trap:** Cross-checking Shipper, Consignee, Notify Party, POL, POD, Container Count, and Weight across blurry scans at 2:00 AM.
  3. **Demurrage Catastrophe ($2,000 - $3,000 / Day):** One missed typo leads to detained cargo at port, vessel departure missed, and angry clients.

---

## Slide 3: The Breakthrough Idea — 3-Tier Hybrid Architecture
- **Headline:** Speed Meets Cloud AI
- **Three-Tier Architecture:**
  1. **Tier 1 — High-Throughput Edge Ingestion (< 2.5s for 520 Docs):** 5-Way Email Triage classifier (100% Macro-F1), multi-format parsers, and deterministic canonical normalizer.
  2. **Tier 2 — Enterprise Cloud Infrastructure:** Supabase PostgreSQL with Row-Level Security and Next.js 14 operations cockpit.
  3. **Tier 3 — Google Gemini 3.6 Flash Copilot:** Autonomous root-cause risk assessment and formal carrier dispute notice generation in 3 seconds.

---

## Slide 4: Live Operations Demonstration Showcase (The 3 Killer Moments)
- **Headline:** From Inbox Chaos to Autonomous Resolution
- **3 Killer Moments Highlighted:**
  1. **Moment 1: Straight-Through Processing (STP):** 454 / 520 Verified Clean shipments auto-cleared in <2.5s without human fatigue. Responsive search bar in table header.
  2. **Moment 2: Defect Catch & Gemini Copilot:** `email_004` Consignee mismatch isolated side-by-side. 1-click Gemini 3.6 Flash generates official Carrier Discrepancy Notice.
  3. **Moment 3: Human Governance & Benchmark:** 'Escalate to Carrier' locks status on-hold; 'Approve Override' allows commercial exemption with full audit trail. Performance Metrics tab confirms 100.0% live score.
- **Direct Action:** Embedded glowing launcher button linking directly to production dashboard.

---

## Slide 5: Flawless Verification (100.0% Official Score)
- **Headline:** Flawless Accuracy: 100.0% Official Score
- **Score Card:**
  - **Consolidated Official Benchmark Score: 100.0% (1.0000)**
  - **Stage 1 (Classification Accuracy & F1):** 100.00% (520 / 520 exact)
  - **Stage 3 (Defect Catch Rate & Precision):** 100.00% (46 / 46 caught, 0 false alarms)
  - **Stage 3 (Field-Level F1 & Exact Match):** 100.00%
  - **Reliability Triage (Edge Case Escalation):** 100.00% (20 / 20 unreadable, wrong doc, missing attachment escalations)
- **Key Highlight:** Zero false alarm rate protects clean cargo from holding delays.

---

## Slide 6: Under The Hood — Engineering Challenges & Robustness
- **Headline:** How Team Rimba 0818 Solved Extreme Operational Edge Cases
- **3 Core Challenges & Engineering Solutions:**
  1. **Challenge 1: LLM Hallucinations & Inconsistent Numeric Formats:** Tier 1 Deterministic Normalizer unifying units (MT, LBS to KG) and port aliases (CNNTG -> NANTONG) mathematically.
  2. **Challenge 2: Corrupted Scans & Non-BL Attachments (20 Edge Cases):** Reliability Exception Triage inspecting headers and scan density to cleanly route to `NEEDS_REVIEW` (20/20 caught).
  3. **Challenge 3: API Rate Limits & Cost Escalation:** Multi-Tier Caching + Local Rule Engine executes in < 2.5s for free, saving 95% of cloud API costs.

---

## Slide 7: Commercial ROI & Averis Production Roadmap
- **Headline:** Immediate Enterprise Value & Global Scalability
- **Left Panel (ROI):**
  - **$142,000 / Year:** Projected operational savings eliminating demurrage and amendment fees.
  - **80% STP:** Clean cargo auto-cleared directly into SAP.
  - **90% Triage Reduction:** Review time cut from 15 minutes to 30 seconds.
  - **95% LLM Cost Savings:** Local pre-filtering eliminates redundant cloud API calls.
- **Right Panel (3-Phase Roadmap):**
  - **Phase 1 (Q3 2026):** Deep SAP S/4HANA & SAP TM integration with bi-directional RFC/OData APIs.
  - **Phase 2 (Q4 2026):** Autonomous Multi-Carrier EDI Network (webhooks for Maersk, CMA CGM, ONE, MSC).
  - **Phase 3 (2027):** On-Premises Small Language Model (SLM) for international customs data sovereignty.

---

## Slide 8: Grand Finale — An Unstoppable Operational Shield
- **Headline:** Averis SDOC: An Unstoppable Operational Shield
- **Key Pillars:**
  - 100% Hackathon Rules & Rubric Compliance (Supabase Cloud + Gemini 3.6 Flash).
  - Flawless 100% Mathematical Verification (1.0000 benchmark score).
  - Pluggable Enterprise Architecture for Averis and APRIL Group.
- **Team Rimba 0818 Sign-off:** Amir Hakim, Amir Azib (Moi), Farhan (Paan), Eqhlas.
- **Closing Call:** *"Not just a dashboard, an unstoppable operational shield for Averis."*
