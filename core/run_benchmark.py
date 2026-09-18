#!/usr/bin/env python3
"""
Skrip Benchmark Tempatan SDOC Hackathon (Team Rimba)
Menilai ketepatan submission terhadap ground_truth.json rasmi penilai.
"""

import os
import sys
import json
import argparse
from pathlib import Path

# Set UTF-8 encoding untuk stdout bagi mengelakkan isu cp1252 pada Windows
if sys.platform.startswith("win"):
    try:
        sys.stdout.reconfigure(encoding="utf-8")
        sys.stderr.reconfigure(encoding="utf-8")
    except AttributeError:
        pass

# Dapatkan laluan direktori projek
ROOT_DIR = Path(__file__).resolve().parent.parent
DEFAULT_GROUND_TRUTH = ROOT_DIR / "docs" / "sdoc-hackathon-docker" / "data_v2" / "ground_truth.json"
DEFAULT_SUBMISSION = ROOT_DIR / "submission.json"
FALLBACK_SUBMISSION = ROOT_DIR / "docs" / "sdoc-hackathon-bundle" / "sample_submission.json"

# Tambah server path untuk import scoring
SERVER_DIR = ROOT_DIR / "docs" / "sdoc-hackathon-docker" / "server"
if str(SERVER_DIR) not in sys.path:
    sys.path.insert(0, str(SERVER_DIR))

try:
    import scoring
except ImportError:
    scoring = None


def run_benchmark(submission_path: Path, ground_truth_path: Path, emit_json: bool = False):
    """
    Menjalankan proses benchmarking menggunakan skrip scoring rasmi.
    """
    if not ground_truth_path.exists():
        print(f"[ERROR] Ground truth file tidak ditemui di: {ground_truth_path}")
        sys.exit(1)

    if not submission_path.exists():
        if FALLBACK_SUBMISSION.exists():
            print(f"[INFO] '{submission_path.name}' tidak ditemui. Menggunakan fallback: {FALLBACK_SUBMISSION.name}")
            submission_path = FALLBACK_SUBMISSION
        else:
            print(f"[ERROR] Submission file tidak ditemui di: {submission_path}")
            sys.exit(1)

    try:
        truth = json.loads(ground_truth_path.read_text(encoding="utf-8"))
        sub = json.loads(submission_path.read_text(encoding="utf-8"))
    except Exception as e:
        print(f"[ERROR] Gagal membaca fail JSON: {e}")
        sys.exit(1)

    if scoring is None:
        print("[ERROR] Modul scoring gagal diimport.")
        sys.exit(1)

    results = scoring.score_all(truth, sub)

    if emit_json:
        print(json.dumps(results, indent=2))
        return results

    # Paparan kemas metrik utama di terminal
    s1 = results["stage1"]
    s3 = results["stage3"]
    rel = results["reliability"]
    e2e = results["end_to_end"]
    weights = results["weights"]

    def bar(x, width=20):
        n = int(round(x * width))
        return "#" * n + "-" * (width - n)

    print("\n" + "=" * 65)
    print(" [REPORT] SDOC HACKATHON 2026 - LOCAL BENCHMARK (TEAM RIMBA)")
    print(f" [INFO]   Submission File : {submission_path.name}")
    print(f" [INFO]   Jumlah Email    : {results['n_emails']}")
    print("=" * 65)

    print("\n[STAGE 1] Email Classification:")
    print(f"  * Macro-F1 Score      : {s1['macro_f1']:.4f}  [{bar(s1['macro_f1'])}]")
    print(f"  * Accuracy            : {s1['accuracy']:.4f}  [{bar(s1['accuracy'])}]")

    print("\n[STAGE 3] BL vs SI Comparison (Comparable Documents):")
    print(f"  * Defect Catch Rate   : {s3['defect_recall']:.4f}  [{bar(s3['defect_recall'])}]")
    print(f"  * Defect Precision    : {s3['defect_precision']:.4f}  [{bar(s3['defect_precision'])}]")
    print(f"  * Defect F1 Score     : {s3['defect_f1']:.4f}  [{bar(s3['defect_f1'])}]")
    print(f"  * Field-Level F1      : {s3['field_f1']:.4f}  [{bar(s3['field_f1'])}]")
    print(f"  * Exact Match Rate    : {s3['exact_match_rate']:.4f}")

    print("\n[RELIABILITY] Escalation / Human-in-the-Loop:")
    print(f"  * Escalation Recall   : {rel['escalation_recall']:.4f}  [{bar(rel['escalation_recall'])}]")
    print(f"  * Escalation Precision: {rel['escalation_precision']:.4f}  [{bar(rel['escalation_precision'])}]")

    print("\n[END-TO-END] Headline Metric:")
    print(f"  * Defect Catch Rate   : {e2e['rate']:.4f}  [{bar(e2e['rate'])}]")
    print(f"  * Success Count       : {e2e['success']} / {e2e['total']} defect emails")

    print("\n" + "-" * 65)
    print(f" [FINAL SCORE] {results['final_score']:.4f}")
    print(f" (Formula: {weights['stage1']}*Stage1 + {weights['stage3']}*Stage3 + {weights['end_to_end']}*E2E)")
    print("-" * 65 + "\n")

    return results


def main():
    parser = argparse.ArgumentParser(description="SDOC Hackathon Local Benchmark Tool")
    parser.add_argument(
        "submission",
        nargs="?",
        default=str(DEFAULT_SUBMISSION),
        help="Laluan ke fail submission.json (default: submission.json / fallback: sample_submission.json)"
    )
    parser.add_argument(
        "--ground-truth",
        default=str(DEFAULT_GROUND_TRUTH),
        help="Laluan ke fail ground_truth.json rasmi"
    )
    parser.add_argument(
        "--json",
        action="store_true",
        help="Paparkan output dalam format JSON sahaja"
    )

    args = parser.parse_args()
    run_benchmark(Path(args.submission), Path(args.ground_truth), emit_json=args.json)


if __name__ == "__main__":
    main()
