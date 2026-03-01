/**
 * BLODE — script.js
 * Terminal meets Luxury. Intersection observers, typed text,
 * simulated execution, micro-interactions.
 */

'use strict';

/* ── Utility ────────────────────────────────────────────────── */
const $ = (sel, ctx = document) => ctx.querySelector(sel);
const $$ = (sel, ctx = document) => [...ctx.querySelectorAll(sel)];
const sleep = ms => new Promise(r => setTimeout(r, ms));

/* ── Nav Scroll State ───────────────────────────────────────── */
(function initNav() {
  const nav = $('#nav');
  const hamburger = $('#hamburger');
  const navLinks = $('.nav__links');

  window.addEventListener('scroll', () => {
    nav.classList.toggle('scrolled', window.scrollY > 30);
  }, { passive: true });

  hamburger?.addEventListener('click', () => {
    const open = navLinks.classList.toggle('open');
    hamburger.setAttribute('aria-expanded', open);
    // Animate hamburger
    const spans = $$('span', hamburger);
    if (open) {
      spans[0].style.transform = 'translateY(6.5px) rotate(45deg)';
      spans[1].style.opacity = '0';
      spans[2].style.transform = 'translateY(-6.5px) rotate(-45deg)';
    } else {
      spans.forEach(s => { s.style.transform = ''; s.style.opacity = ''; });
    }
  });

  // Close mobile nav on link click
  $$('.nav__links a').forEach(link => {
    link.addEventListener('click', () => {
      navLinks.classList.remove('open');
      hamburger.setAttribute('aria-expanded', false);
      const spans = $$('span', hamburger);
      spans.forEach(s => { s.style.transform = ''; s.style.opacity = ''; });
    });
  });
})();


/* ── Typed Tagline ──────────────────────────────────────────── */
(function initTypedTagline() {
  const el = $('#typed-tagline');
  if (!el) return;

  const phrases = [
    'act fast. act direct. act blode.',
    'your system. your rules. your speed.',
    'no runtime ceremony. just execution.',
    'sys.output("hello, raw world")',
  ];

  let phraseIndex = 0;
  let charIndex = 0;
  let deleting = false;
  let pauseTicks = 0;

  const TYPING_SPEED = 55;
  const DELETE_SPEED = 28;
  const PAUSE_AFTER_TYPE = 2200;
  const PAUSE_AFTER_DELETE = 400;

  async function tick() {
    const current = phrases[phraseIndex];

    if (!deleting) {
      if (charIndex < current.length) {
        el.textContent = current.slice(0, ++charIndex);
        setTimeout(tick, TYPING_SPEED + (Math.random() * 20 - 10));
      } else {
        setTimeout(() => { deleting = true; tick(); }, PAUSE_AFTER_TYPE);
      }
    } else {
      if (charIndex > 0) {
        el.textContent = current.slice(0, --charIndex);
        setTimeout(tick, DELETE_SPEED);
      } else {
        deleting = false;
        phraseIndex = (phraseIndex + 1) % phrases.length;
        setTimeout(tick, PAUSE_AFTER_DELETE);
      }
    }
  }

  // Small initial delay for hero load
  setTimeout(tick, 800);
})();


/* ── Intersection Observer: Reveal Animations ───────────────── */
(function initRevealObserver() {
  const revealEls = $$('.reveal-up');
  if (!revealEls.length) return;

  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('visible');
          observer.unobserve(entry.target); // Fire once
        }
      });
    },
    { threshold: 0.12, rootMargin: '0px 0px -60px 0px' }
  );

  revealEls.forEach(el => observer.observe(el));
})();


/* ── Metric Bar Animations ──────────────────────────────────── */
(function initMetricBars() {
  const bars = $$('.metric-bar__fill');
  if (!bars.length) return;

  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          const bar = entry.target;
          const targetWidth = bar.dataset.width || '0';
          // Slight delay for polish
          setTimeout(() => {
            bar.style.width = `${targetWidth}%`;
          }, 300);
          observer.unobserve(bar);
        }
      });
    },
    { threshold: 0.5 }
  );

  bars.forEach(bar => observer.observe(bar));
})();


