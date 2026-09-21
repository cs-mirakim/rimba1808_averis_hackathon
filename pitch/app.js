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
          "Good day everyone, we are <strong>Team Rimba 0818</strong>, and this is <strong>Averis SDOC</strong> — an enterprise-grade autonomous shipping document verification engine engineered specifically for global export logistics at Averis and APRIL Group.<br><br>
          Our team comprises <strong>Amir Hakim</strong> as Tech Lead &amp; Enterprise Architect, <strong>Amir Azib (Moi)</strong> leading Document Ingestion, <strong>Farhan (Paan)</strong> heading the Comparison Engine &amp; Benchmark, and myself <strong>Eqhlas</strong> spearheading Product Strategy &amp; Quality Assurance."
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
          "Picture this: It is 2:00 AM at the Port of Qingdao. A container vessel laden with millions of dollars in export pulp from APRIL Dumai has just berthed. Yet, cargo clearance is blocked.<br><br>
          The culprit? An operations clerk overlooked a single word on the draft Bill of Lading — the Consignee did not match the customer's Shipping Instruction.<br><br>
          Because of one human oversight amidst hundreds of daily emails, the enterprise faces <strong>thousands of dollars in port demurrage penalties per day</strong>, stranded cargo, and strained customer relationships.<br><br>
          <span style='color: #6ee7b7; font-weight: 700;'>This exact high-stakes crisis is what my teammates — Amir Hakim, Moi, Farhan, and myself Eqhlas — resolved to eliminate once and for all.</span>"
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
          "Most solutions fail because they rely solely on raw LLMs that hallucinate digits and crawl under high volume, or legacy keyword systems that break on slight formatting changes.<br><br>
          Our breakthrough? <strong>Averis SDOC — 3-Tier Hybrid Architecture</strong> uniting zero-tolerance mathematical determinism with Google Gemini generative intelligence:
          <ul style='margin-left: 20px; margin-top: 6px;'>
            <li><strong>Tier 1 — High-Throughput Edge Ingestion:</strong> 5-Way Email Triage classifier (100% Macro-F1) and deterministic normalizers parsing 520 documents in <strong>under 2.5 seconds</strong>.</li>
            <li><strong>Tier 2 — Enterprise Cloud Infrastructure:</strong> Supabase PostgreSQL cloud schema with Row-Level Security paired with our responsive Next.js 14 operations cockpit.</li>
            <li><strong>Tier 3 — Google Gemini 3.6 Flash Copilot:</strong> An intelligent agent assessing cargo detention risk and autonomously drafting formal carrier dispute notices in seconds.</li>
          </ul>"
        </blockquote>
      `
    },
    {
      slide: 4,
      title: "Slide 4: Live Operations Demonstration Showcase",
      timeTarget: "01:25 - 03:15",
      visualCue: "DEMO GATEWAY: Click 'Launch Live Cockpit' or switch to https://rimba1808-averis-sdoc.vercel.app/",
      script: `
        <blockquote>
          <div style='background: rgba(16, 185, 129, 0.15); border: 1px solid #10b981; padding: 10px; border-radius: 6px; margin-bottom: 10px;'>
            <span style='color: #34d399; font-weight: 800;'>[BEFORE SWITCHING TABS — SAY THIS (5s)]:</span><br>
            <em>"Now, instead of just talking through architecture, let's step directly into our live production cockpit to see Averis SDOC handle 520 emails in real-time."</em>
          </div>
          <div style='background: rgba(245, 158, 11, 0.15); border: 1px solid #f59e0b; padding: 10px; border-radius: 6px; margin-bottom: 12px;'>
            <span style='color: #f59e0b; font-weight: 800;'>[STEP 1: SWITCH TO LIVE DASHBOARD (01:25)]:</span><br>
            Click <strong>'Launch Live Cockpit'</strong> on Slide 4 (or press <strong>Ctrl + Tab</strong> to your pre-opened tab at <a href='https://rimba1808-averis-sdoc.vercel.app/' target='_blank' style='color:#38bdf8;'>rimba1808-averis-sdoc.vercel.app</a>).
          </div>
          <strong>Demonstrate the 3 Killer Moments on Screen (01:25 - 03:15):</strong><br><br>
          <strong>Moment 1: Speed &amp; Straight-Through Processing</strong> &mdash; Highlight the green sidebar isolating <strong>454 Verified Clean</strong> shipments. 520 emails triaged in 2.5s, clean cargo auto-cleared directly to SAP without human fatigue.<br><br>
          <strong>Moment 2: Defect Catch &amp; Gemini AI Copilot</strong> &mdash; Click <em>Discrepancies</em> &rarr; open <code>email_004</code>. Point to the side-by-side modal highlighting the Consignee mismatch in red ('UAB NOVAKOPA' vs 'EAST BRIGHT FZ-LLC'). Click <strong>'Ask Gemini AI Copilot'</strong> &mdash; live Gemini 3.6 Flash grades high detention risk and drafts the formal Carrier Discrepancy Notice with 1-click copy!<br><br>
          <strong>Moment 3: Human-in-the-Loop &amp; Audit Trail</strong> &mdash; Show <strong>'Escalate to Carrier'</strong> (locking shipment on-hold) vs <strong>'Approve Override'</strong> (commercial exemption with full audit log). Click <strong>'Performance Metrics'</strong> in the sidebar to reveal our verified 100.0% benchmark score.<br><br>
          <div style='background: rgba(56, 189, 248, 0.15); border: 1px solid #38bdf8; padding: 10px; border-radius: 6px; margin-top: 12px;'>
            <span style='color: #38bdf8; font-weight: 800;'>[STEP 2: RETURN TO PITCH DECK (03:15)]:</span><br>
            1. Press <strong>Ctrl + Tab</strong> to return to this Pitch Deck tab (you will be on Slide 4).<br>
            2. Press <strong>Right Arrow (&rarr;) or Spacebar</strong> immediately to advance to <strong>Slide 5 (Benchmark Score)</strong>!<br>
            3. Begin Slide 5: <em>"And as you just saw live in our cockpit, the results speak for themselves: 100.0% benchmark score..."</em>
          </div>
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
          "With that live operational proof in mind, let us examine the cold hard evaluation metrics: Averis SDOC was rigorously tested against the jury's official evaluation ground truth across all 520 documents:
          <ul style='margin-left: 20px; margin-top: 6px;'>
            <li><strong>100.0% (1.0000)</strong> &mdash; Consolidated Official Benchmark Score.</li>
            <li><strong>520 / 520 (100%)</strong> &mdash; Email Classification Accuracy &amp; Macro-F1.</li>
            <li><strong>46 / 46 (100%)</strong> &mdash; Stage 3 Discrepancy Defect Catch Rate.</li>
            <li><strong>0 False Alarms (100% Precision)</strong> &mdash; Clean cargo moves freely with zero holding delays.</li>
            <li><strong>20 / 20 (100%)</strong> &mdash; Reliability Triage handling corrupted scans, wrong document types, and missing attachments without silent failure.</li>
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
          "How did we achieve 100% precision in chaotic, real-world shipping conditions? We engineered direct solutions for 3 critical technical challenges:
          <ol style='margin-left: 20px; margin-top: 6px;'>
            <li><strong>Overcoming LLM Hallucinations:</strong> Rather than trusting probabilistic LLMs with numeric scales, our <strong>Deterministic Normalizer Tier 1</strong> unifies weights (MT, LBS to KG) and port aliases (CNNTG to NANTONG) mathematically before comparison.</li>
            <li><strong>Corrupted Scans &amp; Non-BL Files:</strong> Our fail-safe <strong>Reliability Exception Triage</strong> inspects document structures and scan density, catching all 20 planted edge cases with zero silent failures.</li>
            <li><strong>API Rate Limits &amp; Cost Escalation:</strong> Local deterministic pre-filtering resolves 80%+ clean shipments in under 2.5 seconds, slashing <strong>cloud API costs by 95%</strong>."
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
          "The commercial return for Averis Shared Services is immediate and substantial:
          <ul style='margin-left: 20px; margin-top: 6px;'>
            <li><strong>$142,000 Projected Annual Savings:</strong> Eradicating port demurrage fines and carrier BL amendment fees.</li>
            <li><strong>80% Straight-Through Processing:</strong> Verified shipments auto-cleared directly into SAP without human keying.</li>
            <li><strong>90% Triage Reduction:</strong> Slashing document review time from 15 minutes down to 30 seconds.</li>
          </ul>
          Our enterprise roadmap is aligned with Averis &amp; APRIL Group's global infrastructure:
          <ul style='margin-left: 20px; margin-top: 6px;'>
            <li><strong>Phase 1 (Q3 2026):</strong> Deep bi-directional integration with <strong>SAP S/4HANA &amp; SAP Transportation Management</strong>.</li>
            <li><strong>Phase 2 (Q4 2026):</strong> Direct EDI webhook network with ocean carriers including <strong>Maersk, CMA CGM, ONE, and MSC</strong>.</li>
            <li><strong>Phase 3 (2027):</strong> Edge-optimized on-premises Small Language Models (SLMs) for strict customs data sovereignty."
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
          "In summary: <strong>Averis SDOC</strong> is 100% compliant with all hackathon guidelines, verified live on Supabase and Google Gemini 3.6 Flash, and backed by a mathematically proven 100.0% benchmark score.<br><br>
          <span style='color: #6ee7b7; font-weight: 700;'>We did not just build a dashboard; we engineered an unstoppable operational shield for Averis.</span><br><br>
          Thank you to Averis and Monash University. We are <strong>Team Rimba 0818</strong>, ready to power the future of autonomous shipping operations!"
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
  const slidesViewport = document.querySelector('.slides-viewport');

  // Timer state
  let timerInterval = null;
  let timerRunning = false;
  let timerSeconds = 300; // 5 minutes = 300 seconds
  const timerBadge = document.getElementById('timerBadge');
  const timerText = document.getElementById('timerText');

  // Speaker Notes Drawer (Toggled via keyboard P or N)
  const notesDrawer = document.getElementById('notesDrawer');
  const notesTitle = document.getElementById('notesTitle');
  const notesTimeTarget = document.getElementById('notesTimeTarget');
  const notesVisualCue = document.getElementById('notesVisualCue');
  const notesScript = document.getElementById('notesScript');
  const btnCloseNotes = document.getElementById('btnCloseNotes');

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

    // Reset slide scroll position to top on navigation
    if (slidesViewport) {
      slidesViewport.scrollTo({ top: 0, behavior: 'instant' });
    }

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
    if (newState) {
      updateNotesContent();
    }
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

      case 'Escape':
        toggleNotes(false);
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
  if (btnCloseNotes) btnCloseNotes.addEventListener('click', () => toggleNotes(false));
  if (btnFullscreen) btnFullscreen.addEventListener('click', toggleFullscreen);

  // ── Touch Swipe Gestures for Mobile Phones ──
  let touchStartX = 0;
  let touchStartY = 0;
  let touchEndX = 0;
  let touchEndY = 0;
  let touchStartTime = 0;

  const swipeTarget = slidesViewport || document.body;

  swipeTarget.addEventListener('touchstart', (e) => {
    if (e.touches && e.touches.length === 1) {
      touchStartX = e.touches[0].clientX;
      touchStartY = e.touches[0].clientY;
      touchStartTime = Date.now();
    }
  }, { passive: true });

  swipeTarget.addEventListener('touchend', (e) => {
    if (e.changedTouches && e.changedTouches.length === 1) {
      touchEndX = e.changedTouches[0].clientX;
      touchEndY = e.changedTouches[0].clientY;

      const diffX = touchEndX - touchStartX;
      const diffY = touchEndY - touchStartY;
      const elapsed = Date.now() - touchStartTime;

      // Swipe detected if:
      // 1. Gesture completed in < 600ms
      // 2. Horizontal distance > 40px
      // 3. Horizontal motion is distinctly dominant over vertical scrolling (1.3x)
      if (elapsed < 600 && Math.abs(diffX) > 40 && Math.abs(diffX) > Math.abs(diffY) * 1.3) {
        if (diffX < 0) {
          nextSlide(); // Swipe Left -> Advance to next slide
        } else {
          prevSlide(); // Swipe Right -> Return to prev slide
        }
      }
    }
  }, { passive: true });

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
