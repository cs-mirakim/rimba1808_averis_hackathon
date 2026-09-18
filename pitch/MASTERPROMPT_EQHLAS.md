# 🚀 MASTERPROMPT: Interactive Enterprise Pitch Deck Web Application
**Project:** Averis SDOC — Autonomous Shipping Document Verification & Dispute Resolution Engine  
**Team:** Rimba 0818 (Amir Hakim, Amir Azib [Moi], Farhan [Paan], Eqhlas)  
**Target:** Averis x Monash Hackathon 2026 Finals Pitch  

---

## 🎯 Objective
Bina sebuah **Aplikasi Web Interaktif untuk Pitch Deck (Slide Deck Web Application)** di dalam folder `pitch/` yang menggantikan PowerPoint/Canva tradisional. Aplikasi ini mestilah sangat responsif, mempunyai estetika korporat bertaraf antarabangsa (*enterprise grade*), lancar dikawal menggunakan papan kekunci (*keyboard shortcuts*), dan dilengkapi dengan mod penyampai (*Presenter Mode / Speaker Notes*) serta pemasa (*pitch timer*).

---

## 🎨 Design System & Visual Guidelines (Taste & Anti-AI Slop Rules)
1. **Tema Visual:**
   - **Palet Warna Korporat Averis / APRIL:** Dark Forest Slate (`#0B1914` / `#0F291E`), Deep Emerald (`#059669`), Mint Accent (`#34D399`), Crisp White (`#F8FAFC`), dan Alert Amber/Rose untuk perbezaan data.
   - **Tipografi:** Moden dan bersih (cth: `Plus Jakarta Sans`, `Inter`, atau `Outfit` untuk tajuk, `JetBrains Mono` untuk nombor statistik/metrik).
   - **Gaya:** *Glassmorphism* lembut, sempadan halus (*subtle borders*), kad dengan bayang kemas (*crisp shadows*), tiada animasi berlebihan yang mengganggu perhatian juri.
2. **Anti-AI Slop:**
   - Jangan gunakan kecerunan ungu/magenta generik.
   - Elakkan teks panjang berjela — utamakan kad data, visual seni bina (*architecture cards*), dan nombor metrik 100% yang berimpak tinggi.

---

## ⌨️ Ciri-ciri Interaktif Wajib (Key Features)
1. **Navigasi Papan Kekunci:**
   - `Arrow Right` / `Space` / `Page Down`: Slide seterusnya
   - `Arrow Left` / `Backspace` / `Page Up`: Slide sebelumnya
   - `Home` / `End`: Lompat ke slide pertama / terakhir
   - `F`: Toggle *Fullscreen*
   - `N` / `P`: Buka/Tutup *Presenter Notes & Pitch Script Drawer*
   - `T`: Mula / Reset *5-Minute Pitch Timer*
