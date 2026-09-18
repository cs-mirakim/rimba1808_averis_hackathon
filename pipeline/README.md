# Modul Pipeline: Ingestion & Document Parsers

> **Pemilik Modul:** Amir Azib (Moi)  
> **Branch Git:** `feature/parsers`

---

## 🎯 Objektif Modul
Membina fungsi untuk membaca email daripada dataset `inbox/` dan mengekstrak teks penuh daripada fail attachment pelbagai format (`.txt`, `.docx`, `.xlsx`, `.pdf`). Juga bertanggungjawab mengesan fail yang rosak atau hilang.

---

## 📋 Senarai Semak Tugasan (Step-by-Step)

### 1. `pipeline/reader.py` (Membaca Email JSON)
- Baca semua fail `email_*.json` daripada folder `docs/sdoc-hackathon-bundle/inbox/`.
- Semak attachment email:
  - Jika `len(attachments) == 0` atau `len(attachments) == 1`:
    - Tandakan status awal sebagai `NEEDS_REVIEW` dengan `review_reason: "missing_attachment"`.

### 2. `pipeline/parsers.py` (Mengekstrak Teks Mengikut Format)
- `parse_txt(file_path)`: Buka dan baca teks UTF-8 biasa.
- `parse_docx(file_path)`: Gunakan library `python-docx` untuk ekstrak semua text dalam perenggan dan jadual.
- `parse_xlsx(file_path)`: Gunakan library `openpyxl` untuk baca setiap row/cell jadual spreadsheet menjadi teks baris demi baris.
- `parse_pdf(file_path)`: Gunakan library `pypdf` untuk ekstrak teks muka surat.
- **Safety check (Unreadable / Corrupt):**
  - Jika saiz fail 0 bytes atau `pypdf` tak dapat baca / corrupt:
    - Tandakan status sebagai `NEEDS_REVIEW` dengan `review_reason: "unreadable"`.

### 3. `pipeline/extract_text.py` (Pintu Masuk Utama)
- Fungsi `get_document_text(attachment_path)`:
  - Auto-detect extension fail (`.txt`, `.docx`, `.xlsx`, `.pdf`).
  - Panggil parser yang berkaitan dan kembalikan teks bersih.

---

## ✅ Definisi Siap (Definition of Done)
1. Boleh jalankan satu script test yang berjaya baca 1 fail txt, 1 fail docx, 1 fail xlsx, dan 1 fail pdf.
2. Teks yang diekstrak boleh dicetak ke terminal dengan jelas.
3. Push ke branch `feature/parsers` dan maklumkan kepada Amir Hakim:  
   *"Moi: Semua parser dan semakan fail unreadable dah siap."*