/* ── Terminal Simulation ────────────────────────────────────── */
(function initTerminal() {
  const terminalOutput = $('#terminal-output');
  const inputDisplay = $('#terminal-input-display');
  const cursor = $('#terminal-cursor');
  const runBtn = $('#terminal-run');
  const resetBtn = $('#terminal-reset');
  const terminalScreen = $('#terminal-screen');

  if (!terminalOutput) return;

  let isRunning = false;
  let hasRun = false;
  let abortController = null;

  // Terminal script lines — (type, text, delay_before_ms)
  // type: 'cmd' = typed in prompt, 'output' = immediate output, 'blank' = empty line
  const script = [
    { type: 'cmd',    text: 'blode init --project syscheck',   delay: 400  },
    { type: 'output', text: '<span class="t-dim">  initializing blode project...</span>', delay: 180 },
    { type: 'output', text: '<span class="t-green">  ✓</span> <span class="t-white">created blode.lock</span>', delay: 90 },
    { type: 'output', text: '<span class="t-green">  ✓</span> <span class="t-white">scaffolded main.bld</span>', delay: 90 },
    { type: 'output', text: '<span class="t-green">  ✓</span> <span class="t-white">registered sys, fs modules</span>', delay: 90 },
    { type: 'blank',  text: '',                                 delay: 80  },
    { type: 'cmd',    text: 'blode check main.bld',             delay: 300  },
    { type: 'output', text: '<span class="t-dim">  running type analysis...</span>', delay: 220 },
    { type: 'output', text: '<span class="t-cyan">  parse</span>   <span class="t-white">main.bld</span>          <span class="t-green">OK</span>', delay: 130 },
    { type: 'output', text: '<span class="t-cyan">  resolve</span> <span class="t-white">sys → stdlib</span>      <span class="t-green">OK</span>', delay: 130 },
    { type: 'output', text: '<span class="t-cyan">  resolve</span> <span class="t-white">fs → stdlib</span>       <span class="t-green">OK</span>',  delay: 130 },
    { type: 'output', text: '<span class="t-cyan">  infer</span>   <span class="t-white">act main()</span>        <span class="t-green">OK</span>', delay: 130 },
    { type: 'output', text: '<span class="t-cyan">  infer</span>   <span class="t-white">act check(path)</span>   <span class="t-green">OK</span>', delay: 130 },
    { type: 'blank',  text: '',                                 delay: 60  },
    { type: 'output', text: '<span class="t-green">  ✓ 0 errors · 0 warnings · 5 acts resolved</span>', delay: 100 },
    { type: 'blank',  text: '',                                 delay: 80  },
    { type: 'cmd',    text: 'blode run main.bld',               delay: 280  },
    { type: 'output', text: '<span class="t-dim">  compiling to bytecode...</span>', delay: 300 },
    { type: 'output', text: '<span class="t-dim">  startup: 0.3ms</span>', delay: 200 },
    { type: 'blank',  text: '',                                 delay: 60  },
    { type: 'output', text: '<span class="t-white">[OK]</span>  <span class="t-cyan">/etc/hosts</span>', delay: 120 },
    { type: 'output', text: '<span class="t-white">[OK]</span>  <span class="t-cyan">/etc/resolv.conf</span>', delay: 120 },
    { type: 'output', text: '<span class="t-red">[FAIL]</span> <span class="t-cyan">/var/log/sys</span>  →  not found', delay: 120 },
    { type: 'output', text: '<span class="t-white">[OK]</span>  <span class="t-cyan">/proc/cpuinfo</span>', delay: 120 },
    { type: 'output', text: '<span class="t-white">[OK]</span>  <span class="t-cyan">/proc/meminfo</span>', delay: 120 },
    { type: 'blank',  text: '',                                 delay: 80  },
    { type: 'output', text: '<span class="t-dim">check complete. 4 passed · 1 failed</span>', delay: 100 },
    { type: 'output', text: '<span class="t-dim">exit code: 1 · elapsed: 2.1ms</span>', delay: 60 },
    { type: 'blank',  text: '',                                 delay: 0   },
  ];

  /** Type a command character-by-character into the prompt */
  async function typeCommand(text, signal) {
    inputDisplay.textContent = '';
    cursor.style.display = 'inline';
    for (const char of text) {
      if (signal.aborted) return;
      inputDisplay.textContent += char;
      await sleep(42 + Math.random() * 30);
    }
    // Brief pause before "running"
    await sleep(180);
  }

  /** Append a line to the output */
  function appendLine(html) {
    const span = document.createElement('span');
    span.className = 'terminal__output-line';
    span.innerHTML = html;
    terminalOutput.appendChild(span);
    // Auto-scroll
    terminalScreen.scrollTop = terminalScreen.scrollHeight;
  }

  /** Commit typed command as a real output line */
  function commitCommand() {
    const promptHtml = `<span class="t-green">blode@sys:~$</span> <span class="t-white">${escapeHtml(inputDisplay.textContent)}</span>`;
    appendLine(promptHtml);
    inputDisplay.textContent = '';
  }

  function escapeHtml(str) {
    return str.replace(/&/g,'&amp;').replace(/</g,'&lt;').replace(/>/g,'&gt;');
  }

  function resetTerminal() {
    if (abortController) {
      abortController.abort();
      abortController = null;
    }
    terminalOutput.innerHTML = '';
    inputDisplay.textContent = '';
    cursor.style.display = 'inline';
    isRunning = false;
    hasRun = false;
    runBtn.textContent = '▶ Run';
    runBtn.disabled = false;
  }

  async function runSimulation() {
    if (isRunning) return;
    isRunning = true;
    hasRun = true;
    runBtn.textContent = '⏳ Running';
    runBtn.disabled = true;
    cursor.style.display = 'inline';

    abortController = new AbortController();
    const { signal } = abortController;

    try {
      for (const step of script) {
        if (signal.aborted) break;

        if (step.delay > 0) await sleep(step.delay);
        if (signal.aborted) break;

        if (step.type === 'cmd') {
          await typeCommand(step.text, signal);
          if (signal.aborted) break;
          commitCommand();
        } else if (step.type === 'output') {
          appendLine(step.text);
        } else if (step.type === 'blank') {
          appendLine('&nbsp;');
        }
      }
    } catch (e) {
      // Aborted — clean stop
    }

    if (!signal.aborted) {
      // Done
      cursor.style.display = 'inline';
      inputDisplay.textContent = '';
      runBtn.textContent = '✓ Done';
      isRunning = false;
    }
  }

  // Button handlers
  runBtn?.addEventListener('click', () => {
    if (!isRunning) runSimulation();
  });

  resetBtn?.addEventListener('click', resetTerminal);

  // Scroll trigger — run once when terminal enters view
  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting && !hasRun) {
          // Small delay so user sees the terminal before it fires
          setTimeout(runSimulation, 600);
          observer.unobserve(entry.target);
        }
      });
    },
    { threshold: 0.35 }
  );

  const terminalWrapper = $('.terminal-wrapper');
  if (terminalWrapper) observer.observe(terminalWrapper);
})();


