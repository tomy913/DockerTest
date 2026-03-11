import { useEffect, useRef, useState, useCallback } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { easings, stagger as staggerTokens } from '../designTokens';

gsap.registerPlugin(ScrollTrigger);

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
    <div className="flex flex-col h-full">
      <div className="relative flex-1 min-h-[16rem]">
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
      <div className="mt-4 pt-4">
        <h3 className="font-heading text-xl font-bold text-slate">
          Real-time Portfolio Synthesis
        </h3>
        <p className="text-slate/60 text-sm mt-2 font-heading">
          Unified views across custodians, asset classes, and jurisdictions
          — reconciled in seconds.
        </p>
      </div>
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

  const typeMessage = useCallback(
    (msg, onDone) => {
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
    },
    []
  );

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
    <div className="flex flex-col h-full">
      <div className="bg-obsidian rounded-2xl p-6 text-champagne font-mono text-sm flex-1 min-h-[16rem] flex flex-col">
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
      <div className="mt-4 pt-4">
        <h3 className="font-heading text-xl font-bold text-slate">
          Predictive Risk Narratives
        </h3>
        <p className="text-slate/60 text-sm mt-2 font-heading">
          AI-generated scenario analysis, delivered as prose your
          investment committee can act on.
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
  const targetSequence = [3, 1, 5, 4, 0, 6, 2]; // cycle through different days

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

        // Reset all cells
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

        // Cursor enters from right
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
          // Press effect on cell
          .to(cell, { scale: 0.95, duration: 0.15, ease: 'power2.in' })
          .to(cell, {
            scale: 1,
            backgroundColor: '#C9A84C',
            duration: 0.3,
            ease: easings.entrance,
          })
          // Move cursor to Save
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
          // Press save
          .to(save, { scale: 0.95, duration: 0.1, ease: 'power2.in' })
          .to(save, {
            scale: 1,
            backgroundColor: '#C9A84C',
            color: '#0D0D12',
            duration: 0.25,
            ease: easings.entrance,
          })
          // Fade cursor out
          .to(cursor, { opacity: 0, duration: 0.4 }, '+=0.2');
      };

      gsap.delayedCall(0.5, runCycle);
    }, containerRef);

    return () => ctx.revert();
  }, []);

  return (
    <div className="flex flex-col h-full">
      <div
        ref={containerRef}
        className="relative flex-1 min-h-[16rem] flex flex-col items-center justify-center"
      >
        {/* SVG Cursor */}
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

        {/* Day headers */}
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

        {/* Day cells */}
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

        {/* Save button */}
        <button
          ref={saveRef}
          className="mt-4 px-6 py-2 rounded-xl border border-black/10 text-sm font-heading text-slate transition-colors"
        >
          Save
        </button>
      </div>

      <div className="mt-4 pt-4">
        <h3 className="font-heading text-xl font-bold text-slate">
          Multi-Generational Governance
        </h3>
        <p className="text-slate/60 text-sm mt-2 font-heading">
          Automated scheduling for family votes, trustee reviews, and
          succession planning milestones.
        </p>
      </div>
    </div>
  );
}

/* ─── Features Section ─── */
export default function Features() {
  const sectionRef = useRef(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      const cards = gsap.utils.toArray('[data-feature-card]');
      gsap.fromTo(
        cards,
        { y: 60, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 1,
          ease: easings.entrance,
          stagger: staggerTokens.cards,
          scrollTrigger: {
            trigger: sectionRef.current,
            start: 'top 80%',
          },
        }
      );
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section ref={sectionRef} className="bg-ivory py-24 px-8 md:px-16">
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-7xl mx-auto">
        <div
          data-feature-card
          className="bg-white rounded-[2rem] p-8 shadow-lg shadow-black/5 border border-black/5 relative overflow-hidden min-h-[28rem]"
        >
          <DiagnosticShuffler />
        </div>
        <div
          data-feature-card
          className="bg-white rounded-[2rem] p-8 shadow-lg shadow-black/5 border border-black/5 relative overflow-hidden min-h-[28rem]"
        >
          <TelemetryTypewriter />
        </div>
        <div
          data-feature-card
          className="bg-white rounded-[2rem] p-8 shadow-lg shadow-black/5 border border-black/5 relative overflow-hidden min-h-[28rem]"
        >
          <CursorProtocolScheduler />
        </div>
      </div>
    </section>
  );
}
