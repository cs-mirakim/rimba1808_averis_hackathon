# Modul Core: Deterministic Comparator & Benchmark

> **Pemilik Modul:** Farhan (Paan)  
> **Branch Git:** `feature/core`

---

## 🎯 Objektif Modul
Bina enjin perbandingan data (Deterministic Comparator) yang membandingkan 7 canonical fields antara Shipping Instruction (SI - Kiblat rujukan) dan Bill of Lading (BL - Draf), serta bina skrip benchmark skor lokal.

---

## 📋 Senarai Semak Tugasan

### 1. `core/normalizer.py` (Pembersih Data)
- Bersihkan Teks: `strip()`, lowercase untuk entiti nama syarikat dan pelabuhan.
- Bersihkan Berat Kasar (`gross_weight_kg`):
  - Buang perkataan "KGS", "KG", "MT", tanda koma `,`.
  - Tukar nilai string kepada `float`.
- Bersihkan Kontena (`container_count`):
  - Ekstrak nombor integer sahaja (contoh: "3 x 40' HC" -> 3).

### 2. `core/comparator.py` (Enjin Pembanding 7 Field)
Menerima dua dictionary: `si_data` dan `bl_data`:
- `container_count`: Pastikan nombor integer sama sebijik.
- `gross_weight_kg`: Pastikan perbezaan nilai `< 1.0` kg.
- 5 Field Teks:
  - `shipper`, `consignee`, `notify_party`, `port_of_loading`, `port_of_discharge`.
  - Gunakan perbandingan teks atau fuzzy matching (threshold 90% dengan `rapidfuzz`).
- **Semakan Nilai Hilang (Missing Value):**
  - Jika dalam SI ada field bernilai `???`, `_______`, atau `TBA`:
    - Status: `NEEDS_REVIEW`, `review_reason: "missing_value"`.
- **Hasil Pulangan (Output Format):**
  - Jika sepadan: `status: "OK"`, `has_defect: false`, `defect_fields: []`
  - Jika ada beza: `status: "MISMATCH"`, `has_defect: true`, `defect_fields: ["consignee", ...]`

### 3. `core/run_benchmark.py` (Semakan Skor Sendiri)
- Memanggil skrip rasmi penilai penganjur tanpa Docker:
  ```bash
  python docs/sdoc-hackathon-docker/server/score_cli.py submission.json --ground-truth docs/sdoc-hackathon-docker/data_v2/ground_truth.json --json
  ```
- Memaparkan markah Macro-F1 dan Defect Catch Rate di terminal.

---

## ✅ Definisi Siap (Definition of Done)
1. Unit test ke atas contoh data perbandingan lulus dengan tepat.
2. Skrip benchmark berjalan lancar dan memaparkan statistik markah.
3. Push ke branch `feature/core` dan maklumkan kepada Amir Hakim:  
   *"Paan: Modul comparator dan benchmark script dah siap diuji."*