2. **Presenter Mode / Speaker Notes:**
   - Skrip penyampaian setiap slide yang diselaraskan dengan [pitch/PITCH_SCRIPT.md](file:///c:/Users/amirh/Downloads/antigravity%20ai/averis_hackathon/pitch/PITCH_SCRIPT.md) sedia dipaparkan di bahagian bawah atau laci sisi.
3. **Live 5-Minute Timer:**
   - Pemasa undur 5:00 minit di sudut atas untuk kawal masa pitching. Bertukar kuning pada baki 1:30 dan merah pada baki 0:30.
4. **Slide Indicator & Progress Bar:**
   - Garisan kemajuan (*progress bar*) di bahagian atas dan penunjuk slide aktif (cth: `03 / 06 — Architecture`).
5. **Quick Demo Launcher:**
   - Butang pintas *"Launch Live Dashboard"* untuk membuka [http://localhost:3000](http://localhost:3000) semasa sesi demo.

---

## 📑 Struktur & Kandungan 6 Slide (Content Blueprint)

### 🔹 Slide 1: Title & Team Introduction
- **Tajuk Utama:** AVERIS SDOC
- **Sub-tajuk:** Autonomous Shipping Document Verification & Dispute Resolution Engine
- **Acara:** Averis x Monash Hackathon 2026
- **Pasukan Rimba 0818:**
  - **Amir Hakim** — Tech Lead & Enterprise Architecture
  - **Amir Azib (Moi)** — Document Ingestion & Multi-Format Parsers
  - **Farhan (Paan)** — Core Comparison Engine & Benchmark Lead
  - **Eqhlas** — Product Strategy, Pitching & Quality Assurance
- **Highlight Badge:** *100.0% Official Benchmark Score • Enterprise Hybrid Intelligence*

---

### 🔹 Slide 2: The Enterprise Problem (High-Stakes Logistics)
- **Headline:** The High Cost of Manual Document Verification in Shared Services
- **3 Masalah Kritikal:**
  1. **Email Triage Overload:** Beratus-ratus emel bercampur aduk (pertanyaan, sebut harga, perkapalan) melambatkan arahan perkapalan (*Shipping Instructions - SI*).
  2. **Human Fatigue on 7 Canonical Fields:** Menyemak 7 medan penting merentas Word, Excel, PDF dan imbasan imej mudah terlepas pandang.
  3. **Demurrage & Financial Losses:** Ralat pada nama *Consignee*, berat kargo (*Gross Weight*), atau kuantiti kontena menyebabkan penahanan kastam di pelabuhan dan caj demurrage ribuan ringgit.

---

### 🔹 Slide 3: Hybrid Architecture (Speed + Cloud AI)
- **Headline:** Deterministic Rule Engine + Google Gemini 3.6 Flash Copilot
- **3-Tier Interactive Diagram:**
  - **Tier 1: High-Speed Ingestion (< 2.5s for 520 Docs)**
    - 5-Way Email Triage Classification (100% Macro-F1)
    - Multi-format parsers (DOCX, XLSX, PDF, OCR) + Canonical Field Normalizers
  - **Tier 2: Enterprise Cloud Infrastructure**
    - Supabase PostgreSQL with Row-Level Security (RLS) + Real-time Audit Trail
    - Next.js 14 Responsive Operations Dashboard
  - **Tier 3: Google Gemini 3.6 Flash AI Copilot**
    - Discrepancy Risk Severity Assessment + Autonomous Carrier Notice Dispatch Drafts
    - Human-in-the-Loop Decision Gates (*Approve Override vs Escalate to Carrier*)

---

### 🔹 Slide 4: Official Benchmark & Verification (100% Ground Truth)
- **Headline:** Flawless Precision Verified Against Official Jury Test Suite
- **Interactive Metric Scorecards:**
  - **100.0% (1.0000)** — Consolidated Official Evaluation Kit Score
  - **520 / 520 (100%)** — Email Classification Accuracy & Macro-F1
  - **46 / 46 (100%)** — Stage 3 Discrepancy Defect Catch Rate
  - **0 False Alarms (100% Precision)** — Tiada kargo bersih yang tertahan sia-sia
  - **20 / 20 (100%)** — Reliability Triage on Edge Cases (*Wrong Doc Type, Unreadable Scans, Missing Attachments*)

---

### 🔹 Slide 5: Business Impact & Shared Services ROI
- **Headline:** Transformative ROI for Averis Global Logistics
- **4 Key Impact Pillars:**
  - **80% Straight-Through Processing (STP):** Dokumen padan disahkan secara automatik tanpa sentuhan manusia.
  - **90% Reduction in Triage Time:** Pegawai operasi hanya fokus kepada pengecualian berisiko tinggi.
  - **95% LLM API Cost Savings:** Penapis deterministik memproses dokumen lazim secara percuma, hanya panggil Gemini untuk analisis percanggahan.
  - **Zero Vessel Cutoff Delays:** Notis pembetulan dijana serta-merta sebelum kapal berlepas.

---

### 🔹 Slide 6: Summary & Vision
- **Headline:** Averis SDOC — Resilient, Scalable, Production-Ready
- **Takeaways:**
  - Patuh 100% syarat hackathon (Cloud Database Supabase + Cloud LLM Google Gemini).
  - Terbukti melepasi semua kes ujian dengan skor sempurna.
  - Sedia untuk integrasi terus ke ERP dan sistem logistik Averis.
- **Penutup:** *"Thank you Averis & Monash University. We are Team Rimba 0818."*

---

## 🛡️ CRITICAL BOUNDARY & ISOLATION RULES (PERATURAN KESELAMATAN WAJIB)
> [!IMPORTANT]
> **ZON ISOLASI KOD:**
> 1. **HANYA TULIS DALAM FOLDER `pitch/`:** Semua fail kod, HTML, CSS, JavaScript, komponen, atau konfigurasi projek Web Pitch Deck **MESTILAH DIBINA DAN DISIMPAN 100% DI DALAM FOLDER `pitch/` SAHAJA** (contohnya: `pitch/index.html` atau di dalam subfolder `pitch/`).
> 2. **JANGAN SENTUH FOLDER LAIN:** DILARANG SAMA SEKALI mengubah, menimpa, atau mencipta fail di dalam folder `web/`, `core/`, `pipeline/`, `ai/`, atau fail utama seperti `run_pipeline.py` dan `start_system.bat`.
> 3. **PELANCAR ASING:** Sistem slaid ini mestilah dilancarkan secara berasingan menggunakan `run_pitch_deck.bat` di root (yang akan membaca dari folder `pitch/`) tanpa mengganggu sistem utama.

---

## 🛠️ Arahan Pelaksanaan Teknikal
1. Bina web slide di dalam folder `pitch/` (disyorkan fail `pitch/index.html` yang *self-contained* atau Vite/React app di dalam `pitch/`).
2. Pastikan web slides menyokong pintasan papan kekunci (Arrow Keys, `F` Fullscreen, `N`/`P` Speaker Notes, `T` Timer).
3. Uji pelancaran menggunakan `run_pitch_deck.bat`.
