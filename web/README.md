# Modul Web: Next.js + Supabase Shipping Operations Dashboard

> **Pemilik Modul:** Amir Hakim (Tech Lead)

---

## 🎯 Objektif Modul
Membina antaramuka moden (Next.js + Tailwind) yang memaparkan inbox triaging, senarai status pengesahan (OK, MISMATCH, NEEDS_REVIEW), perbandingan bersebelahan (*side-by-side diff*), serta tindakan pembetulan oleh manusia (Human-in-the-loop).

---

## 📋 Senarai Semak Tugasan
1. **Next.js Setup:** Inisialisasi dalam folder `web/` menggunakan TailwindCSS.
2. **Supabase Client:** Sambungkan ke database Supabase Cloud untuk membaca rekod email dan hasil semakan.
3. **Inbox Triage View:**
   - Ringkasan kategori email (SPAM, INVOICE, SI_REQUEST, BL_COMPARISON).
   - Filter mengikut status: `ALL`, `MISMATCH` (Merah), `OK` (Hijau), `NEEDS_REVIEW` (Kuning).
4. **Side-by-Side Diff Inspector:**
   - Memaparkan dokumen SI di sebelah kiri dan dokumen draf BL di sebelah kanan.
   - Highlight medan yang dikesan bercanggah secara visual.
5. **Human Action Controls:**
   - Butang "Approve Override", "Reject & Notify Carrier", "Resolve Missing Value".
