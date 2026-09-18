"""
Unit Test Suite untuk Modul Core (Team Rimba)
Menguji normalizer, perbandingan deterministik 7-field, dan pengendalian ralat.
"""

import unittest
from core.normalizer import (
    normalize_text,
    normalize_gross_weight,
    normalize_container_count,
    is_missing_value,
)
from core.comparator import compare_documents


class TestCoreModule(unittest.TestCase):

    def test_normalizer_text(self):
        """Ujian pembersihan teks: trim, lowercase, whitespace padding."""
        self.assertEqual(normalize_text("  ACME SHIPPING PTE LTD  "), "acme shipping pte ltd")
        self.assertEqual(normalize_text("Port   Klang\nTerminal"), "port klang terminal")
        self.assertEqual(normalize_text(None), "")

    def test_normalizer_gross_weight(self):
        """Ujian pembersihan berat: buang KGS, MT, koma ribuan, tukar ke float."""
        self.assertEqual(normalize_gross_weight("25,450.50 KGS"), 25450.50)
        self.assertEqual(normalize_gross_weight("10000 KG"), 10000.0)
        self.assertEqual(normalize_gross_weight("18.5 MT"), 18.5)
        self.assertEqual(normalize_gross_weight(1234.5), 1234.5)
        self.assertIsNone(normalize_gross_weight("???"))

    def test_normalizer_container_count(self):
        """Ujian pembersihan kontena: ekstrak integer sahaja."""
        self.assertEqual(normalize_container_count("3 x 40' HC"), 3)
        self.assertEqual(normalize_container_count("3x40HQ"), 3)
        self.assertEqual(normalize_container_count("12 CONTAINERS"), 12)
        self.assertEqual(normalize_container_count(5), 5)
        self.assertIsNone(normalize_container_count("TBA"))

    # ==========================================
    # 5 CONTOH UJIAN PERBANDINGAN DOKUMEN (DEFINITION OF DONE)
    # ==========================================

    def test_case_1_perfect_match(self):
        """Contoh 1: Semua 7 field sepadan -> Status: OK."""
        si = {
            "shipper": "Mega Logistics Sdn Bhd, Level 5 Menara PJ, Malaysia",
            "consignee": "Global Trade Corp, 123 Ocean Blvd, Rotterdam, Netherlands",
            "notify_party": "Global Trade Corp, 123 Ocean Blvd, Rotterdam, Netherlands",
            "port_of_loading": "Port Klang, Malaysia",
            "port_of_discharge": "Rotterdam, Netherlands",
            "container_count": "2 x 40' HC",
            "gross_weight_kg": "28,500.00 KGS",
        }
        bl = {
            "shipper": "mega logistics sdn bhd, level 5 menara pj, malaysia",
            "consignee": "Global Trade Corp, 123 Ocean Blvd, Rotterdam, Netherlands",
            "notify_party": "Global Trade Corp, 123 Ocean Blvd, Rotterdam, Netherlands",
            "port_of_loading": "PORT KLANG, MALAYSIA",
            "port_of_discharge": "Rotterdam, Netherlands",
            "container_count": 2,
            "gross_weight_kg": 28500.20,  # beza 0.2 kg (< 1.0 kg toleransi)
        }

        result = compare_documents(si, bl)
        self.assertEqual(result["status"], "OK")
        self.assertFalse(result["has_defect"])
        self.assertEqual(result["defect_fields"], [])
        self.assertIsNone(result["review_reason"])

    def test_case_2_text_mismatch(self):
        """Contoh 2: Mismatch pada consignee dan notify_party -> Status: MISMATCH."""
        si = {
            "shipper": "Apex Chemical Export Ltd, Singapore",
            "consignee": "Alpha Pharma AG, Zurich, Switzerland",
            "notify_party": "Alpha Logistics Hub, Basel, Switzerland",
            "port_of_loading": "Singapore Port",
            "port_of_discharge": "Hamburg, Germany",
            "container_count": "1 x 20GP",
            "gross_weight_kg": "14,200 KG",
        }
        bl = {
            "shipper": "Apex Chemical Export Ltd, Singapore",
            "consignee": "Beta Trading GmbH, Frankfurt, Germany",  # SALAH CONSIgNEE
            "notify_party": "Zeta Cargo Services, Hamburg, Germany",  # SALAH NOTIFY_PARTY
            "port_of_loading": "Singapore Port",
            "port_of_discharge": "Hamburg, Germany",
            "container_count": "1",
            "gross_weight_kg": "14,200.00 KGS",
        }

        result = compare_documents(si, bl)
        self.assertEqual(result["status"], "MISMATCH")
        self.assertTrue(result["has_defect"])
        self.assertIn("consignee", result["defect_fields"])
        self.assertIn("notify_party", result["defect_fields"])
        self.assertNotIn("shipper", result["defect_fields"])

    def test_case_3_container_count_mismatch(self):
        """Contoh 3: Mismatch pada container_count -> Status: MISMATCH."""
        si = {
            "shipper": "Sunrise Agro Supplies, Jakarta, Indonesia",
            "consignee": "Sun Import BV, Amsterdam, Netherlands",
            "notify_party": "Same as Consignee",
            "port_of_loading": "Tanjung Priok, Jakarta",
            "port_of_discharge": "Rotterdam",
            "container_count": "4 x 40' High Cube",
            "gross_weight_kg": "52,000.00 KGS",
        }
        bl = {
            "shipper": "Sunrise Agro Supplies, Jakarta, Indonesia",
            "consignee": "Sun Import BV, Amsterdam, Netherlands",
            "notify_party": "Same as Consignee",
            "port_of_loading": "Tanjung Priok, Jakarta",
            "port_of_discharge": "Rotterdam",
            "container_count": "3 x 40' High Cube",  # 3 vs 4
            "gross_weight_kg": "52,000.00 KGS",
        }

        result = compare_documents(si, bl)
        self.assertEqual(result["status"], "MISMATCH")
        self.assertTrue(result["has_defect"])
        self.assertEqual(result["defect_fields"], ["container_count"])

    def test_case_4_gross_weight_mismatch(self):
        """Contoh 4: Mismatch berat kasar melebihi toleransi 1.0 kg -> Status: MISMATCH."""
        si = {
            "shipper": "Pacific Timber Co, Kuching, Sarawak",
            "consignee": "Nordic Wood Imports, Oslo, Norway",
            "notify_party": "Nordic Wood Imports, Oslo, Norway",
            "port_of_loading": "Kuching Port",
            "port_of_discharge": "Oslo",
            "container_count": 1,
            "gross_weight_kg": "19,500.00 KGS",
        }
        bl = {
            "shipper": "Pacific Timber Co, Kuching, Sarawak",
            "consignee": "Nordic Wood Imports, Oslo, Norway",
            "notify_party": "Nordic Wood Imports, Oslo, Norway",
            "port_of_loading": "Kuching Port",
            "port_of_discharge": "Oslo",
            "container_count": 1,
            "gross_weight_kg": "19,550.00 KGS",  # Beza 50 kg (> 1.0 kg)
        }

        result = compare_documents(si, bl)
        self.assertEqual(result["status"], "MISMATCH")
        self.assertTrue(result["has_defect"])
        self.assertEqual(result["defect_fields"], ["gross_weight_kg"])

    def test_case_5_missing_value_in_si(self):
        """Contoh 5: Nilai '???', '_______', atau 'TBA' dalam SI -> Status: NEEDS_REVIEW."""
        si = {
            "shipper": "Evergreen Forest Products, Bintulu",
            "consignee": "???",  # Nilai hilang / placeholder
            "notify_party": "TBA",
            "port_of_loading": "Bintulu Port",
            "port_of_discharge": "Tokyo, Japan",
            "container_count": 2,
            "gross_weight_kg": "30,000 KGS",
        }
        bl = {
            "shipper": "Evergreen Forest Products, Bintulu",
            "consignee": "Tokyo Trading Co, Tokyo, Japan",
            "notify_party": "Tokyo Trading Co, Tokyo, Japan",
            "port_of_loading": "Bintulu Port",
            "port_of_discharge": "Tokyo, Japan",
            "container_count": 2,
            "gross_weight_kg": "30,000 KGS",
        }

        result = compare_documents(si, bl)
        self.assertEqual(result["status"], "NEEDS_REVIEW")
        self.assertEqual(result["review_reason"], "missing_value")
        self.assertFalse(result["has_defect"])
        self.assertEqual(result["defect_fields"], [])


if __name__ == "__main__":
    unittest.main(verbosity=2)