/* ── Copy Install Command ───────────────────────────────────── */
(function initCopyButton() {
  const copyBtn = $('#copy-btn');
  const copyText = $('#copy-text');
  const installCmd = $('#install-cmd');
  if (!copyBtn) return;

  copyBtn.addEventListener('click', async () => {
    const text = installCmd?.textContent || '';
    try {
      await navigator.clipboard.writeText(text);
      copyText.textContent = 'copied!';
      copyBtn.style.color = 'var(--accent-green)';
      copyBtn.style.borderColor = 'var(--border-bright)';
      setTimeout(() => {
        copyText.textContent = 'copy';
        copyBtn.style.color = '';
        copyBtn.style.borderColor = '';
      }, 2000);
    } catch (e) {
      copyText.textContent = 'failed';
      setTimeout(() => { copyText.textContent = 'copy'; }, 1500);
    }
  });
})();


/* ── Smooth active nav link highlight ───────────────────────── */
(function initActiveNav() {
  const sections = $$('section[id]');
  const navLinks = $$('.nav__links a[href^="#"]');

  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          const id = entry.target.id;
          navLinks.forEach(link => {
            const isActive = link.getAttribute('href') === `#${id}`;
            link.style.color = isActive ? 'var(--accent-green)' : '';
          });
        }
      });
    },
    { threshold: 0.4 }
  );

  sections.forEach(s => observer.observe(s));
})();


