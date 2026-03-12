import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { stagger as staggerTokens } from '../designTokens';

export default function Hero() {
  const containerRef = useRef(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      const elements = gsap.utils.toArray('[data-hero-animate]');

      gsap.fromTo(
        elements,
        { y: 40, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 1,
          ease: 'power3.out',
          stagger: staggerTokens.text,
        }
      );
    }, containerRef);

    return () => ctx.revert();
  }, []);

  return (
    <section
      id="hero"
      ref={containerRef}
      className="min-h-[100dvh] relative overflow-hidden flex flex-col justify-end"
    >
      {/* Background image */}
      <img
        src="https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?w=1920&q=80"
        alt="Abstract dark marble texture"
        className="absolute inset-0 w-full h-full object-cover"
        loading="eager"
      />

      {/* Gradient overlay */}
      <div className="absolute inset-0 bg-gradient-to-t from-[#0D0D12] via-[#0D0D12]/70 to-transparent" />

      {/* Content */}
      <div className="relative z-10 p-8 md:p-16 lg:p-24 pb-24">
        <h1>
          <span
            data-hero-animate
            className="block font-heading text-white text-3xl md:text-5xl lg:text-6xl font-bold"
          >
            Legacy meets
          </span>
          <span
            data-hero-animate
            className="block font-drama text-champagne text-6xl md:text-8xl lg:text-[10rem] leading-none"
          >
            Precision.
          </span>
        </h1>

        <p
          data-hero-animate
          className="mt-6 text-white/70 max-w-xl text-lg"
        >
          Bespoke wealth intelligence for the next generation of family offices
        </p>

        <a
          data-hero-animate
          href="#access"
          className="btn-magnetic inline-block mt-8 bg-champagne text-obsidian rounded-full px-8 py-4 text-lg font-semibold hover:scale-[1.03] transition-transform"
        >
          Request Private Access
        </a>
      </div>
    </section>
  );
}
