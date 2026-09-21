/**
 * Averis SDOC — Interactive Web Pitch Deck
 * Team Rimba 0818 | Averis x Monash Hackathon 2026
 */

(function () {
  'use strict';

  // Speaker notes content synced from PITCH_SCRIPT.md
  const speakerNotes = [
    {
      slide: 1,
      title: "Slide 1: The Mission & Team Rimba 0818",
      timeTarget: "00:00 - 00:25",
      visualCue: "Displaying Cover Slide with Team Rimba 0818 & 100% Benchmark Badge",
      script: `
        <blockquote>
          "Selamat sejahtera semua, kami dari <strong>Team Rimba 0818</strong>, dan ini adalah <strong>Averis SDOC</strong> — enjin pengesahan dokumen perkapalan berautonomi gred perusahaan yang direka khas untuk operasi logistik global di Averis dan APRIL Group.<br><br>
          Pasukan kami terdiri daripada <strong>Amir Hakim</strong> sebagai Tech Lead &amp; Arkitek Sistem, <strong>Amir Azib (Moi)</strong> mengetuai Document Ingestion, <strong>Farhan (Paan)</strong> mengetuai Comparison Engine &amp; Benchmark, dan saya sendiri <strong>Eqhlas</strong> menerajui Product Strategy &amp; Quality Assurance."
        </blockquote>
      `
    },
    {
      slide: 2,
      title: "Slide 2: The Real-Life Nightmare (The 2:00 AM Crisis)",
      timeTarget: "00:25 - 00:55",
      visualCue: "Highlighting 3 Critical Pain Points: 500+ Email Tsunami, 7-Field Fatigue, Demurrage Catastrophe ($3,000/day)",
      script: `
        <blockquote>
          "Bayangkan situasi ini: Jam 2 pagi di Pelabuhan Qingdao. Sebuah kapal kargo membawa muatan pulpa kertas bernilai jutaan dolar dari APRIL Dumai baru sahaja berlabuh. Namun, kontena tidak boleh dilepaskan.<br><br>
          Sebabnya? Kerani tersilap pandang satu perkataan pada Bill of Lading — nama Consignee tidak sepadan dengan Shipping Instruction.<br><br>
          Akibat satu kesilapan manusia selepas menyemak ratusan emel, syarikat berdepan <strong>denda demurrage ribuan dolar sehari</strong>, kargo tersadai, dan hubungan pelanggan terjejas.<br><br>
          <span style='color: #6ee7b7; font-weight: 700;'>Masalah berisiko tinggi inilah yang saya dan rakan sepasukan saya di Team Rimba — Amir Hakim, Moi, Farhan, dan saya sendiri Eqhlas — nekad untuk selesaikan secara tuntas.</span>"
        </blockquote>
      `
    },
    {
      slide: 3,
      title: "Slide 3: The Breakthrough Idea — 3-Tier Hybrid Architecture",
      timeTarget: "00:55 - 01:25",
      visualCue: "Presenting 3-Tier Diagram: High-Speed Ingestion (<2.5s) + Supabase Cloud + Gemini 3.6 Flash",
      script: `
        <blockquote>
          "Kebanyakan penyelesaian di luar sana gagal kerana hanya bergantung kepada AI semata-mata yang lambat dan kerap berhalusinasi, atau sistem kata kunci lama yang terlalu kaku.<br><br>
          Idea kami? <strong>Averis SDOC — 3-Tier Hybrid Architecture</strong> yang menggabungkan kepantasan enjin deterministik dan kebijaksanaan AI generatif:
          <ul style='margin-left: 20px; margin-top: 6px;'>
            <li><strong>Tier 1 — High-Throughput Edge Ingestion:</strong> 5-Way Email Triage classifier (100% Macro-F1) dan normalizer deterministik memproses 520 fail bawah <strong>2.5 saat</strong>.</li>
            <li><strong>Tier 2 — Enterprise Cloud Infrastructure:</strong> Pangkalan data awan Supabase PostgreSQL dengan Row-Level Security dan kokpit operasi Next.js 14.</li>
            <li><strong>Tier 3 — Google Gemini 3.6 Flash Copilot:</strong> Pegawai pintar yang menilai tahap risiko kargo dan mendraf surat pertikaian rasmi secara automatik.</li>
          </ul>"
        </blockquote>
      `
    },
    {
      slide: 4,
      title: "Slide 4: Live Operations Demonstration Showcase",
      timeTarget: "01:25 - 03:15",
      visualCue: "DEMO GATEWAY: Switch live to https://rimba1808-averis-sdoc.vercel.app/ to demonstrate 3 Killer Moments",
      script: `
        <blockquote>
          <span style='color: #34d399; font-weight: 800;'>[PERALIHAN DEMO LANGSUNG (01:25 - 03:15)]:</span> Buka tab kokpit operasi langsung di <a href='https://rimba1808-averis-sdoc.vercel.app/' target='_blank' style='color:#38bdf8;'>rimba1808-averis-sdoc.vercel.app</a> dan tunjukkan 3 babak utama:<br><br>
          <strong>Babak 1: Kelajuan &amp; Skala</strong> — Tunjuk sidebar hijau dengan <strong>454 Verified Clean</strong>. Tapis 520 emel dalam 2.5 saat, kargo bersih auto-lulus ke ERP.<br><br>
          <strong>Babak 2: Pengesanan Ralat &amp; Gemini Copilot</strong> — Klik <em>Discrepancies</em> &rarr; Buka <code>email_004</code>. Tunjuk perbezaan merah Consignee ('UAB NOVAKOPA' vs 'EAST BRIGHT FZ-LLC'). Klik <strong>Ask Gemini AI Copilot</strong> — Gemini menilai 'High Severity Risk' dan mendraf emel Carrier Discrepancy Notice lengkap dalam 3 saat!<br><br>
          <strong>Babak 3: Kuasa Pegawai (Human-in-the-Loop)</strong> — Tunjuk butang <strong>Escalate to Carrier</strong> (kunci status kargo) vs <strong>Approve Override</strong> (pelepasan sah berkomersial dengan audit log penuh). Akhir sekali klik <strong>Performance Metrics</strong> di sidebar untuk paparan skor 100.0%!"
        </blockquote>
      `
    },
    {
      slide: 5,
      title: "Slide 5: Flawless Verification (100.0% Benchmark Score)",
      timeTarget: "03:15 - 03:45",
      visualCue: "Displaying Consolidated 100.0% (1.0000) Official Benchmark Scorecard & 0 False Alarm",
      script: `
        <blockquote>
          "Kembali kepada keputusan rasmi: Averis SDOC diuji secara ketat menentang ground truth rasmi kit penilaian juri Averis:
          <ul style='margin-left: 20px; margin-top: 6px;'>
            <li><strong>100.0% (1.0000)</strong> — Skor Penanda Aras Rasmi disahkan.</li>
            <li><strong>520 / 520 (100%)</strong> — Ketepatan Pengelasan Emel &amp; Macro-F1.</li>
            <li><strong>46 / 46 (100%)</strong> — Kadar Tangkapan Ralat Discrepancy.</li>
            <li><strong>0 False Alarms (100% Precision)</strong> — Tiada kargo bersih yang tertahan sia-sia.</li>
            <li><strong>20 / 20 (100%)</strong> — Kejayaan Reliability Triage mengesan imbasan kabur, invois sesat, dan lampiran rosak.</li>
          </ul>"
        </blockquote>
      `
    },
    {
      slide: 6,
      title: "Slide 6: Under The Hood — Engineering Challenges & Robustness",
      timeTarget: "03:45 - 04:15",
      visualCue: "Presenting 3 Engineering Challenges: LLM Hallucination vs Normalizer, 20 Edge Cases, 95% API Cost Savings",
      script: `
        <blockquote>
          "Bagaimana kami mencapai ketepatan 100% dalam persekitaran logistik yang huru-hara? Kami menyelesaikan 3 cabaran kejuruteraan utama:
          <ol style='margin-left: 20px; margin-top: 6px;'>
            <li><strong>Mengatasi Halusinasi LLM:</strong> Kami bina <strong>Deterministic Normalizer Tier 1</strong> yang menyelaraskan unit berat (MT, LBS kepada KG) dan kod pelabuhan (CNNTG kepada NANTONG) secara matematik sebelum perbandingan dibuat.</li>
            <li><strong>Imbasan Rosak &amp; Lampiran Bukan BL:</strong> Sistem <strong>Reliability Exception Triage</strong> memeriksa header fail dan kepadatan imbasan, berjaya mengesan kesemua 20 kes ekstrem tanpa sebarang kegagalan senyap.</li>
            <li><strong>Had API &amp; Kos Awan:</strong> Menapis pukal secara deterministik membolehkan sistem siap bawah 2.5 saat, menjimatkan <strong>95% kos panggilan API awan</strong>."
          </ol>
        </blockquote>
      `
    },
    {
      slide: 7,
      title: "Slide 7: Commercial ROI & Averis Production Roadmap",
      timeTarget: "04:15 - 04:35",
      visualCue: "Dual Panel: $142,000/year Savings + 3-Phase Roadmap (Q3 SAP S/4HANA, Q4 Multi-Carrier EDI, 2027 Local SLM)",
      script: `
        <blockquote>
          "Nilai komersial kepada Averis Shared Services adalah serta-merta:
          <ul style='margin-left: 20px; margin-top: 6px;'>
            <li><strong>$142,000 Penjimatan Setahun:</strong> Menghapuskan denda demurrage dan caj pindaan BL.</li>
            <li><strong>80% Straight-Through Processing:</strong> Kargo bersih auto-lulus ke SAP tanpa campur tangan manusia.</li>
            <li><strong>Pengurangan Masa Semakan 90%:</strong> Dari 15 minit kepada bawah 30 saat.</li>
          </ul>
          Roadmap kami bersedia untuk skala global:
          <ul style='margin-left: 20px; margin-top: 6px;'>
            <li><strong>Fasa 1 (Q3 2026):</strong> Integrasi mendalam <strong>SAP S/4HANA &amp; SAP TM</strong> untuk pelepasan kargo automatik.</li>
            <li><strong>Fasa 2 (Q4 2026):</strong> Webhook terus dengan talian perkapalan global (Maersk, CMA CGM, ONE, MSC).</li>
            <li><strong>Fasa 3 (2027):</strong> Small Language Model (SLM) tempatan on-premises untuk kedaulatan data kastam."
          </ul>
        </blockquote>
      `
    },
    {
      slide: 8,
      title: "Slide 8: Grand Finale — An Unstoppable Operational Shield",
      timeTarget: "04:35 - 04:45",
      visualCue: "Concluding Presentation with Team Rimba 0818 & Enterprise Readiness",
      script: `
        <blockquote>
          "Kesimpulannya: <strong>Averis SDOC</strong> mematuhi 100% syarat hackathon dengan pangkalan data awan Supabase dan AI Gemini 3.6 Flash. Ia disahkan 100% secara matematik dan sedia dilaksanakan untuk operasi sebenar Averis dan APRIL Group.<br><br>
          <span style='color: #6ee7b7; font-weight: 700;'>Kami bukan sekadar membina papan pemuka; kami membina perisai operasi yang kalis ralat untuk Averis.</span><br><br>
          Sekian terima kasih kepada Averis dan Monash University. Kami dari <strong>Team Rimba 0818</strong>!"
        </blockquote>
      `
    }
  ];

  const slideTitles = [
    "Cover & The Mission — Team Rimba 0818",
    "The 2:00 AM Shipping Nightmare",
    "The Breakthrough Idea: 3-Tier Hybrid Architecture",
    "Live Operations Demonstration (3 Killer Moments)",
    "Flawless Verification: 100.0% Official Score",
    "Under The Hood: Engineering Challenges & Robustness",
    "Commercial ROI & Averis Production Roadmap",
    "Grand Finale: Unstoppable Operational Shield"
  ];

  // DOM Elements
  const slides = document.querySelectorAll('.slide');
  const totalSlides = slides.length;
  let currentSlide = 0;

  const progressFill = document.getElementById('progressFill');
  const slideNumBadge = document.getElementById('slideNumBadge');
  const slideTitleText = document.getElementById('slideTitleText');
  const btnPrev = document.getElementById('btnPrev');
  const btnNext = document.getElementById('btnNext');
  const dotsContainer = document.getElementById('slideDots');

  // Timer state
  let timerInterval = null;
  let timerRunning = false;
  let timerSeconds = 300; // 5 minutes = 300 seconds
  const timerBadge = document.getElementById('timerBadge');
  const timerText = document.getElementById('timerText');

  // Drawers & Modals
  const notesDrawer = document.getElementById('notesDrawer');
  const notesTitle = document.getElementById('notesTitle');
  const notesTimeTarget = document.getElementById('notesTimeTarget');
  const notesVisualCue = document.getElementById('notesVisualCue');
  const notesScript = document.getElementById('notesScript');
  const btnToggleNotes = document.getElementById('btnToggleNotes');
  const btnCloseNotes = document.getElementById('btnCloseNotes');

  const qaModal = document.getElementById('qaModal');
  const btnToggleQA = document.getElementById('btnToggleQA');
  const btnCloseQA = document.getElementById('btnCloseQA');

  const btnFullscreen = document.getElementById('btnFullscreen');

  // Initialize dots
  function buildDots() {
    dotsContainer.innerHTML = '';
    for (let i = 0; i < totalSlides; i++) {
      const dot = document.createElement('button');
      dot.classList.add('dot-btn');
      dot.setAttribute('title', `Go to slide ${i + 1}`);
      if (i === currentSlide) dot.classList.add('active');
      dot.addEventListener('click', () => goToSlide(i));
      dotsContainer.appendChild(dot);
    }
  }

  // Go to specific slide
  function goToSlide(index) {
    if (index < 0 || index >= totalSlides) return;
    
    slides[currentSlide].classList.remove('active');
    currentSlide = index;
    slides[currentSlide].classList.add('active');

    // Update Progress Bar
    const progressPercent = ((currentSlide + 1) / totalSlides) * 100;
    progressFill.style.width = `${progressPercent}%`;

    // Update Top Tracker
    slideNumBadge.textContent = `${String(currentSlide + 1).padStart(2, '0')} / ${String(totalSlides).padStart(2, '0')}`;
    slideTitleText.textContent = slideTitles[currentSlide];

    // Update Dots
    const dots = dotsContainer.querySelectorAll('.dot-btn');
    dots.forEach((d, idx) => {
      d.classList.toggle('active', idx === currentSlide);
    });

    // Update Nav Buttons
    btnPrev.disabled = currentSlide === 0;
    btnNext.disabled = currentSlide === totalSlides - 1;

    // Update Speaker Notes if drawer is open or prepared
    updateNotesContent();
  }

  function nextSlide() {
    if (currentSlide < totalSlides - 1) {
      goToSlide(currentSlide + 1);
    }
  }

  function prevSlide() {
    if (currentSlide > 0) {
      goToSlide(currentSlide - 1);
    }
  }

  // Update notes content for active slide
  function updateNotesContent() {
    const data = speakerNotes[currentSlide];
    if (!data) return;
    notesTitle.textContent = data.title;
    notesTimeTarget.textContent = `Target: ${data.timeTarget}`;
    notesVisualCue.textContent = `Visual Cue: ${data.visualCue}`;
    notesScript.innerHTML = data.script;
  }

  // Toggle Notes Drawer
  function toggleNotes(forceState) {
    if (!notesDrawer) return;
    const isOpen = notesDrawer.classList.contains('open');
    const newState = forceState !== undefined ? forceState : !isOpen;
    notesDrawer.classList.toggle('open', newState);
    if (btnToggleNotes) btnToggleNotes.classList.toggle('active', newState);
    if (newState) {
      updateNotesContent();
    }
  }

  // Toggle QA Modal
  function toggleQA(forceState) {
    if (!qaModal) return;
    const isOpen = qaModal.classList.contains('open');
    const newState = forceState !== undefined ? forceState : !isOpen;
    qaModal.classList.toggle('open', newState);
    if (btnToggleQA) btnToggleQA.classList.toggle('active', newState);
  }

  // Fullscreen toggle
  function toggleFullscreen() {
    if (!document.fullscreenElement) {
      document.documentElement.requestFullscreen().catch(err => {
        console.warn(`Fullscreen request failed: ${err.message}`);
      });
    } else {
      if (document.exitFullscreen) {
        document.exitFullscreen();
      }
    }
  }

  // Timer logic
  function formatTime(totalSeconds) {
    const mins = Math.floor(totalSeconds / 60);
    const secs = totalSeconds % 60;
    return `${String(mins).padStart(2, '0')}:${String(secs).padStart(2, '0')}`;
  }

  function updateTimerDisplay() {
    timerText.textContent = formatTime(timerSeconds);

    // Color indicators
    timerBadge.classList.remove('state-warn', 'state-danger');
    if (timerSeconds <= 30 && timerSeconds > 0) {
      timerBadge.classList.add('state-danger');
    } else if (timerSeconds <= 90 && timerSeconds > 0) {
      timerBadge.classList.add('state-warn');
    } else if (timerSeconds === 0) {
      timerBadge.classList.add('state-danger');
      timerText.textContent = "00:00 (TIME)";
    }
  }

  function toggleTimer() {
    if (timerRunning) {
      clearInterval(timerInterval);
      timerRunning = false;
      timerBadge.style.opacity = '0.8';
    } else {
      if (timerSeconds === 0) {
        timerSeconds = 300;
      }
      timerRunning = true;
      timerBadge.style.opacity = '1';
      timerInterval = setInterval(() => {
        if (timerSeconds > 0) {
          timerSeconds--;
          updateTimerDisplay();
        } else {
          clearInterval(timerInterval);
          timerRunning = false;
          updateTimerDisplay();
        }
      }, 1000);
    }
  }

  function resetTimer() {
    clearInterval(timerInterval);
    timerRunning = false;
    timerSeconds = 300;
    timerBadge.style.opacity = '1';
    updateTimerDisplay();
  }

  // Global Keyboard Navigation
  window.addEventListener('keydown', (e) => {
    // Ignore keydown if an input or textarea is active
    if (['INPUT', 'TEXTAREA'].includes(document.activeElement.tagName)) return;

    switch (e.key) {
      case 'ArrowRight':
      case ' ':
      case 'PageDown':
        e.preventDefault();
        nextSlide();
        break;

      case 'ArrowLeft':
      case 'Backspace':
      case 'PageUp':
        e.preventDefault();
        prevSlide();
        break;

      case 'Home':
        e.preventDefault();
        goToSlide(0);
        break;

      case 'End':
        e.preventDefault();
        goToSlide(totalSlides - 1);
        break;

      case 'f':
      case 'F':
        e.preventDefault();
        toggleFullscreen();
        break;

      case 'n':
      case 'N':
      case 'p':
      case 'P':
        e.preventDefault();
        toggleNotes();
        break;

      case 't':
      case 'T':
        e.preventDefault();
        if (e.shiftKey) {
          resetTimer();
        } else {
          toggleTimer();
        }
        break;

      case 'q':
      case 'Q':
        e.preventDefault();
        toggleQA();
        break;

      case 'Escape':
        toggleNotes(false);
        toggleQA(false);
        break;

      default:
        // Number keys 1-8 for quick slide jump
        const num = parseInt(e.key, 10);
        if (num >= 1 && num <= totalSlides) {
          goToSlide(num - 1);
        }
        break;
    }
  });

  // Attach UI event handlers
  btnNext.addEventListener('click', nextSlide);
  btnPrev.addEventListener('click', prevSlide);
  if (btnToggleNotes) btnToggleNotes.addEventListener('click', () => toggleNotes());
  if (btnCloseNotes) btnCloseNotes.addEventListener('click', () => toggleNotes(false));
  if (btnToggleQA) btnToggleQA.addEventListener('click', () => toggleQA());
  if (btnCloseQA) btnCloseQA.addEventListener('click', () => toggleQA(false));
  btnFullscreen.addEventListener('click', toggleFullscreen);

  // Timer badge click: toggle on click, double click to reset
  timerBadge.addEventListener('click', toggleTimer);
  timerBadge.addEventListener('dblclick', (e) => {
    e.stopPropagation();
    resetTimer();
  });

  // Modal backdrop click to close
  qaModal.addEventListener('click', (e) => {
    if (e.target === qaModal) {
      toggleQA(false);
    }
  });

  // Initial Setup
  buildDots();
  goToSlide(0);
  updateTimerDisplay();

})();
