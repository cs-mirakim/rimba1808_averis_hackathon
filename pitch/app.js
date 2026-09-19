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
      title: "Slide 1: Introduction & Team Rimba 0818",
      timeTarget: "00:00 - 00:25",
      visualCue: "Displaying Cover Slide with Team Rimba 0818 & 100% Benchmark Badge",
      script: `
        <blockquote>
          "Hi everyone, we are <strong>Team Rimba 0818</strong>, and this is <strong>Averis SDOC</strong> — an enterprise-grade autonomous shipping document verification engine designed for global logistics operations at Averis and APRIL Group.<br><br>
          Our team comprises <strong>Amir Hakim</strong> as Tech Lead, <strong>Amir Azib (Moi)</strong> on Document Ingestion, <strong>Farhan (Paan)</strong> on Core Comparison & Benchmark, and <strong>Eqhlas</strong> on Product Strategy & Quality Assurance."
        </blockquote>
      `
    },
    {
      slide: 2,
      title: "Slide 2: The Enterprise Problem (Logistics Friction)",
      timeTarget: "00:25 - 00:45",
      visualCue: "Highlighting 3 Critical Pain Points: Email Overload, Human Fatigue, Financial Losses",
      script: `
        <blockquote>
          "In global pulp, paper, and commodities export, operations teams process hundreds of shipping emails daily. A critical task is verifying the <strong>Customer Shipping Instruction (SI)</strong> against the carrier's <strong>Draft Bill of Lading (BL)</strong> across 7 mandatory fields.<br><br>
          Doing this manually is a recipe for disaster:
          <ol style='margin-left: 20px; margin-top: 6px;'>
            <li><strong>Email Triage Overload:</strong> Hundreds of emails mixed with general inquiries and spam delay urgent SIs.</li>
            <li><strong>Human Fatigue on 7 Fields:</strong> Cross-checking Shipper, Consignee, Notify Party, POL, POD, Container Count, and Weight across Word, Excel, PDF, and scans leads to missed discrepancies.</li>
            <li><strong>Demurrage & Financial Losses:</strong> A single missed mismatch triggers port customs detention and costly demurrage penalties.</li>
          </ol>
          Today, we solve this end-to-end."
        </blockquote>
      `
    },
    {
      slide: 3,
      title: "Slide 3: Solution Architecture — Hybrid Intelligence",
      timeTarget: "00:45 - 01:25",
      visualCue: "Presenting 3-Tier Diagram: High-Speed Ingestion (<2.5s) + Supabase Cloud + Gemini 3.6 Flash",
      script: `
        <blockquote>
          "Our solution is built on a <strong>High-Performance 3-Tier Hybrid Architecture</strong>:
          <ul style='margin-left: 20px; margin-top: 6px;'>
            <li><strong>Tier 1 — High-Throughput Ingestion:</strong> 5-Way Email Triage classifier (100% Macro-F1) and deterministic normalizers parsing 520 documents in <strong>under 2.5 seconds</strong> with zero false alarms.</li>
            <li><strong>Tier 2 — Enterprise Cloud Infrastructure:</strong> Supabase PostgreSQL with Row-Level Security and a Next.js 14 operational cockpit.</li>
            <li><strong>Tier 3 — Google Gemini 3.6 Flash Copilot:</strong> Performs autonomous root-cause risk assessment and drafts official dispute notices to shipping lines in seconds.</li>
          </ul>
          <br>
          <span style='color: #34d399; font-weight: 700;'>[DEMO TRANSITION ALERT (01:25 - 03:15)]:</span> Switch to live dashboard at <a href='https://rimba1808-averis-sdoc.vercel.app/' target='_blank' style='color:#38bdf8;'>https://rimba1808-averis-sdoc.vercel.app/</a> to demonstrate Inbox 520 records, classic green sidebar with bold 'Verified Clean' (454) counter badge, table header search bar, email_004 Consignee mismatch, Gemini Copilot risk assessment, Escalate to Carrier vs Approve Override, official footer with ship icon, and live Performance Metrics (100.0%)."
        </blockquote>
      `
    },
    {
      slide: 4,
      title: "Slide 4: Official Benchmark Performance (100% Score)",
      timeTarget: "03:15 - 03:35",
      visualCue: "Displaying Consolidated 100.0% (1.0000) Official Benchmark Scorecard & 0 False Alarm",
      script: `
        <blockquote>
          "Returning to our evaluation results: Averis SDOC was rigorously tested against the jury's official evaluation ground truth:
          <ul style='margin-left: 20px; margin-top: 6px;'>
            <li><strong>100.0% (1.0000)</strong> — Official Consolidated Benchmark Score.</li>
            <li><strong>520 / 520 (100%)</strong> — Email Classification Accuracy & Macro-F1.</li>
            <li><strong>46 / 46 (100%)</strong> — Stage 3 Discrepancy Defect Catch Rate.</li>
            <li><strong>0 False Alarms (100% Precision)</strong> — Clean cargo moves with zero unnecessary holding delays.</li>
            <li><strong>20 / 20 (100%)</strong> — Reliability Triage handling corrupted scans, wrong doc types, and missing values flawlessly.</li>
          </ul>"
        </blockquote>
      `
    },
    {
      slide: 5,
      title: "Slide 5: Engineering Challenges & Robustness",
      timeTarget: "03:35 - 03:55",
      visualCue: "Presenting 3 Engineering Challenges & Solutions: LLM Hallucinations, 20 Edge Cases, API Rate Limits",
      script: `
        <blockquote>
          "To achieve 100% benchmark reliability in chaotic real-world operations, our engineering team tackled 3 major technical hurdles:
          <ol style='margin-left: 20px; margin-top: 6px;'>
            <li><strong>LLM Hallucinations & Inconsistent Numeric Formats:</strong> Raw LLMs hallucinate digits and stumble over MT vs KG vs LBS or port abbreviations like CNNTG. We built a <strong>Tier 1 Deterministic Normalizer</strong> that mathematically unifies units and matches UN/LOCODE aliases before comparison.</li>
            <li><strong>Corrupted Scans & Non-BL Attachments:</strong> Inboxes receive commercial invoices and low-res 72-DPI scans. Our <strong>Reliability Exception Triage</strong> detects structural headers and scan density, catching all 20 planted edge cases with zero silent failures.</li>
            <li><strong>API Rate Limits & Cost Escalation:</strong> Querying cloud LLMs for 520 files spikes latency and bills. Our <strong>Multi-Tier Caching + Local Rule Engine</strong> runs in &lt; 2.5s for free, saving 95% of cloud API costs."
          </ol>
        </blockquote>
      `
    },
    {
      slide: 6,
      title: "Slide 6: Business Impact & Shared Services ROI",
      timeTarget: "03:55 - 04:15",
      visualCue: "Highlighting 4 Key Value Pillars: 80% STP, 90% Triage Speed, 95% LLM Cost Savings, Zero Delays",
      script: `
        <blockquote>
          "Why does this matter to Averis and global logistics?
          <ol style='margin-left: 20px; margin-top: 6px;'>
            <li><strong>80% Straight-Through Processing (STP):</strong> Clean documents are verified and auto-cleared directly into SAP without human intervention.</li>
            <li><strong>90% Reduction in Triage Time:</strong> Operations officers focus solely on genuine exceptions.</li>
            <li><strong>95% LLM Cost Savings:</strong> Fast deterministic filtering handles the bulk for free, invoking cloud Gemini only on true exceptions.</li>
            <li><strong>Zero Vessel Cutoff Delays:</strong> Automated dispute drafts resolve discrepancies before vessel sailing."
          </ol>
        </blockquote>
      `
    },
    {
      slide: 7,
      title: "Slide 7: Future Roadmap & Enterprise Scalability",
      timeTarget: "04:15 - 04:35",
      visualCue: "Displaying 3-Phase Commercial Roadmap: SAP S/4HANA (Q3 2026), Multi-Carrier EDI (Q4 2026), Local SLM (2027)",
      script: `
        <blockquote>
          "Looking forward, Averis SDOC has a clear enterprise commercial scalability roadmap:
          <ul style='margin-left: 20px; margin-top: 6px;'>
            <li><strong>Phase 1 (Q3 2026) — SAP S/4HANA Deep Integration:</strong> Bi-directional RFC/OData APIs feeding verified 'OK' Draft BLs directly into SAP Transportation Management with zero manual keying.</li>
            <li><strong>Phase 2 (Q4 2026) — Autonomous Multi-Carrier EDI Network:</strong> Direct webhook integration with Maersk, CMA CGM, ONE, and MSC to automatically ingest amended Draft BL v2 and close disputes hands-free.</li>
            <li><strong>Phase 3 (2027) — Edge-Optimized Local SLM:</strong> Fine-tuned containerized Small Language Models deployed on-premises in air-gapped environments for strict international customs data sovereignty."
          </ul>
        </blockquote>
      `
    },
    {
      slide: 8,
      title: "Slide 8: Summary & Closing Call",
      timeTarget: "04:35 - 04:45",
      visualCue: "Concluding Presentation with Team Rimba 0818 & Enterprise Readiness",
      script: `
        <blockquote>
          "To summarize: Averis SDOC is:
          <ul style='margin-left: 20px; margin-top: 6px;'>
            <li><strong>100% Compliant</strong> with Hackathon rules: Supabase Cloud Database + Google Gemini 3.6 Flash.</li>
            <li><strong>100% Mathematically Verified</strong> on official ground truth test suites.</li>
            <li><strong>Production-Ready</strong> and fully prepared for live demonstration and Averis shared services deployment.</li>
          </ul>
          <br>
          Thank you Averis and Monash University. We are Team Rimba 0818, ready to transform shipping operations with AI!"
        </blockquote>
      `
    }
  ];

  const slideTitles = [
    "Cover & Team Rimba 0818",
    "The Enterprise Problem",
    "3-Tier Hybrid Architecture",
    "Official Benchmark Performance (100%)",
    "Engineering Challenges & Robustness",
    "Business Impact & Enterprise ROI",
    "Future Roadmap & Enterprise Scalability",
    "Summary & Closing"
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
