# 🚢 Team Rimba — Averis x Monash Hackathon 2026

**Problem Statement:** *Shipping Document Verification: From email inbox to discrepancy report*  
**🌐 Live Production Prototype:** [https://rimba1808-averis-sdoc.vercel.app/](https://rimba1808-averis-sdoc.vercel.app/)  
**🏆 Official Benchmark Score:** `100.0% (1.0000)` — Consistently verified across all 520 documents

Projek ini membina sistem pengesahan dokumen perkapalan automatik yang pintar, menggabungkan kepantasan **Google Gemini AI** (untuk ekstraksi data & penafsiran dokumen) dan ketepatan **Deterministic Python** (untuk perbandingan tanpa ralat), disokong oleh papan pemuka moden **Next.js & Supabase**.

---

## 👥 Pasukan & Pembahagian Modul

| Ahli | Peranan | Modul / Folder | Git Branch |
|---|---|---|---|
| **Amir Hakim** | Tech Lead & Architecture | `ai/`, `web/`, Merge & Infra | `main` |
| **Amir Azib (Moi)** | Ingestion & Document Parsers | `pipeline/` | `feature/parsers` |
| **Farhan (Paan)** | Core Comparator & Benchmark | `core/` | `feature/core` |
| **Eqhlas** | Pitching, Slides & QA Lead | `pitch/`, `docs/` | `feature/pitch` |

---

## 🚀 Panduan Setup Pantas (Untuk Semua Ahli)

### 1. Prasyarat
- Pasang **Python 3.10+** (Pastikan tick *"Add python.exe to PATH"* semasa pemasangan di Windows).
- Pasang **Git**.

### 2. Setup Virtual Environment
Buka terminal / PowerShell dalam folder projek ini:
```bash
python -m venv venv
.\venv\Scripts\activate
pip install -r requirements.txt
```

### 3. Setup Branch Peribadi
Tukar ke branch tugasan anda sebelum mula menulis kod:
```bash
# Untuk Moi:
git checkout -b feature/parsers

# Untuk Paan:
git checkout -b feature/core

# Untuk Eqhlas:
git checkout -b feature/pitch
```

---

## 📁 Struktur Direktori Projek

```
rimba1808_averis_hackathon/
├── .agents/             # Antigravity agent skills (UI & quality standards)
├── docs/                # Dokumen penganjur, dataset bundle & docker evaluation kit
├── pipeline/            # [Moi] Email reader & parser fail (.txt, .docx, .xlsx, .pdf)
├── core/                # [Paan] Normalizer, 7-field comparator & score benchmark
├── ai/                  # [Amir Hakim] Gemini extraction & schema
├── web/                 # [Amir Hakim] Next.js + Supabase dashboard
├── pitch/               # [Eqhlas] 5-minute video pitch script & slide deck
├── requirements.txt     # Python dependencies
├── .env.example         # Template environment variables
└── README.md            # Dokumentasi utama ini
```

---

## 🖥️ Cara Menjalankan Web Dashboard (1-Click)

Untuk membuka Dashboard Operasi **Averis SDOC**:
1. Cuma **double-click** fail **`start_system.bat`** di root folder.
2. Terminal akan memulakan server Next.js dan pelayar web (browser) akan dibuka secara automatik ke **`http://localhost:3000`**.
3. Sebarang perubahan kod akan *auto-reload* secara langsung.

---

## 📊 Cara Semak Markah Benchmark Tempatan

Bagi menyemak markah penanda aras rasmi (100.0% score):
```bash
python core/run_benchmark.py
```

---

## 🎯 7 Canonical Fields Wajib Disemak
1. `shipper` (Nama pengirim)
2. `consignee` (Nama penerima)
3. `notify_party` (Pihak dimaklumkan)
4. `port_of_loading` (Pelabuhan muat)
5. `port_of_discharge` (Pelabuhan bongkar)
6. `container_count` (Bilangan kontena - integer)
7. `gross_weight_kg` (Berat kasar - float)

---

## ⚠️ Peraturan Git
- **DILARANG PUSH TERUS KE `main`.**
- Buat commit pada branch masing-masing dan push ke GitHub:
  ```bash
  git add .
  git commit -m "feat: huraian kerja yang disiapkan"
  git push origin <nama-branch-anda>
  ```
- Maklumkan kepada Amir Hakim (Tech Lead) untuk review dan merge ke `main`.
