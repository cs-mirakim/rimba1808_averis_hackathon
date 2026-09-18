# Modul Pitch, Slides & Rubric Alignment

> **Pemilik Modul:** Eqhlas  
> **Branch Git:** `feature/pitch`

---

## 🎯 Objektif Modul
Memastikan bahagian Product & Impact (30% markah), Slide Deck, dan Video Pitching 5 Minit mematuhi 100% rubrik penganjur bagi menjamin tempat dalam **Top 10 Finalist**.

---

## 📋 Senarai Semak Tugasan

### 1. `pitch/PITCH_SCRIPT.md` (Skrip Video 5 Minit)
- Had masa: **Maksimum 5 minit** (Sasaran selamat: 4 minit 30 saat).
- Struktur Skrip:
  1. `00:00 - 00:45` : Pengenalan Team & Masalah Nyata di Averis/APRIL (Manual checking = denda kastam, silap kargo).
  2. `00:45 - 01:45` : Solusi Rimba (Hybrid AI Extraction + Deterministic Verification).
  3. `01:45 - 03:15` : Live Demo Walkthrough (Tunjuk Dashboard Next.js, Mismatch side-by-side, Human-in-the-loop).
  4. `03:15 - 04:00` : Business Value & ROI (Masa proses jimat 90%, zero human error).
  5. `04:00 - 04:30` : System Architecture, Cloud & Scalability (Next.js, Supabase, Vercel, Gemini).

### 2. `pitch/SLIDES_OUTLINE.md` (Slide Presentation)
Sediakan struktur slide mengikut kriteria penilaian:
- Slide 1: Cover & Team Rimba
- Slide 2: Problem Statement & Friction in Shipping Operations
- Slide 3: Proposed Architecture (Cloud, AI, Deterministic Engine)
- Slide 4: Key Innovation: Handling Unreadable, Wrong Doc & Real Discrepancies
- Slide 5: Business Impact & Scalability Roadmap

### 3. `pitch/EDGE_CASES_EXPLAINED.md` (Dokumentasi Human-In-The-Loop)
Huraikan kenapa sistem kita mempunyai status `NEEDS_REVIEW` untuk 4 keadaan:
- `wrong_doc_type`: Attachment bukan BL (cth: Commercial Invoice).
- `missing_attachment`: Tiada fail untuk dibandingkan.
- `unreadable`: Dokumen kosong atau scan yang tidak boleh dibaca.
- `missing_value`: Medan penting mengandungi tanda soal `???` atau `TBA`.

---

## ✅ Definisi Siap (Definition of Done)
1. Skrip video 5 minit siap dengan tanda masa (*timestamps*).
2. Rangka slide siap untuk dimasukkan ke Google Slides / Canva.
3. Push ke branch `feature/pitch` dan maklumkan kepada Amir Hakim:  
   *"Eqhlas: Skrip video 5 minit dan rangka slide mengikut rubrik dah siap."*
