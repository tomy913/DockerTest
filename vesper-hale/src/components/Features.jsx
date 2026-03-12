import { useEffect, useRef, useState, useCallback } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { easings, stagger as staggerTokens } from '../designTokens';

gsap.registerPlugin(ScrollTrigger);

/* ─── Feature metadata ─── */
const FEATURES = [
  {
    id: 'portfolio',
    number: '01',
    title: 'Real-time Portfolio Synthesis',
    summary:
      'Unified views across custodians, asset classes, and jurisdictions — reconciled in seconds.',
  },
  {
    id: 'risk',
    number: '02',
    title: 'Predictive Risk Narratives',
    summary:
      'AI-generated scenario analysis, delivered as prose your investment committee can act on.',
  },
  {
    id: 'governance',
    number: '03',
    title: 'Multi-Generational Governance',
    summary:
      'Automated scheduling for family votes, trustee reviews, and succession planning milestones.',
  },
];

/* ─── Card 1: Diagnostic Shuffler ─── */
function DiagnosticShuffler() {
  const [topIndex, setTopIndex] = useState(0);
  const labels = [
    'Equities & Alternatives',
    'Cross-Border Holdings',
    'Custodian Reconciliation',
  ];

  useEffect(() => {
    const id = setInterval(() => {
      setTopIndex((prev) => (prev + 1) % 3);
    }, 3000);
    return () => clearInterval(id);
  }, []);

  const getStyle = (i) => {
    const order = (i - topIndex + 3) % 3;
    const yOffsets = [0, 24, 48];
    const scales = [1, 0.97, 0.94];
    const zIndexes = [30, 20, 10];
    return {
      transform: `translateY(${yOffsets[order]}px) scale(${scales[order]})`,
      zIndex: zIndexes[order],
      opacity: order === 2 ? 0.6 : order === 1 ? 0.8 : 1,
      transition: `all 0.6s cubic-bezier(0.34, 1.56, 0.64, 1)`,
    };
  };

  return (
<<<<<<< HEAD
    <div className="relative flex-1 min-h-[16rem]">
=======
    <div className="relative min-h-[16rem]">
>>>>>>> 5d96e14 (edited claud.md)
      {labels.map((label, i) => (
        <div
          key={label}
          className="absolute inset-x-0 top-0 bg-ivory rounded-2xl p-4 shadow-md w-full"
          style={getStyle(i)}
        >
          <div className="flex items-center gap-3 mb-2">
            <div className="w-8 h-8 rounded-lg bg-champagne/20 flex items-center justify-center">
              <span className="text-champagne text-xs font-bold">
                {String(i + 1).padStart(2, '0')}
              </span>
            </div>
            <span className="font-heading text-sm font-semibold text-slate">
              {label}
            </span>
          </div>
          <div className="space-y-1.5 mt-3">
            <div className="h-2 rounded-full bg-black/5 w-full" />
            <div className="h-2 rounded-full bg-black/5 w-3/4" />
            <div className="h-2 rounded-full bg-black/5 w-1/2" />
          </div>
        </div>
      ))}
    </div>
  );
}

