# 📝 Google Forms Submission Draft — Team Rimba 0818
**Event:** Averis x Monash Hackathon 2026  
**Problem Statement:** Shipping Document Verification: From email inbox to discrepancy report  
**Prepared by:** Eqhlas (Product Strategy, Pitching & QA Lead)

---

## 📌 Section 1: Team & Project Information

- **Project Title:**  
  Averis SDOC — Autonomous Shipping Document Verification & Dispute Resolution Engine

- **Team Name:**  
  Team Rimba 0818

- **Team Members & Roles:**
  1. **Amir Hakim** — Tech Lead & Enterprise Architecture (Next.js, Supabase, Gemini Integration)
  2. **Amir Azib (Moi)** — Pipeline Engineer (Multi-Format Ingestion & Email Parsers)
  3. **Farhan (Paan)** — Core System Engineer (Deterministic Comparison Engine & Benchmark Score)
  4. **Eqhlas** — Product Strategy, Video Pitching & QA Lead

- **GitHub Repository URL:**  
  `https://github.com/cs-mirakim/rimba1808_averis_hackathon`

- **Live Prototype / Demo Link (Mandatory):**  
  `https://rimba1808-averis-sdoc.vercel.app/`

- **Video Demo / Pitch URL:**  
  `[PASTE YOUTUBE UNLISTED / GOOGLE DRIVE LINK HERE]`  
  *(Make sure Google Drive sharing permission is set to "Anyone with the link -> Viewer")*

---

## 📌 Section 2: Executive Summary (Elevator Pitch)

> **Ringkasan Projek (Executive Summary):**  
> Averis SDOC ialah enjin pengesahan dokumen perkapalan autonomi berprestasi tinggi yang direka khusus untuk operasi logistik global di Averis dan APRIL Group. Sistem ini menyelesaikan masalah lambakan emel harian dan keletihan manusia semasa menyemak 7 medan kanonikal antara *Customer Shipping Instruction (SI)* dan *Draft Bill of Lading (BL)*.  
> 
> Dengan seni bina hibrid 3-Tier, Averis SDOC memproses dan menormalkan 520 dokumen pelbagai format (Word, Excel, PDF, dan imbasan) dalam tempoh **kurang daripada 2.5 saat** dengan **0 False Alarm**, mencapai **Skor Rasmi Sempurna 100.0% (1.0000)** pada kit penilaian rasmi penganjur. Selain itu, integrasi Google Gemini 3.6 Flash Copilot membolehkan sistem menilai tahap risiko kargo dan menjana draf emel pertikaian rasmi kepada syarikat perkapalan (*carrier*) dalam beberapa saat, menyediakan aliran kerja *Human-in-the-Loop* yang bersedia untuk persekitaran produksi sebenar.

---

## 📌 Section 3: Technical Architecture & Innovation

- **Tech Stack & Key Components:**
  - **Tier 1 — High-Throughput Ingestion & Deterministic Core (Python):**
    - Pengelas emel 5-hala (*BL Comparison, SI Request, Spam, Invoice Query, General*) dengan 100% Macro-F1.
    - Pengurai pelbagai format (`.docx`, `.xlsx`, `.pdf`, OCR) dengan normalisasi kanonikal untuk 7 medan wajib (*shipper, consignee, notify_party, port_of_loading, port_of_discharge, container_count, gross_weight_kg*).
    - Menapis placeholder data seperti `TBA`, `TBD`, dan tanda `_____`.
  - **Tier 2 — Enterprise Cloud Infrastructure (Supabase + Next.js 14):**
    - Pangkalan data awan Supabase PostgreSQL yang dilindungi oleh *Row-Level Security (RLS)* dan jejak audit (*audit trail*) penuh.
    - Papan pemuka operasi moden (Next.js 14 + TailwindCSS) dilengkapi dengan *Side-by-Side Canonical Diff Inspector*.
  - **Tier 3 — Generative AI Dispute Resolution (Google Gemini 3.6 Flash):**
    - Menilai tahap keparahan percanggahan (*Low, Medium, High risk of customs detention*).
    - Menjana draf notis pertikaian rasmi (*Carrier Discrepancy Notice*) secara automatik dengan butang salin satu-klik.
    - Gerbang keputusan manusia (*Human-in-the-Loop*): Pilihan *"Approve Override"* (pelepasan komersial) atau *"Escalate to Carrier"*.

- **Inovasi Pengendalian Kes Tepi (Planted Reliability Edge Cases):**
  Averis SDOC berjaya mengesan kesemua **20 daripada 20 (100.0%)** kes tepi yang direka oleh juri:
  1. `wrong_doc_type` (5 kes): Mengesan lampiran jenis lain (cth: Commercial Invoice) dan menandakan `NEEDS_REVIEW` bagi mengelakkan salah perbandingan.
  2. `missing_attachment` (5 kes): Mengesan emel tanpa lampiran sebelum proses bermula.
  3. `unreadable` (5 kes): Mengesan imbasan kabur/rosak menggunakan ambang ketumpatan teks OCR tanpa melakukan halusinasi LLM.
  4. `missing_value` (5 kes): Menyekat kelulusan dokumen yang masih mengandungi nilai belum muktamad.

