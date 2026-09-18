# Modul AI: Gemini Structured Extraction

> **Pemilik Modul:** Amir Hakim (Tech Lead)

---

## 🎯 Objektif Modul
Mengintegrasikan model Google Gemini AI (menggunakan Gemini 1.5 Flash / 2.0 Flash) untuk mengekstrak 7 canonical fields daripada teks dokumen yang dihantar oleh modul `pipeline/`.

---

## 📋 Senarai Semak Tugasan
1. **Pydantic Schema (Structured Output):**
   Definisikan skema JSON 7 fields:
   - `shipper` (str)
   - `consignee` (str)
   - `notify_party` (str)
   - `port_of_loading` (str)
   - `port_of_discharge` (str)
   - `container_count` (int)
   - `gross_weight_kg` (float)
   - `doc_type` (str: enum ["SHIPPING_INSTRUCTION", "BILL_OF_LADING", "OTHER"])
2. **Email Classification (Stage 1):**
   Tapis 5 kategori: `BL_COMPARISON`, `SI_REQUEST`, `INVOICE_QUERY`, `GENERAL`, `SPAM`.
   Gunakan rule-based regex untuk subjek jelas, selebihnya gunakan Gemini.
3. **Penyambung Pipeline & Supabase:**
   Hantar data yang diekstrak ke comparator Paan dan simpan hasil penuh ke Supabase.