/* ── Cursor glow effect (desktop only) ─────────────────────── */
(function initCursorGlow() {
  if (window.matchMedia('(hover: none)').matches) return;

  const glow = document.createElement('div');
  glow.style.cssText = `
    position: fixed;
    pointer-events: none;
    z-index: 9000;
    width: 300px;
    height: 300px;
    border-radius: 50%;
    background: radial-gradient(circle, rgba(0,255,136,0.05) 0%, transparent 70%);
    transform: translate(-50%, -50%);
    transition: opacity 0.3s ease;
    opacity: 0;
  `;
  document.body.appendChild(glow);

  let rafId;
  let mx = 0, my = 0;
  let cx = 0, cy = 0;

  document.addEventListener('mousemove', e => {
    mx = e.clientX;
    my = e.clientY;
    glow.style.opacity = '1';
  });

  document.addEventListener('mouseleave', () => {
    glow.style.opacity = '0';
  });

  function animate() {
    cx += (mx - cx) * 0.12;
    cy += (my - cy) * 0.12;
    glow.style.left = `${cx}px`;
    glow.style.top  = `${cy}px`;
    rafId = requestAnimationFrame(animate);
  }

  animate();
})();


/* ── Button ripple micro-interaction ────────────────────────── */
(function initButtonRipple() {
  $$('.btn').forEach(btn => {
    btn.addEventListener('click', function(e) {
      const rect = this.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;

      const ripple = document.createElement('span');
      ripple.style.cssText = `
        position: absolute;
        border-radius: 50%;
        width: 8px;
        height: 8px;
        background: rgba(255,255,255,0.25);
        left: ${x}px;
        top: ${y}px;
        transform: translate(-50%, -50%) scale(0);
        animation: ripple-out 0.5s ease forwards;
        pointer-events: none;
      `;
      this.appendChild(ripple);
      setTimeout(() => ripple.remove(), 500);
    });
  });

  // Inject ripple keyframe dynamically
  const style = document.createElement('style');
  style.textContent = `
    @keyframes ripple-out {
      to {
        transform: translate(-50%, -50%) scale(20);
        opacity: 0;
      }
    }
  `;
  document.head.appendChild(style);
})();


/* ── Hero entrance animation ─────────────────────────────────── */
(function initHeroEntrance() {
  const heroContent = $('.hero__content');
  const heroPreview = $('.hero__code-preview');

  if (!heroContent) return;

  heroContent.style.opacity = '0';
  heroContent.style.transform = 'translateY(24px)';
  heroContent.style.transition = 'opacity 0.9s cubic-bezier(0.2,0,0,1), transform 0.9s cubic-bezier(0.2,0,0,1)';

  if (heroPreview) {
    heroPreview.style.opacity = '0';
    heroPreview.style.transform = 'translateY(32px) scale(0.97)';
    heroPreview.style.transition = 'opacity 0.9s cubic-bezier(0.2,0,0,1) 0.2s, transform 0.9s cubic-bezier(0.2,0,0,1) 0.2s';
  }

  requestAnimationFrame(() => {
    setTimeout(() => {
      heroContent.style.opacity = '1';
      heroContent.style.transform = 'translateY(0)';
      if (heroPreview) {
        heroPreview.style.opacity = '1';
        heroPreview.style.transform = 'translateY(0) scale(1)';
      }
    }, 100);
  });
})();