/* ─── Card 2: Telemetry Typewriter ─── */
function TelemetryTypewriter() {
  const [displayText, setDisplayText] = useState('');
  const [msgIndex, setMsgIndex] = useState(0);
  const intervalRef = useRef(null);
  const timeoutRef = useRef(null);

  const messages = [
    '\u25b8 Scenario: Fed +50bp \u2014 portfolio impact: -2.3%\u2026',
    '\u25b8 Hedge recommendation: rotate 12% into short-duration\u2026',
    '\u25b8 Risk narrative updated for Q3 review\u2026',
  ];

  const typeMessage = useCallback((msg, onDone) => {
    let charIdx = 0;
    setDisplayText('');
    intervalRef.current = setInterval(() => {
      charIdx++;
      setDisplayText(msg.slice(0, charIdx));
      if (charIdx >= msg.length) {
        clearInterval(intervalRef.current);
        timeoutRef.current = setTimeout(() => {
          onDone();
        }, 2000);
      }
    }, 40);
  }, []);

  useEffect(() => {
    const startTyping = (idx) => {
      typeMessage(messages[idx], () => {
        const next = (idx + 1) % messages.length;
        setMsgIndex(next);
        startTyping(next);
      });
    };
    startTyping(msgIndex);

    return () => {
      clearInterval(intervalRef.current);
      clearTimeout(timeoutRef.current);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
<<<<<<< HEAD
    <div className="bg-obsidian rounded-2xl p-6 text-champagne font-mono text-sm flex-1 min-h-[16rem] flex flex-col">
=======
    <div className="bg-obsidian rounded-2xl p-6 text-champagne font-mono text-sm min-h-[16rem] flex flex-col">
>>>>>>> 5d96e14 (edited claud.md)
      <div className="flex items-center gap-2 mb-4">
        <div className="w-2 h-2 rounded-full bg-champagne animate-pulse" />
        <span className="text-champagne/70 text-xs uppercase tracking-widest">
          Live Feed
        </span>
      </div>
      <div className="flex-1 flex items-start">
        <p className="leading-relaxed">
          {displayText}
          <span className="inline-block w-[2px] h-[1.2em] bg-champagne animate-pulse align-middle ml-0.5" />
        </p>
      </div>
    </div>
  );
}

/* ─── Card 3: Cursor Protocol Scheduler ─── */
function CursorProtocolScheduler() {
  const containerRef = useRef(null);
  const cursorRef = useRef(null);
  const cellRefs = useRef([]);
  const saveRef = useRef(null);
  const iterationRef = useRef(0);

  const days = ['S', 'M', 'T', 'W', 'T', 'F', 'S'];
  const targetSequence = [3, 1, 5, 4, 0, 6, 2];

  useEffect(() => {
    const ctx = gsap.context(() => {
      const runCycle = () => {
        const dayIdx =
          targetSequence[iterationRef.current % targetSequence.length];
        iterationRef.current++;

        const cursor = cursorRef.current;
        const cell = cellRefs.current[dayIdx];
        const save = saveRef.current;
        const container = containerRef.current;

        if (!cursor || !cell || !save || !container) return;

        const containerRect = container.getBoundingClientRect();
        const cellRect = cell.getBoundingClientRect();
        const saveRect = save.getBoundingClientRect();

        const cellX = cellRect.left - containerRect.left + cellRect.width / 2;
        const cellY = cellRect.top - containerRect.top + cellRect.height / 2;
        const saveX = saveRect.left - containerRect.left + saveRect.width / 2;
        const saveY = saveRect.top - containerRect.top + saveRect.height / 2;

        cellRefs.current.forEach((c) => {
          if (c) {
            gsap.set(c, { scale: 1, backgroundColor: 'transparent' });
          }
        });
        gsap.set(save, { scale: 1, backgroundColor: 'transparent' });

        const tl = gsap.timeline({
          onComplete: () => {
            gsap.delayedCall(3, runCycle);
          },
        });

        tl.set(cursor, {
          x: containerRect.width + 20,
          y: cellY - 6,
          opacity: 1,
        })
          .to(cursor, {
            x: cellX,
            y: cellY - 6,
            duration: 0.8,
            ease: easings.morph,
          })
          .to(cell, { scale: 0.95, duration: 0.15, ease: 'power2.in' })
          .to(cell, {
            scale: 1,
            backgroundColor: '#C9A84C',
            duration: 0.3,
            ease: easings.entrance,
          })
          .to(
            cursor,
            {
              x: saveX,
              y: saveY - 6,
              duration: 0.6,
              ease: easings.morph,
            },
            '+=0.3'
          )
          .to(save, { scale: 0.95, duration: 0.1, ease: 'power2.in' })
          .to(save, {
            scale: 1,
            backgroundColor: '#C9A84C',
            color: '#0D0D12',
            duration: 0.25,
            ease: easings.entrance,
          })
          .to(cursor, { opacity: 0, duration: 0.4 }, '+=0.2');
      };

      gsap.delayedCall(0.5, runCycle);
    }, containerRef);

    return () => ctx.revert();
  }, []);

  return (
    <div
      ref={containerRef}
<<<<<<< HEAD
      className="relative flex-1 min-h-[16rem] flex flex-col items-center justify-center"
=======
      className="relative min-h-[16rem] flex flex-col items-center justify-center"
>>>>>>> 5d96e14 (edited claud.md)
    >
      <svg
        ref={cursorRef}
        className="absolute top-0 left-0 pointer-events-none z-40"
        width="20"
        height="24"
        viewBox="0 0 20 24"
        fill="none"
        style={{ opacity: 0 }}
      >
        <path
          d="M0 0L18 12L8 13L5 23L0 0Z"
          fill="#C9A84C"
          stroke="#0D0D12"
          strokeWidth="1"
        />
      </svg>

      <p className="font-mono text-xs text-slate/60 mb-4">
        Governance Calendar — Voting & Review Cadence
      </p>

      <div className="grid grid-cols-7 gap-2 mb-2">
        {days.map((d, i) => (
          <div
            key={`h-${i}`}
            className="w-10 h-6 flex items-center justify-center text-xs font-mono text-slate/40"
          >
            {d}
          </div>
        ))}
      </div>

      <div className="grid grid-cols-7 gap-2">
        {days.map((_, i) => (
          <div
            key={`c-${i}`}
            ref={(el) => (cellRefs.current[i] = el)}
            className="w-10 h-10 rounded-xl border border-black/10 flex items-center justify-center text-sm font-heading text-slate"
          >
            {i + 1}
          </div>
        ))}
      </div>

      <button
        ref={saveRef}
        className="mt-4 px-6 py-2 rounded-xl border border-black/10 text-sm font-heading text-slate transition-colors"
      >
        Save
      </button>
    </div>
  );
}

<<<<<<< HEAD
/* ─── Component map ─── */
const COMPONENTS = [DiagnosticShuffler, TelemetryTypewriter, CursorProtocolScheduler];

/* ─── Features Section (Expanded Tabs) ─── */
export default function Features() {
  const [activeIndex, setActiveIndex] = useState(0);
  const prevIndexRef = useRef(0);
  const sectionRef = useRef(null);
  const panelRef = useRef(null);
  const contentRef = useRef(null);
  const tabRefs = useRef([]);
  const indicatorRef = useRef(null);

  const ActiveComponent = COMPONENTS[activeIndex];
=======
/* ─── Features Data ─── */
const FEATURES = [
  {
    id: 'diagnostics',
    number: '01',
    title: 'Real-time Portfolio Synthesis',
    summary:
      'Unified views across custodians, asset classes, and jurisdictions — reconciled in seconds.',
    Component: DiagnosticShuffler,
  },
  {
    id: 'telemetry',
    number: '02',
    title: 'Predictive Risk Narratives',
    summary:
      'AI-generated scenario analysis, delivered as prose your investment committee can act on.',
    Component: TelemetryTypewriter,
  },
  {
    id: 'governance',
    number: '03',
    title: 'Multi-Generational Governance',
    summary:
      'Automated scheduling for family votes, trustee reviews, and succession planning milestones.',
    Component: CursorProtocolScheduler,
  },
];

/* ─── Features Section ─── */
export default function Features() {
  const [activeIndex, setActiveIndex] = useState(0);
  const prevIndexRef = useRef(0);
  const sectionRef = useRef(null);
  const tabRailRef = useRef(null);
  const contentRef = useRef(null);
  const indicatorRef = useRef(null);
  const tabRefs = useRef([]);

  const ActiveComponent = FEATURES[activeIndex].Component;
>>>>>>> 5d96e14 (edited claud.md)

  // Scroll-trigger entrance animation
  useEffect(() => {
    const ctx = gsap.context(() => {
<<<<<<< HEAD
      const tabs = gsap.utils.toArray('[data-feature-tab]');
      gsap.fromTo(
        tabs,
=======
      gsap.fromTo(
        tabRailRef.current,
>>>>>>> 5d96e14 (edited claud.md)
        { x: -40, opacity: 0 },
        {
          x: 0,
          opacity: 1,
<<<<<<< HEAD
          duration: 0.8,
          ease: easings.entrance,
          stagger: staggerTokens.cards,
=======
          duration: 1,
          ease: easings.entrance,
>>>>>>> 5d96e14 (edited claud.md)
          scrollTrigger: {
            trigger: sectionRef.current,
            start: 'top 80%',
          },
        }
      );
      gsap.fromTo(
<<<<<<< HEAD
        panelRef.current,
=======
        contentRef.current,
>>>>>>> 5d96e14 (edited claud.md)
        { y: 40, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 1,
          delay: staggerTokens.cards,
          ease: easings.entrance,
          scrollTrigger: {
            trigger: sectionRef.current,
            start: 'top 80%',
          },
        }
      );
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  // Tab-switch content transition
  useEffect(() => {
    if (!contentRef.current) return;
<<<<<<< HEAD

    const direction = activeIndex > prevIndexRef.current ? 1 : -1;
    prevIndexRef.current = activeIndex;

    const tl = gsap.timeline();
    tl.fromTo(
      contentRef.current,
      { opacity: 0, y: direction * 30 },
      { opacity: 1, y: 0, duration: 0.5, ease: easings.entrance }
    );

    return () => tl.kill();
=======
    const direction = activeIndex > prevIndexRef.current ? 1 : -1;
    gsap.fromTo(
      contentRef.current,
      { opacity: 0, y: 30 * direction },
      { opacity: 1, y: 0, duration: 0.5, ease: easings.morph }
    );
    prevIndexRef.current = activeIndex;
>>>>>>> 5d96e14 (edited claud.md)
  }, [activeIndex]);

  // Indicator animation
  useEffect(() => {
<<<<<<< HEAD
    const activeTab = tabRefs.current[activeIndex];
    if (!activeTab || !indicatorRef.current) return;

    const isDesktop = window.matchMedia('(min-width: 768px)').matches;

    if (isDesktop) {
      gsap.to(indicatorRef.current, {
        y: activeTab.offsetTop,
        height: activeTab.offsetHeight,
        width: 4,
        x: 0,
=======
    if (!indicatorRef.current || !tabRefs.current[activeIndex]) return;

    const isDesktop = window.matchMedia('(min-width: 768px)').matches;
    const tab = tabRefs.current[activeIndex];
    const rail = tabRailRef.current;

    if (!rail) return;

    const railRect = rail.getBoundingClientRect();
    const tabRect = tab.getBoundingClientRect();

    if (isDesktop) {
      gsap.to(indicatorRef.current, {
        y: tabRect.top - railRect.top,
        height: tabRect.height,
>>>>>>> 5d96e14 (edited claud.md)
        duration: 0.4,
        ease: easings.morph,
      });
    } else {
      gsap.to(indicatorRef.current, {
<<<<<<< HEAD
        x: activeTab.offsetLeft,
        width: activeTab.offsetWidth,
        height: 3,
        y: 0,
=======
        x: tabRect.left - railRect.left,
        width: tabRect.width,
>>>>>>> 5d96e14 (edited claud.md)
        duration: 0.4,
        ease: easings.morph,
      });
    }
  }, [activeIndex]);

  return (
    <section ref={sectionRef} className="bg-ivory py-24 px-8 md:px-16">
<<<<<<< HEAD
      <div className="max-w-7xl mx-auto">
        <div className="flex flex-col md:flex-row gap-6">
          {/* Tab rail */}
          <div className="relative flex flex-row md:flex-col gap-3 md:w-80 shrink-0 overflow-x-auto md:overflow-visible">
            {/* Sliding indicator */}
            <div
              ref={indicatorRef}
              className="absolute bg-champagne rounded-full z-10
                         md:left-0 md:top-0 md:w-1
                         left-0 bottom-0 h-[3px]"
              style={{ width: 4, height: 0 }}
            />

            {FEATURES.map((feat, i) => (
              <button
                key={feat.id}
                ref={(el) => (tabRefs.current[i] = el)}
                data-feature-tab
                onClick={() => setActiveIndex(i)}
                className={`
                  text-left rounded-2xl p-5 transition-colors border relative
                  shrink-0 md:shrink md:w-full
                  ${
                    i === activeIndex
                      ? 'bg-white shadow-lg shadow-black/5 border-black/5'
                      : 'bg-white/50 border-transparent hover:bg-white/80 hover:border-black/5'
                  }
                `}
              >
                <span className="font-mono text-xs text-champagne/70">
                  {feat.number}
                </span>
                <h4 className="font-heading text-base font-semibold text-slate mt-1">
                  {feat.title}
                </h4>
                {i !== activeIndex && (
                  <p className="text-slate/50 text-sm mt-1 line-clamp-1 hidden md:block">
                    {feat.summary}
                  </p>
                )}
              </button>
            ))}
          </div>

          {/* Content panel */}
          <div
            ref={panelRef}
            className="flex-1 bg-white rounded-[2rem] p-8 shadow-lg shadow-black/5 border border-black/5 relative overflow-hidden min-h-[28rem]"
          >
            <div ref={contentRef} className="flex flex-col h-full">
              <ActiveComponent key={activeIndex} />
              <div className="mt-6 pt-4 border-t border-black/5">
                <h3 className="font-heading text-xl font-bold text-slate">
                  {FEATURES[activeIndex].title}
                </h3>
                <p className="text-slate/60 text-sm mt-2 font-heading">
                  {FEATURES[activeIndex].summary}
                </p>
              </div>
=======
      <div className="flex flex-col md:flex-row gap-8 max-w-7xl mx-auto">
        {/* Tab Rail */}
        <div
          ref={tabRailRef}
          className="relative flex flex-row md:flex-col gap-3 md:w-[320px] shrink-0 overflow-x-auto md:overflow-x-visible"
        >
          {/* Sliding indicator */}
          <div
            ref={indicatorRef}
            className="absolute md:left-0 md:w-1 md:top-0 bottom-0 left-0 h-1 md:h-0 w-0 bg-champagne rounded-full z-10"
          />

          {FEATURES.map((feature, i) => (
            <button
              key={feature.id}
              ref={(el) => (tabRefs.current[i] = el)}
              onClick={() => setActiveIndex(i)}
              className={`relative text-left px-5 py-4 rounded-2xl transition-all shrink-0 ${
                i === activeIndex
                  ? 'bg-white shadow-lg border-l-0 md:border-l-[3px] border-champagne'
                  : 'bg-white/50 hover:bg-white/80'
              }`}
            >
              <div className="flex items-center gap-3">
                <span className="text-champagne font-mono text-sm font-bold">
                  {feature.number}
                </span>
                <span className="font-heading text-sm font-semibold text-slate whitespace-nowrap">
                  {feature.title}
                </span>
              </div>
              {i !== activeIndex && (
                <p className="text-slate/50 text-xs mt-1 font-heading hidden md:block">
                  {feature.summary}
                </p>
              )}
            </button>
          ))}
        </div>

        {/* Content Panel */}
        <div
          ref={contentRef}
          className="flex-1 bg-white rounded-[2rem] p-8 shadow-lg shadow-black/5 border border-black/5 relative overflow-hidden min-h-[28rem]"
        >
          <div className="flex flex-col h-full">
            <div className="flex-1">
              <ActiveComponent key={activeIndex} />
            </div>
            <div className="mt-6 pt-4 border-t border-black/5">
              <h3 className="font-heading text-xl font-bold text-slate">
                {FEATURES[activeIndex].title}
              </h3>
              <p className="text-slate/60 text-sm mt-2 font-heading">
                {FEATURES[activeIndex].summary}
              </p>
>>>>>>> 5d96e14 (edited claud.md)
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
