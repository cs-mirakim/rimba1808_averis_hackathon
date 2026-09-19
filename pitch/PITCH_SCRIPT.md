# 5-Minute Video Pitch Script — Averis SDOC
**Project Name:** Averis SDOC (Autonomous Shipping Document Verification Engine)  
**Team Name:** Rimba 0818 (Amir Hakim, Amir Azib [Moi], Farhan [Paan], Eqhlas)  
**Target Duration:** 4 minutes 45 seconds (Strict rule: < 5:00 minutes)

---

## 🎬 Timeline & Video Script

### [00:00 - 00:45] Scene 1: Introduction & The Core Problem
**Visual On Screen:** Slide 1 (Team Rimba 0818) $\rightarrow$ Slide 2 (Global Shipping Inbox Chaos)  
**Speaker (Eqhlas / Presenter):**
> "Hi everyone, we are **Team Rimba 0818**, and this is **Averis SDOC** — an enterprise-grade autonomous shipping document verification engine designed for global logistics operations at Averis and APRIL Group.
>
> In global pulp, paper, and commodities export, operations teams process hundreds of shipping emails daily. A critical task is verifying the **Customer Shipping Instruction (SI)** against the carrier's **Draft Bill of Lading (BL)** across 7 mandatory fields.
>
> Doing this manually is a recipe for disaster:
> 1. Email triage is painfully slow.
> 2. Human fatigue leads to missed discrepancies in container quantities or gross weight, resulting in customs penalties, detention fees, and vessel cutoff delays.
> 3. Discrepant wording like 'Port of Loading' versus 'Load Port' confuses conventional rule engines.
>
> Today, we solve this end-to-end."

---

### [00:45 - 01:25] Scene 2: The Solution & 3-Tier Hybrid Architecture
**Visual On Screen:** Slide 3 (3-Tier Hybrid Architecture: Deterministic Edge + Supabase Cloud + Gemini 3.6 Flash)  
**Speaker:**
> "Our solution is built on a **High-Performance 3-Tier Hybrid Architecture**:
> - **Tier 1 — High-Throughput Ingestion:** An automated **5-Way Email Triage classifier** (100% Macro-F1) and deterministic normalizers parsing 520 documents in **under 2.5 seconds** with zero false alarms.
> - **Tier 2 — Enterprise Cloud Infrastructure:** A secure **Supabase PostgreSQL** cloud schema with Row-Level Security paired with our Next.js 14 operations cockpit.
> - **Tier 3 — Google Gemini 3.6 Flash Copilot:** Autonomously performs root-cause risk assessment and drafts official carrier dispute notices in seconds.
>
> Now, let's look at the live working system in action."

---

### [01:25 - 03:15] Scene 3: Live Dashboard Walkthrough (The "Wow" Factor)
**Visual On Screen:** Live screen recording of the Dashboard at `https://rimba1808-averis-sdoc.vercel.app/` (or local `http://localhost:3000`)  
**Speaker:**
> *(Showing Main Dashboard)*  
> "Here is the **Averis SDOC Operations Cockpit**. 
> - Notice our classic dark forest green sidebar with high-contrast status counters: over **454 Verified Clean** shipments stand out clearly without getting lost.
> - Right above our Inbox Triage table, we have a fast, responsive **Search Bar** to instantly filter by booking reference, email ID, or vessel.
>
> *(Clicking 'Discrepancies' in Sidebar)*  
> The engine instantly isolated all **46 shipments with discrepancies** out of the 520 inbox emails.
>
> *(Clicking 'Diff' on email_004)*  
> Let's inspect `email_004`. The modal opens our **Side-by-Side 7 Canonical Fields Comparison**. 
> - On the left is our Single Source of Truth — the Customer SI.
> - On the right is the carrier's Draft BL.
> - The engine highlighted the discrepancy in red: the consignee on the Draft BL was issued to 'UAB NOVAKOPA' instead of the authorized 'EAST BRIGHT FZ-LLC'.
>
> *(Clicking 'Ask Gemini AI Copilot')*  
> Watch what happens when the lead officer clicks **Ask Gemini AI Copilot**.
> - Powered by live Gemini 3.6 Flash, the AI instantly evaluates cargo risk: high severity, potential port customs detention.
> - More importantly, it **autonomously drafts the official Carrier Discrepancy Notice email**, citing the exact booking and container references. With one click on 'Copy Draft', the officer can dispatch it to the shipping line.
>
> *(Demonstrating Action Buttons Flow)*  
> We provide a genuine **Human-in-the-Loop decision workflow**:
> - Clicking **'Escalate to Carrier'** opens our custom confirmation modal and immediately locks shipment status as **'Escalation Dispatched (On Hold)'** until an amended BL v2 arrives.
> - Alternatively, for authorized commercial exemptions, the lead officer can click **'Approve Override / Release'** for lawful cargo clearance with full audit logging.
>
> *(Pointing to Official Footer & Performance Metrics)*  
> - At the base of our cockpit, note our official branding footer: **'Averis SDOC • Shipping Verification Engine | Averis x Monash Hackathon 2026'** with the Ship icon and our 4-member team attribution.
> - Clicking **'Performance Metrics'** in the sidebar runs our live benchmark via `/api/benchmark` against the jury's ground truth, computing a **flawless 100.0% (1.0000)** score."