---

## 📌 Section 4: Benchmark & Evaluation Results

- **Consolidated Official Benchmark Score:** `100.0% (1.0000)`
- **Stage 1 (Email Classification Accuracy & Macro-F1):** `100.00% (520 / 520 emails)`
- **Stage 3 (Defect Catch Rate / Recall):** `100.00% (46 / 46 defects caught)`
- **Stage 3 (False Alarm Precision):** `100.00% (0 False Alarms — clean cargo is never delayed)`
- **Reliability Triage (Corrupt / Non-Standard Cases):** `100.00% (20 / 20 escalations)`
- **Average Batch Ingestion Speed:** `< 2.5 saat untuk 520 dokumen`

---

## 📌 Section 5: Business Value & Operational ROI

1. **80% Straight-Through Processing (STP):**  
   Dokumen yang sepadan disahkan dan disalurkan secara automatik ke dalam sistem ERP (SAP S/4HANA) tanpa sebarang sentuhan manual manusia.
2. **90% Pengurangan Masa Triage:**  
   Pegawai operasi Averis hanya perlu menumpukan perhatian kepada 46 kes percanggahan sebenar, memendekkan masa semakan daripada 15 minit kepada bawah 30 saat bagi setiap fail.
3. **95% Penjimatan Kos API LLM:**  
   Enjin deterministik memproses ribuan dokumen secara percuma di peringkat tempatan (*local edge*), dan hanya memanggil model Gemini 3.6 Flash untuk analisis percanggahan sebenar.
4. **Sifar Kelewatan Kapal (*Zero Vessel Cutoff Delays*):**  
   Draf pertikaian dihantar serta-merta kepada syarikat perkapalan sebelum kapal berlepas, mengelakkan penahanan kastam dan denda demurrage ribuan ringgit di pelabuhan.

---

## 📌 Section 6: Challenges Faced & Engineering Solutions (Mandatory Rubric)

1. **Cabaran 1: LLM Hallucinations & Inconsistent Numeric Formats**
   - *Masalah:* Format unit berat berbeza (MT vs KG vs LBS) dan singkatan pelabuhan tidak standard (cth: CNNTG vs NANTONG) menyebabkan LLM tersalah baca nombor dan halusinasi.
   - *Penyelesaian Rimba 0818:* Membina *Deterministic Normalizer Tier 1* yang menyelaraskan unit berat dan kod pelabuhan UN/LOCODE secara matematik sebelum sebarang perbandingan dilakukan.

2. **Cabaran 2: Corrupted Scans & Non-BL Attachments (20 Edge Cases)**
   - *Masalah:* Emel sebenar mengandungi lampiran selain BL (invois komersial, senarai pembungkusan), fail 0-bait, dan imbasan kabur yang boleh menyebabkan sistem gagal secara senyap (*silent failure*).
   - *Penyelesaian Rimba 0818:* Membina *Reliability Exception Triage* yang mengesan tajuk struktur dokumen dan ketumpatan teks imbasan untuk menaikkan status `NEEDS_REVIEW` dengan 100% ketepatan (20/20 kes berjaya dikesan).

3. **Cabaran 3: API Rate Limits & Cost Escalation**
   - *Masalah:* Menghantar kesemua 520 fail ke API LLM awan menyebabkan kelewatan lebih 15 minit dan melanggar had kadar panggilan (*rate limits*).
   - *Penyelesaian Rimba 0818:* Seni bina *Smart Multi-Tier Caching + Local Rule Engine* memproses lebih 80% fail di peringkat tempatan dalam < 2.5 saat secara percuma, menjimatkan 95% panggilan API ke Google Gemini.

---

## 📌 Section 7: Future Commercial Roadmap & Enterprise Scalability (Mandatory Rubric)

1. **Phase 1 (Q3 2026) — SAP S/4HANA ERP Deep Integration:**
   - Penyambung dua hala (*Bi-directional API*) berasaskan RFC dan OData untuk menarik SI pelanggan secara langsung dari modul pengangkutan SAP (*SAP TM*) dan meluluskan pelepasan kargo (*Goods Release*) secara automatik tanpa campur tangan manusia.

2. **Phase 2 (Q4 2026) — Autonomous Multi-Carrier EDI Network:**
   - Integrasi terus melalui webhook dengan portal syarikat perkapalan global (*Maersk, CMA CGM, ONE, MSC*) untuk memuat turun draf BL v2 yang telah dipinda dan mengesahkan penyelesaian pertikaian secara kitaran tertutup (*closed-loop*).
   - Menyokong piawaian pertukaran data elektronik perkapalan antarabangsa (EDIFACT 310 / D99B).

3. **Phase 3 (2027) — Edge-Optimized Local SLM:**
   - Menggunakan model bahasa kecil (*Small Language Model*) yang ditala khas (*domain fine-tuned*) dan dijalankan dalam rangkaian kontena tertutup (*Air-gapped*) di premis Averis bagi mematuhi undang-undang kedaulatan data kastam antarabangsa yang ketat.
