import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { colors, easings } from '../designTokens';

gsap.registerPlugin(ScrollTrigger);

/* ─── SVG Animations for each card ─── */

function ConcentricCircles() {
  return (
    <svg
      viewBox="0 0 300 300"
      className="w-full max-w-[320px] mx-auto"
      aria-hidden="true"
    >
      <circle
        cx="150"
        cy="150"
        r="130"
        fill="none"
        stroke={colors.champagne}
        strokeWidth="1"
        opacity="0.4"
        style={{ transformOrigin: '150px 150px', animation: 'spin 20s linear infinite' }}
      />
      <circle
        cx="150"
        cy="150"
        r="95"
        fill="none"
        stroke={colors.slate}
        strokeWidth="1"
        opacity="0.5"
        style={{ transformOrigin: '150px 150px', animation: 'spin 15s linear infinite reverse' }}
      />
      <circle
        cx="150"
        cy="150"
        r="60"
        fill="none"
        stroke={colors.champagne}
        strokeWidth="1.5"
        opacity="0.7"
        style={{ transformOrigin: '150px 150px', animation: 'spin 10s linear infinite' }}
      />
      <circle
        cx="150"
        cy="150"
        r="28"
        fill="none"
        stroke={colors.slate}
        strokeWidth="1"
        opacity="0.3"
        style={{ transformOrigin: '150px 150px', animation: 'spin 8s linear infinite reverse' }}
      />
      <style>{`@keyframes spin{from{transform:rotate(0deg)}to{transform:rotate(360deg)}}`}</style>
    </svg>
  );
}

function DotGridLaser() {
  const laserRef = useRef(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.to(laserRef.current, {
        y: 140,
        duration: 3,
        repeat: -1,
        yoyo: true,
        ease: easings.morph,
      });
    });
    return () => ctx.revert();
  }, []);

  const dots = [];
  for (let row = 0; row < 6; row++) {
    for (let col = 0; col < 8; col++) {
      dots.push(
        <circle
          key={`${row}-${col}`}
          cx={30 + col * 34}
          cy={30 + row * 34}
          r={2}
          fill={colors.slate}
          opacity={0.5}
        />
      );
    }
  }

  return (
    <svg
      viewBox="0 0 300 240"
      className="w-full max-w-[320px] mx-auto"
      aria-hidden="true"
    >
      {dots}
      <rect
        ref={laserRef}
        x="10"
        y="20"
        width="280"
        height="2"
        rx="1"
        fill={colors.champagne}
        opacity="0.9"
      />
    </svg>
  );
}

function HeartbeatWaveform() {
  const pathRef = useRef(null);

  useEffect(() => {
    const path = pathRef.current;
    if (!path) return;
    const length = path.getTotalLength();
    gsap.set(path, { strokeDasharray: length, strokeDashoffset: length });

    const ctx = gsap.context(() => {
      gsap.to(path, {
        strokeDashoffset: 0,
        duration: 2,
        repeat: -1,
        ease: 'none',
      });
    });
    return () => ctx.revert();
  }, []);

  return (
    <svg
      viewBox="0 0 320 120"
      className="w-full max-w-[340px] mx-auto"
      aria-hidden="true"
    >
      <path
        ref={pathRef}
        d="M0,60 L40,60 L55,60 L65,20 L75,100 L85,40 L95,70 L105,60 L140,60 L160,60 L170,25 L180,95 L190,45 L200,65 L210,60 L250,60 L265,60 L275,30 L285,90 L295,50 L305,60 L320,60"
        fill="none"
        stroke={colors.champagne}
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

/* ─── Card data ─── */

const cards = [
  {
    step: '01',
    title: 'Discovery & Intake',
    description:
      "We begin with a comprehensive audit of your family's financial topology — assets, entities, jurisdictions, and objectives.",
    bg: 'bg-ivory',
    text: 'text-slate',
    Visual: ConcentricCircles,
  },
  {
    step: '02',
    title: 'Portfolio Architecture',
    description:
      'Our systems synthesize your holdings into a unified intelligence layer — real-time, cross-custodian, multi-asset.',
    bg: 'bg-obsidian',
    text: 'text-white',
    Visual: DotGridLaser,
  },
  {
    step: '03',
    title: 'Governance Activation',
    description:
      'Role-based access, succession protocols, and audit trails — activated and monitored in perpetuity.',
    bg: 'bg-slate',
    text: 'text-white',
    Visual: HeartbeatWaveform,
  },
];

/* ─── Protocol Component ─── */

export default function Protocol() {
  const containerRef = useRef(null);
  const cardsRef = useRef([]);

  useEffect(() => {
    const container = containerRef.current;
    const cardEls = cardsRef.current.filter(Boolean);
    if (!container || cardEls.length < 3) return;

    const ctx = gsap.context(() => {
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: container,
          start: 'top top',
          end: `+=${window.innerHeight * 2.5}`,
          pin: true,
          scrub: 1,
          anticipatePin: 1,
        },
      });

      /* Card 2 enters over card 1 */
      tl.fromTo(
        cardEls[1],
        { yPercent: 100 },
        { yPercent: 0, duration: 1, ease: 'none' },
        0
      ).to(
        cardEls[0],
        { scale: 0.9, filter: 'blur(20px)', opacity: 0.5, duration: 1, ease: 'none' },
        0
      );

      /* Card 3 enters over card 2 */
      tl.fromTo(
        cardEls[2],
        { yPercent: 100 },
        { yPercent: 0, duration: 1, ease: 'none' },
        1
      ).to(
        cardEls[1],
        { scale: 0.9, filter: 'blur(20px)', opacity: 0.5, duration: 1, ease: 'none' },
        1
      );
    }, container);

    return () => ctx.revert();
  }, []);

  return (
    <section ref={containerRef} className="relative min-h-[300vh]">
      <div className="relative w-full h-screen overflow-hidden">
        {cards.map((card, i) => (
          <div
            key={card.step}
            ref={(el) => (cardsRef.current[i] = el)}
            className={`absolute inset-0 min-h-screen rounded-[3rem] overflow-hidden ${card.bg} ${card.text} flex flex-col md:flex-row items-center justify-center px-8 md:px-16 lg:px-24 gap-12`}
            style={{ zIndex: i + 1 }}
          >
            {/* Left — text */}
            <div className="flex-1 max-w-xl">
              <span className="font-mono text-champagne text-sm tracking-widest uppercase mb-4 block">
                {card.step}
              </span>
              <h2 className="font-heading text-4xl font-bold mb-6 leading-tight">
                {card.title}
              </h2>
              <p className="text-lg leading-relaxed opacity-80">
                {card.description}
              </p>
            </div>

            {/* Right — SVG visual */}
            <div className="flex-1 flex items-center justify-center">
              <card.Visual />
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