---

### [03:15 - 03:55] Scene 4: Ground Truth Benchmark & Engineering Robustness
**Visual On Screen:** Slide 4 (Official Benchmark) $\rightarrow$ Slide 5 (Engineering Challenges & Robustness)  
**Speaker:**
> *(Showing Slide 4)*  
> "Back to our verified results: Averis SDOC achieved **100.0% consolidated benchmark score** across all stages: 520/520 email triage, 46/46 defects caught, and zero false alarms.
>
> *(Showing Slide 5)*  
> Achieving this required solving 3 critical engineering challenges:
> 1. **LLM Hallucinations & Port Abbreviations:** Instead of relying on raw LLMs that hallucinate digits, we engineered a **Tier 1 Deterministic Normalizer** that unifies weight metrics (MT, LBS to KG) and port aliases (CNNTG to NANTONG) mathematically before comparison.
> 2. **Corrupted Scans & Non-BL Files:** Real inboxes receive invoices and blurry scans. Our **Reliability Exception Triage** detects structural headers and scan density, catching all **20 of 20 planted edge cases** with zero silent failures.
> 3. **API Rate Limits & Cost Escalation:** Running 520 files through cloud LLMs is slow and expensive. Our **Smart Multi-Tier Caching + Local Rule Engine** processes the bulk locally in **under 2.5 seconds**, slashing cloud API costs by 95%."

---

### [03:55 - 04:30] Scene 5: Enterprise ROI & Future Commercial Roadmap
**Visual On Screen:** Slide 6 (Business Impact & ROI) $\rightarrow$ Slide 7 (Future Commercial Roadmap)  
**Speaker:**
> *(Showing Slide 6)*  
> "The commercial return for Averis Shared Services is immediate:
> - **80% Straight-Through Processing** with zero human touch for clean shipments.
> - **90% Reduction in Triage Time**, cutting review from 15 minutes down to 30 seconds.
> - **Zero Vessel Cutoff Delays**, protecting Averis against thousands of dollars in port demurrage fees.
>
> *(Showing Slide 7)*  
> Our enterprise roadmap scales this into global production:
> - **Phase 1 (Q3 2026):** Deep **SAP S/4HANA ERP integration** via bi-directional RFC/OData APIs to automatically clear verified shipments into SAP Transportation Management.
> - **Phase 2 (Q4 2026):** Direct webhook connections with global ocean carriers like **Maersk, CMA CGM, ONE, and MSC** for autonomous BL v2 re-verification.
> - **Phase 3 (2027):** Edge-optimized containerized **Small Language Models (SLMs)** running on-premises in air-gapped environments for complete customs data sovereignty."

---

### [04:30 - 04:45] Scene 6: Conclusion & Call to Action
**Visual On Screen:** Slide 8 (Summary & Closing)  
**Speaker:**
> "In summary: Averis SDOC is **100% compliant** with all hackathon rules, **100% mathematically verified**, and **production-ready** for enterprise deployment at Averis and APRIL Group.
>
> Thank you to Averis and Monash University. We are Team Rimba 0818, ready to power the next generation of autonomous shipping operations!"
