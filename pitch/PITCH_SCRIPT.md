# 5-Minute Video Pitch Script — Averis SDOC
**Project Name:** Averis SDOC (Autonomous Shipping Document Verification Engine)  
**Team Name:** Rimba 0818 (Amir Hakim, Amir Azib [Moi], Farhan [Paan], Eqhlas)  
**Target Duration:** 4 minutes 40 seconds (Strict hackathon rule: < 5:00 minutes)  
**Live Production Prototype:** [https://rimba1808-averis-sdoc.vercel.app/](https://rimba1808-averis-sdoc.vercel.app/)  
**Interactive Pitch Deck:** [https://averis-pitch.vercel.app/](https://averis-pitch.vercel.app/) (or local `pitch/index.html`)

---

## 🎬 Master Script & Timeline (Synchronized 8-Slide Flow)

### [00:00 - 00:25] Scene 1: The Mission & Team Rimba 0818
**Visual On Screen:** Slide 1 (Cover: AVERIS SDOC — *When a single consignee typo costs $3,000 a day*)  
**Speaker (Eqhlas / Presenter):**
> "Good day everyone, we are **Team Rimba 0818**, and this is **Averis SDOC** — an enterprise-grade autonomous shipping document verification engine engineered specifically for global export logistics at Averis and APRIL Group.
>
> Our team comprises **Amir Hakim** as Tech Lead & Enterprise Architect, **Amir Azib (Moi)** leading Document Ingestion, **Farhan (Paan)** heading the Comparison Engine & Benchmark, and myself **Eqhlas** spearheading Product Strategy & Quality Assurance."

---

### [00:25 - 00:55] Scene 2: The Real-Life Nightmare (The 2:00 AM Crisis)
**Visual On Screen:** Slide 2 (The 2:00 AM Crisis — 500+ Email Tsunami, 7-Field Fatigue, Demurrage Catastrophe)  
**Speaker:**
> "Picture this: It is 2:00 AM at the Port of Qingdao. A container vessel laden with millions of dollars in export pulp from APRIL Dumai has just berthed. Yet, cargo clearance is blocked.
>
> The culprit? An operations clerk overlooked a single word on the draft Bill of Lading — the Consignee did not match the customer's Shipping Instruction.
>
> Because of one human oversight amidst hundreds of daily emails, the enterprise faces **thousands of dollars in port demurrage penalties per day**, stranded cargo, and strained customer relationships.
>
> This exact high-stakes crisis is what my teammates — Amir Hakim, Moi, Farhan, and myself Eqhlas — resolved to eliminate once and for all."

---

### [00:55 - 01:25] Scene 3: The Breakthrough Idea — 3-Tier Hybrid Architecture
**Visual On Screen:** Slide 3 (3-Tier Hybrid Architecture: Deterministic Edge + Supabase Cloud + Gemini 3.6 Flash)  
**Speaker:**
> "Most solutions fail because they rely solely on raw LLMs that hallucinate digits and crawl under high volume, or legacy keyword systems that break on slight formatting changes.
>
> Our breakthrough? **Averis SDOC — 3-Tier Hybrid Architecture** uniting zero-tolerance mathematical determinism with Google Gemini generative intelligence:
> - **Tier 1 — High-Throughput Edge Ingestion:** 5-Way Email Triage classifier (100% Macro-F1) and deterministic normalizers parsing 520 documents in **under 2.5 seconds**.
> - **Tier 2 — Enterprise Cloud Infrastructure:** Supabase PostgreSQL cloud schema with Row-Level Security paired with our responsive Next.js 14 operations cockpit.
> - **Tier 3 — Google Gemini 3.6 Flash Copilot:** An intelligent agent assessing cargo detention risk and autonomously drafting formal carrier dispute notices in seconds.
>
> Now, let us witness this live in action."

---

### [01:25 - 03:15] Scene 4: Live Operations Demonstration Showcase (The 3 Killer Moments)

**Phase 1: What to Say on Slide 4 Before Opening System (01:25):**
> *(Looking at Slide 4 on screen)*  
> "Now that you have seen our hybrid architecture, let us step inside the engine. On screen are the three critical operational moments we are about to demonstrate: rapid straight-through processing, intelligent defect triage with Gemini AI, and executive human governance. Let us switch directly to our live operations cockpit."

**Phase 2: Live System Demonstration Script (Verbatim Spoken Words):**
> *(Press `Ctrl + Tab` to switch to the Live Dashboard tab at `https://rimba1808-averis-sdoc.vercel.app/`)*  
>
> **Moment 1: Speed & Straight-Through Processing (STP)**  
> "Here is the **Averis SDOC Operations Cockpit**, live on Vercel. Look at our left sidebar: out of 520 incoming emails, **454 verified clean shipments** were automatically cleared through Straight-Through Processing in under 2.5 seconds—moving cargo immediately to SAP with zero human fatigue."
>
> *(Click 'Discrepancies' in Sidebar ➡️ Click 'Diff' button on email_004)*  
> **Moment 2: Defect Catch & Gemini AI Copilot**  
> "Now, let us inspect the exceptions. Exactly 46 discrepancies were caught. Opening `email_004`, our side-by-side modal exposes the critical defect in red: the carrier issued the draft BL to 'UAB NOVAKOPA' instead of our verified customer 'EAST BRIGHT FZ-LLC'. If approved, this cargo would face immediate customs detention at port."
>
> *(Click 'Ask Gemini AI Copilot' button inside the modal)*  
> "Instead of an officer drafting emails manually, watch this: clicking 'Ask Gemini AI Copilot' triggers Gemini 3.6 Flash. In three seconds, it grades this as High Severity customs risk, and autonomously drafts the official Carrier Discrepancy Notice with container and booking citations—ready to copy and dispatch in one click."
>
> *(Point to 'Escalate to Carrier' vs 'Approve Override' ➡️ Click 'Performance Metrics' in Sidebar)*  
> **Moment 3: Governance & Live Verification**  
> "Officers retain complete control: clicking 'Escalate to Carrier' locks the shipment on-hold until an amended BL arrives, while 'Approve Override' records an immutable audit log. Finally, opening 'Performance Metrics' verifies our live score against the jury's official ground truth."

---

### [03:15 - 03:45] Scene 5: Flawless Verification (100.0% Official Benchmark Score)

**Phase 3: Critical Return to Pitch Deck (At 03:15):**
> 1. Press **`Ctrl + Tab`** on your keyboard to switch back to the Pitch Deck tab.  
> 2. You land directly back on **Slide 4**.  
> 3. Press **`Right Arrow (→)`** or **`Spacebar`** once to advance smoothly to **Slide 5**!  
> 4. Begin speaking immediately:

**Speaker (Slide 5 Opening Sentence):**
> "And as you just witnessed live in our production cockpit, here is our consolidated evaluation scorecard: a mathematically verified 100.0% benchmark score across all 520 documents:
> - **100.0% (1.0000)** — Consolidated Official Benchmark Score.
> - **520 / 520 (100%)** — Email Classification Accuracy & Macro-F1.
> - **46 / 46 (100%)** — Stage 3 Discrepancy Defect Catch Rate.
> - **0 False Alarms (100% Precision)** — Clean cargo moves freely with zero holding delays.
> - **20 / 20 (100%)** — Reliability Triage handling corrupted scans, wrong document types, and missing attachments without silent failure."

---

### [03:45 - 04:15] Scene 6: Under The Hood — Engineering Challenges & Robustness
**Visual On Screen:** Slide 6 (Engineering Challenges & Robustness)  
**Speaker:**
> "How did we achieve 100% precision in chaotic, real-world shipping conditions? We engineered direct solutions for 3 critical technical challenges:
> 1. **Overcoming LLM Hallucinations:** Rather than trusting probabilistic LLMs with numeric scales, our **Deterministic Normalizer Tier 1** unifies weights (MT, LBS to KG) and port aliases (CNNTG to NANTONG) mathematically before comparison.
> 2. **Corrupted Scans & Non-BL Files:** Our fail-safe **Reliability Exception Triage** inspects document structures and scan density, catching all 20 planted edge cases with zero silent failures.
> 3. **API Rate Limits & Cost Escalation:** Local deterministic pre-filtering resolves 80%+ clean shipments in under 2.5 seconds, slashing **cloud API costs by 95%**."

---

### [04:15 - 04:35] Scene 7: Commercial ROI & Averis Production Roadmap
**Visual On Screen:** Slide 7 (Dual Panel: $142,000 Annual Savings + 3-Phase Global Roadmap)  
**Speaker:**
> "The commercial return for Averis Shared Services is immediate and substantial:
> - **$142,000 Projected Annual Savings:** Eradicating port demurrage fines and carrier BL amendment fees.
> - **80% Straight-Through Processing:** Verified shipments auto-cleared directly into SAP without human keying.
> - **90% Triage Reduction:** Slashing document review time from 15 minutes down to 30 seconds.
>
> Our enterprise roadmap is aligned with Averis & APRIL Group's global infrastructure:
> - **Phase 1 (Q3 2026):** Deep bi-directional integration with **SAP S/4HANA & SAP Transportation Management**.
> - **Phase 2 (Q4 2026):** Direct EDI webhook network with ocean carriers including **Maersk, CMA CGM, ONE, and MSC**.
> - **Phase 3 (2027):** Edge-optimized on-premises Small Language Models (SLMs) for strict customs data sovereignty."

---

### [04:35 - 04:45] Scene 8: Grand Finale — An Unstoppable Operational Shield
**Visual On Screen:** Slide 8 (Summary & Closing — Team Rimba 0818 Sign-Off)  
**Speaker:**
> "In summary: **Averis SDOC** is 100% compliant with all hackathon guidelines, verified live on Supabase and Google Gemini 3.6 Flash, and backed by a mathematically proven 100.0% benchmark score.
>
> **We did not just build a dashboard; we engineered an unstoppable operational shield for Averis.**
>
> Thank you to Averis and Monash University. We are **Team Rimba 0818**, ready to power the future of autonomous shipping operations!"
