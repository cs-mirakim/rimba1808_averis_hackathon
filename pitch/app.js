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
      visualCue: "Slide 4 Introduction ➡️ Switch to Live Dashboard tab via Ctrl+Tab ➡️ Return at 03:15",
      script: `
        <blockquote>
          <div style='background: rgba(16, 185, 129, 0.12); border-left: 3px solid #10b981; padding: 8px 12px; margin-bottom: 12px;'>
            <span style='color: #34d399; font-weight: 700; font-size: 11.5px;'>[PHASE 1 &mdash; SAY ON SLIDE 4 BEFORE OPENING SYSTEM]:</span><br>
            "Now that you have seen our hybrid architecture, let us step inside the engine. On screen are the three critical operational moments we are about to demonstrate: rapid straight-through processing, intelligent defect triage with Gemini AI, and executive human governance. Let us switch directly to our live operations cockpit."
          </div>

          <div style='background: rgba(56, 189, 248, 0.12); border-left: 3px solid #38bdf8; padding: 8px 12px; margin-bottom: 12px;'>
            <span style='color: #38bdf8; font-weight: 700; font-size: 11.5px;'>[ACTION: PRESS Ctrl + Tab TO SWITCH TO LIVE DASHBOARD TAB]</span>
          </div>

          <div style='background: rgba(15, 23, 42, 0.5); padding: 6px 10px; border-radius: 6px; margin-bottom: 8px;'>
            <strong style='color: #a7f3d0;'>Moment 1: Speed &amp; Straight-Through Processing:</strong><br>
            "Here is the Averis SDOC Operations Cockpit, live on Vercel. Look at our left sidebar: out of 520 incoming emails, 454 verified clean shipments were automatically cleared through Straight-Through Processing in under 2.5 seconds&mdash;moving cargo immediately to SAP with zero human fatigue."
          </div>

          <div style='background: rgba(15, 23, 42, 0.5); padding: 6px 10px; border-radius: 6px; margin-bottom: 8px;'>
            <span style='color: #94a3b8; font-size: 11.5px;'>[ACTION: Click 'Discrepancies' in Sidebar &rarr; Click 'Diff' on email_004]</span><br>
            <strong style='color: #7dd3fc;'>Moment 2: Defect Catch &amp; Gemini AI Copilot:</strong><br>
            "Now, let us inspect the exceptions. Exactly 46 discrepancies were caught. Opening email_004, our side-by-side modal exposes the critical defect in red: the carrier issued the draft BL to 'UAB NOVAKOPA' instead of our verified customer 'EAST BRIGHT FZ-LLC'. If approved, this cargo would face immediate customs detention at port."<br><br>
            <span style='color: #94a3b8; font-size: 11.5px;'>[ACTION: Click 'Ask Gemini AI Copilot']</span><br>
            "Instead of an officer drafting emails manually, watch this: clicking 'Ask Gemini AI Copilot' triggers Gemini 3.6 Flash. In three seconds, it grades this as High Severity customs risk, and autonomously drafts the official Carrier Discrepancy Notice with container and booking citations&mdash;ready to copy and dispatch in one click."
          </div>

          <div style='background: rgba(15, 23, 42, 0.5); padding: 6px 10px; border-radius: 6px; margin-bottom: 12px;'>
            <span style='color: #94a3b8; font-size: 11.5px;'>[ACTION: Point to 'Escalate to Carrier' vs 'Approve Override' &rarr; Click 'Performance Metrics']</span><br>
            <strong style='color: #cbd5e1;'>Moment 3: Governance &amp; Live Verification:</strong><br>
            "Officers retain complete control: clicking 'Escalate to Carrier' locks the shipment on-hold until an amended BL arrives, while 'Approve Override' records an immutable audit log. Finally, opening 'Performance Metrics' verifies our live score against the jury's official ground truth."
          </div>

          <div style='background: rgba(245, 158, 11, 0.15); border-left: 3px solid #f59e0b; padding: 8px 12px;'>
            <span style='color: #fbbf24; font-weight: 700; font-size: 11.5px;'>[PHASE 3 &mdash; RETURN TO PITCH DECK AT 03:15]:</span><br>
            Press <strong>Ctrl + Tab</strong> to return to the Pitch Deck (you land on Slide 4) &rarr; Press <strong>Right Arrow (&rarr;)</strong> to advance to Slide 5!
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

  // Drawers & Modals
  const notesDrawer = document.getElementById('notesDrawer');
  const notesBackdrop = document.getElementById('notesBackdrop');
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

  // Team Member Profile Modal
  const memberModal = document.getElementById('memberModal');
  const btnCloseMemberModal = document.getElementById('btnCloseMemberModal');
  const memberModalImg = document.getElementById('memberModalImg');
  const memberModalBadge = document.getElementById('memberModalBadge');
  const memberModalName = document.getElementById('memberModalName');
  const memberModalRole = document.getElementById('memberModalRole');
  const memberModalBio = document.getElementById('memberModalBio');
  const memberModalSkills = document.getElementById('memberModalSkills');
  const memberCounter = document.getElementById('memberCounter');
  const btnPrevMember = document.getElementById('btnPrevMember');
  const btnNextMember = document.getElementById('btnNextMember');
  let currentMemberIndex = 0;

  const teamMembers = [
    {
      id: 'amir',
      name: 'Amir Hakim',
      role: 'Tech Lead & Enterprise Architect',
      photo: 'Profile_pic/Gambar_Amir.jpeg',
      photoPosition: 'center 45%',
      badge: 'Tech Lead',
      bio: 'Enterprise Architect & Full-Stack Lead. Engineered the Next.js operations console, Supabase cloud data layer, and Google Gemini 3.6 Flash multimodal AI integration with live discrepancy streaming and deterministic fallback verification.',
      skills: ['System Architecture', 'Next.js 14', 'Supabase Cloud', 'Google Gemini 3.6 Flash', 'TypeScript']
    },
    {
      id: 'moi',
      name: 'Amir Azib (Moi)',
      role: 'Ingestion & Parsers Lead',
      photo: 'Profile_pic/Gambar_Moi.jpeg',
      photoPosition: 'center 35%',
      badge: 'Document Lead',
      bio: 'Document Processing & Ingestion Specialist. Built the multi-format pipeline capable of parsing raw PDF streams, handling attachment corruptions, and feeding normalized JSON structures to the core engine.',
      skills: ['Document Ingestion', 'PDF Stream Parsing', 'Attachment Validation', 'Data Normalization']
    },
    {
      id: 'paan',
      name: 'Farhan (Paan)',
      role: 'Core Comparison Engine Lead',
      photo: 'Profile_pic/Gambar_Paan.jpeg',
      photoPosition: 'center 32%',
      badge: 'Engine Lead',
      bio: 'Discrepancy Algorithm Specialist. Architected the deterministic verification matrix comparing 7 critical shipping fields across all 520 emails, achieving 100.0% benchmark score on official evaluation.',
      skills: ['Deterministic Rules', 'Comparison Engine', '100% Benchmark', 'Discrepancy Matrix']
    },
    {
      id: 'eqhlas',
      name: 'Eqhlas',
      role: 'Product Strategy & QA Lead',
      photo: 'Profile_pic/Gambar_Eqhlas.jpeg',
      photoPosition: '24% 40%',
      badge: 'Strategy & QA',
      bio: 'Product Vision & Quality Assurance Lead. Directed product roadmap, reliability stress-testing (zero false approvals on 20/20 edge cases), user-centric dashboard design, and stakeholder presentations.',
      skills: ['Product Strategy', 'QA & Edge Cases', 'Operations UX', 'Pitch Presentation']
    }
  ];

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
    if (notesBackdrop) notesBackdrop.classList.toggle('active', newState);
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

  // Member Profile Modal Helpers
  function openMemberModal(memberId) {
    if (!memberModal) return;
    let idx = teamMembers.findIndex(m => m.id === memberId);
    if (idx === -1) idx = 0;
    showMember(idx);
    memberModal.classList.add('open');
    memberModal.setAttribute('aria-hidden', 'false');
  }

  function closeMemberModal() {
    if (!memberModal) return;
    memberModal.classList.remove('open');
    memberModal.setAttribute('aria-hidden', 'true');
  }

  function showMember(index) {
    if (index < 0) index = teamMembers.length - 1;
    if (index >= teamMembers.length) index = 0;
    currentMemberIndex = index;
    const member = teamMembers[index];

    if (memberModalImg) {
      memberModalImg.src = member.photo;
      memberModalImg.alt = member.name;
      memberModalImg.style.objectPosition = member.photoPosition || 'center center';
    }
    if (memberModalBadge) memberModalBadge.textContent = member.badge;
    if (memberModalName) memberModalName.textContent = member.name;
    if (memberModalRole) memberModalRole.textContent = member.role;
    if (memberModalBio) memberModalBio.textContent = member.bio;
    if (memberCounter) memberCounter.textContent = `${index + 1} / ${teamMembers.length}`;

    if (memberModalSkills) {
      memberModalSkills.innerHTML = '';
      member.skills.forEach(s => {
        const span = document.createElement('span');
        span.className = 'member-skill-tag';
        span.textContent = s;
        memberModalSkills.appendChild(span);
      });
    }
  }

  function nextMember() {
    showMember(currentMemberIndex + 1);
  }

  function prevMember() {
    showMember(currentMemberIndex - 1);
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
        if (memberModal && memberModal.classList.contains('open')) {
          e.preventDefault();
          nextMember();
          break;
        }
        e.preventDefault();
        nextSlide();
        break;

      case 'ArrowLeft':
      case 'Backspace':
      case 'PageUp':
        if (memberModal && memberModal.classList.contains('open')) {
          e.preventDefault();
          prevMember();
          break;
        }
        e.preventDefault();
        prevSlide();
        break;

      case 'Home':
        if (memberModal && memberModal.classList.contains('open')) {
          e.preventDefault();
          showMember(0);
          break;
        }
        e.preventDefault();
        goToSlide(0);
        break;

      case 'End':
        if (memberModal && memberModal.classList.contains('open')) {
          e.preventDefault();
          showMember(teamMembers.length - 1);
          break;
        }
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
        closeMemberModal();
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
  if (notesBackdrop) notesBackdrop.addEventListener('click', () => toggleNotes(false));
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

  // Member modal controls
  if (btnCloseMemberModal) {
    btnCloseMemberModal.addEventListener('click', closeMemberModal);
  }
  if (btnPrevMember) {
    btnPrevMember.addEventListener('click', (e) => {
      e.stopPropagation();
      prevMember();
    });
  }
  if (btnNextMember) {
    btnNextMember.addEventListener('click', (e) => {
      e.stopPropagation();
      nextMember();
    });
  }
  if (memberModal) {
    memberModal.addEventListener('click', (e) => {
      if (e.target === memberModal) {
        closeMemberModal();
      }
    });
  }

  // Interactive member triggers in Slide 1 and Slide 8
  document.querySelectorAll('[data-member]').forEach(el => {
    el.addEventListener('click', (e) => {
      e.stopPropagation();
      const memberId = el.getAttribute('data-member');
      if (memberId) openMemberModal(memberId);
    });
    el.addEventListener('keydown', (e) => {
      if (e.key === 'Enter' || e.key === ' ') {
        e.preventDefault();
        const memberId = el.getAttribute('data-member');
        if (memberId) openMemberModal(memberId);
      }
    });
  });

  // Initial Setup
  buildDots();
  goToSlide(0);
  updateTimerDisplay();

})();
